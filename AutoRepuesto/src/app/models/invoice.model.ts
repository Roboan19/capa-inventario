
export interface Invoice {
    id: number;
    cliente: string;
    total: number;
    fecha: string;
    items: { descripcion: string; cantidad: number; precio: number }[];
  }
  