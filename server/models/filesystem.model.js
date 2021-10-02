var db = require('../utils/db')

exports.list = function (callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection
        .find()
        .sort({ order: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.fileExists = function (address, type, callbackFunc) {
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
                if (address.length === 1 && type === doc.type)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                // finding document from address[1]
                let found = false
                if (doc.items) {
                    for (const it of doc.items) {
                        if (it.link === address[1]) {
                            found = true
                            doc = it
                            break
                        }
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
                if (address.length === 2 && type === doc.type)
                    return callbackFunc(1)
                else if (doc.type !== "menu")
                    return callbackFunc(-1)

                // finding document from address[2]
                found = false
                if (doc.items) {
                    for (const it of doc.items) {
                        if (it.link === address[2]) {
                            found = true
                            break
                        }
                    }
                }

                // document NOT found from address[2]
                if (!found && type === 'page')
                    return callbackFunc(0)

                // document found from address[2]
                // address.length === 3 means our search is over
                return callbackFunc(1)
            }
        )
}

exports.add = function (name, type, address, callbackFunc) {
    let item = {
        type,
        name,
        order: 9,
    }
    if (type === "page")
        item.draft = false

    var filesystemCollection = db.get().collection('filesystem')
    if (address.length === 1) {
        item.link = address[0]
        filesystemCollection.insertOne(item, (err, res) => callbackFunc(err, res))
    } else {
        filesystemCollection.findOne(
            { link: address[0] },
            (err, doc) => {
                if (err)
                    return callbackFunc(err, null)

                if (address.length === 2) {
                    item.link = address[1]
                    if (doc.items)
                        doc.items.push(item)
                    else doc.items = [item]
                    filesystemCollection.updateOne(
                        { link: address[0] },
                        { $set: { items: doc.items } },
                        (err, res) => callbackFunc(err, res)
                    )
                } else {
                    let it = 0
                    let subdoc = null
                    for (; it < doc.items.length; it++) {
                        if (doc.items[it].link === address[1]) {
                            subdoc = doc.items[it]
                            break
                        }
                    }

                    item.link = address[2]
                    if (subdoc.items)
                        subdoc.items.push(item)
                    else subdoc.items = [item]
                    doc.items[it] = subdoc
                    filesystemCollection.updateOne(
                        { link: address[0] },
                        { $set: { items: doc.items } },
                        (err, res) => callbackFunc(err, res)
                    )
                }
            }
        )
    }
}

exports.remove = function (address, type, callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    if (address.length === 1) {
        filesystemCollection.deleteOne(
            { link: address[0], type: type },
            (err, res) => callbackFunc(err, res)
        )
    } else {
        filesystemCollection.findOne(
            { link: address[0] },
            (err, doc) => {
                if (err)
                    return callbackFunc(err, null)

                if (address.length === 2) {
                    let updatedItems = doc.items.filter(item => item.link !== address[1] || item.type !== type)
                    if (updatedItems.length === doc.items.length)
                        return callbackFunc("Wrong file type", null)
                    else doc.items = updatedItems
                    filesystemCollection.updateOne(
                        { link: address[0] },
                        { $set: { items: doc.items } },
                        (err, res) => callbackFunc(err, res)
                    )
                } else {
                    let it = 0
                    let subdoc = null
                    for (; it < doc.items.length; it++) {
                        if (doc.items[it].link === address[1]) {
                            subdoc = doc.items[it]
                            break
                        }
                    }

                    let updatedItems = subdoc.items.filter(item => item.link !== address[2] || item.type !== type)
                    if (updatedItems.length === subdoc.items.length)
                        return callbackFunc("Wrong file type", null)
                    else subdoc = updatedItems
                    doc.items[it].items = subdoc
                    filesystemCollection.updateOne(
                        { link: address[0] },
                        { $set: { items: doc.items } },
                        (err, res) => {
                            return callbackFunc(err, res)
                        }
                    )
                }
            }
        )
    }
}