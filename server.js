// Import necessary modules and controllers
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/betmovie/routes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello BET!"); 
});

app.use('/api/v1/movies', userRoutes);

// Define route for signup
// app.post('/api/v1/signup', (req, res) => {
//     // Implement signup logic here
//     // Example:
//     res.json({ message: 'Signup successful' });
// });

// app.post('/api/v1/login', (req, res) => {
  
// });

// Start server
app.listen(port, () => console.log(`App is running on port ${port}`));
