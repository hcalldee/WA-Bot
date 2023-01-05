const compress_images = require("compress-images")
const movement = require('fs-extra');
const fs = require("fs")

function compress(imagename,output=null) {
    let imgpath = "./upload/"+imagename;
    if(output==null){
        output = "./upload/compress/";
    }
    let info = false
    compress_images(imgpath, output, { compress_force: true, statistic: false, autoupdate: true}, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            if (completed && !error) {
                try {
                    fs.unlinkSync(imgpath)
                    movement.move(output+imagename, imgpath, (err) => {
                        if (err){
                            return console.log(err);
                        } else {
                            console.log("Successfully Moved")
                        }
                      });
                } catch(err) {
                    throw err
                }
            } else {
                console.log(error)
            }
        }
    );
    return info
}



module.exports = {
    compress
}