const express = require('express');
const userRoutes = require('./src/betmovie/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello BET!"); 
})

app.use("/api/v1/movies", userRoutes);

app.listen(port, () => console.log(`App is running on port ${port}`)); 