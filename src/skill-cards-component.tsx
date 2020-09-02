import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  EventEmitter,
} from "react-native";
import { base_url, EventEmmitter, EventNames } from "./utils";
import * as strings from "./strings.json";
import { ProgressBar } from "react-native-paper";

export class SkillCardsComponent extends Component {
  public styles = StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      marginBottom: 50,
      marginTop: 8,
    },
    footerContainer: {
      alignContent: "stretch",
      backgroundColor: "white",
    },
    card: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      padding: 8,
      marginBottom: 8,
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 8,
      borderColor: "#ccc",
    },
    header: {
      alignItems: "center",
      backgroundColor: "gray",
      borderRadius: 4,
      padding: 8,
    },
    content: {
      display: "flex",
      padding: 8,
      flexDirection: "row",
    },
    level: {
      flex: 5,
      alignSelf: "flex-start",
    },
    assignment: {
      flex: 1,
      alignItems: "flex-end",
    },
  });

  pages = [
    {
      title: "Materials",
      backgroundColor: "#CC0204",
      color: "white",
      key: "1",
    },
    {
      title: "Concepts",
      backgroundColor: "#FCFE04",
      color: "black",
      key: "2",
    },
    {
      title: "Theory",
      backgroundColor: "#04319C",
      color: "white",
      key: "3",
    },
  ];

  state: any;
  pageTitle = strings.pageTitles.achievement;

  constructor(props: any) {
    super(props);
    this.state = {
      page: "Materials",
      pages: this.pages,
    };
  }

  public componentDidMount() {
    EventEmmitter.dispatch(EventNames.closeNavigationDrawer, {});
    EventEmmitter.dispatch(EventNames.changeSubtitle, {
      subtitle: this.pageTitle,
    });
    this.setState({ isLoading: true });
    this.fetchData();
  }

  fetchData() {
    fetch(`${base_url}/achievement/${this.state.page}/1`, { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({
          skills: data,
          isLoading: false,
        });
      })
      .catch((error: any) => {
        console.log(error);
        alert(error.message);
      });
  }

  private _touchedSkill(skill: any) {}

  private changePage(newPage: any) {
    this.setState({ page: newPage.title, isLoading: true });
    setTimeout(() => this.fetchData(), 50);
  }

  private _makeSkillList(skill: any, index: number, separators: any) {
    return (
      <TouchableOpacity
        style={this.styles.card}
        onPress={() => this._touchedSkill(skill)}
      >
        <View style={{ ...this.styles.header, backgroundColor: skill.color }}>
          <Text style={{ color: "white" }}>{skill.title}</Text>
        </View>
        <View style={this.styles.content}>
          <View style={this.styles.level}>
            <Text>{skill.level}</Text>
          </View>
          <View style={this.styles.assignment}>
            <Text style={{ color: skill.assignmentColor }}>
              {skill.completedAssignments}/{skill.totalAssignments}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  private _makePageSwitchBox(page: any, index: number, separators: any) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            page.title === this.state.page ? page.backgroundColor : "lightgray",
          paddingVertical: 16,
          flex: 1,
        }}
        onPress={() => this.changePage(page)}
      >
        <View>
          <Text
            style={{
              color: page.title === this.state.page ? page.color : "black",
              textAlign: "center",
            }}
          >
            {page.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    var page: any[] = [];
    page.push(
      <ProgressBar
        color="red"
        indeterminate={true}
        visible={this.state.isLoading}
        accessibilityStates={true}
      />
    );
    page.push(
      <FlatList
        numColumns={1}
        style={this.styles.container}
        data={this.state.skills}
        renderItem={({ item, index, separators }) =>
          this._makeSkillList(item, index, separators)
        }
        keyExtractor={(item, index) => index.toString()}
      />
    );

    page.push(
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <FlatList
          numColumns={3}
          style={{ ...this.styles.footerContainer }}
          data={this.state.pages}
          renderItem={({ item, index, separators }) =>
            this._makePageSwitchBox(item, index, separators)
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
    return page;
  }
}
