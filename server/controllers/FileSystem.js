const FilesystemModal = require('../models/filesystem.model')

exports.GetFilesystem = function (req, res, next) {
    FilesystemModal.list(
        (err, docs) => {
            if (err)
                return res.status(500).json({ "msg": err })

            docs.map(menu => {
                delete menu._id
                delete menu.permission
                menu.items && menu.items.map(sub => {
                    if (sub.type == "menu") {
                        delete sub.permission
                    }
                })
            })

            return res.send(docs)
        }
    )
}

exports.AddFileToDB = function (req, res, next) {
    if (res.locals.fileFound)
        return res.status(400).json({ msg: "Item exists" })

    let name = req.body.name.trim(),
        type = req.body.type.trim(),
        address = req.body.address

    if (!name || !type || ["page", "menu"].indexOf(type) === -1)
        return res.status(400).json({ msg: "Invalid syntax" })
    else if (address.length === 3 && type !== "page")
        return res.status(400).json({ msg: "Cannot add this item here" })

    FilesystemModal.add(name, type, address,
        (err, result) => {
            if (err)
                return res.status(500).json({ "msg": err })
            return res.status(200).send('OKKK')
        }
    )
}
