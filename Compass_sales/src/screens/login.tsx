import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
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

  async function singIn() {
    if (!validate()) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        if (error.code == "auth/wrong-password") {
          setErrorPassword("Wrong  password");
          setShowErrorPassword(true);
        } else if (error.code == "auth/user-not-found") {
          setErrorEmail("User not found");
          setShowErroEmail(true);
        } else if (error.code == "auth/invalid-email") {
          setErrorEmail("Invalid email");
          setShowErroEmail(true);
        }
      }
    }
  }

  function validate() {
    let erro = false;
    if (!email) {
      setErrorEmail("Please Enter Email");
      setShowErroEmail(true);
      erro = true;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setErrorEmail("Please Valid Email");
      setShowErroEmail(true);
      erro = true;
    }
    if (password.length < 6) {
      setErrorPassword("Password has to be at least 6 character");
      setShowErrorPassword(true);
      erro = true;
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
  return (
    <View style={styles.container}>
      <Title title={"Login"} />
      <TextInput
        style={showErroEmail ? styles.inputError : styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={handleOnChangeEmail}
      ></TextInput>
      {showErroEmail && <Text style={styles.error}>{ErrorEmail}</Text>}
      <TextInput
        style={showErroPassword ? styles.inputError : styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={handleOnChangePassword}
      ></TextInput>
      {showErroPassword && <Text style={styles.error}>{ErrorPassword}</Text>}
      <Links
        title={"Forgot your password?"}
        onPress={() => navigation.navigate("passwordRecovery")}
      ></Links>
      <Links
        title={"Are you new? Register"}
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
    justifyContent: "flex-start",
    marginTop: statusBarHeight,
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
