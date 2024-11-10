// constants
import { ActionTypes } from "../actionHandler/constants/actionTypes";

// types
import type { ReactElement } from "react";
import type { Conversation } from "../types";
import type { OnAction } from "../actionHandler/types";

type Props = {
  conversation: Conversation;
  onAction: OnAction;
  isSelected: boolean;
  className?: string;
};

export const ConversationItem = (props: Props): ReactElement => {
  const { conversation, onAction, isSelected, className } = props;
  const { userId, name, profileImageUrl } = conversation;

  const openChat = () => {
    onAction({
      type: ActionTypes.OPEN_CHAT,
      payload: {
        userId,
      },
    });
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-6 items-center border-b border-solid border-slate-400 hover:bg-slate-700 px-6 py-4 cursor-pointer ${
        isSelected ? "bg-slate-500" : ""
      } ${className}`}
      onClick={openChat}
    >
      <img
        src={profileImageUrl}
        alt="User Profile Image"
        className="rounded-full object-cover"
        style={{
          width: "50px",
          height: "50px",
        }}
      />
      <div className="flex items-center justify-center text-xl text-white">
        {name}
      </div>
    </div>
  );
};
