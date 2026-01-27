import contactImg from "../assets/contact.png";

function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#e0e0e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          textAlign: "center",
          background: "#1c1c1c",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#9bbcff" }}>
          Contact
        </h2>

        

        <img
          src={contactImg}
          alt="Nothing important here."
          style={{
            width: "100%",
            borderRadius: "12px",
            opacity: 0.9,
            cursor: "pointer",
          }}
        />

        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#777",
          }}
        >
          Hint: Try opening this image somewhere unusual.
        </p>
      </div>
    </div>
  );
}

export default Contact;
