import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { EventEmmitter, EventNames, getBatchDates, BatchDays } from "./utils";
import * as strings from "./strings.json";
import * as colors from "./colors.json";
import { ProgressBar, Button } from "react-native-paper";
import { ButtonGroup } from "react-native-elements";

export class Attendance extends Component<any> {
  pageTitle = strings.pageTitles.attendance;
  state: any;

  styles = StyleSheet.create({
    weekButton: {
      backgroundColor: colors.baseColor
    },
  });

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      currentWeek: 0,
      batchDay: BatchDays.Saturday
    };
    this.changeWeek = this.changeWeek.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () =>
        EventEmmitter.dispatch(EventNames.changeSubtitle, {
          subtitle: this.pageTitle,
        }),
      100
    );
    EventEmmitter.dispatch(EventNames.closeNavigationDrawer, {});
    // console.log(getBatchDates(this.state.batchDay));
    this.setState({
      isLoading: true,
      weekDates: getBatchDates(this.state.batchDay)
    });

    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  changeWeek(week: any) {
    this.setState({ currentWeek: week });
  }

  render() {
    const buttons = this.state.weekDates || [];
    const weeksView = (
      <ButtonGroup
        selectedButtonStyle={this.styles.weekButton}
        buttons={buttons}
        onPress={this.changeWeek}
        selectedIndex={this.state.currentWeek}
        vertical={false}
      />
    );
    return (
      <View>
        <ProgressBar
          accessibilityStates={true}
          visible={this.state.isLoading}
          color="red"
          indeterminate={true}
        />
        <View>{weeksView}</View>
      </View>
    );
  }
}
