require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const { google } = require('googleapis');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { query, pageToken } = req.query;
  const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY
  });

  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 10,
      pageToken: pageToken || ''
    });

    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search YouTube' });
  }
});

// MP3 download endpoint
app.get('/api/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('Missing video URL');

  res.setHeader('Content-Disposition', 'attachment; filename="shammelody.mp3"');
  res.setHeader('Content-Type', 'audio/mpeg');

  const cmd = `yt-dlp -x --audio-format mp3 -o - "${videoUrl}"`;

  const process = exec(cmd, { maxBuffer: 1024 * 1024 * 50 });

  process.stdout.pipe(res);
  process.stderr.on('data', (data) => console.error(data));
  process.on('error', (err) => {
    console.error('Download error:', err);
    res.status(500).send('Error downloading audio');
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Shammelody server running at http://localhost:${port}`);
});
        
