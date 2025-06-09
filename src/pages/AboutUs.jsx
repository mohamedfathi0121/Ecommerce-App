import React from 'react';
import styles from './styles/AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>About Shop.co</h1>
        <p>We bring fashion that fits your personality and lifestyle.</p>
      </section>

      <section className={styles.content}>
        <div className={styles.text}>
          <h2>Our Mission</h2>
          <p>
            At Shop.co, our mission is to make high-quality fashion accessible to everyone. Whether
            you're shopping for the latest trends or timeless classics, we’ve got you covered.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>200+ International Brands</li>
            <li>2,000+ High-Quality Products</li>
            <li>30,000+ Happy Customers</li>
          </ul>

          <h2>Why Choose Us?</h2>
          <p>
            We blend style, comfort, and affordability to deliver fashion that empowers you. With a
            seamless shopping experience and excellent customer support, we ensure satisfaction at
            every step.
          </p>
        </div>
        <div className={styles.image}>
          <img src="/about-illustration.png" alt="About Shop.co" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
