import { User } from './user';
import { Team } from './team';

export interface Coach {
    coachId: number;          // Identificador del entrenador
    licenseNumber: string;    // Número de licencia
  
    // Navegación
    user?: User;              // Relación uno a uno con User (opcional)
    team?: Team;              // Relación uno a uno con Team (opcional)
  }