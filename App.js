import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import WeatherApp from "./WeatherAPP/WeaterApp";
import TodoAPP from "./TodoAPP/TodoAPP";
export default function App() {
  return (
    <View style={stlyes.container}>
      <TodoAPP />
    </View>
  );
}

const stlyes = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
