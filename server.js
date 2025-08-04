// Sharmen Downloader - Main Server Script

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const musicRoutes = require('./routes/music');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/music', musicRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎧 Sharmen Downloader running on http://localhost:${PORT}`);
});

