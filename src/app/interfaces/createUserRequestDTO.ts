export interface CreateUserRequestDTO {
    username: string;
    passwordHash: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: number;
    position?: string | null; // Opcional, solo si es jugador
    licenseNumber?: string | null; // Opcional, solo si es árbitro o entrenador
    organizationName?: string | null; // Opcional, solo si es organizador
  }