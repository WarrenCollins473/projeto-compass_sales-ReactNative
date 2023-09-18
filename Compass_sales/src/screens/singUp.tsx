import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "../components/button";
import { Links } from "../components/link";

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
    if (!validate()) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        updateProfile(response.user, { displayName: name });
        auth.signOut();
        alert("Registration success!");
        navigation.navigate("login");
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          alert("Registration failed! Email already in use.");
        }
      }
    }
  }

  function validate() {
    let erro = false;
    if (name.length == 0) {
      setErroName("Name can not be empty");
      setShowErroName(true);
    }
    if (!email) {
      setErrorEmail("Please Enter Email");
      setShowErroEmail(true);
      erro = true;
    }
    if (
      !email.includes("@") ||
      !email.includes(".com") ||
      email.includes(" ")
    ) {
      setErrorEmail("Please Valid Email");
      setShowErroEmail(true);
      erro = true;
    }
    if (password.length < 6) {
      setErrorPassword("Password has to be at least 6 character");
      setShowErrorPassword(true);
    }

    return erro;
  }

  function handleOnChangeEmail(email) {
    setEmail(email);
    setShowErroEmail(false);
  }
  function handleOnChangePassword(password) {
    setPassword(password);
    setShowErrorPassword(false);
  }
  function handleOnChangeName(name) {
    setName(name);
    setShowErroName(false);
  }
  return (
    <View style={styles.container}>
      <Title title={"Sign Up"} />
      <TextInput
        style={showErroName ? styles.inputError : styles.input}
        value={name}
        placeholder="Name"
        autoCapitalize="none"
        onChangeText={handleOnChangeName}
      ></TextInput>
      {showErroName && <Text style={styles.error}>{errorName}</Text>}
      <TextInput
        style={showErroEmail ? styles.inputError : styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={handleOnChangeEmail}
      ></TextInput>
      {showErroEmail && <Text style={styles.error}>{errorEmail}</Text>}
      <TextInput
        style={showErroPassword ? styles.inputError : styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={handleOnChangePassword}
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
    elevation: 4,
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
    elevation: 4,
  },
});
