import {
  Ethnic,
  Gender,
  Personality,
  SexOrientation,
  ethnicList,
  genderList,
  personalityTypes,
  sexOrientations,
  relationTypes,
  RelationType,
  NumberPerson,
  numberPersonList,
  beautyList,
  Beauty,
  RelationGroupType,
  relationGroupTypes,
  SituationType,
  situationTypes,
  StoryType,
  storyTypes,
  TextStrong,
  textStrongs,
  endingStorys,
  EndingStory,
} from 'src/utils/prompt';

function pickWeightedRandom<T>(items: T[], weights: number[]): T {
  if (items.length !== weights.length) {
    throw new Error('Items and weights arrays must have the same length.');
  }

  // Calculate cumulative weights
  const cumulativeWeights = weights.reduce((acc, weight, index) => {
    acc.push((acc[index - 1] || 0) + weight);
    return acc;
  }, [] as number[]);

  // Generate a random number within the total weight range
  const totalWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomWeight = Math.random() * totalWeight;

  // Find the corresponding item using binary search (for efficiency)
  let low = 0;
  let high = cumulativeWeights.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (randomWeight > cumulativeWeights[mid]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return items[low];
}

export function pickRandomElement<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

const ageRanges = [
  [18, 25],
  [25, 35],
  [35, 45],
  [45, 55],
];
const probabilitiesAgeRanges = [60, 20, 5, 15];

export function pickRandomAge(): number {
  // Pick a weighted random age range
  const chosenRange = pickWeightedRandom(ageRanges, probabilitiesAgeRanges);

  // Pick a random age within the chosen range
  const minAge = chosenRange[0];
  const maxAge = chosenRange[1];
  return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}

const probabilitiesGender = [40, 40, 10, 10];

export function pickRandomGender(): Gender {
  return pickWeightedRandom(Array.from(genderList), probabilitiesGender);
}

const probabilitiesSexualOrientation = [70, 15, 10, 5, 5];

export function pickRandomSexualOrientation(): SexOrientation {
  return pickWeightedRandom(
    Array.from(sexOrientations),
    probabilitiesSexualOrientation,
  );
}

export function pickRandomPersonality(): Personality {
  return pickRandomElement(Array.from(personalityTypes));
}

export function pickRandomEthnic(): Ethnic {
  return pickRandomElement(Array.from(ethnicList));
}

export function pickRandomRelationType(): RelationType {
  return pickRandomElement(Array.from(relationTypes));
}

export function pickRandomRelationGroupType(): RelationGroupType {
  return pickRandomElement(Array.from(relationGroupTypes));
}

export function pickRandomTextStrong(): TextStrong {
  return pickRandomElement(Array.from(textStrongs));
}

const probabilitiesNumberPerson = [50, 10, 20, 5, 10, 5];

export function pickRandomNumberPerson(): NumberPerson {
  return pickWeightedRandom(
    Array.from(numberPersonList),
    probabilitiesNumberPerson,
  );
}

const probabilitiesBeauty = [50, 30, 5, 13, 2];

export function pickRandomBeauty(): Beauty {
  return pickWeightedRandom(Array.from(beautyList), probabilitiesBeauty);
}

const probabilitiesSituationType = [35, 35, 10, 20];

export function pickRandomSituationType(): SituationType {
  return pickWeightedRandom(
    Array.from(situationTypes),
    probabilitiesSituationType,
  );
}

const probabilitiesStoryType = [10, 35, 10, 5, 1, 30, 9];

export function pickRandomStoryType(): StoryType {
  return pickWeightedRandom(Array.from(storyTypes), probabilitiesStoryType);
}

const probabilitiesEndingStory = [10, 20, 10, 5, 5, 50];

export function pickRandomEndingStory(): EndingStory {
  return pickWeightedRandom(Array.from(endingStorys), probabilitiesEndingStory);
}

const numberSlides = [
  [1, 3],
  [4, 6],
  [7, 9],
  [10, 16],
];
const probabilitiesNumberSlide = [20, 30, 30, 20];

export function pickRandomNumberSlide(): number {
  const chosenRange = pickWeightedRandom(
    numberSlides,
    probabilitiesNumberSlide,
  );
  const minNumber = chosenRange[0];
  const maxNumber = chosenRange[1];
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

export function arrayNumberSlide(numberSlide: number): string[] {
  const arr = [];
  for (let i = 0; i < numberSlide; i++) {
    arr.push(`part ${i + 1}`);
  }
  return arr;
}
