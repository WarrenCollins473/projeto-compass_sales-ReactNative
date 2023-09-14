import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../colors/colors";

export function Title(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    margin: 14,
  },
  text: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "left",
  },
});
