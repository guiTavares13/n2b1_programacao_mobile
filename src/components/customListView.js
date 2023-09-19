import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
} from "react-native";

const CustomListView = ({ colaboratorData, onItemPress }) => {
    console.log(colaboratorData)
    return (
        <View style={styles.flatList}>
            <FlatList
                data={colaboratorData}
                renderItem={({ item }) => (
                    <DataItem item={item} onItemPress={onItemPress} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>

    );
};

const DataItem = ({ item, onItemPress }) => {


    function detailProduct() {
        onItemPress(item);
    }

    return (
        <TouchableHighlight style={styles.container} onPress={detailProduct}>
            <View style={styles.button}>
                <Text>{item.name}</Text>
                <View style={styles.img}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'assets/adaptive-icon.png' }} />
                </View>
            </View>
        </TouchableHighlight>
    );
};




const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        width: Dimensions.get("window").width * 0.9,
        height: 100,
        marginVertical: 5,
    },
    img: {
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.80,
        height: Dimensions.get('window').width * 0.70,
        alignSelf: 'center',
        margin: 10
    },
    flatList: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "70%",
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        maxWidth: 250,
    },
    priceAndTime: {
        flexDirection: "row",
    },
    time: {
        marginHorizontal: 50,
    },
    img: {
        marginRight: 10,
        borderWidth: 1,
    },
});


export default CustomListView;
