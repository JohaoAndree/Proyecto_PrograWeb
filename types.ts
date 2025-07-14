export type Juego = {
  id?: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  precio: number;
  descuento?: string;
  foto?: string;
  categoria?: {
    nombre: string;
  };
};
