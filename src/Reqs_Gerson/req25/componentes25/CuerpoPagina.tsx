import styles from "./styles.module.css";
import Titulo from "../../../Reqs_Johao/Shared_Components/Titulo";
import ListaNoticias, { type Noticia } from "./ListaNoticias";
import Noticia1 from "../imagenes/noticia1.jpg";
import Noticia2 from "../imagenes/noticia2.jpg";
import Noticia3 from "../imagenes/noticia3.jpg";

const CuerpoPagina = () => {
  const titulo = "Noticias";
  const lista: Noticia[] = [
    {
      id: 1,
      foto: Noticia1,
      nombre: "Las últimas novedades sobre el sector del juego en Perú",
      descripcion:
        "Finalmente el país ya cuenta con un robusto e integral marco regulatorio, el cual permitirá que tanto operadores, usuarios y el mismo estado peruano se beneficien de esta actividad de entretenimiento.",
    },
    {
      id: 2,
      foto: Noticia2,
      nombre:
        "Algunos no querían, pero los juegos de casino online están contribuyendo a la economía",
      descripcion:
        "Los pronósticos estiman que el mercado de las apuestas online alcanzará un valor aproximado de 315 millones de dólares estadounidenses en 2024.",
    },
    {
      id: 3,
      foto: Noticia3,
      nombre:
        "Casinos de EEUU ganaron 66.500 millones de dólares en 2023, el mejor año de la industria",
      descripcion:
        "Ni siquiera los gastos por las compras prenavideñas desalentaron a los apostadores: Los casinos ganaron 6.200 millones de dólares en diciembre",
    },
  ];

  return (
    <div className={styles.CuerpoPagina}>
      <Titulo texto={titulo} />
      <div className={styles.ContenedorListaNoticias}>
        <ListaNoticias data={lista} />
      </div>
    </div>
  );
};

export default CuerpoPagina;
