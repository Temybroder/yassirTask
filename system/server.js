
const server = () => {
  
  const express = require('express');
  const app = express();

  // MASTER DATABASE CONNECTION
  const dbClient = require('../vars/db');
  const environmentToExport = require('../config/config')

// Error Manager
const apiErrorHandler = require('../api/v1/middlewares/errorManager/apiErrorHandler')

// Express body parser
app.use(express.urlencoded({ extended: true }));

 // Error Manager
app.use(apiErrorHandler);

// Routes
app.use('/', require('../api/v1/routes/Index.js'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Express Server on process, started on port ${PORT}`))

} 
module.exports = server;