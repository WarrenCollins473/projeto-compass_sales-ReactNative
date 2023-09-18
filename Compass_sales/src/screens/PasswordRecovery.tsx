import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { auth } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { TextInput } from "react-native-gesture-handler";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "../components/button";

const statusBarHeight = StatusBar.currentHeight;

export function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [erro, setErro] = useState("");

  async function sendEmail() {
    if (!validate()) {
      setShowError(false);
      try {
        await sendPasswordResetEmail(auth, email);
        alert("verify you emailbox!");
      } catch (error) {
        setErro(error.message);
        setShowError(true);
      }
    }
  }
  function validate() {
    let erro = false;
    if (!email) {
      setErro("Please Enter Email");
      setShowError(true);
      erro = true;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setErro("Please Valid Email");
      setShowError(true);
      erro = true;
    }
    return erro;
  }
  function handleOnChangeEmail(email) {
    setEmail(email);
    setShowError(false);
  }
  return (
    <View style={styles.container}>
      <Title title={"Forgot password"} />
      <Text style={styles.message}>
        Please, enter your email address. You will receive a link to create a
        new password via email.
      </Text>
      <TextInput
        style={showError ? styles.inputError : styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={handleOnChangeEmail}
      ></TextInput>
      {showError && <Text style={styles.error}>{erro}</Text>}
      <Button title={"SEND"} onPress={sendEmail} />
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
  message: {
    fontSize: 14,
    fontWeight: "500",
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
    elevation: 4,
  },
});
