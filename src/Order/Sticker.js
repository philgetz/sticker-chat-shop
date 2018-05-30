import React from "react";
import { Typography } from "rmwc/Typography";

const Sticker = props => (
  <div className="sticker-item mdc-typography--subtitle1">
    <div className="sticker-item-img">
      <img src={`/img/stickers/${props.image}`} alt="" />
    </div>
    <div className="sticker-item-description">
      <Typography
        use="headline5"
        tag="h3"
        style={{ marginBottom: "5px", marginTop: "10px" }}
      >
        {props.name}-sticker
      </Typography>
      <Typography
        use="body1"
        tag="p"
        theme="primary"
        style={{ marginBottom: "10px", marginTop: "0px" }}
      >
        ${props.price}
      </Typography>
    </div>
  </div>
);

export default Sticker;
