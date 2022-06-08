 var async= require("async");
   var fs=require("fs");
var  path=require("path");
exports.getfiles=(req,res,next)=>{
   
const directoryPath="/storage/emulated/0/Download";
    var musicArray=[];
function fromDir(startPath, filter){
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    var files =  fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        
        try{
             var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); 
        }
         else if (filename.endsWith(filter)) {
            let fileObj=path.parse(filename);
            musicArray.push(fileObj);
    // console.log(musicArray)
        }
        }
        catch(err){
            console.log("err",err);
        }
   
};
return musicArray;
}
       
    var local= fromDir(directoryPath,".mp3");
    res.render("music",{
        local:local
            },()=>{
               console.log("Rendered");
            });    

}  






