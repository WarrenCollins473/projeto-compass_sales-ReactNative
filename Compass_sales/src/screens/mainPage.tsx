import { StyleSheet, View, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../components/button";

export default function MainPage({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(auth.currentUser.displayName);
      }
    });
  });

  async function logout() {
    try {
      await auth.signOut().then(() => navigation.navigate("login"));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Text style={styles.text}>Welcome, {userName}</Text>
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
    margin: 16,
  },
});
