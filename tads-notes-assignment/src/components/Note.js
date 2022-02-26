import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Note = (props) => (
    <View style={styles.noteWrap}>
        <Text style={styles.text}>{props.title}{"\n"}{props.description}</Text>
        <Icon
            name='edit'
            size={24}
            color='white'
            style={styles.icon}
            onPress={props.edit}
        />
        <Icon
            name='trash-2'
            size={24}
            color='white'
            style={styles.icon}
            onPress={props.delete}
        />
    </View>
) 

export default Note;

const styles = StyleSheet.create({
    noteWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        minHeight: 40,
        paddingVertical: 12
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 'bold',
        letterSpacing: 0.24,
        color: 'white',
        flex: 6
    },
    icon: {
        flex: 1
    }
})