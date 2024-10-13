import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function Seemore({ navigation, route }) {
  const { recipe } = route.params; // Destructure recipe object
  const {image, name, cuisine, ingredients, instructions } = recipe;

  function imageUrl() {
    switch (image) {
      case 'tacos':
      return require('../assets/tacos.jpg')

      case 'biryani':
      return require('../assets/biryani.jpg')

      case 'veg-stir-fry':
      return require('../assets/vege.jpg')

      case 'lasagna':
      return require('../assets/lasagna.jpg')

      case 'paneer-tikka':
      return require('../assets/paneer.jpg')

      case 'pasta-carbonara':
      return require('../assets/pasta.jpg')

      case 'afghani-kebab':
      return require('../assets/afghani.jpg')

      case 'fish-curry':
      return require('../assets/fish.jpg')

      case 'chicken-stir-fry':
      return require('../assets/chicken.jpg')

      case 'fried-rice':
      return require('../assets/fried.jpg')

      case 'quesadilla':
      return require('../assets/que.jpg')

      case 'dosa':
      return require('../assets/dosa.jpg')

      case 'shrimp-fried-rice':
      return require('../assets/shrimp.jpg')

      case 'tandoori-chicken':
      return require('../assets/tandoor.jpg')

      case 'eggplant-parmesan':
      return require('../assets/eggplant.jpg')

      case 'samosa':
      return require('../assets/samosa.jpg')

      case 'guacamole-with-chips':
      return require('../assets/chips.jpg')

      case 'chapli-kebab':
      return require('../assets/chapli.jpg')

      case 'ravioli-with-tomato-sauce':
      return require('../assets/ravioli.jpg')

      case 'prawn-curry':
      return require('../assets/prawn.jpg')
      
      default:
      return require('../assets/prawn.jpg')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
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
          <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap',}}>
            <Text style={[styles.textColor, styles.contentSize]}>
              {ingredient.name}:
            </Text>
            <Text style={[styles.subTextColor, styles.contentSize]}>
              (GI: {ingredient.glycemic_index}, GL: {ingredient.glycemic_load}, Category: {ingredient.category === 3 ? 'Worse' : ingredient.category === 2 ? 'Bad' : 'Good'})
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
            <Text key={index} style={[styles.instructions, styles.contentSize]}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
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
    color: '#000000',
    fontWeight: 'bold'
  },
  subTextColor: {
    marginLeft: 5,
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
