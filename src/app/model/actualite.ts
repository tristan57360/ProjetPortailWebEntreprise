import { Timestamp } from '@firebase/firestore-types';
export interface Actualite {
  titre: string;
  html: string;
  date?: Timestamp;
}
