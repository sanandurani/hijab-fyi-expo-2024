// This file sets up the navigation system of the app. It allows users to move between different screens (Home, Recipies, Information, etc.)
// It also adds a bottom tab navigation menu so users can switch between main sections easily.

// Importing the basic tools needed for creating and handling screens in the app
import * as React from 'react'; // Importing React so we can create components (building blocks of the app)
import { NavigationContainer } from '@react-navigation/native'; // This is like the container that holds and manages all the different screens of the app
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Allows navigation between different screens like pages in a book
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Creates a navigation bar at the bottom to switch between screens easily
import Home from './sourcecode/Home'; // Adding the Home screen to the app
import Recipies from './sourcecode/Recipies'; // Adding the Recipies screen to the app
import Seemore from './sourcecode/Seemore'; // Adding the Seemore screen to the app
import Information from './sourcecode/Information'; // Adding the Information screen to the app
import About from './sourcecode/About'; // Adding the About screen to the app
import Icon from 'react-native-vector-icons/Ionicons'; // Adding icons from Ionicons to show nice icons in the tab navigation
import Summary from './sourcecode/Summary'; // Adding the Summary (Calculator) screen to the app

// Creating a Stack Navigator (a way to navigate between screens with back and forward like a stack of pages)
const Stack = createNativeStackNavigator(); 
// Creating a Tab Navigator (for switching between different sections of the app using a bottom tab menu)
const Tab = createBottomTabNavigator(); 

// Function that creates a Stack of screens related to Recipes
function RecipieStack() {
  return(
    <Stack.Navigator 
      // Setting up some screen appearance options, like making the header plain and removing the shadow effect
      screenOptions={{
        headerStyle: {
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          backgroundColor: '#f5f5f5' // Sets the header background to a light gray
        },
        headerShadowVisible: false // Makes sure the header doesn't show a shadow
      }}
    >
      <Stack.Screen
        name='Recipies' // Naming this screen "Recipies" so it can be called when needed
        component={Recipies} // Tells the app to use the Recipies component when this screen is shown
        options={{headerShown: false}} // Hides the header (the top bar) for this screen
      />
      <Stack.Screen
        name='Seemore' // Naming this screen "Seemore"
        component={Seemore} // Tells the app to use the Seemore component when this screen is shown
        options={{headerTitle: ''}} // Leaves the title area empty in the header
      />
    </Stack.Navigator>
  )
}

// Main function that sets up the entire app navigation
function App() {
  return (
    // The container that holds all the navigation setup
    <NavigationContainer>
      {/* Tab Navigator to create the bottom menu for switching between different sections */}
      <Tab.Navigator 
      // Sets up the look and feel for each tab in the bottom navigation
      screenOptions={({ route }) => ({
        // For each tab, show a different icon based on whether it's selected (focused) or not
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
    
          // Check the name of the screen (route.name) and assign the correct icon
          if (route.name === 'Home') {
            iconName = focused ? 'fast-food' : 'fast-food-outline'; // Icon for Home screen (focused = selected)
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline'; // Icon for Calculator screen
          } else if (route.name === 'Recipie') {
            iconName = focused ? 'restaurant' : 'restaurant-outline'; // Icon for Recipie screen
          } else if (route.name === 'Information') {
            iconName = focused ? 'information' : 'information-outline'; // Icon for Information screen
          } else if (route.name === 'About') {
            iconName = focused ? 'bag-add' : 'bag-add-outline'; // Icon for About screen
          }          
    
          return <Icon name={iconName} size={size} color={color} />; // Returns the icon for each tab
        },
        tabBarActiveTintColor: 'tomato', // Color of the icon when selected
        tabBarInactiveTintColor: 'gray', // Color of the icon when not selected
        headerShown: false, // Hides the top header for all tabs
      })}
      >
        {/* Adding the Home screen to the bottom tab menu */}
        <Tab.Screen name="Home" component={Home} />
        {/* Adding the Calculator screen (Summary) to the bottom tab menu */}
        <Tab.Screen name="Calculator" component={Summary} />
        {/* Adding the RecipieStack (group of screens) to the bottom tab menu */}
        <Tab.Screen name="Recipie" component={RecipieStack} />
        {/* Adding the Information screen to the bottom tab menu */}
        <Tab.Screen name="Information" component={Information} />
        {/* Adding the About screen to the bottom tab menu */}
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer> 
  );
}

// Exporting the main App component so it can be used elsewhere in the project
export default App;
