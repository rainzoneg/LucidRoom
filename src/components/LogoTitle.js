import React from 'react';
import { Image } from 'react-native';

export default function LogoTitle({styles}){
    return(
        <Image
            style={styles}
            source={require('../assets/lucidroom-logo.png')}
        />
    )
}