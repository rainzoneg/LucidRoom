import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './src/screens/HomeScreen';
import InitialTraining from './src/screens/InitialTraining';
import UploadImages from './src/screens/UploadImages';
import GenerateImage from './src/screens/GenerateImage';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="InitialTraining"
          component={InitialTraining}
        />
        <Stack.Screen
          name="UploadImages"
          component={UploadImages}          
        />
        <Stack.Screen
          name="GenerateImage"
          component={GenerateImage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
