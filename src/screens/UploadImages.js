import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UploadImages = ({navigation}) => {
  const [images, setImages] = React.useState([]);

  const uploadPhotos = () => {
    ImageCropPicker.openPicker({
        multiple: true
    }).then((images) => {
        console.log(images);
        setImages(
          images.map((i) => {
            return{
              uri: i.path,
              width: 100,
              height: 100,
              mime: i.mime,
              name: i.path.substring(i.path.lastIndexOf('/') + 1),
            }
          }),
        );
    }).catch(err => console.log(err));
  };

  const renderImage = (image) => {
    return(
      <Image  
        style={{
          width: screenWidth * 0.5 * 0.5,
          height: screenWidth * 0.5 * 0.375,
          resizeMode: 'contain',
          marginTop: 0,
        }}
        source={image}
      />
    );
  };

  return (
    <SafeAreaView>
        <View style={styles.screenContainer}>
            <View style={{marginBottom: 24}}>
                <Text style={styles.textStyle}>Please upload training images</Text>
            </View>
            <View style={{backgroundColor: 'white', borderWidth: 0, marginBottom: 30, width: screenWidth * 0.5, height: screenHeight * 0.45}}>
              <ScrollView>
                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                  {images
                    ? images.map((i) => (
                        <View
                          style={{
                            flexBasis: '50%',
                          }}
                          key={i.uri}>
                          {renderImage(i)}
                        </View>
                      ))
                    : null}
                </View>
              </ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={uploadPhotos}>
                    <View style={styles.buttonStyle}>
                        <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Select Images</Text>
                    </View> 
                </TouchableOpacity>
                <TouchableOpacity onPress={async ()=>{
                  if(!images.length){
                    alert("Please select images for uploading.");
                  }else{
                    const form = new FormData();
                    images.forEach((item, i) => {
                      form.append("file", {
                        uri: item.uri,
                        type: item.mime,
                        name: item.name,
                      });
                    });
                    const response = await fetch("https://ce9a-35-190-188-110.ngrok-free.app/upload_training_data", {
                      body: form,
                      method: "POST",
                      headers: {},
                    })
                    console.log(response);
                  }
                }}>
                    <View style={styles.buttonStyle}>
                      <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Upload Images</Text>
                    </View> 
                </TouchableOpacity>
                <TouchableOpacity onPress={async ()=>{
                  fetch('https://ce9a-35-190-188-110.ngrok-free.app/run_dreambooth')
                  .then(ToastAndroid.show("DreamBooth processing. Please wait 10 minutes.", ToastAndroid.SHORT))
                  .then(navigation.navigate('HomeScreen'))
                }}>
                    <View style={styles.buttonStyle}>
                      <Text style={{color:'white', fontSize: 18, fontWeight:600}}>Run Dreambooth</Text>
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
    paddingTop: '4%',
  },
  buttonsContainer:{
    flex: 1,
    flexDirection: 'column',
    gap: 30,
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
  textStyle:{
    fontSize: 20,
    fontWeight: 700,
    color: 'black'
  }
});

export default UploadImages;