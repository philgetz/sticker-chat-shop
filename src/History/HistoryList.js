import React, { Fragment } from "react";
import { Card } from "rmwc/Card";
import { Typography } from "rmwc/Typography";
import { ListDivider } from "rmwc/List";

import HistoryItem from "./HistoryItem";

const HistoryList = props => {
  const refundMode = props.refundMode;
  const historyList = props.history
    .slice(0)
    .reverse()
    .filter(
      historyItem =>
        refundMode
          ? `order-${historyItem.id}`
              .toUpperCase()
              .indexOf(
                props.searchTerm
                  .slice(props.matchingCommand.length + 1)
                  .toUpperCase()
              ) >= 0 && historyItem.refunded === false
          : historyItem
    )
    .map((historyItem, index, arr) => {
      return (
        <Fragment key={historyItem.id}>
          <HistoryItem
            type={historyItem.type}
            name={historyItem.name}
            id={historyItem.id}
            last={arr.length}
            index={index}
          />
          {index + 1 !== arr.length ? <ListDivider /> : null}
        </Fragment>
      );
    });

  const emptyState = (
    <Typography use="headline6" tag="p" style={{ paddingBottom: "20px" }}>
      Sorry there are no matching orders
    </Typography>
  );

  return historyList.length ? <Card outlined>{historyList}</Card> : emptyState;
};

export default HistoryList;
