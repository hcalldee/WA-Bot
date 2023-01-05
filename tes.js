// // function changeState(master,keyfind=null,data=null) {
// //     if(keyfind!=null&&data!=null){
// //         master.forEach(function callback(value,index){
// //             if(value[0]==keyfind){
// //                 master[index][1] = data
// //             }
// //             // console.log(value+' '+index);
// //         });
// //     }
// //     return master
// // }

// // function getState(master,keyfind=null) {
// //     let data;
// //     if(keyfind!=null){
// //         master.forEach(ele=>{
// //             if(ele[0]==keyfind){
// //                 data = ele[1]
// //             }
// //         });
// //         return data
// //     }
// // }

// // const state = [['001',1],['002',2]];
// // // console.log(state['001'])
// // // console.log(changeState(state,'001',2));
// // console.log(getState(state,'001'));

// // let mimetype ="666@12.1"
// // console.log(mimetype.split("@")[0])

// // const fs = require('fs');


// // function getFile(path) {
// //     return fs.readFileSync(path) 
// // }

// let str = '    udin selamat hariyadi';

// function removeSpasi(string) {
//     let inf = []
//     string.split('').forEach(ele => {
//         inf.push(ele)
//     });
//     let i=0
//     while(i<inf.length){
//         if(inf[i]!=' '){
//             break
//         }
//         i++;
//     }
//     console.log(i)
//     let removd_idx=[]
//     for (let index = 0; index < i; index++) {
//         removd_idx.push(index)
//     }

//     removd_idx.forEach(ele => {
//         inf.splice(0,1);
//     });
//     return inf.join("")
// }
// // console.log(removeSpasi(str))


// // console.log(getFile(__dirname));
// let nama = "toped"
// let filename = nama+"_6287788014212_KartuAsuransi.jpg"
// // console.log(__dirname+"\\upload\\");
// let simpan_file = "=HYPERLINK(\""+__dirname+"\\upload\\"+filename+"\";\"Tn/Ny."+nama+"\")"
// console.log(simpan_file)
// // console.log(nama.replace(/\s/g, ''));




// // file system module to perform file operations
// const fs = require('fs');

// // json data
// var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';

// // parse json
// var jsonObj = JSON.parse(jsonData);
// console.log(jsonObj);

// // stringify JSON Object
// var jsonContent = JSON.stringify(jsonObj);
// console.log(jsonContent);

// fs.writeFile("./assets/datapendaftaran.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }

//     console.log("JSON file has been saved.");
// });

// const xcl = require('xlsx');
// const fil = require('./filing.js');
// const datadir = './assets/';
// const jsonfilename = 'datapendaftaran.json';
// fil.removeData(datadir,jsonfilename,"6287788014212630206280999000520221227")
// console.log(fil.readData(datadir,jsonfilename))
// const wb = xcl.readFile('./DataPendaftaran/data_pendaftar.xlsx')
// const ws = wb.Sheets["Sheets1"]
// var data = xcl.utils.sheet_to_json(ws)
// let db = fil.readData('./assets/','datapendaftaran.json')
// // console.log(db.data_pendaftar)

// const wrs = xcl.utils.json_to_sheet(db.data_pendaftar)
  
// xcl.utils.book_append_sheet(wb,wrs,"Sheet1")
  
// // Writing to our file
// xcl.writeFile(wb,'./DataPendaftaran/data_pendaftar.xlsx')

// const fil = require('./filing');
// let data_json = fil.readData('./assets/','datapendaftaran.json')
// console.log(data_json.data_pendaftar)
// console.log(fil)


// code manipulasi excel

// const ExcelJS = require('exceljs');

// const wb = new ExcelJS.Workbook();



// async function coba() {
//     wb.xlsx.readFile(fileName).then(data => {
//        let tem_data = []
//        let temp_data2 = {}
//        let rw
//        const ws = wb.getWorksheet('Sheet1');
//        const rows = ws.getColumn(1);
//        const rowsCount = rows['_worksheet']['_rows'].length;
    
//        const r1 = ws.getRow(1);
//        let header = []
//        r1.eachCell(c=>{
//            header.push(c.value)
//        })
    
//        for (let index = 2; index <= rowsCount; index++) {
//            rw = ws.getRow(index);
//            rw.eachCell(c=>{
//                tem_data.push(c.value)
//            })
//            for (let index = 0; index < header.length; index++) {
//                temp_data2[header[index]]=tem_data[index]
//            }
//            data_json.push(temp_data2)
//            tem_data = []
//            temp_data2 = []
//        }
//        return data_json
    
//     }).catch(err => {
//        console.log(err.message);
//     });
// }

// console.log(ambilexcel)

// var promise = Promise.resolve(17468);
 
// promise.then(function(val) {
//     return val
// });

// console.log(a)
const numb = [
    {
        "idx":0,
        "inf":"halo"
    }
]

function search(numb,param) {
    return numb.find(
       function(data){
           return data.inf == param
       }).idx
     if(idx!==undefined){
       return idx
     }else{
       return false
     }
   }
console.log(search(numb,"halo"))

    