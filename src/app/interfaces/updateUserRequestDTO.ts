export interface UpdateUserRequestDTO {
    userId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    position?: string | null; // Opcional, solo si es jugador
    licenseNumber?: string | null; // Opcional, solo si es árbitro o entrenador
    organizationName?: string | null; // Opcional, solo si es organizador

}
