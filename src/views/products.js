import { Text, View, StyleSheet } from "react-native";
import { initializeDatabase, insertItem, fetchItems, deleteAllItems } from '../database/products';
import { useState, useEffect } from "react";
import { itemsData } from "../json/items";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

import ItemButtom from "../components/itemButtom";

export default function Products(props) {

    const [items, setItems] = useState([]);

    const getDefaultItems = () => {
        if (props.route.params.props === 'EF') {
            return itemsData.EF;
        }
        if (props.route.params.props === 'BER') {
            return itemsData.BER;
        }
        if (props.route.params.props === 'EC') {
            return itemsData.EC;
        }
        if (props.route.params.props === 'EA') {
            return itemsData.EA;
        }
    };

    const populateDatabase = async () => {
        await deleteAllItems();

        const defaultItems = getDefaultItems();

        for (const item of defaultItems) {
            console.log(item)
            await insertItem(item);
        }
    };

    useEffect(() => {
        initializeDatabase()
            .then(() => populateDatabase())
            .then(() => fetchItems())
            .then(fetchedItems => setItems(fetchedItems))
            .catch(error => console.log('Erro ao inicializar banco de dados ou buscar itens', error));
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.items}>
                {items.map(item => (
                    <ItemButtom key={item.id} item={item} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dee1b6'
    },
    buttom: {
        borderWidth: 1,
        borderRadius: 8,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    items: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})