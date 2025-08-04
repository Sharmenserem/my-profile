import React from 'react';
import AudioPlayer from './AudioPlayer';

const tracks = [
  { title: 'Track One', src: '/audio/track1.mp3' },
  { title: 'Track Two', src: '/audio/track2.mp3' },
];

const MusicGrid = () => (
  <section className="music-grid">
    {tracks.map((track, idx) => (
      <div key={idx} className="track-card">
        <h3>{track.title}</h3>
        <AudioPlayer src={track.src} />
        <button onClick={() => window.location.href = track.src}>⬇️ Download</button>
      </div>
    ))}
  </section>
);

export default MusicGrid;
