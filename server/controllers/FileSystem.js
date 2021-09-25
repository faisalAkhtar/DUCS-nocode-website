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