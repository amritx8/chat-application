// components
import { ConversationItem } from "./ConversationItem";

// types
import type { ReactElement } from "react";
import type { Conversation } from "../types";
import type { OnAction } from "../actionHandler/types";

type Props = {
  conversations: Conversation[];
  onAction: OnAction;
  selectedUserId?: string;
};

export const ConversationList = (props: Props): ReactElement => {
  const { conversations, onAction, selectedUserId } = props;

  return (
    <div className="w-full h-full bg-zinc-900 border-r border-solid border-slate-400 overflow-y-auto">
      <h2 className="p-6 text-4xl text-white">Chats</h2>
      {conversations.map((conversation, index) => (
        <ConversationItem
          key={conversation.userId}
          conversation={conversation}
          onAction={onAction}
          isSelected={selectedUserId === conversation.userId}
          className={
            index === 0 ? "border-t border-solid border-slate-400" : ""
          }
        />
      ))}
    </div>
  );
};
