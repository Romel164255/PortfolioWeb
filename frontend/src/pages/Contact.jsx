import binaryVideo from "../assets/binary.mp4";
import { GiRingedPlanet } from "react-icons/gi";

function Contact() {
  return (
    <div className="contact-page">
      {/* VIDEO */}

      <video autoPlay muted loop playsInline className="page-video-bg">
        <source src={binaryVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}

      <div className="page-overlay"></div>

      {/* CARD */}

      <div className="contact-card">
        <a
          href="#"
          className="space-link"
          onClick={(e) => e.preventDefault()}
          title="Coming Soon"
        >
          <GiRingedPlanet />
        </a>
      </div>
    </div>
  );
}

export default Contact;
