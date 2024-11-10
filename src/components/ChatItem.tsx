// libraries
import { useMemo } from "react";

// icons
import { MdDelete } from "react-icons/md";

// helpers
import { getFormattedTime } from "../helpers/formatTime";

// constants
import { ActionTypes } from "../actionHandler/constants/actionTypes";

// types
import type { ReactElement } from "react";
import type { Message } from "../types";
import type { OnAction } from "../actionHandler/types";

type Props = {
  message: Message;
  onAction: OnAction;
};

export const ChatItem = (props: Props): ReactElement => {
  const { message, onAction } = props;

  const { id, content, createdTime } = message;
  const { text } = content;

  const deleteMessage = () => {
    onAction({
      type: ActionTypes.DELETE_MESSAGE,
      payload: {
        messageId: id,
      },
    });
  };

  const formattedTime = useMemo(
    () => getFormattedTime(createdTime),
    [createdTime]
  );

  return (
    <div className="flex items-center justify-center p-2 bg-emerald-700 rounded-md">
      <div className="flex gap-2 items-center">
        <div className="flex max-w-96 break-all text-sm text-slate-200">
          {text}
        </div>
        <div className="self-end text-xs text-slate-300 mr-2">
          {formattedTime}
        </div>
      </div>
      <button onClick={deleteMessage}>
        <MdDelete size={20} className="cursor-pointer hover:fill-slate-700" />
      </button>
    </div>
  );
};
