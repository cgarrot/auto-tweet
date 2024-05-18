export const situationTypes = [
  'hot scene sex',
  'spicy scene sex',
  'cringe sex scene',
  'funny sex scene',
] as const;

export type SituationType = (typeof situationTypes)[number];

export const storyTypes = [
  'romantic',
  'erotic',
  'hard core sex',
  'bdsm',
  'furry',
  'one night stand',
  'public sex',
] as const;

export type StoryType = (typeof storyTypes)[number];

export const textStrongs = ['explicit', 'shy', 'normal'] as const;

export type TextStrong = (typeof textStrongs)[number];

export const endingStorys = [
  'romantic',
  'funny',
  'cringe',
  'awkward',
  'sad',
  'exciting',
] as const;

export type EndingStory = (typeof endingStorys)[number];
