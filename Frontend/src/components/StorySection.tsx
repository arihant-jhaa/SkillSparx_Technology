import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import Modal from "./Modal";

const videoPoster = "/images/story-studio.jpg";
const videoSource = "https://videos.pexels.com/video-files/5475285/5475285-hd_1920_1080_30fps.mp4";

export default function StorySection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="story-section" aria-labelledby="story-heading">
      <div className="page-container">
        <div className="chapter-topline"><span className="eyebrow eyebrow-purple">04 / THE PROCESS</span><span className="chapter-rule" /></div>
        <div className="section-intro story-intro">
          <h2 id="story-heading" data-reveal>You don't just watch.<br />You make<span className="purple-period">.</span></h2>
          <p data-reveal>Real creative growth happens in the doing, the trying, and the trying again. Take a look inside the process.</p>
        </div>
      </div>
      <div className="story-media-wrap page-container">
        <button type="button" className="story-media" onClick={() => setVideoOpen(true)} aria-label="Play a short film about creative collaboration" data-reveal="media">
          <img src={videoPoster} alt="Three designers discussing printed work around a studio table" loading="lazy" />
          <span className="story-media-shade" aria-hidden="true" />
          <span className="story-play"><Play size={24} fill="currentColor" strokeWidth={1.4} aria-hidden="true" /></span>
          <span className="story-caption"><span>INSIDE THE CREATIVE PROCESS</span><span>PLAY THE FILM <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" /></span></span>
        </button>
        <div className="story-underline"><span>THE WORK BEHIND THE WORK</span><span>00:19 / A SHORT FILM</span></div>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} labelledBy="film-dialog-title" className="video-dialog">
        <div className="video-dialog-content">
          <h2 id="film-dialog-title">Inside the creative process</h2>
          {videoOpen && <video controls autoPlay playsInline preload="none" poster={videoPoster}><source src={videoSource} type="video/mp4" />Your browser does not support this video.</video>}
          <p>Film by Pavel Danilyuk, via Pexels.</p>
        </div>
      </Modal>
    </section>
  );
}