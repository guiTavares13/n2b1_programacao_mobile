import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ItemButtom from "../components/itemButtom";
import { useEffect, useState } from "react";
import { deleteItemByKey, insertItem, fetchItems, deleteAllItems } from '../database/purshase';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ShoppingCart() {

    const [cartProducts, setCartProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('TP');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchItems();
            console.log(data);
            setCartProducts(data);
            storeData(data);
        };

        fetchData();
    }, []
    )

    const setValuesTest = (itemValue) => {
        setSelectedCategory(itemValue)
    }

    const filterProducts = (category) => {
        if (!category || category === 'TP') return cartProducts;

        return cartProducts.filter(product => product.speciality.includes(category));
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('products', jsonValue);
        } catch (e) {
            console.error('Error: ' + e)
        }
    };

    function handleDelete(key) {
        deleteItemByKey(key)
            .then(() => {
                const updatedCartProducts = cartProducts.filter(item => item.id !== key);
                setCartProducts(updatedCartProducts);
                storeData(updatedCartProducts);
                alert('Agendamento Excluido!');
            })
            .catch((error) => {
                console.error('Erro ao excluir item:', error);
            });
    }

    return (
        <>
            <View style={styles.input}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setValuesTest(itemValue)
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label="Todos os produtos" value="TP" />
                        <Picker.Item label="Estética Facial" value="EF" />
                        <Picker.Item label="Bem estar e relaxamento" value="BER" />
                        <Picker.Item label="Estética corporal" value="EC" />
                        <Picker.Item label="Estética avançada" value="EA" />
                    </Picker>
                </View>
            </View>
            <ScrollView>
                <View style={styles.items}>
                    {filterProducts(selectedCategory).map(item => (
                        <View key={item.id} style={styles.itemCart}>
                            <ItemButtom customStyle={{ width: '75%' }}
                                item={item} />
                            <View style={styles.icon} >
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Icon name="delete" size={30} color="red" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    items: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        borderWidth: 1,
        width: 60,
        height: 98,
        margin: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        margin: 10,
    },
    itemCart: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.9,
        height: 60,
        borderRadius: 10,
        alignSelf: "center"
    },
    picker: {
        flex: 1,
    },
});
