import React from 'react';
import styles from './styles/AboutUs.module.css'; // Assuming you have a CSS module for styling

const AboutUs = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Shop.co</h1>
          <p className={styles.heroSubtitle}>We bring fashion that fits your personality and lifestyle.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.content}>
        <div className={styles.textSection}>
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.sectionText}>
              At Shop.co, our mission is to make high-quality fashion accessible to everyone. Whether
              you're shopping for the latest trends or timeless classics, we've got you covered.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>What We Offer</h2>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>200+ International Brands</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>2,000+ High-Quality Products</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>30,000+ Happy Customers</span>
              </li>
            </ul>
          </div>

          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
            <p className={styles.sectionText}>
              We blend style, comfort, and affordability to deliver fashion that empowers you. With a
              seamless shopping experience and excellent customer support, we ensure satisfaction at
              every step.
            </p>
          </div>
        </div>

        <div className={styles.imageSection}>
          <img 
            src="https://design4users.com/wp-content/uploads/2021/01/designer_portfolio_website_tubik.jpg" 
            alt="About Shop.co" 
            className={styles.aboutImage}
          />
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}></div>
            <h3 className={styles.memberName}>Mohamed Fathi</h3>
            <p className={styles.memberRole}>CEO & Founder</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}></div>
            <h3 className={styles.memberName}>Romanda Ibrahim</h3>
            <p className={styles.memberRole}>Head of Design</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}></div>
            <h3 className={styles.memberName}>Rawda Ahmed</h3>
            <p className={styles.memberRole}>Head of Design</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}></div>
            <h3 className={styles.memberName}>Mohamed Sheref</h3>
            <p className={styles.memberRole}>Head of Design</p>
          </div>
          <div className={styles.teamMember}>
         
          
            <div className={styles.memberImage}></div>
            <h3 className={styles.memberName}>Omar Batran</h3>
            <p className={styles.memberRole}>Marketing Director</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;