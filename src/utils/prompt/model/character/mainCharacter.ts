import { Model } from 'src/utils/model';
import { Ethnic, Gender, SexOrientation } from './characteristics';
import {
  MentalCharacteristics,
  PhysicalCharacteristics,
} from './generalCharacter';

export class MainCharacter extends Model<MainCharacter> {
  age: number;
  gender: Gender;
  ethnic: Ethnic;
  sexual_orientation: SexOrientation;
  physical_characteristics: PhysicalCharacteristics;
  mental_characteristics: MentalCharacteristics;
  highlight: string;
  sexual_fantasies: string[];
}
