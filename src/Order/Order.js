import React, { Component } from "react";
import { TextField } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

import CommandList from "./CommandList";
import StickerList from "./StickerList";
import HistoryList from "../History/HistoryList";
import ChatBubble from "./ChatBubble";

import preload from "../data.json";

class Order extends Component {
  constructor(props) {
    super(props);
    this.chat = localStorage.getItem("chat")
      ? JSON.parse(localStorage.getItem("chat"))
      : preload.chat;

    this.history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : preload.history;

    this.commands = preload.commands;
    this.state = {
      firstStage: false,
      secondStage: false,
      searchTerm: "",
      chat: this.chat,
      searchHelpPanel: false,
      searchValidation: {
        hash: false,
        match: false
      },
      isValid: true,
      matchingCommand: "",
      searchTermAfterCommand: "",
      matchingQuery: ""
    };
  }

  isValid = () => {
    const { hash, match } = this.state.searchValidation;
    return hash && match ? true : false;
  };

  isCommandMatch = (string, commandArray) => {
    const matchingString = commandArray.filter(
      command => `#${command.name}` === string
    );

    return matchingString.length > 0 ? true : false;
  };

  hasHash = string => {
    return string.slice(0, 1) === "#" ? true : false;
  };

  matchAfterOrder = () => {
    const isStickerMatch = preload.stickers.filter(
      sticker =>
        `${sticker.title}-sticker` ===
        this.state.searchTerm.slice(this.state.matchingCommand.length + 1)
    );

    return isStickerMatch.length > 0 ? true : false;
  };

  matchAfterRefund = () => {
    const isOrderMatch = this.history.filter(
      order =>
        `order-${order.id}` ===
        this.state.searchTerm.slice(this.state.matchingCommand.length + 1)
    );

    return isOrderMatch.length > 0 ? true : false;
  };

  BotResponse() {
    const matchAfterOrderType =
      this.state.matchingCommand === "#order"
        ? this.matchAfterOrder()
        : this.matchAfterRefund();
    const sanitizedCommand = this.state.matchingCommand.slice(1);
    const query = this.state.searchTerm.slice(
      this.state.matchingCommand.length + 1
    );
    const successBotText = `Ok, I just ${sanitizedCommand}ed ${query}`;
    const failBotText = `Uh oh, it seems I can't ${sanitizedCommand} ${query}, please try again`;

    const newChatItem = {
      id: this.chat.length + 1,
      text: matchAfterOrderType ? successBotText : failBotText,
      user: "bot"
    };

    this.addMessageToChatLocalStorage(newChatItem);
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      const { searchTerm } = this.state;

      const validateField = (this.isCommandMatch(searchTerm, this.commands),
      this.hasHash(searchTerm))
        ? true
        : false;

      this.setState({ isValid: validateField });
      if (this.state.firstStage) {
        if (
          !this.state.searchTerm
            .slice(0, this.state.matchingCommand.length)
            .match(this.state.matchingCommand)
        ) {
          this.setState({ firstStage: false });
        }
      }
    });
  };

  searchTermCommandMatchesCurrentMatchingCommand = () => {
    return this.state.searchTerm
      .slice(0, this.state.matchingCommand.length)
      .match(this.state.matchingCommand)
      ? true
      : false;
  };

  handleKeyDown = event => {
    const commandIsValid = this.isCommandMatch(
      this.state.searchTerm,
      this.commands
    );

    if (event.key === " " && commandIsValid) {
      this.setState({
        firstStage: true,
        matchingCommand: this.state.searchTerm
      });
    }
  };

  resetSearchState = () =>
    this.setState({ searchTerm: "", matchingCommand: "", firstStage: false });

  handleKeyPress = event => {
    if (event.key === "Enter" && this.state.matchingCommand !== "#lookup") {
      const newChatItem = {
        id: this.chat.length + 1,
        text: this.state.searchTerm,
        user: "user"
      };

      const matchAfterOrderType =
        this.state.matchingCommand === "#order"
          ? this.matchAfterOrder()
          : this.matchAfterRefund();

      if (matchAfterOrderType) {
        this.addOrderToHistory(
          this.state.matchingCommand.slice(1),
          this.state.searchTerm.slice(this.state.matchingCommand.length),
          this.state.matchingCommand === "#refund" ? true : false
        );
        this.resetSearchState();
        event.target.blur();
      }
      this.addMessageToChatLocalStorage(newChatItem);
      this.BotResponse();
    }
  };

  addMessageToChatLocalStorage(chatObject) {
    this.chat.push(chatObject);
    this.setState({ chat: this.chat });
    localStorage.setItem("chat", JSON.stringify(this.chat));
  }

  handleFocus = () => {
    this.setState({ searchHelpPanel: true });
  };

  handleBlur = () => {
    this.setState({ searchHelpPanel: false });
  };

  addOrderToHistory = (type, name, isRefund) => {
    const newHistoryObject = {
      type: type,
      name: name,
      id: this.history.length + 1,
      refunded: false
    };

    if (isRefund) {
      const orderString = "order-";
      const historyId = parseInt(
        this.state.searchTerm.slice(
          this.state.matchingCommand.length + orderString.length + 1
        ),
        10
      );
      const matchRefundToOrder = this.history.filter(historyItem => {
        if (historyItem.id === historyId) {
          historyItem.refunded = true;
        }
        return historyItem.id === historyId;
      })[0];
      newHistoryObject.name = `${matchRefundToOrder.name} from Order#${
        matchRefundToOrder.id
      }`;
      newHistoryObject.refunded = true;
    }
    this.history.push(newHistoryObject);
    localStorage.setItem("history", JSON.stringify(this.history));
  };

  render() {
    return (
      <div className="search-container">
        <div className="content-container">
          <div className="message-container mdc-typography--body2">
            {this.chat
              .slice(0)
              .reverse()
              .map(message => (
                <ChatBubble
                  key={message.id}
                  user={message.user}
                  text={message.text}
                />
              ))}
          </div>
        </div>
        {this.state.searchHelpPanel ? (
          <div className="autocomplete-outer-container">
            <div className="autocomplete-container">
              {this.state.firstStage ? (
                this.state.matchingCommand === "#refund" ? (
                  <HistoryList
                    history={this.history}
                    searchTerm={this.state.searchTerm}
                    refundMode={true}
                    matchingCommand={this.state.matchingCommand}
                  />
                ) : (
                  <StickerList
                    matchingCommand={this.state.matchingCommand}
                    searchTerm={this.state.searchTerm}
                  />
                )
              ) : (
                <CommandList searchTerm={this.state.searchTerm} />
              )}
            </div>
          </div>
        ) : null}

        <div className="search-field-container">
          <div className="search-field">
            <TextField
              value={this.state.searchTerm}
              onChange={this.handleSearchTermChange}
              onKeyPress={this.handleKeyPress}
              onKeyDown={this.handleKeyDown}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              outlined
              label="Specify a command please, eg #lookup, #buy, #return"
              className="full-width mdc-text-field--focused"
            />
            {!this.state.isValid ? (
              <Typography use="caption">
                Please start a command with #
              </Typography>
            ) : null}
          </div>
        </div>
        <div className="auto-complete-container" />
      </div>
    );
  }
}

export default Order;
