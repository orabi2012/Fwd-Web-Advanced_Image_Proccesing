import express from 'express';
import morgan from 'morgan';

const routes = express.Router();
routes.use(morgan('dev'));

routes.get('/', (req, res) => {
  res.send('i am index route' + req.baseUrl);
});

export default routes;
