import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
const WINDOW_WIDTH = Dimensions.get("screen").width;
export default function App() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const getInfo = async () => {
    try {
      await axios(
        "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ecbc2a08cf96f70a2c0c35f2f84282f1&units=metric"
      ).then((res) => {
        setCity(res.data.city.name);
        const weatherData = res.data.list.filter((data, index) => index < 5);
        setWeather(weatherData);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <View style={style.container}>
      <View style={style.city}>
        {city ? (
          <Text style={style.cityName}>{city}</Text>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={style.weather}
        showsHorizontalScrollIndicator={false}
      >
        {weather ? (
          weather.map((list, index) => (
            <View key={index} style={style.day}>
              <Text style={style.temp}>{parseInt(list.main.temp)}</Text>
              <Text style={style.weatherName}>{list.weather[0].main}</Text>
            </View>
          ))
        ) : (
          <View style={style.day}>
            <ActivityIndicator size="large" />
          </View>
        )}
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
