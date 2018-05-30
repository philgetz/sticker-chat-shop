import React from "react";

const ChatBubble = props => (
  <div className={`chat-bubble ${props.user}`}>
    <p>{props.text}</p>
  </div>
);

export default ChatBubble;
