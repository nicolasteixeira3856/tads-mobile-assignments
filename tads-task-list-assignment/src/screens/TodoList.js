import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, TextInput, ScrollView } from 'react-native';
import Task from './Task'

function TodoList() {

  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])

  handleAddTask = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false}])
      setValue('')
    }
  }

  handleDeleteTask = (id) => {
    setTodos( todos.filter((todo) => {
        if (todo.key !== id) return true
    })
   )}

   handleTaskChecked = (id) => {
     setTodos( todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
          return todo;
        })
   )}

  return(
    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/1b/08/97/1b089750da14082382ccdd48a6166026.jpg' }} style={styles.container}>
      <Text style={{ marginTop: '2%', fontSize: 16, color: 'white' }}>Hoje</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setValue(value)}
          placeholder={'Digite uma tarefa...'}
          placeholderTextColor="white"
          onSubmitEditing={() => handleAddTask()}
          value={value}
          returnKeyType="done"
        />
      </View>
      <ScrollView style={{width: '100%'}}>
        {todos.map((task) => (
          <Task
            text={task.text}
            key={task.key}
            checked={task.checked} // toggle the checked icon
            setChecked={() => handleTaskChecked(task.key)}
            delete={() => handleDeleteTask(task.key)}
          />
        )) 
        }
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 20,
    flex: 1,
    minHeight: '7%',
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingRight: 10,
    paddingBottom: 5
  }
});

export default TodoList;