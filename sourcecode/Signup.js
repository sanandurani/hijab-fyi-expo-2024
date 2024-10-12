import * as React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

export default function Signup( {navigation} ) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/app_logo.png')} style={{ height: '50%', width: '50%' }}></Image>
        <Text>SplitNSettle</Text>
        <TouchableOpacity 
        onPress={ () => {navigation.navigate('Login')}} 
        style={{ borderColor: 'red', borderWidth: 1, borderRadius: 5, width: 100 }}>
            <Text>Login</Text>
        </TouchableOpacity>
    </View>
  );
}