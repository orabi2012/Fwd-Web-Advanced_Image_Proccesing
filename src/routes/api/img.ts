import express from 'express';
import check from '../../utilities/reqCheck';

const img = express.Router();

img.get('/:imgName/:height/:width', async (req, res) => {
  check(req, res);
});
export default img;
