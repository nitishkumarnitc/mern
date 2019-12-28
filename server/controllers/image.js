const ImageService = require('./../service/image');

module.exports = {
    uploadImage: function (req, res) {
        ImageService.uploadImage(req.files.image).then(response => {
            return res.status(200).json({imagePath: response.imagePath});
        }).catch(error => {
            console.log("error ",error)
            return res.status(400).json({msg: "Some error "});
        })
    },
    getImage: function (req, res) {
        ImageService.getImage(req.params.imageName).then(data => {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
        }).catch((error) => {
            res.status(400);
        })
    }
}