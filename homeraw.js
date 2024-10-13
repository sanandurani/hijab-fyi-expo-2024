// This file is the main screen (Home screen) of the app. It displays a list of foods based on their categories
// (like Fruit, Vegetable, etc.) and allows users to search for a food by name. The user can also switch between
// food categories by clicking buttons at the top of the screen.

// Importing the basic tools needed for creating the Home screen
import React, {useEffect, useState} from 'react'; // Importing React and two useful hooks: useState (for handling data) and useEffect (for handling actions when the component loads)
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'; // These are the building blocks for creating the layout and interactive parts of the screen
import foodData from '../assets/raw_data/completedata.json'; // Importing the list of food data from a local JSON file
import { Avatar } from '@rneui/themed'; // Importing Avatar (circular image/icon) from React Native Elements
import { Icon } from '@rneui/base'; // Importing Icon to display small images/icons in the app

// This is the main function that creates the Home screen component
export default function Home({navigation}) {
    // useState allows us to store and manage data in the component (in this case, the food categories and food list)
    const [foodCategories, setFoodCategories] = useState([ // Initial state for food categories with a list of category objects
        {
            title: 'Fruit', // Category name
            selected: true // This means this category is selected by default
        },
        {
            title: 'Vegetable',
            selected: false // This category is not selected
        },
        {
            title: 'Indian Cuisine',
            selected: false
        },
        {
            title: 'Mexican Cuisine',
            selected: false
        },
        {
            title: 'Chinese Cuisine',
            selected: false
        },
        {
            title: 'Afghani Cuisine',
            selected: false
        },
        {
            title: 'Italian Cuisine',
            selected: false
        }
    ]);

    // Initial state for the food list, filtering the food data to show only fruits at the start
    const [foodList, setFoodList] = useState(foodData.filter(fd => fd.type === 'Fruit'));

    // Function to handle the selection of a food category
    const handleCategorySelect = (index) => {
        // Updates the selected state of categories when a user clicks on one
        const updatedCategories = foodCategories.map((item, i) => {
            return {
                ...item, // Keep everything in the category object the same
                selected: i === index // Mark the clicked category as selected, and others as not selected
            };
        });

        // Updating the categories state with the new selected category
        setFoodCategories(updatedCategories);

        // Find the newly selected category and filter the food list to match it
        const title = updatedCategories.find(uC => uC.selected);
        setFoodList(foodData.filter(fd => fd.type === title.title));
    };

    // Function to search for a food by name
    const filterTextSearch = (searchText) => {
        if (searchText.trim().length > 0) { // Check if the search text is not empty
            // Filter the food list to match the search text
            setFoodList(foodList.filter(fd => fd.food_name.toLowerCase().includes(searchText.toLowerCase())));
        } else {
            // If no search text, just show foods from the selected category
            const title = foodCategories.find(uC => uC.selected);
            setFoodList(foodData.filter(fd => fd.type === title.title));
        }
    };

    // The return statement defines what will be shown on the screen
    return (
        <SafeAreaView style={{backgroundColor: '#f9f9f9', flex: 1}}> {/* SafeAreaView ensures content doesn't overlap the top/bottom edges */}
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Food List</Text> {/* This is the screen's title */}
            </View>
            <View style={styles.searchContainer}>
                <Icon name='search'/> {/* Search icon */}
                <TextInput
                    onChangeText={(text) => filterTextSearch(text)} // Calls the search function every time the user types something
                    placeholder='Search for a food...' // Placeholder text in the search box
                    placeholderTextColor="#888" // Color of the placeholder text
                />
            </View>

            {/* Scrollable row of category buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 8}} contentContainerStyle={styles.categoryScroll}>
                {
                    // Mapping through food categories to create a button for each
                    foodCategories.map((item, index) => (
                        <TouchableOpacity key={index} // TouchableOpacity makes the buttons clickable
                            onPress={() => handleCategorySelect(index)} // When clicked, select this category
                            style={[
                                styles.categoryButton, 
                                { 
                                    borderBottomColor: item.selected ? 'green' : '#00000000', // Highlight the selected category in green
                                    borderBottomWidth: item.selected ? 1.5 : 0.5, // Thicker border for selected, thinner for non-selected
                                }
                            ]}
                        >
                            <Text style={styles.categoryButtonText}>{item.title}</Text> {/* Display category name */}
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

            {/* FlatList to display the list of foods */}
            <FlatList
                contentContainerStyle={styles.foodList}
                data={foodList} // List of foods to display
                keyExtractor={(item) => item.food_name.toString()} // Unique key for each food item
                renderItem={({ item }) => { // Function that defines how each food item is displayed
                    const color = item.category === 3 ? '#8B0000' : item.category === 2 ? '#C2B280' : '#2C5F2D'; // Color based on the food's category
                    return(
                    <View style={[
                        styles.foodItem, 
                    ]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={styles.foodName}>{item.food_name}</Text> {/* Name of the food */}
                            {/* Icons for different categories of foods */}
                            <Icon style={{ display: item.category === 1 ? 'flex':'none' }} color={color} name='happy-outline' type='ionicon' />
                            <Icon style={{ display: item.category === 2 ? 'flex':'none' }} color={color} name='sad-outline' type='ionicon'/>
                            <Icon style={{ display: item.category === 3 ? 'flex':'none' }} color={color} name='skull-outline' type='ionicon'/>
                        </View>
                        <Text style={styles.foodType}>{item.type}</Text> {/* Type of food (like Fruit, Indian Cuisine, etc.) */}
                        <Text style={styles.foodInfo}>Glycemic Index: {item.glycemic_index}</Text> {/* Glycemic Index value */}
                        <Text style={styles.foodInfo}>Glycemic Load: {item.glycemic_load}</Text> {/* Glycemic Load value */}
                    </View>
                )}}
            />
        </View>
        </SafeAreaView>
    );
}

// Styles for the layout and appearance of the screen
const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 0,
        alignItems: 'center',
        flexDirection: 'row',  
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f1f1f',
      },
      summaryBtn: {
        padding: 12,
        backgroundColor: 'orange',
        paddingHorizontal: 30,     
        borderRadius: 30,  
        borderColor: 'black',
        borderWidth: 2,             
      },
      summaryBtnText: {
        color: 'black',
        fontSize: 18,
      },
    container: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    searchContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop : 8,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        display: 'flex',
        padding: 5,
        alignItems: 'center',
    },
    categoryScroll: {
        marginTop: 8,
        marginBottom: 16
    },
    categoryButton: {
        padding: 5,
        height: 40,
        justifyContent: 'center'
    },
    categoryButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    foodList: {
        gap: 5
    },
    foodItem: {
        borderRadius: 5,
        borderColor: '#00000050',
        borderWidth: 0.5,
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    foodName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10
    },
    foodType: {
        color: 'black',
        fontSize: 16,
        marginTop: 2
    },
    foodInfo: {
        color: 'black',
        fontSize: 14,
        marginTop: 2
    }
});
