import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
    PermissionsAndroid,
    ToastAndroid
} from 'react-native';

import ReactNativeBlobUtil, { ReactNativeBlobUtilFile } from 'react-native-blob-util';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GenerateImage = ({navigation}) => {
  const [imagePrompt, onChangeImagePrompt] = React.useState('');
  const [imageLink, setImageLink] = React.useState('https://reactnative.dev/img/tiny_logo.png');

  return (
    <SafeAreaView>
        <View style={styles.screenContainer}>
            <View>
                <TextInput
                    style={styles.textInputStyle}
                    value={imagePrompt}
                    onChangeText={onChangeImagePrompt}
                    placeholder="Image Prompt"
                />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={async ()=>{
                if(!imagePrompt.trim()){
                  alert("Please enter the image prompt.");
                }else{
                  await ReactNativeBlobUtil.fetch("POST", "https://ce9a-35-190-188-110.ngrok-free.app/generate_with_prompt", 
                    {"Content-Type": 'application/json'},
                    JSON.stringify({prompt: imagePrompt})
                    )
                    .then((res) => {
                        let base64str = res.base64();   
                        console.log(base64str);
                        // let imageUri = "data:image/png;base64," + base64str;
                        let imageUri = base64str;
                        setImageLink(imageUri);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                }
              }}>
                <View style={styles.buttonStyle}>
                  <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Generate Image</Text>
                </View> 
              </TouchableOpacity>
              <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={async () => {
                  try{
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if(granted === PermissionsAndroid.RESULTS.GRANTED){
                      const fs = ReactNativeBlobUtil.fs;
                      const dirs = ReactNativeBlobUtil.fs.dirs;
                      console.log(dirs.DCIMDir);
                      const NEW_FILE_PATH = dirs.DownloadDir + "/" + `${Date.now()}_lucidroom.png`;
                      fs.writeFile(NEW_FILE_PATH, imageLink, 'base64')
                      .then((res) => {console.log("File : ", res)});
                    }else{
                      ToastAndroid.show("Missing required permission to save file.", ToastAndroid.SHORT);
                    }
                  } catch(err){
                    console.warn(err);
                  }
                }}>
                  <Image
                      style={{width: screenWidth * 0.8, height: screenWidth * 0.8}}
                      source={{
                      uri: "data:image/png;base64," + imageLink,
                  }}/>
                </TouchableOpacity>
                
              </View>
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
      paddingTop: '10%',
    },
    buttonsContainer:{
      flex: 1,
      flexDirection: 'column',
      marginTop: '5%',
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

export default GenerateImage;