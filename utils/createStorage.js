import multer from "multer";
import fs from 'fs';

export default  (p) => {

    try{const path ="files/" + p;

        if(!fs.existsSync('files')){
            fs.mkdirSync('files')
        }
        return  multer.diskStorage({
            destination: (_,__,cb) => {
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
                cb(null, path);
            },
            filename: (_,file, cb) => {
                    const name = file.originalname.replace(/^.*\./, ".");
                    cb(null,`${Date.now()+name}` );
            },
        });}
    catch
    (err)
    {
        console.log("Storage Error: ",err)
    }
}
//`${Date.now() + '.' +file.originalname.split('.').pop()}`
