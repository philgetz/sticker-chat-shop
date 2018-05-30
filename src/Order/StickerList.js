import React from "react";
import { Typography } from "rmwc/Typography";

import Sticker from "./Sticker";

import preload from "../data.json";

const StickerList = props => {
  const listCount = props.matchingCommand === "#order" ? 9 : undefined;
  const filteredStickers = preload.stickers
    .filter(sticker => {
      return (
        `${sticker.title}-sticker`
          .toUpperCase()
          .indexOf(
            props.searchTerm
              .slice(props.matchingCommand.length + 1)
              .toUpperCase()
          ) >= 0
      );
    })
    .map(sticker => (
      <Sticker
        key={sticker.id}
        name={sticker.title}
        image={sticker.image}
        price={sticker.price}
      />
    ))
    .slice(0, listCount);

  const emptyState = (
    <Typography use="headline6" tag="p" style={{ paddingBottom: "20px" }}>
      Sorry I couldn't find a sticker under that name
    </Typography>
  );

  return (
    <div>
      <Typography
        use="subtitle2"
        tag="h3"
        theme="primary"
        style={{ marginBottom: "5px" }}
      >
        Stickers
      </Typography>
      {filteredStickers.length ? filteredStickers : emptyState}
    </div>
  );
};

export default StickerList;
