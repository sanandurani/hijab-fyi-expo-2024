import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native';
import { Icon } from '@rneui/base';
import foodData from '../assets/raw_data/completedata.json';

export default function Summary() {
    const sortedFoodData = foodData.sort((a, b) => a.food_name.localeCompare(b.food_name));
    const [foodList, setFoodList] = useState(sortedFoodData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const calculateTotals = () => {
        return selectedItems.reduce(
            (totals, item) => {
                totals.glycemicIndex += item.glycemic_index;
                totals.glycemicLoad += item.glycemic_load;
                return totals;
            },
            { glycemicIndex: 0, glycemicLoad: 0 }
        );
    };

    const clearSelections = () => setSelectedItems([]);

    const filterTextSearch = (text) => {
        setSearchText(text);
        if (text.trim()) {
            const filteredFoodList = sortedFoodData.filter(fd => fd.food_name.toLowerCase().includes(text.toLowerCase()));
            setFoodList(filteredFoodList);
        } else {
            setFoodList(sortedFoodData);
        }
    };

    const { glycemicIndex, glycemicLoad } = calculateTotals();

    const renderChips = () => (
        <View style={styles.chipsContainer}>
            {selectedItems.map((item) => (
                <TouchableOpacity
                    key={item.food_name}
                    style={styles.chip}
                    onPress={() => toggleSelection(item)}
                >
                    <Text style={styles.chipText}>{item.food_name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderModal = () => (
        <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <FlatList
                    data={foodList}
                    keyExtractor={(item) => item.food_name.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.modalItem,
                                selectedItems.includes(item) ? styles.selectedItem : {},
                            ]}
                            onPress={() => toggleSelection(item)}
                        >
                            <Text>{item.food_name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Balance your energy with GI.</Text>
            <TouchableOpacity style={styles.searchContainer} onPress={() => setModalVisible(true)}>
                <Icon name="search" />
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={filterTextSearch}
                    placeholder="Search your meal..."
                    placeholderTextColor="#888"
                />
            </TouchableOpacity>
            {renderChips()}
            {renderModal()}
            <View style={styles.section}>
                <View style={styles.totalsContainer}>
                    <View style={styles.totalsTextContainer}>
                        <Text style={styles.totalsText}>Total Glycemic Index: {glycemicIndex}</Text>
                        <Text style={styles.totalsText}>Total Glycemic Load: {glycemicLoad}</Text>
                    </View>
                    <TouchableOpacity style={styles.clearButton} onPress={clearSelections}>
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerText: {
        color: 'black',
        marginBottom: 50,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#e0f7fa',
        borderRadius: 20,
        padding: 80,
        marginVertical: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    totalsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
        marginBottom: 10,
    },
    totalsTextContainer: {
        flex: 1,
    },
    totalsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00796b',
    },
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
        backgroundColor: '#ececec',
        borderRadius: 10,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    chip: {
        backgroundColor: '#00796b',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 5,
    },
    chipText: {
        color: 'white',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalItem: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: '#e0f7fa',
    },
    closeButton: {
        backgroundColor: '#00796b',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
