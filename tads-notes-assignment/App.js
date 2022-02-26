import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NoteProvider } from './src/context/NoteContext.js';
import HomeScreen from './src/screens/HomeScreen.js';
import EditNoteScreen from './src/screens/EditNoteScreen.js';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

function App() {
  return (
    <NoteProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Edit Note" component={EditNoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NoteProvider>
  );
}

export default App;