const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/download", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  const command = `yt-dlp -f bestaudio[ext=m4a]/bestaudio/best --extract-audio --audio-format mp3 -o "%(title)s.%(ext)s" ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Download error: ${error.message}`);
      return res.status(500).json({ error: "Download failed" });
    }
    console.log(`Downloaded: ${stdout}`);
    res.json({ message: "Download complete", log: stdout });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
