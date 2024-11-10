type Content = {
  text: string;
};

export type Message = {
  id: string;
  content: Content;
  createdTime: number;
};

export type Conversation = {
  userId: string;
  name: string;
  profileImageUrl: string;
  messages?: Message[];
};
