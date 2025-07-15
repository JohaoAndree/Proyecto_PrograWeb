export type Juego = {
  id?: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  precio: number;
  descuento?: string;
  foto: string;
  imagen: string; // ✅ agregar este campo obligatorio
  estado?: boolean;
};

