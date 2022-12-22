export interface IOrden {
  ordenId: string;
  importeEditable: boolean;
  importe: number;
  cuotasEditable: boolean;
  cuotas: number;
  comercio: string;
  tarjetas: Tarjeta[];
}

export interface Tarjeta {
  id: number;
  nombre: string;
  permitido: boolean;
  cuotas: number[];
  mensaje: string;
}
