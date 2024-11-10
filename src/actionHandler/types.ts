// constants
import { ActionTypes } from "./constants/actionTypes";

type OpenChatAction = {
  type: ActionTypes.OPEN_CHAT;
  payload: {
    userId: string;
  };
};

type CreateMessageAction = {
  type: ActionTypes.CREATE_MESSAGE;
  payload: {
    content: {
      text: string;
    };
  };
};

type DeleteMessageAction = {
  type: ActionTypes.DELETE_MESSAGE;
  payload: {
    messageId: string;
  };
};

type ConfirmDeleteMessageAction = {
  type: ActionTypes.CONFIRM_DELETE_MESSAGE;
};

type ResetViewStateAction = {
  type: ActionTypes.RESET_VIEW_STATE;
};

type Action =
  | OpenChatAction
  | CreateMessageAction
  | DeleteMessageAction
  | ConfirmDeleteMessageAction
  | ResetViewStateAction;

export type OnAction = (action: Action) => void;
