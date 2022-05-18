const path = require('path')
const util = require('util')
const fs = require('fs');
const pool = require('../database');
const env = require('../config/env');
const sharp = require('sharp');

const randomString = require('../lib/helpers')
let dir = './Avatars/';

const avatar = async (req, res) => {

    try {
    
        const file = req.files.file
        const filename = file.name
        const size = file.size
        const ext = path.extname(filename)
        const id = req.body.id
        const allowedExt = /png|jpeg|jpg|gif/

        let imageName = id + '-' + randomString.generateRandomString(20)

        if (!fs.existsSync(dir + id)) {

            await fs.mkdir((dir + id), (err) => {
                if (err) {
                    throw err;
                }
            });

        }

        if (!allowedExt.test(ext)) throw 'Unsupported extension'
        if (size > 5000000) throw 'Image must be less than 5mb'

        pool.query('SELECT * FROM users WHERE id=?', [id], async (erro, result, fields) => {
            if (!(erro) && result) {
                console.log(result[0])
                if(result[0].image !== null){
                    // fs.unlink(dir+'/'+id+'/'+result[0].image)
                }
                const url = imageName + ext;
                await util.promisify(file.mv)(`${dir + id}/` + url)       
                result[0].image = url
                await pool.query('UPDATE users SET ? WHERE id=?', [result[0], id])

                let inputFile = `./Avatars/${id}/${url}`;
                console.log(inputFile)
                let outputFile = `./Avatars/${id}/${id + '-' + randomString.generateRandomString(20) + '.png'}`;

                sharp(inputFile).resize({ height: 500, width: 500 }).toFile(outputFile)
                .then(function(newFileInfo) {
                    console.log("Success");
                    fs.unlinkSync(`./Avatars/${id}/${url}`)

                })
                .catch(function(err) {
                    console.log("Error occured");
                    console.log(err)
                    fs.unlinkSync(`./Avatars/${id}/${url}`)

                });


            } else {
                throw erro
            }
        })

        res.json({
            message: 'File Uploaded'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err
        })
    }


}

module.exports = {
    avatar
}