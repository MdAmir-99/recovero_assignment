const multer = require('multer');

const Storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploadImages');
    },
    filename : function(req, file, cb) {
        cb(null, Date.now()+"-"+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb(null, false)
        return cb(new Error ('image should be jpeg, jpg or png'))
    }
}

const upload = multer({
    storage : Storage,
    limits : {
        fileSize : 1024 * 1024 * 5  // 5 mb MaxSize
    },
    fileFilter : fileFilter 
}).single('profileImage');



module.exports = upload;