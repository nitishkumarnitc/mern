const fs = require('fs');
const log = require('./../logger');
const imageBasePath = __dirname + "/../uploads/fullsize/";

module.exports = {
    uploadImage: function (req, res) {
        const file = req.files.image;
        const name = req.files.image.name;
        file.mv(imageBasePath + name, (err) => {
            if (err) {
                log.error("There was an error uploading image , err ", err)
                return res.status(400).json({msg: "Some error "});
            }
            return res.status(200).json({imagePath: name});
        })
    },
    getImage: function (req, res) {
        const imageName = req.params.imageName;
        fs.readFile(imageBasePath + imageName, (err, data) => {
            if (err) {
                log.error("error : ", err);
                res.status(400);
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
        })

    }
}