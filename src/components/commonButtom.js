import { Text, TouchableHighlight, StyleSheet } from "react-native";

export default (props) => {
    const { title, onClick, type } = props;
    return(
        <TouchableHighlight style={styles.buttom} onPress={onClick}>
            <Text>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    buttom: {
        borderWidth: 1,
        borderRadius: 8,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
})