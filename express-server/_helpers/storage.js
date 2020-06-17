const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '_uploads')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop();
      const originalname = file.originalname.split('.')[0];
      let fname = `${originalname}_${Date.now()}_${uuidv4()}.${extension}`;
      req.filename = fname;
      cb(null, fname);
    }
  })
   
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

module.exports = multer({ storage: storage })