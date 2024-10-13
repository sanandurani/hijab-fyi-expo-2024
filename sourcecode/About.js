import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{gap: 10}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Glycemic Index & Load Information</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>What is Glycemic Index (GI)?</Text>
        <Text style={styles.content}>
          The glycemic index (GI) is a number assigned to foods based on how slowly or quickly they cause increases in blood glucose levels. 
          Foods are ranked on a scale of 0 to 100. Foods with a high GI are rapidly digested and absorbed, resulting in marked fluctuations in blood sugar levels.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>GI Scale:</Text>
        <Text style={styles.content}>
          - Low GI: 55 or less{'\n'}
          - Medium GI: 56 - 69{'\n'}
          - High GI: 70 or more
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>What is Glycemic Load (GL)?</Text>
        <Text style={styles.content}>
          The glycemic load (GL) is a measure that takes into account the amount of carbohydrate in a portion of food, 
          along with how quickly it raises blood glucose levels. It provides a more accurate picture of how food affects blood sugar.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>GL Scale:</Text>
        <Text style={styles.content}>
          - Low GL: 10 or less{'\n'}
          - Medium GL: 11 - 19{'\n'}
          - High GL: 20 or more
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Why is this important?</Text>
        <Text style={styles.content}>
          Understanding GI and GL helps manage blood sugar levels, which is crucial for individuals with diabetes or those trying to prevent blood sugar spikes.
          Lower GI and GL foods are digested more slowly, leading to more gradual increases in blood sugar.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f9',
      paddingHorizontal: 20,
    },
    headerContainer: {
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    section: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      borderColor: '#00000050',
      borderWidth: 0.5
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    content: {
      fontSize: 16,
      color: '#555',
      lineHeight: 24,
    }
  });