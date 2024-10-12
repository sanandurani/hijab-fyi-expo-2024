import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Information() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Managing Diabetes & Lowering HbA1c</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>What is HbA1c?</Text>
        <Text style={styles.content}>
          HbA1c, also known as glycated hemoglobin, is a measure of your average blood sugar levels over the past 2-3 months. 
          It reflects how well blood sugar is being controlled in the long term. An HbA1c level of less than 5.7% is considered normal, 
          while 6.5% or higher indicates diabetes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Why is HbA1c Important?</Text>
        <Text style={styles.content}>
          Monitoring HbA1c helps manage diabetes and prevent complications like heart disease, kidney damage, and vision problems. 
          Lowering your HbA1c means better blood sugar control and a lower risk of these complications.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>What You Can Do as a Diabetic</Text>
        <Text style={styles.content}>
          1. **Monitor Blood Sugar**: Regularly check your blood sugar to understand how food, exercise, and medications affect your levels.
          {'\n'}2. **Healthy Eating**: Focus on low-GI foods, reduce sugary snacks, and eat plenty of fruits, vegetables, and whole grains.
          {'\n'}3. **Physical Activity**: Regular exercise helps your body use insulin more efficiently and lowers blood sugar.
          {'\n'}4. **Medication Management**: Take insulin or diabetes medications as prescribed by your healthcare provider.
          {'\n'}5. **Stay Hydrated**: Drink plenty of water to help your body flush excess glucose through urine.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>How to Lower Your HbA1c</Text>
        <Text style={styles.content}>
          1. **Exercise Regularly**: Aim for at least 30 minutes of moderate physical activity most days of the week. 
          Exercise helps your muscles absorb sugar more effectively, lowering blood glucose.
          {'\n'}2. **Eat a Balanced Diet**: Reduce carbohydrate intake, especially from refined sugars and processed foods. 
          Focus on foods with a low glycemic index (GI).
          {'\n'}3. **Lose Weight**: If you're overweight, losing even a small amount of weight can significantly improve your blood sugar levels.
          {'\n'}4. **Monitor Blood Sugar Levels**: Tracking your blood sugar helps you stay on top of your control and make adjustments as needed.
          {'\n'}5. **Take Medications Properly**: If you're prescribed medication, take it exactly as directed by your healthcare provider.
          {'\n'}6. **Manage Stress**: Stress can raise blood sugar, so practice relaxation techniques like meditation or deep breathing.
          {'\n'}7. **Get Enough Sleep**: Poor sleep can affect blood sugar regulation, so aim for 7-8 hours of quality sleep every night.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>When to See a Doctor</Text>
        <Text style={styles.content}>
          It's important to consult your healthcare provider regularly to monitor your HbA1c levels and discuss any necessary adjustments to your treatment plan. 
          You should see a doctor if:
          {'\n'}- Your blood sugar levels are consistently too high or too low.
          {'\n'}- You experience symptoms like blurry vision, excessive thirst, frequent urination, or unexplained weight loss.
          {'\n'}- You have questions or concerns about your diabetes management plan.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    headerContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1f1f1f',
    },
    section: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
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