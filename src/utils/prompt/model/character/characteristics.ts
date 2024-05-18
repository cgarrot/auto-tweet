//Just in case it's normal if all community is not present

export const genderList = [
  'male',
  'female',
  'trans male',
  'trans female',
] as const;

export type Gender = (typeof genderList)[number];

export const sexOrientations = [
  'heterosexual',
  'bisexual',
  'gay',
  'pansexual',
  'queer',
] as const;

export const ethnicList = [
  'african',
  'african american',
  'asian',
  'caucasian',
  'hispanic',
  'latino',
  'middle eastern',
  'native american',
  'pacific islander',
  'south asian',
  'southeast asian',
  'east asian',
  'indigenous australian',
  'caribbean',
  'central asian',
  'jewish',
  'mixed race',
  'arab',
  'persian',
  'turkish',
  'romani',
] as const;

export type Ethnic = (typeof ethnicList)[number];

export type SexOrientation = (typeof sexOrientations)[number];

export const personalityTypes = [
  'Kind',
  'Generous',
  'Thoughtful',
  'Ambitious',
  'Creative',
  'Diligent',
  'Optimistic',
  'Honest',
  'Loyal',
  'Curious',
  'Empathetic',
  'Patient',
  'Adventurous',
  'Confident',
  'Resourceful',
  'Sociable',
  'Disciplined',
  'Humorous',
  'Independent',
  'Compassionate',
  'Courageous',
  'Adaptable',
  'Analytical',
  'Charismatic',
  'Decisive',
  'Dependable',
  'Enthusiastic',
  'Forgiving',
  'Generous',
  'Insightful',
  'Inventive',
  'Modest',
  'Observant',
  'Open-minded',
  'Perceptive',
  'Practical',
  'Respectful',
  'Sincere',
  'Spontaneous',
  'Supportive',
  'Trustworthy',
  'Versatile',
  'Warm-hearted',
  'Witty',
  'Zealous',
  'Arrogant',
  'Selfish',
  'Rude',
  'Impatient',
  'Stubborn',
  'Pessimistic',
  'Dishonest',
  'Jealous',
  'Greedy',
  'Narrow-minded',
  'Insensitive',
  'Inconsiderate',
  'Manipulative',
  'Controlling',
  'Lazy',
  'Disorganized',
  'Moody',
  'Vindictive',
  'Hostile',
  'Unreliable',
  'Vain',
  'Critical',
  'Envious',
  'Gossipy',
  'Aggressive',
  'Apathetic',
  'Cynical',
  'Insecure',
  'Intolerant',
  'Neglectful',
  'Paranoid',
  'Pessimistic',
  'Possessive',
  'Resentful',
] as const;

export type Personality = (typeof personalityTypes)[number];

export const beautyList = [
  'normal',
  'pretty',
  'ugly',
  'gorgeous',
  'neglected',
] as const;

export type Beauty = (typeof beautyList)[number];

export const numberPersonList = [
  '1',
  '2',
  'threesome',
  'friends group',
  'couple',
  '+10',
] as const;

export type NumberPerson = (typeof numberPersonList)[number];

export const relationTypes = [
  'stranger',
  'friends',
  'friends group',
  'infidelity',
  'love',
  'date',
  'professional',
  'teacher',
  'student',
  'cousin',
  'sex worker',
  'step mother',
  'step father',
  'boss',
  'coworker',
  'neighbor',
] as const;

export type RelationType = (typeof relationTypes)[number];

export const relationGroupTypes = [
  'strangers',
  'friends group',
  'professional',
  'teacher',
  'student',
  'cousin',
  'sex worker',
  'coworker',
  'neighbor',
] as const;

export type RelationGroupType = (typeof relationGroupTypes)[number];
