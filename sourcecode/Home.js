import React, {useEffect, useState} from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import foodData from '../assets/raw_data/completedata.json';
import { Avatar } from '@rneui/themed';
import { Icon } from '@rneui/base';


export default function Home({navigation}) {
    const [foodCategories, setFoodCategories] = useState([
        {
            title: 'Fruit',
            selected: true
        },
        {
            title: 'Vegetable',
            selected: false
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

    const [foodList, setFoodList] = useState(foodData.filter(fd => fd.type === 'Fruit'));

    // Function to update the selected category
    const handleCategorySelect = (index) => {
        const updatedCategories = foodCategories.map((item, i) => {
            return {
                ...item,
                selected: i === index
            };
        });

        setFoodCategories(updatedCategories);
        const title = updatedCategories.find(uC => uC.selected);
        setFoodList(foodData.filter(fd => fd.type === title.title));
    };

    const filterTextSearch = (searchText) => {
        if (searchText.trim().length > 0) {
            setFoodList(foodList.filter(fd => fd.food_name.toLowerCase().includes(searchText.toLowerCase())));
        } else {
            const title = foodCategories.find(uC => uC.selected);
            setFoodList(foodData.filter(fd => fd.type === title.title));
        }
    };

    return (
        <View style={{backgroundColor: '#f9f9f9', flex: 1}}>
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Food List</Text>
            </View>
            <View style={styles.searchContainer}>
                <Icon name='search'/>
                <TextInput
                    onChangeText={(text) => filterTextSearch(text)}
                    placeholder='Search for a food...'
                    placeholderTextColor="#888"
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 8}} contentContainerStyle={styles.categoryScroll}>
                {
                    foodCategories.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => handleCategorySelect(index)}
                            style={[
                                styles.categoryButton, 
                                { 
                                    borderBottomColor: item.selected ? 'green' : '#00000000',
                                    borderBottomWidth: item.selected ? 1.5 : 0.5,
                                }
                            ]}
                        >
                            <Text style={styles.categoryButtonText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

            <FlatList
                contentContainerStyle={styles.foodList}
                data={foodList}
                keyExtractor={(item) => item.food_name.toString()}
                renderItem={({ item }) => {
                    const color = item.category === 3 ? '#8B0000' : item.category === 2 ? '#C2B280' : '#2C5F2D';
                    return(
                    <View style={[
                        styles.foodItem, 
                    ]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={styles.foodName}>{item.food_name}</Text>
                            <Icon style={{ display: item.category === 1 ? 'flex':'none' }} color={color} name='happy-outline' type='ionicon' />
                            <Icon style={{ display: item.category === 2 ? 'flex':'none' }} color={color} name='sad-outline' type='ionicon'/>
                            <Icon style={{ display: item.category === 3 ? 'flex':'none' }} color={color} name='skull-outline' type='ionicon'/>
                        </View>
                        <Text style={styles.foodType}>{item.type}</Text>
                        <Text style={styles.foodInfo}>Glycemic Index: {item.glycemic_index}</Text>
                        <Text style={styles.foodInfo}>Glycemic Load: {item.glycemic_load}</Text>
                    </View>
                )}}
            />
        </View>
        </View>
    );
}

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
