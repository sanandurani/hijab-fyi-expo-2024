// This file is the Summary screen of the app. It allows users to select foods from a list and calculate
// the total and average glycemic index (GI) and glycemic load (GL) for their selected items. The user can also 
// search for foods and manage their selections using a modal popup.

// Importing the necessary tools to create and display the Summary screen
import React, { useState } from 'react'; // Importing React to build the component, and useState to manage data that changes
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet, Modal, SafeAreaView } from 'react-native'; // These components allow us to create lists, buttons, modals, and more
import { Icon } from '@rneui/base'; // Importing Icon to use icons for UI elements
import foodData from '../assets/raw_data/completedata.json'; // Importing food data (glycemic values) from a local JSON file

// Main function that creates the Summary screen component
export default function Summary() {
    // Sorting the list of food items alphabetically by their name when the screen loads
    const sortedFoodData = foodData.sort((a, b) => a.food_name.localeCompare(b.food_name));
    
    // useState is a function that lets you "store" values that might change (for example, the list of selected foods)
    const [foodList, setFoodList] = useState(sortedFoodData); // This holds the list of all foods
    const [selectedItems, setSelectedItems] = useState([]); // This holds the list of foods the user selects
    const [isModalVisible, setModalVisible] = useState(false); // This controls whether the search modal is visible or not

    // Function that allows the user to select or deselect food items
    const toggleSelection = (item) => {
        // If the item is already selected (exists in the selectedItems list), remove it
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            // If the item is not selected, add it to the selectedItems list
            setSelectedItems([...selectedItems, item]);
        }
    };

    // This function calculates the total glycemic index and glycemic load, as well as their averages for the selected items
    const calculateTotals = () => {
        let glycemicIndex = 0; // Total glycemic index for selected items
        let glycemicLoad = 0; // Total glycemic load for selected items
        let glycemicIndexAvg = 0; // Average glycemic index for selected items
        let glycemicLoadAvg = 0; // Average glycemic load for selected items
      
        // Looping through each selected food item to sum their glycemic index and load
        for (let item of selectedItems) {
          glycemicIndex += item.glycemic_index; // Add each food's glycemic index to the total
          glycemicLoad += item.glycemic_load; // Add each food's glycemic load to the total
        }
        
        // Now let's calculate the averages for glycemic index and glycemic load
        // First, we divide the total glycemicIndex and glycemicLoad by the number of selected items.
        // To ensure we're handling situations where no items are selected, we use a few checks here.

        // isNaN stands for "is Not a Number". It checks if the result of dividing glycemicIndex by the number of selected items is NaN (not a number).
        // This happens when no items are selected (because dividing by 0 results in NaN).
        // parseInt is used here to convert the result to a whole number (integer), ignoring any decimals.
        glycemicIndexAvg = isNaN(glycemicIndex / selectedItems.length) ? 0 : parseInt(glycemicIndex / selectedItems.length);

        // The same process happens here for glycemicLoadAvg, where we calculate the average glycemic load in a similar way.
        glycemicLoadAvg = isNaN(glycemicLoad / selectedItems.length) ? 0 : parseInt(glycemicLoad / selectedItems.length);

        // Return the calculated total and average values, so they can be displayed on the screen
        return { glycemicIndex, glycemicLoad, glycemicIndexAvg, glycemicLoadAvg };
      };
      
    // Function that clears all selected food items when the user presses "Clear"
    const clearSelections = () => setSelectedItems([]); // Simply resets the selectedItems list to be empty

    // Here, we call calculateTotals to get the current totals and averages for glycemic index and load
    const { glycemicIndex, glycemicLoad, glycemicIndexAvg, glycemicLoadAvg } = calculateTotals();

    // The return statement defines what will be displayed on the screen
    return (
        <SafeAreaView style={{flex: 1}}> {/* SafeAreaView helps make sure the content doesn't overlap with the phone's edges */}
            <View style={styles.container}> {/* Main container for the screen content */}
                
                {/* Header section with the title */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Balance your energy with GI.</Text> {/* Display the title of the screen */}
                </View>

                {/* A button that opens the search modal when pressed */}
                <TouchableOpacity style={styles.searchContainer} onPress={() => setModalVisible(true)}> 
                    <Icon name="search" /> {/* Search icon */}
                    <Text>Search</Text> {/* Search text */}
                </TouchableOpacity>
                
                {/* A row of selected food items, displayed as "chips" (small buttons) */}
                <View style={styles.chipsContainer}>
                    {/* If the user selects fewer than 6 items, show each item as a chip */}
                    {selectedItems.length < 6 ? selectedItems.map((item) => (
                        <TouchableOpacity
                            key={item.food_name} // Each item needs a unique key
                            style={styles.chip} // Style for the chip
                            onPress={() => toggleSelection(item)} // Clicking the chip removes it from the selection
                        >
                            <Text style={styles.chipText}>{item.food_name}</Text> {/* Show the food name */}
                        </TouchableOpacity>
                    )) : // If 6 or more items are selected, just show how many items have been selected
                    <Text style={[styles.chipText, {color: 'black'}]}>{selectedItems.length} Selected</Text>
                    }
                </View>

                {/* This modal shows the list of all foods when the user searches */}
                <Modal visible={isModalVisible} animationType="slide">
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={foodList} // The list of foods to display in the modal
                            keyExtractor={(item) => item.food_name.toString()} // Each item needs a unique key
                            renderItem={({ item }) => ( // How to display each item in the list
                                <TouchableOpacity
                                    style={[
                                        styles.modalItem,
                                        selectedItems.includes(item) ? styles.selectedItem : {}, // Highlight selected items
                                    ]}
                                    onPress={() => toggleSelection(item)} // Clicking the item selects or deselects it
                                >
                                    <Text style={{ color: 'black' }}>{item.food_name}</Text> {/* Show the food name */}
                                </TouchableOpacity>
                            )}
                        />
                        {/* Button to close the modal */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Done</Text> {/* Button text */}
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* Card that shows the totals and averages for glycemic index and load */}
                <View style={[styles.card]}>
                    <View style={{padding: 8}}>
                        <Text style={{fontSize: 18, fontWeight: '800', color: '#000000'}}>Total:</Text> {/* Title for the total section */}
                        
                        {/* Row showing the total glycemic index */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.totalsText}>Glycemic Index:</Text>
                            {/* Showing the total glycemic index inside a styled box */}
                            <Text style={{
                                borderColor: 'black',
                                borderWidth: 0.5,
                                padding: 4,
                                borderRadius: 15,
                                minWidth: 30,
                                height: 30,
                                color: 'black',
                                textAlign: 'center',
                                lineHeight: 20
                            }}
                            >{glycemicIndex}</Text> {/* Show the total glycemic index value */}
                        </View>

                        {/* Row showing the total glycemic load */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={styles.totalsText}>Glycemic Load:</Text>
                            {/* Showing the total glycemic load inside a styled box */}
                            <Text style={{
                                borderColor: 'black',
                                borderWidth: 0.5,
                                padding: 4,
                                borderRadius: 15,
                                minWidth: 30,
                                height: 30,
                                color: 'black',
                                textAlign: 'center',
                                lineHeight: 20
                            }}
                            >{glycemicLoad}</Text> {/* Show the total glycemic load value */}
                        </View>
                    </View>

                    {/* Horizontal divider */}
                    <View style={{width: '100%', height: 0.5, backgroundColor: "#00000050"}} />

                    <View style={{padding: 8}}>
                        <Text style={{fontSize: 18, fontWeight: '800', color: '#000000'}}>Average:</Text> {/* Title for the average section */}
                        
                        {/* Row showing the average glycemic index */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={styles.totalsText}>Glycemic Index:</Text>
                            {/* Showing the average glycemic index inside a styled box, with color indicating how high it is */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 0.5,
                                padding: 4,
                                borderRadius: 15,
                                minWidth: 30,
                                height: 30,
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor : glycemicIndexAvg > 20 ? "#8B0000" : glycemicIndexAvg < 20 && glycemicIndexAvg > 10 ? "#C2B280": "#2C5F2D",
                            }}>
                                <Text style={{color: 'white'}}>{glycemicIndexAvg}</Text> {/* Show the average glycemic index */}
                            </View>
                        </View>

                        {/* Row showing the average glycemic load */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={styles.totalsText}>Glycemic Load:</Text>
                            {/* Showing the average glycemic load inside a styled box, with color indicating how high it is */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 0.5,
                                padding: 4,
                                borderRadius: 15,
                                minWidth: 30,
                                height: 30,
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor : glycemicLoadAvg > 20 ? "#8B0000" : glycemicLoadAvg < 20 && glycemicLoadAvg > 10 ? "#C2B280": "#2C5F2D",
                            }}>
                                <Text style={{color: 'white'}}>{glycemicLoadAvg}</Text> {/* Show the average glycemic load */}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Button to clear all selections */}
                <TouchableOpacity style={styles.clearButton} onPress={clearSelections}>
                    <Text style={styles.clearButtonText}>Clear</Text> {/* Button text */}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Styles for the layout and appearance of the Summary screen
const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes the container take up the full screen
        backgroundColor: '#f9f9f9', // Light background color
        paddingHorizontal: 15, // Horizontal padding for spacing
        paddingVertical: 10, // Vertical padding for spacing
    },
    headerContainer: {
        marginBottom: 20, // Space below the header
        alignItems: 'center', // Center the header text
    },
    headerText: {
        fontSize: 24, // Large font size for the header
        fontWeight: 'bold', // Bold font for emphasis
        color: '#1f1f1f', // Dark gray text color
    },
    card: {
        backgroundColor: '#ffffff', // White background for the card
        justifyContent: 'space-between', // Space out the content inside the card
        borderRadius: 10, // Rounded corners for the card
        borderColor: '#00000050', // Light gray border color
        borderWidth: 0.5, // Thin border around the card
    },
    totalsText: {
        fontSize: 16, // Medium font size for text
        color: '#000000', // Black text color
    },
    clearButton: {
        padding: 10, // Padding inside the button
        marginTop: 24, // Space above the button
        borderRadius: 10, // Rounded corners for the button
        alignItems: 'center', // Center the button text
    },
    clearButtonText: {
        color: '#DC3545', // Red text color for the clear button
        fontSize: 16, // Medium font size for the button text
        fontWeight: 'bold', // Bold font for emphasis
    },
    searchContainer: {
        backgroundColor: 'white', // White background for the search bar
        borderColor: 'black', // Black border color
        borderWidth: 0.5, // Thin border around the search bar
        borderRadius: 10, // Rounded corners for the search bar
        width: '100%', // Full width for the search bar
        flexDirection: 'row', // Horizontal layout for the search icon and text
        padding: 10, // Padding inside the search bar
        alignItems: 'center', // Center the contents vertically
        marginBottom: 10, // Space below the search bar
    },
    chipsContainer: {
        flexDirection: 'row', // Horizontal layout for the chips
        flexWrap: 'wrap', // Wrap the chips to a new line if they don't fit in one row
        marginBottom: 10, // Space below the chips
    },
    chip: {
        backgroundColor: '#00796b', // Dark green background color for the chips
        borderRadius: 20, // Rounded corners for the chips
        paddingVertical: 5, // Vertical padding inside the chips
        paddingHorizontal: 15, // Horizontal padding inside the chips
        margin: 5, // Space around each chip
    },
    chipText: {
        color: 'white', // White text color for the chips
        fontSize: 14, // Small font size for the chip text
    },
    modalContainer: {
        flex: 1, // Full-screen modal
        justifyContent: 'center', // Center the content vertically
        backgroundColor: 'white', // White background for the modal
    },
    modalItem: {
        backgroundColor: 'white', // White background for each item in the modal
        padding: 15, // Padding inside each item
        margin: 10, // Space around each item
        borderRadius: 5, // Rounded corners for each item
    },
    selectedItem: {
        backgroundColor: '#e0f7fa', // Light blue background for selected items
    },
    closeButton: {
        backgroundColor: '#00796b', // Dark green background for the close button
        padding: 15, // Padding inside the close button
        borderRadius: 5, // Rounded corners for the close button
        margin: 10, // Space around the close button
        alignItems: 'center', // Center the button text
    },
    closeButtonText: {
        color: 'white', // White text color for the close button
        fontWeight: 'bold', // Bold font for emphasis
    },
});
