import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Seemore({ navigation, route }) {
  const { recipe } = route.params; // Destructure recipe object
  const {image, name, cuisine, ingredients, instructions } = recipe;

  function imageUrl() {
    switch (image) {
      case 'tacos':
      return require('../assets/tacos.png')

      case 'biryani':
      return require('../assets/biryani.png')

      case 'veg-stir-fry':
      return require('../assets/vege.png')

      case 'lasagna':
      return require('../assets/lasagna.png')

      case 'paneer-tikka':
      return require('../assets/paneer.png')

      case 'pasta-carbonara':
      return require('../assets/pasta.png')

      case 'afghani-kebab':
      return require('../assets/afghani.png')

      case 'fish-curry':
      return require('../assets/fish.png')

      case 'chicken-stir-fry':
      return require('../assets/chicken.png')

      case 'fried-rice':
      return require('../assets/fried.png')

      case 'quesadilla':
      return require('../assets/que.png')

      case 'dosa':
      return require('../assets/dosa.png')

      case 'shrimp-fried-rice':
      return require('../assets/shrimp.png')

      case 'tandoori-chicken':
      return require('../assets/tandoor.png')

      case 'eggplant-parmesan':
      return require('../assets/eggplant.png')

      case 'samosa':
      return require('../assets/samosa.png')

      case 'guacamole-with-chips':
      return require('../assets/chips.png')

      case 'chapli-kebab':
      return require('../assets/chapli.png')

      case 'ravioli-with-tomato-sauce':
      return require('../assets/ravioli.png')

      case 'prawn-curry':
      return require('../assets/prawn.png')
      
      default:
      return require('../assets/prawn.png')
    }
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={imageUrl()}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.subContainerSpacing}>
        {/* Cuisine Type */}
        <Text style={[styles.recipeName, styles.fontWeightBold, styles.textColor, styles.mainTitleSize]}>{name}</Text>
        <Text style={[styles.cuisineType, styles.subTitleContentSize]}>Cuisine: {cuisine}</Text>
      </View>
      
      <View style={styles.subContainerSpacing}>
        {/* Ingredients */}
        <Text style={[styles.sectionTitle, styles.fontWeightBold, styles.textColor, styles.subTitleSize,]}>Ingredients:</Text>
        <View style={{gap: 5}}>
        {ingredients.map((ingredient, index) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Text style={[styles.ingredient, styles.textColor, styles.contentSize]} key={index}>
              {ingredient.name}:
            </Text>
            <Text style={[styles.ingredient, styles.textColor, styles.contentSize]} key={index}>
              (GI: {ingredient.glycemic_index}, GL: {ingredient.glycemic_load}, Category: {ingredient.category})
            </Text>
          </View>
        ))}
        </View>
      </View>

      <View style={styles.subContainerSpacing}>
        {/* Instructions */}
        <Text style={[styles.sectionTitle, styles.fontWeightBold, styles.textColor, styles.subTitleSize, ]}>Instructions:</Text>
        <View>
          {instructions.map((instruction, index) => (
            <Text style={[styles.instructions, styles.contentSize]} key={index}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5', // Light background
    gap: 20
  },
  subContainerSpacing: {
    gap: 10
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  textColor: {
    color: '#000000'
  },
  mainTitleSize: {
    fontSize: 30
  },
  subTitleSize: {
    fontSize: 28
  },
  subTitleContentSize: {
    fontSize: 18
  },
  contentSize: {
    fontSize: 16
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  cuisineType: {
    fontStyle: 'italic',
    color: '#666',
  },
  
});
