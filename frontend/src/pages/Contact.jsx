import blackholeVideo from "../assets/blackhole.mp4";
import { GiRingedPlanet } from "react-icons/gi";

function Contact() {

return (

<div className="contact-page">

{/* VIDEO */}

<video
autoPlay
muted
loop
playsInline
className="page-video-bg"
>

<source
src={blackholeVideo}
type="video/mp4"
/>

</video>


{/* OVERLAY */}

<div className="page-overlay"></div>


{/* CARD */}

<div className="contact-card">

<h2>

Contact

</h2>


<a

href="#"

className="space-link"

onClick={(e)=>e.preventDefault()}

title="Coming Soon"

>

<GiRingedPlanet/>

</a>

</div>

</div>

)

}

export default Contact;