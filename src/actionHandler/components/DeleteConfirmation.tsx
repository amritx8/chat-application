// constants
import { ActionTypes } from "../constants/actionTypes";

// types
import type { ReactElement } from "react";
import type { OnAction } from "../../actionHandler/types";

type Props = {
  onAction: OnAction;
};

export const DeleteConfirmation = (props: Props): ReactElement => {
  const { onAction } = props;

  const confirmDelete = () => {
    onAction({
      type: ActionTypes.CONFIRM_DELETE_MESSAGE,
    });
  };

  const close = () => {
    onAction({
      type: ActionTypes.RESET_VIEW_STATE,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center bg-gray-500 p-6 rounded-lg shadow-lg w-96 max-w-full relative">
        <h2 className="text-left text-xl text-white font-normal mb-4">
          Delete Message?
        </h2>
        <div className="w-full flex justify-end gap-4">
          <button
            className="w-min text-emerald-500 hover:text-emerald-300 px-4 py-2 border border-solid border-slate-400 rounded-full"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="w-min bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-full"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
