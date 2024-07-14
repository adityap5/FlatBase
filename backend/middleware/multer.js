// // middleware/multer.js
const multer = require('multer');
const {v4:uuidv4} = require('uuid')

const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const random = uuidv4()
        cb(null, random +''+file.originalname)
    }
});


// file validation
// const fileFilter = (req,file,cb)=>{
//     if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
//         cb(null,true)
//     }else{
//         cb({message:'Unsupported file Format'},false)
//     }
// }

const upload = multer({ 
    storage : storage,
    limits :{fileSize:1024*1024},
    // fileFilter : fileFilter
 });

module.exports = upload;
