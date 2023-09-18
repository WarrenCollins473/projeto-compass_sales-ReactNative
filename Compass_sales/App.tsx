import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/login";
import { SingUp } from "./src/screens/singUp";
import { PasswordRecovery } from "./src/screens/PasswordRecovery";
import MainPage from "./src/screens/mainPage";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { getItemFor, storeData } from "./src/utilities/storageHelper";

import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();
const HAS_LAUNCHED = "HAS_LAUNCHED";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  const [hasLaunched, setHasLaunched] = useState(false);

  function StateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const getData = async () => {
    const data = await getItemFor(HAS_LAUNCHED);
    if (data) {
      setHasLaunched(true);
    } else {
      await storeData(HAS_LAUNCHED, "true");
    }
  };

  useEffect(() => {
    getData().catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      StateChanged(user);
    });
  });

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={hasLaunched ? "login" : "singup"}>
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
          <Stack.Screen
            name="passwordRecovery"
            component={PasswordRecovery}
            options={{
              headerTitle: "",
              headerTintColor: Colors.BACKGROUND_COLOR,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <MainPage user={user} setUser={setUser}></MainPage>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
