import React, { Component } from "react";

import { Chip, ChipText, ChipSet } from "rmwc/Chip";

import preload from "../data.json";
import HistoryList from "./HistoryList";

class History extends Component {
  constructor(props) {
    super(props);
    this.history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : preload.history;

    this.state = {
      searchTerm: "",
      history: this.history,
      chipFilters: {
        all: true,
        returns: false,
        orders: false
      }
    };
  }

  handleFilterChipClick = filterType => {
    const history = this.history;
    const filteredHistory = history.filter(
      item => item.type.toUpperCase() === filterType
    );
    this.setState({
      history: filteredHistory
    });
  };

  handleClearFilterClick = () => {
    this.setState({
      history: this.history
    });
  };

  render() {
    return (
      <div className="history-outer-container">
        <div className="history-container content-container">
          <div className="history-chip-container">
            <ChipSet choice>
              <Chip
                selected={this.state.chipFilters.all}
                onClick={this.handleClearFilterClick}
              >
                <ChipText>All</ChipText>
              </Chip>
              <Chip onClick={() => this.handleFilterChipClick("REFUND")}>
                <ChipText>Refunds</ChipText>
              </Chip>
              <Chip onClick={() => this.handleFilterChipClick("ORDER")}>
                <ChipText>Orders</ChipText>
              </Chip>
            </ChipSet>
          </div>
          <HistoryList history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default History;
