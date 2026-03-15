import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Pie de página GameStore">
      <div className={styles.footerContent}>
        <div className={styles.colLogo}>
          <span className={styles.logo} aria-label="Logo GameStore">GameStore</span>
          <span className={styles.tagline}>Tu tienda gamer, calidad y pasión</span>
        </div>
        <nav className={styles.colLinks} aria-label="Enlaces del footer">
          <a href="/" className={styles.link}>Inicio</a>
          <a href="/catalogo" className={styles.link}>Catálogo</a>
          <a href="/contacto" className={styles.link}>Contacto</a>
          <a href="/terminos" className={styles.link}>Términos</a>
          <a href="/politicas" className={styles.link}>Políticas</a>
        </nav>
        <div className={styles.colSocial}>
          <div className={styles.socialIcons} aria-label="Redes sociales">
            <a href="#" className={styles.social} aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className={styles.social} aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className={styles.social} aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className={styles.social} aria-label="YouTube"><FaYoutube /></a>
          </div>
          <span className={styles.email}>contacto@gamestore.es</span>
          <span className={styles.sigueme}>Síguenos</span>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 GameStore — Todos los derechos reservados. Hecho con pasión gamer.</span>
      </div>
    </footer>
  );
}
