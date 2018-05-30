import React, { Component } from "react";
import { Route, Redirect, withRouter, Link } from "react-router-dom";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from "rmwc/TopAppBar";

import { TabBar, Tab, TabIconText } from "rmwc/Tabs";

import Order from "../Order/Order";
import History from "../History/History";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: null
    };
  }

  componentDidMount() {
    this.currentLocation = this.checkLocation();
    this.setState({ activeTabIndex: this.currentLocation });
  }

  checkLocation() {
    return this.props.location.pathname === "/order" ? 0 : 1;
  }

  render() {
    return (
      <div>
        <TopAppBar
          fixed="true"
          className="mdc-elevation--z2"
          style={{ zIndex: 1000 }}
        >
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarNavigationIcon className="hidden" use="menu" />
              <TopAppBarTitle>Sticker Chat Shop</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
          <TopAppBarRow className="pull-top-lg">
            <TopAppBarSection align="end">
              <TabBar
                activeTabIndex={this.state.activeTabIndex}
                onChange={evt =>
                  this.setState({ activeTabIndex: evt.target.value })
                }
                fixed="true"
                className="pull-bottom --mdc-theme-on-primary"
              >
                <Link to="/order" className="text-nodecoration tab-nav-link">
                  <Tab>
                    <TabIconText>
                      <span className="tc-white">ORDER CHAT</span>
                    </TabIconText>
                  </Tab>
                </Link>
                <Link to="/history" className="text-nodecoration tab-nav-link">
                  <Tab>
                    <TabIconText>
                      <span className="tc-white">HISTORY</span>
                    </TabIconText>
                  </Tab>
                </Link>
              </TabBar>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>

        <div className="top-app-bar--fixed-adjust">
          <Route exact path={process.env.PUBLIC_URL + '/'}> render={() => <Redirect to="/order" />} />
          <Route path={process.env.PUBLIC_URL + '/order'}> component={Order} />
          <Route path={process.env.PUBLIC_URL + '/history'}> component={History} />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
