//import express from 'express';
import express, { Request, Response } from 'express';

//import { check } from '../../utilities/reqCheck';
//import check_img_name from '../../utilities/imgValidator';
import {
  check_img_name,
  check_img_size,
  check_img_exist,
  create_img,
} from '../../utilities/imgValidator';

const img = express.Router();

//img.use(check_img_name);

img.get(
  '/:imgName/:height/:width',
  check_img_name,
  check_img_size,
  check_img_exist,
  create_img,
  async (req: Request, res: Response) => {
    res.send('Image Found').status(200);
  }
);
export default img;
