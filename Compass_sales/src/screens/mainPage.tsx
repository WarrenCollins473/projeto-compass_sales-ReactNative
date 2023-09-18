import { StyleSheet, View, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { Button } from "../components/button";

export default function MainPage({ user, setUser }) {
  async function logout() {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View>
      {<Text style={styles.text}>Welcome, {user.displayName}</Text>}
      <Button title={"SING OUT"} onPress={logout} />
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
  text: {
    fontSize: 30,
    margin: 30,
  },
});
