const FilesystemModal = require('../models/filesystem.model')

exports.CheckIfItemExists = function (req, res, next) {
    let address = req.body.address,
        type = req.body.type
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

    FilesystemModal.fileExists(address,
        (sign) => {
            if (sign === -2)
                return res.status(500).json({ msg: "Unknown error with database" })
            else if (sign === -1)
                return res.status(400).json({ msg: "Invalid parent in the address" })
            else if (sign === 1 || sign === 0) {
                res.locals.itemFound = sign === 1
                return next()
            }
        }
    )
}
