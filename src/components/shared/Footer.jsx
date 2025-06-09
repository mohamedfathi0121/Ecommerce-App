import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
   

        <div className={styles.branding}>
          <h3>SHOP.CO</h3>
          <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
          <div className={styles.socials}>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
    
      <div className={styles.copyright}>
        <p>Shop.co © 2000-2025. All Rights Reserved.</p>
        {/* <div className={styles.paymentIcons}>
          <img src="/visa.svg" alt="Visa" />
          <img src="/paypal.svg" alt="PayPal" />
          <img src="/mastercard.svg" alt="MasterCard" />
          <img src="/applepay.svg" alt="Apple Pay" />
        </div> */}
      </div>
    </footer>
  );
}
