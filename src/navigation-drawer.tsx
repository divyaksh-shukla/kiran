import React, { Component } from "react";
import PropTypes from "prop-types";
import { EventEmmitter, EventNames } from "./utils";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import * as strings from "./strings.json";
import * as colors from "./colors.json";

export class NavigationDrawer extends Component<any> {
  state: any;
  titleChangeSubscription: any;

  styles = {
    navigationLinksContainer: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#fff",
      padding: 8,
    },
    navigationContainer: {
      flex: 1,
    },
  };
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.subscribeEvents();
  }

  componentWillUnmount() {
    this.unsubscribeEvents();
  }

  render() {
    return (
      <View style={this.styles.navigationContainer}>
        <View style={{height: 232, backgroundColor: colors.baseColor }}></View>
        <View style={this.styles.navigationLinksContainer}>
          <Link
            to="/"
            underlayColor="lightgray"
            onPress={() =>
              EventEmmitter.dispatch(EventNames.closeNavigationDrawer, {})
            }
          >
            <Text
              style={{
                marginVertical: 4,
                fontSize: 18,
              }}
            >
              {strings.pageTitles.attendance}
            </Text>
          </Link>
          <Link
            to="/skill"
            underlayColor="lightgray"
            onPress={() =>
              EventEmmitter.dispatch(EventNames.closeNavigationDrawer, {})
            }
          >
            <Text
              style={{
                marginVertical: 4,
                fontSize: 18,
              }}
            >
              {strings.pageTitles.achievement}
            </Text>
          </Link>
        </View>
      </View>
    );
  }

  subscribeEvents() {
    this.titleChangeSubscription = EventEmmitter.subscribe(
      EventNames.changeSubtitle,
      (event: any) => {
        this.setState({
          subtitle: event.subtitle,
        });
      }
    );
  }

  unsubscribeEvents() {
    EventEmmitter.unsubscribe(this.titleChangeSubscription);
  }
}
