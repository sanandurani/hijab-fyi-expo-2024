import React, {useState} from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('Users');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login( {navigation} ) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    async function authentication(){
        const userKey = `${name}-${email}`;
        const user = await usersCollection.doc(userKey).get();
        console.log()
        if (user.data() !== undefined) {
            //Users already exists.
            console.log(user.data())
            await AsyncStorage.setItem('userEmail', user.data().email);
            await AsyncStorage.setItem('userName', user.data().name);
            navigation.navigate('Home');
        }
        else {
            firestore()
            .collection('Users')
            .doc(userKey)
            .set({
                name: name,
                email: email
            })
            .then(()=>{
                console.log("User added");
            })
            .catch((ex)=>{
                console.log("Err", ex)
            });
            alert('User New')
        }
    };

  return (
    <View style={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
        <TextInput onChangeText={(text)=>setName(text)} placeholder='Name'></TextInput>
        <TextInput onChangeText={(text)=>setEmail(text)} placeholder='Email'></TextInput>
        <TouchableOpacity onPress={authentication}> 
            <Text>Login</Text>
        </TouchableOpacity>
    </View>
  );
}