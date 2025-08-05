// Shammelody Downloader Backend - Using YouTube Data API
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const YOUTUBE_API_KEY = process.env.MUSIC_API_KEY; // Set this in your .env

// Music search endpoint
app.get('/music/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;
    const response = await axios.get(url);

    const results = response.data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url,
      stream_url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Download endpoint (just redirects to YouTube)
app.get('/music/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');
  res.redirect(url);
});

// Start server
app.listen(PORT, () => {
  console.log(`🎶 Shammelody API running on http://localhost:${PORT}`);
});
                                           
