import React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen( {navigation} ) {
  return (
    <Button
        title="Vai para TodoList"
        onPress={() =>
            navigation.navigate('TodoList')
        }
    />
  );
}

export default HomeScreen;