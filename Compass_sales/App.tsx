import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/login";
import { SingUp } from "./src/screens/singUp";
import { PasswordRecovery } from "./src/screens/PasswordRecovery";
import MainPage from "./src/screens/mainPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"singup"}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="singup"
          component={SingUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="passwordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="mainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
