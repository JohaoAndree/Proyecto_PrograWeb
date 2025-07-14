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
  estado?: boolean; // ✅ importante
};
