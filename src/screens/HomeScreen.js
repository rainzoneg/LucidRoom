import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import LogoTitle from '../components/LogoTitle';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView>
      <StatusBar/>
        <View style={styles.screenContainer}>
            <View style={{marginBottom: screenHeight * 0.11}}>
              <LogoTitle
                styles={{width: screenWidth * 0.78, height: screenHeight * 0.28, resizeMode: 'contain'}}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={{paddingBottom: 0.11*screenHeight}} onPress={()=>navigation.navigate('InitialTraining')}>
                <View style={styles.buttonStyle}>
                  <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Train Model</Text>
                </View> 
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('GenerateImage')}>
                <View style={styles.buttonStyle}>
                  <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Generate Image</Text>
                </View> 
              </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  screenContainer:{
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  buttonsContainer:{
    flex: 1,
    flexDirection: 'column',
  },
  buttonStyle:{
    backgroundColor: '#301065', 
    paddingHorizontal: 80, 
    paddingVertical: 10,
    width: screenWidth * 0.88,
    height: screenHeight * 0.062,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
});

export default HomeScreen;
