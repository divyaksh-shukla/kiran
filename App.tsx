import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { DrawerLayoutAndroid, StyleSheet, Text, View, TouchableNativeFeedbackBase } from "react-native";
import { NativeRouter, Route, Switch, Link } from "react-router-native";
import { CustomToolbar } from "./src/custom-toolbar";
import { SkillCardsComponent } from "./src/skill-cards-component";
import { EventEmmitter, EventNames } from "./src/utils";
import { Attendance } from "./src/attendance";
import { NavigationDrawer } from "./src/navigation-drawer";
import * as colors from './src/colors.json'

export default class App extends Component<any> {
  drawer: any;
  state: any;
  events: any[];
  navigationView = (<NavigationDrawer />);

  styles = {
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgray",
    },
    statusBar: {
      backgroundColor: "#0F26BA",
    },
  };

  constructor(props: any) {
    super(props);
    this.state = {};
    this.events = [];
  }

  componentDidMount() {
    this.subscribeEvents();
  }

  componentWillUnmount() {
    this.unsubscribeEvents();
  }

  render() {
    return (
      <NativeRouter>
        <DrawerLayoutAndroid
          drawerWidth={300}
          renderNavigationView={() => this.navigationView}
          ref={(_drawerRef) =>
            (this.drawer = _drawerRef ? _drawerRef : this.drawer)
          }
        >
          <View style={this.styles.container}>
            <StatusBar
              style="light"
              backgroundColor={colors.darkBaseColor}
            />
            <CustomToolbar subtitle={this.state.pageTitle} />
            <Switch>
              <Route exact path="/">
                <Attendance />
              </Route>
              <Route exact path="/skill">
                <SkillCardsComponent />
              </Route>
            </Switch>
          </View>
        </DrawerLayoutAndroid>
      </NativeRouter>
    );
  }

  subscribeEvents() {
    // Drawer Events
    this.events.push(EventEmmitter.subscribe(EventNames.openNavigationDrawer, (event: any) => {
      this.drawer.openDrawer();
    }));

    this.events.push(EventEmmitter.subscribe(EventNames.closeNavigationDrawer, (event: any) => {
      this.drawer.closeDrawer();
    }));

    // Subtitle Event
    this.events.push(EventEmmitter.subscribe(EventNames.changeSubtitle, (event: any) => {
      this.setState({ pageTitle: event.subtitle });
    }));
  }

  unsubscribeEvents() {
    this.events.forEach((event: any) => {
      EventEmmitter.unsubscribe(event);
    });
  }
}
