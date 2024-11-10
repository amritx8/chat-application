// libraries
import { useState } from "react";

// icons
import { BiSolidSend } from "react-icons/bi";

// constants
import { ActionTypes } from "../actionHandler/constants/actionTypes";

// types
import type { OnAction } from "../actionHandler/types";
import type { ChangeEvent, ReactElement } from "react";

type Props = {
  onAction: OnAction;
};

export const MessageComposer = (props: Props): ReactElement => {
  const { onAction } = props;

  const [messageText, setMessageText] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const createMessage = () => {
    onAction({
      type: ActionTypes.CREATE_MESSAGE,
      payload: {
        content: {
          text: messageText,
        },
      },
    });

    setMessageText("");
  };

  return (
    <div className="w-full h-20 flex gap-6 p-4 bg-zinc-700">
      <input
        type="text"
        value={messageText}
        placeholder="Type a message here .."
        onChange={handleChange}
        className="h-full w-full rounded-md border-none outline-none px-3"
      />
      <button onClick={createMessage}>
        <BiSolidSend size={20} />
      </button>
    </div>
  );
};
