import express from 'express';


const img = express.Router();


img.get('/', (req, res) => {
    res.send('i am img' + req.baseUrl);
    
    
});

export default img;
