const express = require('express');
const app = express();
const path = require('path');

// Cloud Run specifies the PORT environment variable, defaulting to 8080
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
