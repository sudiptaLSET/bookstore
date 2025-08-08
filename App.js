import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import WebScreen from "./src/screens/WebScreen";
import Practice from "./src/screens/Practice";
import AddBook from "./src/screens/AddBook";
import BookProvider from "./src/context/BookProvider";
import { NotificationProvider } from "./src/context/NotificationContext";
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BookProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }) => ({
                  title: route.params?.title || "",
                  headerBackTitle: "",
                })}
              />

              <Stack.Screen
                name="WebScreen"
                component={WebScreen}
                options={({ route }) => ({
                  title: route.params?.title || "",
                  headerBackTitle: "Back",
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromCenter,
                })}
              />

              <Stack.Screen
                name="AddBook"
                component={AddBook}
                options={({ route }) => ({
                  headerShown: false,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromCenter,
                })}
              />

              <Stack.Screen
                name="Practice"
                component={Practice}
                options={({ route }) => ({
                  headerShown: false,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BookProvider>
      </NotificationProvider>
    </Provider>
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
