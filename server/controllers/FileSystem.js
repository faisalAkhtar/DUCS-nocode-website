const FilesystemModal = require('../models/filesystem.model')
const fs = require('fs')
const path = require('path')

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

exports.AddItemToDB = function (req, res, next) {
    if (res.locals.itemFound)
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
            return next()
        }
    )
}

exports.AddItemToServer = function (req, res, next) {
    let itempath = '/../pages',
        address = req.body.address,
        name = req.body.name,
        type = req.body.type

    address.forEach(link => { itempath += "/" + link })

    if (type === 'menu') {
        fs.mkdir(
            path.join(__dirname + itempath),
            (err) => {
                if (err)
                    return res.status(500).json({ "msg": err })
                return res.status(200).send('OKKK')
            }
        )
    } else {
        itempath += '.html'
        fs.writeFile(
            path.join(__dirname + itempath),
            '<h1>' + name + '</h1>',
            (err) => {
                if (err)
                    return res.status(500).json({ "msg": err })
                return res.status(200).send('OKKK')
            }
        )
    }
}