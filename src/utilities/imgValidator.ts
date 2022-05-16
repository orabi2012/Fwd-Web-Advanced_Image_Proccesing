import express from 'express';
import path from 'path';
import fs from 'fs';

function check_img_name(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;

  const img = path.join(__dirname, '..', `/images/${imgName}.jpg`);

  console.log(imgName);

  if (!fs.existsSync(img)) {
    res.statusCode = 404;
    //return res.send(img)
    return res.send('Image Not Found');
  } else {
    next();
    //   await check_img_size(height, width);
  }
}

function check_img_size(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const imgName: string = req.params.imgName;
  const height: string = req.params.height;
  const width: string = req.params.width;

  if (isNaN(parseInt(height)) || isNaN(parseInt(width))) {
    //ok = 0;
    res.statusCode = 400;
    //return res.send('width and height must be a number');
    return res.send('width and height must be a number');
  } else {
    if (parseInt(height) <= 0 || parseInt(width) <= 0) {
      //ok = 0;
      res.statusCode = 400;
      return res.send('width and height must be greater than 0');
    } else {
      next();
    }
  }
}

//module.exports ={check_img_name}

//export default check_img_name;
export { check_img_name, check_img_size };
