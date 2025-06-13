import { useState } from "react";
import styles from "./styles/Contacr.module.css";
import SectionTitle from "../components/HomepageComponent/SectionTitle";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.contactContainer}>
      <SectionTitle>Contact Us</SectionTitle>

      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <h3 className={styles.infoTitle}>Get in Touch</h3>
          <p className={styles.infoText}>
            Have questions or feedback? We'd love to hear from you! Reach out
            through the form or contact us directly using the information below.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <a
                href="https://www.google.com/maps/search/?api=1&query=123+Store+Street,Shopping+District,City,Country"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                123 Store Street, Shopping District, City, Country
              </a>
            </div>
            <div className={styles.detailItem}>
              <FaPhone className={styles.icon} />
              <a href="tel:+0100000000" className={styles.contactLink}>
                +010 000 0000
              </a>
            </div>
            <div className={styles.detailItem}>
              <FaEnvelope className={styles.icon} />
              <a
                href="mailto:mohamedfathinew2023@gmail.com"
                className={styles.contactLink}
              >
                mohamedfathinew2023@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com"
              className={styles.socialIcon}
              target="_blank"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              className={styles.socialIcon}
              target="_blank"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              className={styles.socialIcon}
              target="_blank"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              className={styles.socialIcon}
              target="_blank"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className={styles.contactForm}>
          {submitted ? (
            <div className={styles.successMessage}>
              <i className={`fas fa-check-circle ${styles.successIcon}`}></i>
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291661!2d-73.98784492423978!3d40.74844097138961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623251234567!5m2!1sen!2sus"
          className={styles.map}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
