import express from 'express';
import sharp from 'sharp';
import {promises as fs} from 'fs';


const img = express.Router();



img.get('/:imgname/:h/:w', async (req, res )  => {

//let th:string = req.params.imgname + "_"+ req.params.h + "_" + req.params.w

   //const x:strbuing = fs.readFile(`images/th`)
const imgname :string =  req.params.imgname
const h :number =  parseInt(req.params.h) 
const w :number =  parseInt(req.params.w) 




 await  sharp(__dirname +`/images/${imgname}.jpg`).resize(w,h).toFile(__dirname +`/images/thumb/${imgname}_${w}_${h}.jpg`)

 await res.sendFile(__dirname +`/images/thumb/${imgname}_${w}_${h}.jpg`)


     
});



export default img;
