// This file is responsible for displaying a list of recipes on the screen.
// The user can tap on a recipe to see more details on a different screen.

// Importing the basic tools needed to create and manage the recipe list
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'; // These components help display lists, text, and handle user interaction
import recipesData from '../assets/raw_data/recipies.json'; // Importing the recipe data from a JSON file

// Main function that creates the RecipeList screen component
export default function RecipeList({navigation}) {
  // useState is used to manage state in this component (though we're not using it heavily in this file)
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null); // This state is used to track the currently expanded recipe, but it's not used for now
  
  // Function to handle the "See More" button click
  // It navigates to a different screen (Seemore) and passes the selected recipe data to that screen
  const handleSeeMore = (recipe) => {
    navigation.navigate('Seemore', {recipe: recipe }) // Navigate to the 'Seemore' screen with the clicked recipe's details
  };

  // The return statement defines what will be shown on the screen
  return (
    <SafeAreaView style={styles.container}> {/* SafeAreaView ensures the content doesn't overlap with the screen edges */}
      <Text style={styles.headerText}>Recipies</Text> {/* Displays the header/title text for the screen */}
      
      {/* FlatList is used to display a list of items (recipes in this case) */}
      <FlatList
        style={{width: '100%', paddingHorizontal: 20, marginBottom: 10}} // Styles for the FlatList container
        contentContainerStyle={{gap: 10}} // Adds some space between the list items
        data={recipesData.recipes} // The list of recipes to be displayed (coming from the JSON file)
        keyExtractor={(item) => item.name} // Assigns a unique key to each recipe (using the recipe name)
        renderItem={({ item, index }) => ( // Function that defines how each recipe item is displayed
          <TouchableOpacity style={styles.recipeItem} onPress={() =>handleSeeMore(item)}> {/* Makes each recipe clickable */}
            <Text style={styles.recipeTitle}>{item.name}</Text> {/* Displays the name of the recipe */}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// Styles that define the layout and appearance of the RecipeList screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    backgroundColor: '#f9f9f9', // Light gray background color
  },
  headerText: {
    padding: 20, // Adds space around the text
    fontSize: 24, // Large font size for the header
    fontWeight: 'bold', // Bold font for emphasis
    color: '#1f1f1f', // Dark gray text color
  },
  recipeItem: {
    backgroundColor: '#fff', // White background for each recipe item
    borderWidth: 0.5, // Thin border around each recipe item
    borderColor: "#00000050", // Light gray border color
    justifyContent: 'center', // Centers the content inside the recipe item
    padding: 12, // Adds padding inside each recipe item
    borderRadius: 10, // Rounded corners for each recipe item
  },
  recipeTitle: {
    color: '#000', // Black text color for the recipe name
    fontSize: 18 // Medium font size for the recipe name
  }
});
