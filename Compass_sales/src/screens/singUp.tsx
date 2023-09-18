import React, { useState } from "react";
import { View, StyleSheet, StatusBar, TextInput, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "../components/button";
import { Links } from "../components/link";

const statusBarHeight = StatusBar.currentHeight;

export function SingUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErroName] = useState("");
  const [showErroName, setShowErroName] = useState(false);
  const [showErroEmail, setShowErroEmail] = useState(false);
  const [showErroPassword, setShowErrorPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  async function singUp() {
    if (name.length == 0) {
      setErroName("Name can not be empty");
      setShowErroName(true);
    } else if (!email) {
      setErrorEmail("Please Enter Email");
      setShowErroEmail(true);
    } else if (!email.includes("@") || !email.includes(".com")) {
      setErrorEmail("Please Valid Email");
      setShowErroEmail(true);
    } else if (password.length < 6) {
      setErrorPassword("Password has to be at least 6 character");
      setShowErrorPassword(true);
    } else {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("Registration success!");
        navigation.navigate("login");
      } catch (error) {
        alert("Registration failed: " + error.code);
      }
      try {
        await updateProfile(auth.currentUser, { displayName: name });
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Title title={"Sing Up"} />
      <TextInput
        style={showErroName ? styles.inputError : styles.input}
        value={name}
        placeholder="Name"
        autoCapitalize="none"
        onChangeText={(Text) => setName(Text)}
      ></TextInput>
      {showErroName && <Text style={styles.error}>{errorName}</Text>}
      <TextInput
        style={showErroEmail ? styles.inputError : styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(Text) => setEmail(Text)}
      ></TextInput>
      {showErroEmail && <Text style={styles.error}>{errorEmail}</Text>}
      <TextInput
        style={showErroPassword ? styles.inputError : styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(Text) => setPassword(Text)}
      ></TextInput>
      {showErroPassword && <Text style={styles.error}>{errorPassword}</Text>}
      <Links
        title={"Already have an account?"}
        onPress={() => navigation.navigate("login")}
      ></Links>
      <Button title={"SING UP"} onPress={singUp}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.BACKGROUND_COLOR,
    justifyContent: "flex-start",
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
    marginHorizontal: 30,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    marginVertical: 4,
    height: 64,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
});
