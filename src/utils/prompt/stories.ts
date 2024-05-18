export const instructions = (textArray) => `
You will write a story with the description of the characters that the prompt will give you.
The story should be write in anonymous confessions style, with a lot of details and graphic descriptions.
With these descriptions of the characters you will find a situation in which they meet and find a source of sexual tension between them.
You need to adapt the story around the characters description and the context, to create a logic course of events.
You can get inspiration from the sources given to you.
The person telling the story is telling it like they are confessing something, with raw feelings and details. 
The person telling the story needs to tell it like they would to a friend by message, no need for elevated language, we need text language or oral almost familiar language.
The person telling the story will use graphic details to tell the sex story, using sexual vocabulary.

To write a good sex story, with the context provided above, you need to integrate different steps:
1. A quick presentation of the person telling the story.
2. The moment the person telling the story meets someone or people they have desire for.
3.Short presentation of the person they have desire for and why they are attracted to them initially.
3. The flirting between the people.
4. Context added to the situation to make it more interesting or add a sense of fear of getting caught.
5. The first touches and action.
6. Dirty talks between the people during the physical action.
7. More description of the physical action tied to physical sensations during the physical touches.
8. An unexpected turn of event to make it either more <parametre in context file>.
9. The reaction of the people in the story to the unexpected turn of event.
10. The conclusion needs to match the ending prompt given to you before creating the story.

The story is in french language.

You should return me the stories in multiple part with ~ 110 words
You need to return JSON ONLY with this exact structure and same number element in the array text:
{
  "title": "",
  "text": [ ${textArray} ]
}`;

export const message = ``;
