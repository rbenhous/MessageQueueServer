import express from "express";
import logger from "../../common/logger/console-logger.js";


/**
 * Basic routes are not part of the requirements.
 * They are just helped me to configure the server.
 * Can be future used for health-checks or to be removed.
 */
const router = express.Router();

router.get('/', (req, res) => {
    logger.info("listening on port 3000");
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