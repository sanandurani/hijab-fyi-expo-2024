// In App.js in a new project
//API:
//https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FDC/getFoods
//Chat gpt secret key: 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
//Supabase password: fY12@p!_#@ss

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './sourcecode/Home';
import Recipies from './sourcecode/Recipies';
import Seemore from './sourcecode/Seemore';
import Information from './sourcecode/Information';
import About from './sourcecode/About';
import Icon from 'react-native-vector-icons/Ionicons';
import Summary from './sourcecode/Summary';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RecipieStack() {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#f5f5f5'
        },
        headerShadowVisible: false
      }}

    >
      <Stack.Screen
        name='Recipies'
        component={Recipies}
        options={{headerShown: false}}

      />
      <Stack.Screen
        name='Seemore'
        component={Seemore}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#f5f5f5'
        },
        headerShadowVisible: false
      }}

    >
      <Stack.Screen
        name='HomeScreen'
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Summary'
        component={Summary}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  )}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
    
          if (route.name === 'Home') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Recipie') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Information') {
            iconName = focused ? 'information' : 'information-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'bag-add' : 'bag-add-outline';
          }          
    
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hides the header for all tabs
      })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Calculator" component={Summary} />
        <Tab.Screen name="Recipie" component={RecipieStack} />
        <Tab.Screen name="Information" component={Information} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer> 
  );
}

export default App
;