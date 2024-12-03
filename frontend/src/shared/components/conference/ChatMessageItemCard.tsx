import { IConferenceChatMessage } from "@/core/models/IConference";
import React, { FC } from "react";
import "./chat-message-item-card.scss";

interface IChatMessageItemCardProps {
  message: IConferenceChatMessage;
  active_me: boolean;
}

const ChatMessageItemCard: FC<IChatMessageItemCardProps> = ({
  message,
  active_me,
}) => {
  return (
    <div
      className={`chat-message-item-card d-flex flex-column ${
        active_me ? "align-items-end" : "align-items-start"
      }`}
    >
      <div
        className={`chat-message-item-card__author ${
          active_me ? "active" : ""
        }`}
      >
        {message.author.user_full_name}
      </div>
      <div
        className={`chat-message-item-card__content ${
          active_me ? "active" : ""
        }`}
      >
        <span className="pe-5">{message.content}</span>
      </div>
    </div>
  );
};

export default ChatMessageItemCard;
