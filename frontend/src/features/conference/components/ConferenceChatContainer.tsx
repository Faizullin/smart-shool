import { IConferenceChatMessage } from "@/core/models/IConference";
import { IUserConnected } from "@/core/models/IWSConnectionData";
import ChatMessageItemCard from "@/shared/components/conference/ChatMessageItemCard";
import { mdiSend } from "@mdi/js";
import Icon from "@mdi/react";
import React, { ChangeEvent } from "react";
import "./conference-chat-container.scss";

export default function ConferenceChatContainer({
  user,
  onSendMessage,
  chat_data,
}: {
  user: IUserConnected;
  onSendMessage: (data: Object) => void;
  chat_data: {
    messages: IConferenceChatMessage[];
  };
}) {
  const [data, setData] = React.useState<string>("");

  const handleMessageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleSendMessage = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data.trim()) {
      onSendMessage({
        from: user.user_id,
        content: data,
      });
      setData("");
    }
  };
  return (
    <div className="conference-chat-container">
      <div className="card">
        <div className="px-1">
          {chat_data.messages.map((message, index) => (
            <ChatMessageItemCard
              key={index}
              message={message}
              active_me={user.user_id === message.author.user_id}
            />
          ))}
        </div>
        <div>
          <form className="form-group px-3" onSubmit={handleSendMessage}>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="Message..."
                className="form-control"
                value={data}
                onChange={handleMessageInputChange}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-send-message">
                  <Icon path={mdiSend} size={1} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
