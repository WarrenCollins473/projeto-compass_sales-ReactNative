import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../colors/colors";

export function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 14,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: Colors.BUTTON_COLOR,
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});
