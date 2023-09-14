import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button } from "../components/button";
import { Links } from "../components/link";

const statusBarHeight = StatusBar.currentHeight;

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErroEmail, setShowErroEmail] = useState(false);
  const [showErroPassword, setShowErrorPassword] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const auth = FIREBASE_AUTH;

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("mainPage");
  //     }
  //   });
  // });

  async function singIn() {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("mainPage");
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        setErrorPassword("Wrong  password");
        setShowErrorPassword(true);
      } else if (error.code == "auth/missing-password") {
        setErrorPassword("Missing password");
        setShowErrorPassword(true);
      } else if (error.code == "auth/user-not-found") {
        setErrorEmail("User not found");
        setShowErroEmail(true);
      } else if (error.code == "auth/invalid-email") {
        setErrorEmail("Invalid email");
        setShowErroEmail(true);
      }
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Title title={"Login"} />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(Text) => setEmail(Text)}
      ></TextInput>
      {showErroEmail && <Text style={styles.error}>{ErrorEmail}</Text>}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(Text) => setPassword(Text)}
      ></TextInput>
      {showErroPassword && <Text style={styles.error}>{ErrorPassword}</Text>}
      <Links
        title={"Forgot your password?"}
        onPress={() => navigation.navigate("passwordRecovery")}
      ></Links>
      <Links
        title={"Are you new?"}
        onPress={() => navigation.navigate("singup")}
      ></Links>
      <Button title="LOGIN" onPress={singIn}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.BACKGROUND_COLOR,
    justifyContent: "center",
    marginTop: statusBarHeight,
  },
  input: {
    marginVertical: 4,
    height: 64,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  error: {
    color: "red",
    marginHorizontal: 16,
  },
});
