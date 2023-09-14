import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../colors/colors";
import { AntDesign } from "@expo/vector-icons";

export function Links({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.links} onPress={onPress}>
      <Text style={styles.textLinks}>{title}</Text>
      <AntDesign name="arrowright" size={24} color={Colors.BUTTON_COLOR} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  links: {
    alignItems: "center",
    marginHorizontal: 14,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  textLinks: {
    fontWeight: "500",
    fontSize: 14,
  },
});
