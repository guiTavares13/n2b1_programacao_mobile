import { Text, View, StyleSheet, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailProduct(props) {

    console.log(props)
    //const { title, subtitle, price, time } = props.item;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.product}>
                {/* <Text>{title}</Text>
                <Text>{subtitle}</Text>
                <Text>{price}</Text>
                <Text>{time}</Text> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    product: {
        borderWidth: 1,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.90,
        height: 400,
    }
})