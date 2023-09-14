import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Title } from "../components/title";
import { Colors } from "../colors/colors";
import { TextInput } from "react-native-gesture-handler";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "../components/button";

const statusBarHeight = StatusBar.currentHeight;

export function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [showErros, setShowErros] = useState(false);
  const [erro, setErro] = useState("");

  async function sendEmail() {
    if (!email) {
      setErro("Please Enter Email");
      setShowErros(true);
    } else if (!email.includes("@") || !email.includes(".com")) {
      setErro("Please Valid Email");
      setShowErros(true);
    } else {
      try {
        const auth = FIREBASE_AUTH;
        await sendPasswordResetEmail(auth, email);
        alert("verify you emailbox!");
      } catch (error) {
        setErro(error.message);
        setShowErros(true);

        console.log(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Title title={"Forgot password"} />
      <Text style={styles.message}>
        Please, enter your email address. You will receive a link to create a
        new password via email.
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(Text) => setEmail(Text)}
      ></TextInput>
      {showErros && <Text style={styles.error}>{erro}</Text>}
      <Button title={"SEND"} onPress={sendEmail} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.BACKGROUND_COLOR,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 64,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  error: {
    color: "red",
    marginHorizontal: 16,
  },
});
