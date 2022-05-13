import express from 'express';


const img = express.Router();


img.get('/', (req, res) => {
    res.send('i am IMAGE' + 'MY ROUTE IS ' +  req.baseUrl);
    
    
});

export default img;
