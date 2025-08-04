// Music Route Handler

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Search tracks
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/search`, {
      params: {
        q: query,
        key: process.env.MUSIC_API_KEY
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).send("API error during search");
  }
});

// Stream track
router.get('/stream', async (req, res) => {
  const url = req.query.url;
  try {
    res.redirect(url); // stream or preview link from API
  } catch (err) {
    console.error("Stream Error:", err.message);
    res.status(500).send("Streaming error");
  }
});

module.exports = router;
      
