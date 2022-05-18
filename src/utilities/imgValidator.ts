//import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import img_processing from './utilities';

function check_img_name(req: Request, res: Response, next: NextFunction): void {
  const imgName: string = req.params.imgName;

  const img: string = path.join(__dirname, '../..', `/images/${imgName}.jpg`);

  // console.log(imgName);

  if (!fs.existsSync(img)) {
    res.statusCode = 404;
    console.log('Image Not Found');
    res.send('Image Not Found');
  } else {
    // console.log('Image Found !!!!')
    next();
    //   await check_img_size(height, width);
  }
}

function check_img_size(req: Request, res: Response, next: NextFunction): void {
  //const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  if (isNaN(parseInt(height)) || isNaN(parseInt(width))) {
    //ok = 0;
    res.statusCode = 400;
    //return res.send('width and height must be a number');
    console.log('width and height must be a number');
    res.send('width and height must be a number');
  } else {
    if (parseInt(height) <= 0 || parseInt(width) <= 0) {
      //ok = 0;
      res.statusCode = 400;
      console.log('width and height must be greater than 0');
      res.send('width and height must be greater than 0');
    } else {
      next();
    }
  }
}

async function check_img_exist(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  const newimg: string = path.join(
    __dirname,
    '../..',
    `/images/thumb/${imgName}_${width}_${height}.jpg`
  );

  if (fs.existsSync(newimg)) {
    res.statusCode = 200;
    res.sendFile(newimg);
  } else {
    next();
  }
}

async function create_img(req: Request, res: Response): Promise<void> {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  const create_: boolean = await img_processing(imgName, height, width);

  if (create_) {
    res.statusCode = 200;
    res.sendFile(
      path.join(
        __dirname,
        '../..',
        `/images/thumb/${imgName}_${width}_${height}.jpg`
      )
    );
  } else {
    res.statusCode = 501;

    console.log('internal server error');
    res.send('internal server error');
  }
}

export { check_img_name, check_img_size, check_img_exist, create_img };
