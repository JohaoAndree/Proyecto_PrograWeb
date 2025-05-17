interface Juego {
  titulo: string;
  imagen: string;
}

interface Props {
  juegos: Juego[];
}

const Lista = ({ juegos }: Props) => {
  return (
    <div  className="lista-juegos">
      {juegos.map((juego, index) => (
        <div key={index} className="juego-item">
          <h4 className="titulo-juego">{juego.titulo}</h4>
          <img src={juego.imagen} alt={juego.titulo} className="portada" />
        </div>
      ))}
    </div>
  );
};

export default Lista;
