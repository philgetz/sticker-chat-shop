import React from "react";

import { CardPrimaryAction } from "rmwc/Card";
import { Typography } from "rmwc/Typography";

const HistoryItem = props => {
  const isOrder = props.type.toUpperCase() === "ORDER" ? true : false;
  const isDummy = props.id === 1 ? true : false;
  const imgName = props.name.slice(1, props.name.length - "sticker ".length);
  return (
    <CardPrimaryAction key={props.id}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <Typography
            use="subtitle2"
            tag="h3"
            theme="primary"
            style={{ marginTop: "1rem", marginBottom: "-1rem" }}
          >
            {props.type.toUpperCase()}
          </Typography>
          <Typography use="headline6" tag="h2">
            {props.name}
          </Typography>
          <Typography
            use="body1"
            tag="p"
            theme="primary"
            style={{ marginBottom: "0px", marginTop: "-10px" }}
          >
            $11
          </Typography>
          <Typography use="body1" tag="p">
            Order#: {props.id}
          </Typography>
        </div>
        {isOrder && !isDummy ? (
          <div className="sticker-item-img">
            <img src={`/img/stickers/${imgName}.png`} />
          </div>
        ) : null}
        {isDummy ? (
          <div className="sticker-item-img">
            <img src="/img/stickers/trex.png" />
          </div>
        ) : null}
      </div>
    </CardPrimaryAction>
  );
};

export default HistoryItem;
