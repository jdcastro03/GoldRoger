export interface Permission {
    id: number;              // Identificador único del permiso
    key: string;            // Clave del permiso
    description?: string;   // Descripción del permiso (opcional)
    createdBy?: string;     // Usuario que creó el permiso (opcional)
    createdOn: Date;        // Fecha de creación del permiso
    modifiedBy?: string;    // Usuario que modificó el permiso (opcional)
    modifiedOn?: Date;      // Fecha de la última modificación del permiso (opcional)
  }