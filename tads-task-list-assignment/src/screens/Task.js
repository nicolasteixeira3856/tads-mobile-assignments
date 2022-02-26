import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
const Task = (props) => (
    <TouchableWithoutFeedback onPressIn={props.setChecked}>
        <View style={styles.taskWrap}>
            <View>
                {props.checked && <View style={styles.line}></View>}
                <Text style={styles.task}>{props.text}</Text>
            </View>
            <Icon
                name="trash-2"
                size={32}
                color="#fff"
                style={{ marginLeft: 'auto' }}
                onPress={props.delete}
            />
        </View>
    </TouchableWithoutFeedback>
)

export default Task

const styles = StyleSheet.create({
    taskWrap: {
        marginTop: '5%',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
    },
    task: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 4,
        marginLeft: 10,
        width: '100%',
        position: 'absolute',
        marginTop: 15
    }
})