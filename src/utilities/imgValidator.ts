import express from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

function check_img_name(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;

  const img = path.join(__dirname, '..', `/images/${imgName}.jpg`);

  // console.log(imgName);

  if (!fs.existsSync(img)) {
    res.statusCode = 404;
    console.log('Image Not Found')
    return res.send('Image Not Found');
  } else {
   // console.log('Image Found !!!!')
    next();
    //   await check_img_size(height, width);
  }
}

function check_img_size(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  //const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  if (isNaN(parseInt(height)) || isNaN(parseInt(width))) {
    //ok = 0;
    res.statusCode = 400;
    //return res.send('width and height must be a number');
    console.log('width and height must be a number');
    return res.send('width and height must be a number');
  } else {
    if (parseInt(height) <= 0 || parseInt(width) <= 0) {
      //ok = 0;
      res.statusCode = 400;
      console.log('width and height must be greater than 0');
      return res.send('width and height must be greater than 0');
    } else {
      next();
    }
  }
}

async function check_img_exist(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  const h = parseInt(height);
  const w = parseInt(width);

  const newimg = path.join(
    __dirname,
    '..',
    `/images/thumb/${imgName}_${w}_${h}.jpg`
  );

  if (fs.existsSync(newimg)) {
    res.statusCode = 200;
    return res.sendFile(newimg);
  } else {
    next();
  }
}

async function create_img(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  const h = parseInt(height);
  const w = parseInt(width);
  await sharp(path.join(__dirname, '..', `/images/${imgName}.jpg`))
    .resize(w, h)
    .toFile(
      path.join(__dirname, '..', `/images/thumb/${imgName}_${w}_${h}.jpg`)
    );

  res.statusCode = 200;
  return res.sendFile(
    path.join(__dirname, '..', `/images/thumb/${imgName}_${w}_${h}.jpg`)
  );
  next();
}

export { check_img_name, check_img_size, check_img_exist, create_img };
