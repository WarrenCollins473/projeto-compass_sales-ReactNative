import { StyleSheet, View, Text } from "react-native";

export default function MainPage() {
  return (
    <View>
      <Text>Main Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
