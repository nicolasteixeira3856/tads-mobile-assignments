import React, { useState, useContext }  from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { NoteContext } from '../context/NoteContext';


function EditNoteScreen({route, navigation}) {
    /* Params */
    const {noteKey, noteTitle, noteDescription} = route.params;
    const noteContext = useContext(NoteContext);

    /* Form state */
    const [title, setTitle] = useState(noteTitle);
    const [description, setDescription] = useState(noteDescription);

    /* Snackbar */
    /* const createAlert = () =>
    Alert.alert(
      "Sucesso",
      "A nota foi editada com sucesso",
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    ); */

    /* Editando nota */
    const handleEditNote = (key) => {
        if (title.length > 0 && description.length > 0) {
            noteContext.edit({title: title, description: description, key: key});
            navigation.goBack()
        }
    }

    return (
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
            <Pressable style={styles.button} onPress={() => handleEditNote(noteKey)}>
                <Text style={styles.text}>Editar nota</Text>
            </Pressable>
        </View>
    )
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

export default EditNoteScreen;