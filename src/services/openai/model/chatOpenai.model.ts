import { Model } from 'src/utils';

export interface ChatOpenaiDetails {
  role: string;
  content: string;
}

export class ChatOpenaiModel extends Model<ChatOpenaiModel> {
  messages: ChatOpenaiDetails[];
}
