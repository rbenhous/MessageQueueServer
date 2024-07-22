import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    console.log("listening on port 3000");
    res.send('listening on port 3000');
});

router.get('/health-check', (req, res) => {  
    res.send('Server is up and running');
});

router.post('/health-check', (req, res) => {
  const body = req.body;
  res.send('Server is up and running with body: ' + JSON.stringify(body));
});

export default router;