import express from 'express';

//import { check } from '../../utilities/reqCheck';
//import check_img_name from '../../utilities/imgValidator';
import { check_img_name, check_img_size } from '../../utilities/imgValidator';

const img = express.Router();

//img.use(check_img_name);

img.get(
  '/:imgName/:height/:width',
  check_img_name,
  check_img_size,
  async (req, res) => {
    res.send('Image Found').status(200);
  }
);
export default img;
