import express from 'express';

import { check } from '../../utilities/reqCheck';

const img = express.Router();

img.get('/:imgName/:height/:width', check, async (req, res) => {
  //check(req, res , next);
});
export default img;
