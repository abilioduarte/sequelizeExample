const express = require("express");
const routes = require('./routes');
require('./database/server');

const app = express();
app.use(express.json());
app.use(routes);
const port = 3000

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})