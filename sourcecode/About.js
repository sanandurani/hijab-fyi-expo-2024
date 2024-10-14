// This file creates the "About" screen of the app. It provides users with information about Glycemic Index (GI) and Glycemic Load (GL),
// explaining what they are, how they're measured, and why they're important for managing blood sugar levels.

// Importing the necessary tools from React and React Native
import React from 'react'; // Importing React to create components
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'; // Importing components to display text, create layout, and allow scrolling

// Main function that creates the About screen component
export default function About() {
  return (
    // SafeAreaView ensures the content doesn't overlap with the phone's top and bottom edges
    <SafeAreaView style={{flex: 1}}> 
      {/* ScrollView makes the screen scrollable so that users can view all content if it exceeds the screen height */}
      <ScrollView style={styles.container} contentContainerStyle={{gap: 10}}>
        
        {/* Header section displaying the title of the screen */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Glycemic Index & Load Information</Text> {/* The main title of the About screen */}
        </View>
        
        {/* Section explaining what Glycemic Index (GI) is */}
        <View style={styles.section}>
          <Text style={styles.title}>What is Glycemic Index (GI)?</Text> {/* Section title for GI */}
          <Text style={styles.content}>
            The glycemic index (GI) is a number assigned to foods based on how slowly or quickly they cause increases in blood glucose levels. 
            Foods are ranked on a scale of 0 to 100. Foods with a high GI are rapidly digested and absorbed, resulting in marked fluctuations in blood sugar levels.
          </Text> {/* Detailed explanation of what GI is and why it matters */}
        </View>

        {/* Section explaining the GI scale and its categories */}
        <View style={styles.section}>
          <Text style={styles.title}>GI Scale:</Text> {/* Section title for the GI scale */}
          <Text style={styles.content}>
            - Low GI: 55 or less{'\n'} {/* Foods with a GI of 55 or lower are considered low GI */}
            - Medium GI: 56 - 69{'\n'} {/* Foods with a GI between 56 and 69 are considered medium GI */}
            - High GI: 70 or more {/* Foods with a GI of 70 or more are considered high GI */}
          </Text> {/* Explanation of how the GI scale works */}
        </View>

        {/* Section explaining what Glycemic Load (GL) is */}
        <View style={styles.section}>
          <Text style={styles.title}>What is Glycemic Load (GL)?</Text> {/* Section title for GL */}
          <Text style={styles.content}>
            The glycemic load (GL) is a measure that takes into account the amount of carbohydrate in a portion of food, 
            along with how quickly it raises blood glucose levels. It provides a more accurate picture of how food affects blood sugar.
          </Text> {/* Detailed explanation of what GL is and how it differs from GI */}
        </View>

        {/* Section explaining the GL scale and its categories */}
        <View style={styles.section}>
          <Text style={styles.title}>GL Scale:</Text> {/* Section title for the GL scale */}
          <Text style={styles.content}>
            - Low GL: 10 or less{'\n'} {/* Foods with a GL of 10 or lower are considered low GL */}
            - Medium GL: 11 - 19{'\n'} {/* Foods with a GL between 11 and 19 are considered medium GL */}
            - High GL: 20 or more {/* Foods with a GL of 20 or more are considered high GL */}
          </Text> {/* Explanation of how the GL scale works */}
        </View>

        {/* Section explaining the importance of understanding GI and GL */}
        <View style={styles.section}>
          <Text style={styles.title}>Why is this important?</Text> {/* Section title for the importance of GI and GL */}
          <Text style={styles.content}>
            Understanding GI and GL helps manage blood sugar levels, which is crucial for individuals with diabetes or those trying to prevent blood sugar spikes.
            Lower GI and GL foods are digested more slowly, leading to more gradual increases in blood sugar.
          </Text> {/* Explains why knowledge of GI and GL is important for health, especially for people managing diabetes */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the layout and appearance of the About screen
const styles = StyleSheet.create({
    container: {
      flex: 1, // Takes up the entire screen height
      backgroundColor: '#f4f4f9', // Light background color
      paddingHorizontal: 20, // Adds padding to the left and right of the content
    },
    headerContainer: {
      alignItems: 'center', // Centers the header text horizontally
    },
    headerText: {
      fontSize: 24, // Large font size for the header text
      fontWeight: 'bold', // Bold font style for emphasis
      color: '#333', // Dark gray text color for the header
    },
    section: {
      backgroundColor: '#fff', // White background for each section
      borderRadius: 8, // Rounded corners for each section
      padding: 15, // Adds padding inside each section
      borderColor: '#00000050', // Light gray border color
      borderWidth: 0.5, // Thin border around each section
    },
    title: {
      fontSize: 18, // Medium font size for section titles
      fontWeight: 'bold', // Bold font style for section titles
      color: '#333', // Dark gray text color for section titles
      marginBottom: 8, // Adds space below each title
    },
    content: {
      fontSize: 16, // Regular font size for content text
      color: '#555', // Medium gray text color for content
      lineHeight: 24, // Increases line height for better readability
    }
  });
