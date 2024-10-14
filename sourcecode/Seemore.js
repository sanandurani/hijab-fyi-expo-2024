// This file is responsible for displaying detailed information about a selected recipe, including an image, ingredients, and instructions.

import React from 'react'; // Importing React to build the component
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'; // Importing necessary React Native components

// Main function that displays detailed recipe information
export default function Seemore({ navigation, route }) {
  // Extracting the recipe object from the navigation route parameters
  const { recipe } = route.params; // route.params contains the recipe passed from the previous screen
  const { image, name, cuisine, ingredients, instructions } = recipe; // Destructure the recipe object to get individual properties

  // Function to return the correct image based on the image key in the recipe data
  function imageUrl() {
    switch (image) { // The switch statement checks which image string is provided
      case 'tacos':
        return require('../assets/tacos.jpg'); // Returns the path to the correct image
      case 'biryani':
        return require('../assets/biryani.jpg');
      case 'veg-stir-fry':
        return require('../assets/vege.jpg');
      case 'lasagna':
        return require('../assets/lasagna.jpg');
      case 'paneer-tikka':
        return require('../assets/paneer.jpg');
      case 'pasta-carbonara':
        return require('../assets/pasta.jpg');
      case 'afghani-kebab':
        return require('../assets/afghani.jpg');
      case 'fish-curry':
        return require('../assets/fish.jpg');
      case 'chicken-stir-fry':
        return require('../assets/chicken.jpg');
      case 'fried-rice':
        return require('../assets/fried.jpg');
      case 'quesadilla':
        return require('../assets/que.jpg');
      case 'dosa':
        return require('../assets/dosa.jpg');
      case 'shrimp-fried-rice':
        return require('../assets/shrimp.jpg');
      case 'tandoori-chicken':
        return require('../assets/tandoor.jpg');
      case 'eggplant-parmesan':
        return require('../assets/eggplant.jpg');
      case 'samosa':
        return require('../assets/samosa.jpg');
      case 'guacamole-with-chips':
        return require('../assets/chips.jpg');
      case 'chapli-kebab':
        return require('../assets/chapli.jpg');
      case 'ravioli-with-tomato-sauce':
        return require('../assets/ravioli.jpg');
      case 'prawn-curry':
        return require('../assets/prawn.jpg');
      default:
        return require('../assets/prawn.jpg'); // Returns a default image if none of the cases match
    }
  }

  // The return statement defines the UI elements displayed on the screen
  return (
    <ScrollView contentContainerStyle={styles.container}> {/* ScrollView ensures content is scrollable */}
    
      {/* Recipe Image */}
      <Image
        source={imageUrl()} // Calls the imageUrl function to get the correct image based on the recipe data
        style={styles.recipeImage} // Applies the defined styles for the image
        resizeMode="cover" // Ensures the image covers the available space without distortion
      />

      <View style={styles.subContainerSpacing}>
        {/* Recipe Name */}
        <Text style={[styles.recipeName, styles.fontWeightBold, styles.textColor, styles.mainTitleSize]}>{name}</Text> {/* Displays the recipe name */}
        {/* Cuisine Type */}
        <Text style={[styles.cuisineType, styles.subTitleContentSize]}>Cuisine: {cuisine}</Text> {/* Displays the cuisine type, like Italian or Indian */}
      </View>
      
      <View style={styles.subContainerSpacing}>
        {/* Ingredients Section */}
        <Text style={[styles.sectionTitle, styles.fontWeightBold, styles.textColor, styles.subTitleSize]}>Ingredients:</Text> {/* Title for the ingredients section */}
        
        {/* Displays each ingredient with its glycemic values */}
        <View style={{gap: 5}}>
          {ingredients.map((ingredient, index) => ( // Maps over the ingredients array to display each ingredient with details
            <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap',}}> {/* Displays ingredients in rows */}
              {/* Ingredient name */}
              <Text style={[styles.textColor, styles.contentSize]}>
                {ingredient.name}: {/* Displays the name of the ingredient */}
              </Text>
              {/* Glycemic index, glycemic load, and category */}
              <Text style={[styles.subTextColor, styles.contentSize]}>
                (GI: {ingredient.glycemic_index}, GL: {ingredient.glycemic_load}, Category: 
                {ingredient.category === 3 ? 'Worse' : ingredient.category === 2 ? 'Bad' : 'Good'}) {/* Conditional rendering of category */}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.subContainerSpacing}>
        {/* Instructions Section */}
        <Text style={[styles.sectionTitle, styles.fontWeightBold, styles.textColor, styles.subTitleSize]}>Instructions:</Text> {/* Title for the instructions section */}
        
        {/* Displays each instruction step */}
        <View>
          {instructions.map((instruction, index) => ( // Maps over the instructions array to display each instruction
            <Text key={index} style={[styles.instructions, styles.contentSize]}>
              {index + 1}. {instruction} {/* Displays each instruction as a numbered step */}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Styles for the overall container, applying spacing and background color
  container: {
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5', // Light background color
    gap: 20 // Space between items
  },
  subContainerSpacing: {
    gap: 10 // Adds spacing between subcontainers
  },
  fontWeightBold: {
    fontWeight: 'bold', // Bold text style for emphasis
  },
  textColor: {
    color: '#000000', // Black text color for readability
    fontWeight: 'bold' // Bold text style
  },
  subTextColor: {
    marginLeft: 5, // Adds some spacing to the left for sub-text
    color: '#000000' // Black color for sub-text
  },
  mainTitleSize: {
    fontSize: 30 // Large font size for main titles (e.g., recipe name)
  },
  subTitleSize: {
    fontSize: 28 // Slightly smaller font size for subtitles (e.g., section titles like "Ingredients")
  },
  subTitleContentSize: {
    fontSize: 18 // Medium font size for content under subtitles (e.g., cuisine type)
  },
  contentSize: {
    fontSize: 16 // Standard font size for most content (e.g., ingredients, instructions)
  },
  textAlignCenter: {
    textAlign: 'center' // Centers the text
  },
  recipeImage: {
    width: '100%', // Makes the image take up the full width of the container
    height: 250, // Sets a fixed height for the recipe image
    borderRadius: 10, // Rounds the corners of the image
  },
  cuisineType: {
    fontStyle: 'italic', // Italic style for the cuisine type (e.g., "Italian")
    color: '#666', // Gray color for the cuisine type text
  },
});
