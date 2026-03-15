import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import type { JuegoDB } from "../Req_9/Req9";
import styles from "./Carrito.module.css";

function Carrito() {
  const [carrito, setCarrito] = useState<JuegoDB[]>([]);
  const [juegoAEliminar, setJuegoAEliminar] = useState<JuegoDB | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Cargar carrito desde localstorage
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  // Eliminar del carrito y actualizar localstore
  function eliminarJuego(juego: JuegoDB) {
    const actualizado = carrito.filter(j => j.id !== juego.id);
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
    setShowConfirm(false);
    setJuegoAEliminar(null);
  }

  const handleShowConfirm = (juego: JuegoDB) => {
    setJuegoAEliminar(juego);
    setShowConfirm(true);
  };

  // Cálculos de totales
  const subtotal = carrito.reduce((acc, juego) => acc + juego.precio, 0);
  const totalDescuento = carrito.reduce((acc, juego) => acc + (juego.descuento || 0), 0);
  const total = subtotal - totalDescuento;

  if (carrito.length === 0) {
    return (
      <div className={styles.container}>
        <div className="container">
          <h2 className={styles.title}>Carrito de Compras</h2>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="bi bi-cart-x"></i>
            </div>
            <h3>Tu carrito está vacío</h3>
            <p className="mb-4">¿Buscas algo nuevo? Explora nuestro catálogo y encuentra las mejores ofertas.</p>
            <Link to="/juegos/lista" className={styles.btnCheckout} style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
              Ver Catálogo de Juegos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <h2 className={styles.title}>Carrito de Compras</h2>

        <div className={styles.cartWrapper}>
          {/* Lista de Productos */}
          <div className={styles.cartList}>
            {carrito.map(juego => {
              const imageUrl = juego.imagen.startsWith('http') 
                ? juego.imagen 
                : `${import.meta.env.VITE_BACKEND_URL}/${juego.imagen.replace(/^\//, '')}`;

              return (
                <div key={juego.id} className={styles.cartItem}>
                  <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={juego.nombre} className={styles.gameImage} />
                  </div>
                  <div className={styles.itemInfo}>
                    <h5 className={styles.itemName}>{juego.nombre}</h5>
                    <span className={styles.itemCategory}>{juego.categoria?.nombre || 'General'}</span>
                  </div>
                  <div className={styles.itemPriceArea}>
                    {juego.descuento && (
                      <div className={styles.originalPrice}>S/ {juego.precio.toFixed(2)}</div>
                    )}
                    <div className={styles.finalPrice}>
                      S/ {(juego.precio - (juego.descuento || 0)).toFixed(2)}
                    </div>
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleShowConfirm(juego)}
                    title="Eliminar del carrito"
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Resumen de Compra */}
          <div className={styles.summaryCard}>
            <h4 className={styles.summaryTitle}>Resumen</h4>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            {totalDescuento > 0 && (
              <div className={styles.summaryRow} style={{ color: '#10b981' }}>
                <span>Descuento</span>
                <span>- S/ {totalDescuento.toFixed(2)}</span>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span className="text-info">¡Gratis!</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>

            <button className={styles.btnCheckout}>
              <i className="bi bi-shield-check me-2"></i>
              FINALIZAR COMPRA
            </button>
            <p className="text-center text-muted mt-3 small">
              Pago seguro y encriptado por SSL
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal 
        show={showConfirm} 
        onHide={() => setShowConfirm(false)} 
        centered
        contentClassName={styles.modalContent}
      >
        <Modal.Header closeButton closeVariant="white" className={styles.modalHeader}>
          <Modal.Title>¿Eliminar del carrito?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 text-center">
          <p className="fs-5">
            ¿Estás seguro de que deseas eliminar <strong>{juegoAEliminar?.nombre}</strong> de tu lista de compras?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pb-4">
          <Button variant="secondary" onClick={() => setShowConfirm(false)} className="px-4">
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => juegoAEliminar && eliminarJuego(juegoAEliminar)} className="px-4">
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Carrito;
