const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const axios = require("axios");
const app = express();
const path = require("path");

const API_KEY = "AIzaSyDu-3cMyAodP6UZxdqPbWLUYYZlQHXaUeo";

app.use(cors());
app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(q)}&key=${API_KEY}`;
  const response = await axios.get(url);

  const results = response.data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));

  res.json(results);
});

app.get("/api/stream", (req, res) => {
  const { videoId } = req.query;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  res.setHeader("Content-Disposition", 'inline; filename="stream.mp3"');
  ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
  }).pipe(res);
});

app.get("/api/download", (req, res) => {
  const { videoId } = req.query;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  res.setHeader("Content-Disposition", 'attachment; filename="download.mp3"');
  ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
  }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
