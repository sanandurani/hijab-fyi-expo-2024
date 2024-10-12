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
        <View style={styles.container}>
            <View style={styles.headerContainer}>
             <Text style={styles.headerText}>Food List</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Summary')} style={styles.summaryBtn}>
               <Text style={styles.summaryBtnText}> + </Text>
           </TouchableOpacity>
        </View>
            <View style={styles.searchContainer}>
                <Icon name='search'/>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => filterTextSearch(text)}
                    placeholder='Search for a food...'
                    placeholderTextColor="#888"
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                {
                    foodCategories.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => handleCategorySelect(index)}
                            style={[
                                styles.categoryButton, 
                                { 
                                    borderColor: item.selected ? 'green' : '#c9c9c9' , 
                                    borderRadius: 10,
                                    borderWidth: item.selected ? 3:1,
                                    backgroundColor: '#fff'
                                }
                            ]}
                        >
                            <Text style={styles.categoryButtonText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

            <FlatList
                style={styles.foodList}
                data={foodList}
                keyExtractor={(item) => item.food_name.toString()}
                renderItem={({ item }) => (
                    <View style={[
                        styles.foodItem, 
                        { backgroundColor: item.category === 3 ? '#8B0000' : item.category === 2 ? '#C2B280' : '#2C5F2D' }
                    ]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.foodName}>{item.food_name}</Text>
                            { item.category === 1?
                                <Avatar
                                    size={32}
                                    rounded
                                    icon={{ name: "thumbs-up", type: "font-awesome" }}
                                />:
                                item.category === 2?
                                <Avatar
                                    size={32}
                                    rounded
                                    icon={{ name: "check", type: "font-awesome" }}
                                />:
                                <Avatar
                                    size={32}
                                    rounded
                                    icon={{ name: "thumbs-down", type: "font-awesome" }}
                                />
                            }
                        </View>
                        <Text style={styles.foodType}>{item.type}</Text>
                        <Text style={styles.foodInfo}>Glycemic Index: {item.glycemic_index}</Text>
                        <Text style={styles.foodInfo}>Glycemic Load: {item.glycemic_load}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 0,
        alignItems: 'center',
        flexDirection: 'row',  
        justifyContent: 'space-between', 
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
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    searchContainer: {
        backgroundColor: '#ececec',
        borderRadius: 10,
        marginTop : 8,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        display: 'flex',
        padding: 5,
        alignItems: 'center',
    },
    searchInput: {
        height: 50,
        marginTop: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    categoryScroll: {
        paddingBottom: 10
    },
    categoryButton: {
        margin: 5,
        padding: 5,
        elevation: 2,
        height: 40,
        justifyContent: 'center'
    },
    categoryButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    foodList: {
        marginTop: 10,
    },
    foodItem: {
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    foodName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    foodType: {
        color: 'white',
        fontSize: 16,
        marginTop: 2
    },
    foodInfo: {
        color: 'white',
        fontSize: 14,
        marginTop: 2
    }
});
