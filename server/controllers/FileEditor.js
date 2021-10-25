const fs = require('fs')
const path = require('path')

exports.GetFileContents = function (req, res, next) {
    let itempath = '/../pages',
        address = req.body.address

    address.forEach(link => { itempath += "/" + link })
    itempath += '.html'

    fs.readFile(
        path.join(__dirname + itempath),
        (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).send({ msg: 'Error fetching file\'s contents' })
            }

            return res.send(data)
        }
    )
}

exports.UpdateFileContents = function (req, res, next) {
    let itempath = '/../pages',
        address = req.body.address,
        data = req.body.data

    address.forEach(link => { itempath += "/" + link })
    itempath += '.html'

    fs.writeFile(
        path.join(__dirname + itempath),
        data,
        (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send({ msg: 'Error updating file\'s contents' })
            }

            return res.send('OKKKK')
        }
    )
}
