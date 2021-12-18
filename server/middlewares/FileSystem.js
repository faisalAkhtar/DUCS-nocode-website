const FilesystemModal = require('../models/filesystem.model')

exports.ExistsAndPermitted = function (req, res, next) {
    let address = req.body.address,
        type = req.body.type,
        uid = req.jwt.userId,
        isAdmin = req.jwt.isAdmin

    if (!address || address.length === 0 || !type)
        return res.status(400).json({ msg: "Invalid syntax" })

    address.forEach((_, i) => { address[i] = address[i].trim() })
    req.body.address = address
    type = type.trim()
    req.body.type = type
    if (address.indexOf("") !== -1)
        return res.status(400).json({ msg: "Invalid syntax" })
    if (type.length === 0 || ["page", "menu"].indexOf(type) === -1)
        return res.status(400).json({ msg: "Invalid syntax" })

    FilesystemModal.existsAndPermitted(address, type, uid, isAdmin,
        (sign) => {
            if (sign === -3)
                return res.status(403).json({ msg: "Editing privileges required" })
            else if (sign === -2)
                return res.status(500).json({ msg: "An error occurred" })
            else if (sign === -1)
                return res.status(400).json({ msg: "Invalid parent in the address" })
            else if (sign === 1 || sign === 0) {
                res.locals.itemFound = sign === 1
                return next()
            }
        }
    )
}

exports.DeleteUsersPermissions = function (req, res, next) {
    let uid = req.params.uid

    if (!/[0-9A-Fa-f]{24}/g.test(uid))
        return res.status(400).json({ msg: "Provide a valid ID" })

    FilesystemModal.deletePermissions(uid,
        (err, res) => {
            if (err)
                return res.status(500).json({ msg: err })

            return next()
        }
    )
}