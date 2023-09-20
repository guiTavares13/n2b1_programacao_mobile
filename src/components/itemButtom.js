import { Text, StyleSheet, TouchableHighlight, View, Image } from "react-native";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 

export default ({ item, customStyle }) => {
   
    const { id, title, subtitle, price, time, speciality } = item;

    const navigation = useNavigation();

    function detailProduct() {
        navigation.navigate('DetailProduct', { id, title, subtitle, price, time, speciality });
    }
    
    return (
        <TouchableHighlight style={[styles.container, customStyle]} onPress={detailProduct}>
            <View style={styles.buttom}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <View style={styles.priceAndTime}>
                        <Text>Valor: R$ {price}</Text>
                        <Text style={styles.time}>Tempo: {time}</Text>
                    </View>
                </View>
                <View style={styles.img}>
                    <Image style={{width: 50, height: 50, }} source={{ uri: "assets/adaptive-icon.png" }} />
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.90,
        height: 100,
        marginVertical: 5,
    },
    buttom: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "70%"
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        maxWidth: 250,
    },
    priceAndTime: {
        flexDirection: "row",
    },
    time: {
        marginHorizontal: 50
    },
    img: {
        marginRight: 10,
        borderWidth: 1
    }
});
