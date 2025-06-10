import React from "react";
import bannerImg from "../../assets/banner.jpg";
import style from "./banner.module.css";

export function Banner() {
  return (
    <div className={style.bannerContainer}>
      {/* Left Text Section */}
      <div className={style.textSection}>
        <h1 className={style.bannerTitle}>
          FIND CLOTHES <br />
          THAT MATCHES <br />
          YOUR STYLE
        </h1>
        <p className={style.bannerDescription}>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button className={style.shopNowBtn}>Shop Now</button>

        {/* Stats */}
        <div className={style.stats}>
          <div>
            <strong className={style.statTitle}>200+</strong>
            <div className={style.statText}>International Brands</div>
          </div>
          <div>
            <strong className={style.statTitle}>2,000+</strong>
            <div className={style.statText}>High-Quality Products</div>
          </div>
          <div>
            <strong className={style.statTitle}>30,000+</strong>
            <div className={style.statText}>Happy Customers</div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className={style.bannerImageWrapper}>
        <img
          src={bannerImg}
          alt="Banner"
          className={style.bannerImage}
        />

        {/* Decorative Stars */}
        <span className={style.star} style={{ top: "10px", left: "-20px" }}>✦</span>
        <span className={style.star} style={{ top: "160px", left: "-50px" }}>✦</span>
        <span className={style.star} style={{ top: "60px", left: "400px" }}>✦</span>
      </div>
    </div>
  );
}
