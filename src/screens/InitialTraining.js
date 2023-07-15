import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ToastAndroid
} from 'react-native';

import LogoTitle from '../components/LogoTitle';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const InitialTraining = ({navigation}) => {
  const [instancePrompt, onChangeInstancePrompt] = React.useState('');
  const [classPrompt, onChangeClassPrompt] = React.useState('');

  return (
    <SafeAreaView>
      <StatusBar/>
        <View style={styles.screenContainer}>
            <View style={{marginBottom: screenHeight * 0.08}}>
              <LogoTitle
                styles={{width: screenWidth * 0.78, height: screenHeight * 0.28, resizeMode: 'contain'}}
              />
            </View>
            <View>
                <TextInput
                    style={styles.textInputStyle}
                    value={instancePrompt}
                    onChangeText={onChangeInstancePrompt}
                    placeholder="Instance Prompt"
                />
            </View>
            <View style={{marginBottom: 32}}>
                <TextInput
                    style={styles.textInputStyle}
                    value={classPrompt}
                    onChangeText={onChangeClassPrompt}
                    placeholder="Class Prompt"
                />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={()=>{
                if(!instancePrompt.trim() || !classPrompt.trim()){
                  alert("Please enter the instance and class prompts.");
                }else{
                  fetch('https://ce9a-35-190-188-110.ngrok-free.app/train', {
                    method:'POST',
                    headers:{
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      instance_prompt: instancePrompt,
                      class_prompt: classPrompt,
                    }),
                  }).then(navigation.navigate('UploadImages'))
                }   
              }}>
                <View style={styles.buttonStyle}>
                  <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Upload Images</Text>
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
  textInputStyle:{
    width: screenWidth * 0.88,
    height: screenHeight * 0.062,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 32,
    textAlign: 'center'
  }
});

export default InitialTraining;