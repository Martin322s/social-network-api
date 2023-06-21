const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');
const { initDatabase } = require('../config/database');
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

initDatabase()
    .then(() => {
        console.log("Database connected successfully!");
        app.listen(port, () => 
            console.log(`Server is working at: http://localhost:${port}`)
        );
    })
    .catch((err) => {
        console.log("Database failed to connect!");
        console.log(err);
    });