const FilesystemModal = require('../models/filesystem.model')

exports.CheckIfItemExists = function (req, res, next) {
    let address = req.body.address
    if (!address || address.length === 0)
        return res.status(400).json({ msg: "Invalid syntax" })

    address.forEach((_, i) => { address[i] = address[i].trim() })
    req.body.address = address
    if (address.indexOf("") !== -1)
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
