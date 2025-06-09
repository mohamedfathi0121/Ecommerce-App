import bannerImg from "../../assets/banner.jpg";
// تأكدي إن المسار صحيح حسب مكان الملف

export  function Banner() {
   return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1efef",
        padding: "40px 60px",
        position: "relative",
        flexWrap: "wrap",
        minHeight: "400px", // ارتفاع البانر
        gap: "20vw",
        textAlign: "center", // توسيط الكلام
        margin:"10px",
        boxShadow:"0px 10px 10px #dcdada"
      }}
    >
      {/* Left Text Section */}
      <div style={{ maxWidth: "500px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "bold", lineHeight: "1.3" }}>
          FIND CLOTHES <br />
          THAT MATCHES <br />
          YOUR STYLE
        </h1>
        <p style={{ marginTop: "16px", color: "#555", fontSize: "15px" }}>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button
          style={{
            marginTop: "20px",
            backgroundColor: "black",
            color: "white",
            padding: "10px 28px",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Shop Now
        </button>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ fontSize: "18px" }}>200+</strong>
            <div style={{ color: "#555", fontSize: "13px" }}>International Brands</div>
          </div>
          <div>
            <strong style={{ fontSize: "18px" }}>2,000+</strong>
            <div style={{ color: "#555", fontSize: "13px" }}>High-Quality Products</div>
          </div>
          <div>
            <strong style={{ fontSize: "18px" }}>30,000+</strong>
            <div style={{ color: "#555", fontSize: "13px" }}>Happy Customers</div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div style={{ position: "relative", height: "100%" }}>
        <img
          src={bannerImg}
          alt="Banner"
          style={{
            height: "400px", // نفس ارتفاع البانر
            width: "auto",
            objectFit: "cover",
          }}
        />

        {/* Decorative Stars */}
        <span style={starStyle(10, -20)}>✦</span>
        <span style={starStyle(160, -50)}>✦</span>
        <span style={starStyle(60, 400)}>✦</span>
      </div>
    </div>
  );
}

// Helper function for decorative stars
function starStyle(top, left) {
  return {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    fontSize: "50px", // حجم النجوم أكبر
    color: "black",
  };
}