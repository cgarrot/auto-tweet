import { Beauty, Personality } from './characteristics';

export interface Body {
  type: string;
  boobs: string;
  butt: string;
  cock: string;
}

export interface PhysicalCharacteristics {
  beauty: Beauty;
  height: number;
  weight: number;
  hair_color: string;
  eye_color: string;
  body: Body;
}

export interface MentalCharacteristics {
  personality: Personality;
  interests: string[];
  hobbies: string[];
}
