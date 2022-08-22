import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
const WINDOW_WIDTH = Dimensions.get("screen").width;
export default function App() {
  const [city, setCity] = useState(null);
  const [coordinate, setCoords] = useState(null);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    setCoords({ latitude, longitude });
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity(location[0].city);
  };
  useEffect(() => {
    ask();
  }, []);
  console.log(location);
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={style.weather}
        showsHorizontalScrollIndicator={false}
      >
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.weatherName}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.weatherName}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.weatherName}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.weatherName}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    color: "white",
  },
  weather: {},
  day: {
    width: WINDOW_WIDTH,
    flex: 3,
    alignItems: "center",
    marginTop: 40,
  },
  temp: {
    fontSize: 150,
    color: "white",
  },
  weatherName: {
    fontSize: 40,
    marginTop: -30,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
});
