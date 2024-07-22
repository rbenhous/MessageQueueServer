export const init_basic_routes = (app) => {
    app.get('/', (req, res) => {
        console.log("listening on port 3000");
        res.send('listening on port 3000');
    });

    app.get('/health-check', (req, res) => {  
        res.send('Server is up and running');
    });

    app.post('/health-check', (req, res) => {
      const body = req.body;
      res.send('Server is up and running with body: ' + JSON.stringify(body));
    });
}