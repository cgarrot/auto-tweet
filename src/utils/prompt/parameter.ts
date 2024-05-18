export const paramMainCharacterPrompt = (param) =>
  `complete missing data with logic choice to give to new prompt to create unique story. RETURN JSON ONLY 

  ${param}

  add description_backstory field to object and in this description follow this rules:
    -Invent a long text description of this person. 
    -You need to invent the all point of life of this person.
    -You need to invent a sexual fantasies story and add in the background story.
    -This  Background Story will give context to another prompt  for create story base on this person.
    -This is some parameter u need to take into account.


  add description_physical field to object and in this description follow this rules:
  -Invent a text description of this person. 
  -You have to describe the physical characteristics, shape, sexual parts, color, size, etc.
  -This is some parameter u need to take into account.
`;

export const paramSecondCharacterPrompt = (param) =>
  `complete missing data with logic choice to give to new prompt to create unique story. RETURN JSON ONLY 

  ${param}

  add description_backstory field to object and in this description follow this rules:
    -Invent a long text description of the group. 
    -You need to invent a sexual fantasies story and add in the background story.
    -This  Background Story will give context to another prompt  for create story base on this group.
    -This is some parameter u need to take into account.
`;

export const paramStoryPrompt = (param, main, second) =>
  `complete missing data with logic choice to give to new prompt to create unique story. RETURN JSON ONLY 

  ${param}

  you will use this information to complete the data

  Main Character:
  ${main}

  Second Character:
  ${second}
`;
