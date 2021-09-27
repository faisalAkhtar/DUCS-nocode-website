var db = require('../utils/db')

exports.list = function (callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection
        .find()
        .sort({ order: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.fileExists = function (address, callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    // finding document in address[0]
    filesystemCollection
        .findOne(
            { link: address[0] },
            (err, doc) => {
                if (err) {
                    console.error(err)
                    return callbackFunc(-2)
                }

                // document NOT found from address[0]
                if (!doc) {
                    if (address.length === 1)
                        return callbackFunc(0)
                    else return callbackFunc(-1)
                }

                // document found from address[0]
                // address.length === 1 means our search is over
                if (address.length === 1)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                // finding document from address[1]
                let found = false
                for (const it of doc.items) {
                    if (it.link === address[1]) {
                        found = true
                        doc = it
                        break
                    }
                }

                // document NOT found from address[1]
                if (!found) {
                    if (address.length === 2)
                        return callbackFunc(0)
                    else return callbackFunc(-1)
                }

                // document found from address[1]
                // address.length === 2 means our search is over
                if (address.length === 2)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                // finding document from address[2]
                found = false
                for (const it of doc.items) {
                    if (it.link === address[2]) {
                        found = true
                        break
                    }
                }

                // document NOT found from address[2]
                if (!found)
                    return callbackFunc(0)

                // document found from address[2]
                // address.length === 3 means our search is over
                return callbackFunc(1)
            }
        )
}
