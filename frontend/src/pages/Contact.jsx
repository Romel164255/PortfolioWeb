import blackholeVideo from "../assets/blackhole.mp4";
import contactImg from "../assets/contact.png";

function Contact(){

return(

<div className="contact-page">

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

<div className="page-overlay"></div>

<div className="contact-card">

<h2>Contact</h2>

<img
src={contactImg}
alt="Contact info"
onClick={()=>
window.open(
contactImg,
"_blank"
)
}
/>

<p className="hint">
Hint: Try opening this image somewhere unusual.
</p>

</div>

</div>

)

}

export default Contact;