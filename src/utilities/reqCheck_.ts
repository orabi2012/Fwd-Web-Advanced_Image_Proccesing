import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// async function check(
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   let img_height: number | string;
//   let img_width: number | string;

//   //await check_img_name(imgName , res,next)
// }

async function check(
  req: express.Request,
  res: express.Response
  //next: express.NextFunction
) {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  await check_img_name(imgName);

  async function check_img_name(imgName: string) {
    //const imgName: string = req.params.imgname;

    const img = path.join(__dirname, '..', `/images/${imgName}.jpg`);

    if (!fs.existsSync(img)) {
      res.statusCode = 404;
      //return res.send(img)
      return res.sendFile(path.join(__dirname, '..', `/utilities/404.png`));
    } else {
      await check_img_size(height, width);
    }
  }

  async function check_img_size(height: string, width: string) {
    //check width and height is Not Number
    if (isNaN(parseInt(height)) || isNaN(parseInt(width))) {
      //ok = 0;
      res.statusCode = 400;
      return res.send('width and height must be a number');
    } else {
      if (parseInt(height) <= 0 || parseInt(width) <= 0) {
        //ok = 0;
        res.statusCode = 400;
        return res.send('width and height must be greater than 0');
      } else {
        await check_img_exist(imgName, height, width);
      }
    }
  }

  async function check_img_exist(
    imgName: string,
    height: string,
    width: string
  ) {
    const h = parseInt(height);
    const w = parseInt(width);

    const newimg = path.join(
      __dirname,
      '..',
      `/images/thumb/${imgName}_${w}_${h}.jpg`
    );

    //

    if (!fs.existsSync(newimg)) {
      await sharp(path.join(__dirname, '..', `/images/${imgName}.jpg`))
        .resize(w, h)
        .toFile(
          path.join(__dirname, '..', `/images/thumb/${imgName}_${w}_${h}.jpg`)
        );

      res.statusCode = 200;
      return res.sendFile(newimg);
    } else {
      res.statusCode = 200;
      return res.sendFile(newimg);
    }
  }
}

//check if requested image is exist

//check(req.params.imgName,res,next)

export default check;
