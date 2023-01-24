const fs = require('fs');

function readData(path,filename) {
    let rawdata = fs.readFileSync(path+filename);
    let data = JSON.parse(rawdata)
    return data
}

function tambahData(path,filename,jsonData){
    let dataLama = readData(path,filename)
    if(typeof(jsonData)!='undefined'){
        dataLama.data_pendaftar.push(jsonData)
        // console.log(dataLama)
        fs.writeFileSync(path+filename, JSON.stringify(dataLama));
    }else{
        console.log("parameter data kosong")
    }
}

function removeData(path,filename,id_daftar){
    let dataHapus = search_data(path,filename,id_daftar)
    let dataLama = readData(path,filename)
    dataLama = dataLama.data_pendaftar
    delete dataLama[dataHapus[1]]
    let temp = {
        data_pendaftar:[]
    }
    dataLama.forEach(ele => {
        temp.data_pendaftar.push(ele)
    });
    fs.writeFileSync(path+filename, JSON.stringify(temp));
}

function updateData(path,filename,id_daftar,jsonData=null){
    let data = search_data(path,filename,id_daftar)
    let db = readData(path,filename)
    if(data!='data not found'){
        if(typeof(jsonData)!='undefined'){
            db.data_pendaftar[data[1]] = jsonData
            // console.log(db)
            fs.writeFileSync(path+filename, JSON.stringify(db));
        }
    }
}

function array_search(numb,param) {
    let idx = numb.find(
       function(data){
           return data.notelp == param
       })
     if(idx!==undefined){
       return [idx.idx,true,idx.state]
     }else{
       return [null,false]
     }
   }

function search_data(path,filename,id_daftar) {
    let found=false
    let i=0
    let data = readData(path,filename)
    while(i<data.data_pendaftar.length){
        if(data.data_pendaftar[i].id_daftar==id_daftar){
            found = true
            break
        }else{
            i++
        }
    }
    if(found){
        //0 data, 1 index
        return [data.data_pendaftar[i],i]
    }else{
        return 'data not found'
    }
}


function add_ele(path,filename,id_daftar,lampiran){
    let data = search_data(path,filename,id_daftar)
    if(data!='data not found'){
        data[0][lampiran.key]=lampiran.value
        return data[0]
    }
}

function help(){
    console.log(""+
    'list function \n'+
    '1. readData(path,filename) \n'+
    '2. tambahData(path,filename,jsonData) \n'+
    '3. updateData(path,filename,id_daftar,jsonData) \n'+
    '4. search_Data(path,filename,id_daftar) \n'+
    '5. add_ele(path,filename,id_daftar,lampiran)'+
    '6. checker(data)'+
    '7. removeData(path,filename,id_daftar)'
    )
}

function checker(data) {
    let state = true
    Object.keys(data).forEach(key => {
        if (data[key]===undefined||data[key]=="") {
            state = false
        }
    });
    if(!state){
        return state;
    }else{
        return state;
    }
}

module.exports = {
    array_search,
    help,
    readData, 
    tambahData,
    add_ele,
    search_data,
    updateData,
    removeData,
    checker
};

// function deleteData(numb,param){
// 	let temp = []
//     if(array_search(numb,param)[1]!=false){
//         delete numb[array_search(numb,param)[0]]
//         numb.forEach(ele => {
//             ele.idx = temp.length
//             temp.push(ele)
//         })
//     }
// 	return temp
// }


//bagian tester

// let data_json = readData('./assets/','datapendaftaran.json')

// update KTP
// updateData(
//     './assets/',
//     'datapendaftaran.json',
//     '62877880142120000000020221222',
//     add_ele('./assets/','datapendaftaran.json','62877880142120000000020221222',{'key':'KTP','value':hypLink('data_KTP.jpg','udin')})
// )

// console.log()

// let tambah_data = {
//     id: '62877880142126302062809990009',
//     nama: 'Bob',
//     nik: '6302062809990009',
//     alamat: 'Texas',
//     jenis_bayar: 'Umum',
//     poli_tujuan: 'Poli Gigi'
// }

// data_json.data_pendaftar.push(tambah_data)
// console.log(data_json)

// tambahData('./assets/','datapendaftaran.json',tambah_data)

// console.log(readData('./assets/','datapendaftaran.json'))