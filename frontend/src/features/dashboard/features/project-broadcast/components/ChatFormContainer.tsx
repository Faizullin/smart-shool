import { useAppSelector } from "@/core/hooks/redux";
import { IConferenceChatMessage } from "@/core/models/IConference";
import { ILoadingState } from "@/core/models/ILoadingState";
import ChatMessageItemCard from "@/shared/components/conference/ChatMessageItemCard";
import { mdiSend } from "@mdi/js";
import Icon from "@mdi/react";
import React, { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

interface IChatFormContainerProps {
  ws: WebSocket;
  messages: IConferenceChatMessage[];
}

const ChatFormContainer: FC<IChatFormContainerProps> = ({ ws, messages }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<ILoadingState>({
    post: false,
  });
  const [ready, setReady] = useState<boolean>(false);
  const [command, setCommand] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const handleInputChange = (event) => {
    setCommand(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    ws.send(
      JSON.stringify({
        type: "send_command",
        data: {
          command,
          to: "device",
        },
      })
    );
    setCommand("");
  };
  useEffect(() => {
    if (ws && ws.readyState === 1) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [ws?.readyState]);
  return (
    <div className="card w-100">
      <div className="card-header">
        <FormattedMessage id="send" defaultMessage="Send" />
      </div>
      <div className="card-body">
        <div className="row">
          <div>
            <form className="form-group px-3" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="command"
                  value={command}
                  className="form-control"
                  autoComplete="off"
                  onChange={handleInputChange}
                  disabled={!ready}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-send-message">
                    <Icon path={mdiSend} size={1} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="px-1">
            {messages.map((message_item, index) => (
              <ChatMessageItemCard
                key={index}
                active_me={user.id === message_item.author.user_id}
                message={message_item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatFormContainer;
