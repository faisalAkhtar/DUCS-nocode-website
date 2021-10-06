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

exports.add = function (name, type, address, order, callbackFunc) {
    let item = {
        type,
        name,
        order
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

exports.changeFields = function (address, type, changes, callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    if (address.length === 1) {
        let newValues = {}
        if (changes.name) newValues.name = changes.name
        if (changes.link) newValues.link = changes.link
        if (changes.draft && type === 'page') newValues.draft = changes.draft
        filesystemCollection.updateOne(
            { link: address[0], type: type },
            { $set: newValues },
            (err, res) => callbackFunc(err, res)
        )
    } else {
        filesystemCollection.findOne(
            { link: address[0] },
            (err, doc) => {
                if (err)
                    return callbackFunc(err, null)

                if (address.length === 2) {
                    let it = 0
                    for (; it < doc.items.length; it++)
                        if (doc.items[it].link === address[1])
                            break

                    if (changes.name) doc.items[it].name = changes.name
                    if (changes.link) doc.items[it].link = changes.link
                    if (changes.draft && type === 'page') doc.items[it].draft = changes.draft

                    filesystemCollection.updateOne(
                        { link: address[0] },
                        { $set: { items: doc.items } },
                        (err, res) => callbackFunc(err, res)
                    )
                } else {
                    let i1 = 0, i2 = 0
                    let subdoc = null
                    for (; i1 < doc.items.length; i1++) {
                        if (doc.items[i1].link === address[1]) {
                            subdoc = doc.items[i1]
                            break
                        }
                    }
                    for (; i2 < subdoc.items.length; i2++)
                        if (subdoc.items[i2].link === address[2])
                            break

                    if (changes.name) subdoc.items[i2].name = changes.name
                    if (changes.link) subdoc.items[i2].link = changes.link
                    if (changes.draft && type === 'page') subdoc.items[i2].draft = changes.draft

                    doc.items[i1].items = subdoc.items
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

exports.changeOrder = function (newOrder, callbackFunc) {
    let sorterFunc = function (a, b) {
        let la = a.link.toLowerCase(),
            lb = b.link.toLowerCase()
        if (la < lb) return -1
        if (la > lb) return 1
        return 0
    }

    newOrder.sort(sorterFunc)

    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection.find().toArray(
        (err, docs) => {
            if (err) return callbackFunc(err)

            if (docs.length !== newOrder.length)
                return callbackFunc('Invalid structure provided')

            docs.sort(sorterFunc)
            for (let it = 0; it < docs.length; it++) {
                if (docs[it].link !== newOrder[it].link) {
                    return callbackFunc('Invalid structure provided')
                }
                docs[it].order = newOrder[it].order

                if (docs[it].type === 'menu' && docs[it].items) {
                    docs[it].items.sort(sorterFunc)
                    newOrder[it].items.sort(sorterFunc)
                    for (let jt = 0; jt < docs[it].items.length; jt++) {
                        if (docs[it].items[jt].link !== newOrder[it].items[jt].link) {
                            return callbackFunc('Invalid structure provided')
                        }
                        docs[it].items[jt].order = newOrder[it].items[jt].order

                        if (docs[it].items[jt].type === 'menu' && docs[it].items[jt].items) {
                            docs[it].items[jt].items.sort(sorterFunc)
                            newOrder[it].items[jt].items.sort(sorterFunc)
                            for (let kt = 0; kt < docs[it].items[jt].items.length; kt++) {
                                if (docs[it].items[jt].items[kt].link !== newOrder[it].items[jt].items[kt].link) {
                                    return callbackFunc('Invalid structure provided')
                                }
                                docs[it].items[jt].items[kt].order = newOrder[it].items[jt].items[kt].order
                            }
                        }

                    }

                    filesystemCollection.updateOne(
                        { link: docs[it].link },
                        { $set: { order: docs[it].order, items: docs[it].items } },
                        (err, res) => {
                            if (err) return callbackFunc(err)
                        }
                    )
                } else {
                    filesystemCollection.updateOne(
                        { link: docs[it].link },
                        { $set: { order: docs[it].order } },
                        (err, res) => {
                            if (err) return callbackFunc(err)
                        }
                    )
                }

            }

            return callbackFunc(null, docs)
        }
    )
}