import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomToolbar } from "./src/custom-toolbar";
import { SkillCardsComponent } from "./src/skill-cards-component";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CustomToolbar />
      <SkillCardsComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
});
