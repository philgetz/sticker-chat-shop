import React from "react";
import { Typography } from "rmwc/Typography";

import Command from "./Command";

import preload from "../data.json";

const CommandList = props => {
  const filteredCommands = preload.commands
    .filter(
      command =>
        `${command.commandname}`
          .toUpperCase()
          .indexOf(props.searchTerm.toUpperCase()) >= 0
    )
    .map(command => (
      <Command key={command.id} commandName={command.commandname} />
    ));
  const emptyState = (
    <Typography use="headline6" tag="p" style={{ paddingBottom: "20px" }}>
      I can't do that yet. Please try another command
    </Typography>
  );
  return (
    <div className="command-container">
      <Typography
        use="subtitle2"
        tag="h3"
        theme="text-secondary-on-background"
        style={{ marginBottom: "5px" }}
      >
        Avilable Commands
      </Typography>
      {filteredCommands.length ? filteredCommands : emptyState}
    </div>
  );
};

export default CommandList;
