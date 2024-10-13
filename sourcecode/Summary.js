//keystore: hijab,hijabb,/Users/amaddurrani/Library/Java/JavaVirtualMachines/corretto-17.0.10/Contents/Home/hijab-fyp.keystore
import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native';
import { Icon } from '@rneui/base';
import foodData from '../assets/raw_data/completedata.json';

export default function Summary() {
    const sortedFoodData = foodData.sort((a, b) => a.food_name.localeCompare(b.food_name));
    const [foodList, setFoodList] = useState(sortedFoodData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const calculateTotals = () => {
        let glycemicIndex = 0;
        let glycemicLoad = 0;
        let glycemicIndexAvg = 0;
        let glycemicLoadAvg = 0;
      
        for (let item of selectedItems) {
          glycemicIndex += item.glycemic_index;
          glycemicLoad += item.glycemic_load;
        }
        
        glycemicIndexAvg = isNaN(glycemicIndex / selectedItems.length) ? 0: parseInt(glycemicIndex / selectedItems.length);
        glycemicLoadAvg = isNaN(glycemicLoad / selectedItems.length) ? 0 : parseInt(glycemicLoad / selectedItems.length);

        return { glycemicIndex, glycemicLoad, glycemicIndexAvg, glycemicLoadAvg };
      };
      
      const clearSelections = () => setSelectedItems([]);
      const { glycemicIndex, glycemicLoad, glycemicIndexAvg, glycemicLoadAvg } = calculateTotals();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Balance your energy with GI.</Text>
            </View>
            <TouchableOpacity style={styles.searchContainer} onPress={() => setModalVisible(true)}>
                <Icon name="search" />
                <Text>Search</Text>
            </TouchableOpacity>
            
            <View style={styles.chipsContainer}>
                {selectedItems.length < 6 ? selectedItems.map((item) => (
                    <TouchableOpacity
                        key={item.food_name}
                        style={styles.chip}
                        onPress={() => toggleSelection(item)}
                    >
                        <Text style={styles.chipText}>{item.food_name}</Text>
                    </TouchableOpacity>
                )):
                <Text style={[styles.chipText, {color: 'black'}]}>{selectedItems.length} Selected</Text>
                }
            </View>

            <Modal visible={isModalVisible} animationType="slide">
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
                                <Text style={{ color: 'black' }}>{item.food_name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={[styles.card]}>
                <View style={{padding: 8}}>
                    <Text style={{fontSize: 18, fontWeight: '800', color: '#000000'}}>Total:</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.totalsText}>Glycemic Index:</Text>
                        <Text style={{
                            borderColor: 'black',
                            borderWidth: 0.5,
                            padding: 4,
                            borderRadius: 12,
                            minWidth: 24,
                            height: 24,
                            color: 'black',
                            textAlign: 'center',
                            lineHeight: 16
                        }}
                        >{glycemicIndex}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                        <Text style={styles.totalsText}>Glycemic Load:</Text>
                        <Text style={{
                            borderColor: 'black',
                            borderWidth: 0.5,
                            padding: 4,
                            borderRadius: 12,
                            minWidth: 24,
                            height: 24,
                            color: 'black',
                            textAlign: 'center',
                            lineHeight: 16
                        }}
                        >{glycemicLoad}
                        </Text>
                    </View>
                </View>
                <View style={{width: '100%', height: 0.5, backgroundColor: "#00000050"}} />
                <View style={{padding: 8}}>
                    <Text style={{fontSize: 18, fontWeight: '800', color: '#000000'}}>Average:</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                        <Text style={styles.totalsText}>Glycemic Index:</Text>
                        <Text style={{
                            backgroundColor : glycemicIndexAvg > 20 ? "#8B0000" : glycemicIndexAvg < 20 && glycemicIndexAvg > 10 ? "#C2B280": "#2C5F2D",
                            padding: 4,
                            borderRadius: 12,
                            minWidth: 24,
                            height: 24,
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 16
                        }}
                        >{glycemicIndexAvg}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                        <Text style={styles.totalsText}>Glycemic Load:</Text>
                        <Text style={{
                            backgroundColor : glycemicLoadAvg > 20 ? "#8B0000" : glycemicLoadAvg < 20 && glycemicLoadAvg > 10 ? "#C2B280": "#2C5F2D",
                            padding: 4,
                            borderRadius: 12,
                            minWidth: 24,
                            height: 24,
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 16
                        }}
                        >{glycemicLoadAvg}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.clearButton} onPress={clearSelections}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
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
    headerContainer: {
        marginBottom: 20,
        alignItems: 'center',
      },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f1f1f',
    },
    card: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderColor: '#00000050',
        borderWidth: 0.5,
    },
    totalsText: {
        fontSize: 16,
        color: '#000000',
    },
    clearButton: {
        // backgroundColor: '#DC3545',
        padding: 10,
        marginTop: 24,
        borderRadius: 10,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#DC3545',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
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
        backgroundColor: 'white',
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
