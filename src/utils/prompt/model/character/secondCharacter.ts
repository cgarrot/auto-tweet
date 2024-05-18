import { Model } from 'src/utils/model';
import {
  Ethnic,
  Gender,
  NumberPerson,
  RelationGroupType,
  RelationType,
  SexOrientation,
} from './characteristics';
import {
  MentalCharacteristics,
  PhysicalCharacteristics,
} from './generalCharacter';

export class SecondCharacter extends Model<SecondCharacter> {
  number: NumberPerson;
  age: number;
  gender: Gender;
  ethnic: Ethnic;
  relation_with_main_charactere: RelationType | RelationGroupType;
  sexual_orientation: SexOrientation;
  physical_characteristics?: PhysicalCharacteristics;
  mental_characteristics?: MentalCharacteristics;
  highlight: string;
  sexual_fantasies: string[];
}
