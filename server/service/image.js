const fs = require('fs');
const log = require('./../logger');
const imageBasePath = __dirname + "/../uploads/fullsize/";

module.exports = {
    uploadImage: function (image) {
        return new Promise((resolve, reject) => {
            const file = image;
            const name = image.name;
            file.mv(imageBasePath + name, (err) => {
                if (err) {
                    log.error("There was an error uploading image , err ", err)
                    reject(err)
                }
                resolve({imagePath: name});
            })
        })

    },
    getImage: function (imageName) {
        return new Promise(((resolve, reject) => {
            fs.readFile(imageBasePath + imageName, (err, data) => {
                if (err) {
                    log.error("error : ", err);
                    reject(err)
                }
                resolve(data)
            })
        }))
    }
}