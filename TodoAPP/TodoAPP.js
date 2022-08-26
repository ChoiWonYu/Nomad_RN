import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { useState, useEffect } from "react";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
const TODO_KEY = "@todo_key";
const TodoAPP = () => {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  useEffect(() => {
    loadTodos();
    console.log(todos);
  }, []);

  const saveTodos = async (ToDos) => {
    try {
      await AsyncStorage.setItem(TODO_KEY, JSON.stringify(ToDos));
    } catch (e) {
      console.log(e);
    }
  };
  const removeTodos = async () => {
    try {
      await AsyncStorage.removeItem(TODO_KEY);
    } catch (e) {
      console.log(e);
    }
  };
  const loadTodos = async () => {
    try {
      const ToDos = await AsyncStorage.getItem(TODO_KEY);
      return ToDos ? setTodos(JSON.parse(ToDos)) : {};
    } catch (e) {
      console.log(e);
    }
  };
  const onDelete = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "I`m Sure",
        style: "destructive",
        onPress: () => {
          const newTodo = { ...todos };
          delete newTodo[key];
          saveTodos(newTodo);
          setTodos(newTodo);
        },
      },
    ]);
  };
  const textDone = async () => {
    if (text === "") return;
    const newTodo = {
      ...todos,
      [Date.now()]: { text, working },
    };

    setTodos(newTodo);
    await saveTodos(newTodo);
    setText("");
    console.log(todos);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <TouchableOpacity onPress={() => setWorking(true)}>
          <Text
            style={{
              ...styles.titleText,
              color: working ? "white" : theme.grey,
            }}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWorking(false)}>
          <Text
            style={{
              ...styles.titleText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder={
          working ? '"What do you have to do?"' : "Where do you want to go?"
        }
        returnKeyType="done"
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={textDone}
      />
      {Object.keys(todos).map(
        (key) =>
          todos[key].working === working && (
            <View key={key} style={styles.listBox}>
              <View style={styles.checkBox}>
                <TouchableOpacity>
                  <Ionicons name="checkmark-done" size={24} color="black" />
                </TouchableOpacity>
                <Text suppressHighlighting={true} style={styles.list}>
                  {todos[key].text}
                </Text>
              </View>
              <View style={styles.checkBox}>
                <TouchableOpacity style={styles.renameIcon}>
                  <FontAwesome name="pencil-square-o" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(key)}>
                  <AntDesign name="delete" size={20} color={theme.bg} />
                </TouchableOpacity>
              </View>
            </View>
          )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  textBox: {
    flexDirection: "row",
    marginTop: 80,
    marginHorizontal: 30,
    justifyContent: "space-between",
  },
  titleText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  inputStyle: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 30,
    height: 55,
    marginVertical: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  listBox: {
    flexDirection: "row",
    backgroundColor: theme.grey,
    marginHorizontal: 20,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  list: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  renameIcon: {
    marginRight: 10,
  },
});

export default TodoAPP;
