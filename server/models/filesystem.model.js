var db = require('../utils/db')

exports.list = function (callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection
        .find()
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.fileExists = function (address, callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection
        .findOne(
            { link: address[0] },
            (err, doc) => {
                if (err) {
                    console.error(err)
                    return callbackFunc(-2)
                }

                if (!doc) {
                    if (address.length === 1)
                        return callbackFunc(0)
                    else return callbackFunc(-1)
                }

                if (address.length === 1)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                    let found = false
                for (const it of doc.items) {
                    if (it.link === address[1]) {
                        found = true
                        doc = it
                        break
                    }
                }

                if (!found) {
                    if (address.length === 2)
                        return callbackFunc(0)
                    else return callbackFunc(-1)
                }

                if (address.length === 2)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                    found = false
                for (const it of doc.items) {
                    if (it.link === address[2]) {
                        found = true
                        break
                    }
                }

                if (!found)
                    return callbackFunc(0)

                    return callbackFunc(1)
            }
        )
}
