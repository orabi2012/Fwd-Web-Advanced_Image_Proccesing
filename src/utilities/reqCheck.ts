import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function check(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  check_img_name(res, imgName, height, width);
}

function check_img_name(
  res: express.Response,
  imgName: string,
  height: string,
  width: string
) {
  const img = path.join(__dirname, '..', `/images/${imgName}.jpg`);

  if (!fs.existsSync(img)) {
    res.statusCode = 404;
    //return res.send(img)
    //res.sendFile(path.join(__dirname, '..', `/utilities/404.png`));
    return res.send('Image Not Found');
  } else {
    check_img_size(res, imgName, height, width);
    return 'Found';
  }
}

async function check_img_size(
  res: express.Response,
  imgName: string,
  height: string,
  width: string
) {
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
      await check_img_exist(res, imgName, height, width);
    }
  }
}

async function check_img_exist(
  res: express.Response,
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

    res.statusCode = 201;
    return res.sendFile(newimg);
  } else {
    res.statusCode = 200;
    return res.sendFile(newimg);
  }
}

export { check, check_img_exist, check_img_size, check_img_name };
