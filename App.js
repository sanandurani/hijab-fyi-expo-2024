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
Icon.loadFont().then(() => {
  console.log('Ionicons font loaded');
});

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

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
    
          if (route.name === 'Home') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'RecipieStack') {
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="RecipieStack" component={RecipieStack} />
        <Tab.Screen name="Information" component={Information} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer> 
  );
}

export default App;