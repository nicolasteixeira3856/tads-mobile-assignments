import React, { useState, useContext }  from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NoteContext } from '../context/NoteContext';
import Note from '../components/Note';


function HomeScreen({navigation}) {
  /* Form state */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  /* NoteContext */
  const noteContext = useContext(NoteContext);

  const handleAddNote = () => {
    if (title.length > 0 && description.length > 0) {
      noteContext.add({title: title, description: description, key: new Date().getUTCMilliseconds()});
      setTitle('');
      setDescription('');
    }
  }

  const handleDeleteNote = (key) => {
    noteContext.remove({key: key});
  }

  return(
    <View style={styles.container}>
        <TextInput 
          style={styles.input}
          onChangeText={(value) => setTitle(value)}
          value={title}
          placeholder='Título'
          placeholderTextColor='white'
        />
        <View style={{ marginVertical: 8}} />
        <TextInput 
          style={styles.input}
          onChangeText={(value) => setDescription(value)}
          value={description}
          placeholder='Descrição'
          placeholderTextColor='white'
        />
        <View style={{ marginVertical: 8}} />
        <Pressable style={styles.button} onPress={handleAddNote}>
          <Text style={styles.text}>Adicionar nota</Text>
        </Pressable>
        <ScrollView>
          <View>
            {noteContext.state.notes.map((note) => (
                <Note
                  key={note.key}
                  title={note.title}
                  description={note.description}
                  delete={() => handleDeleteNote(note.key)}
                  edit={() => navigation.navigate("Edit Note", {noteKey: note.key, noteTitle: note.title, noteDescription: note.description})}
                />
            ))} 
          </View>
        </ScrollView>
    </View>     
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#004269',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white'
  },
});
  
export default HomeScreen;