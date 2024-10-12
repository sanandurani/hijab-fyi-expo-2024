import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import recipesData from '../assets/raw_data/recipies.json'; // Path to your recipes JSON file

export default function RecipeList({navigation}) {
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null); // Initialize state for expanded recipe
  
  // Function to handle "See More" button click
  const handleSeeMore = (recipe) => {
    navigation.navigate('Seemore', {recipe: recipe })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recipies</Text>
      <FlatList
        style={{width: '100%', paddingHorizontal: 20}}
        data={recipesData.recipes}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.recipeItem} onPress={() =>handleSeeMore(item)}>
            <Text style={styles.recipeTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  recipeItem: {
    padding: 20,
    backgroundColor: '#c3c3c3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  recipeTitle: {
    color: '#000',
    fontSize: 18
  }
});
