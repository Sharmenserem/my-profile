const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "AIzaSyDu-3cMyAodP6UZxdqPbWLUYYZlQHXaUeo";

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// YouTube search route
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query + " music"
    )}&type=video&videoCategoryId=10&maxResults=5&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.items || []);
  } catch (err) {
    res.status(500).json({ error: "YouTube fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Shammelody server running at http://localhost:${PORT}`);
});
