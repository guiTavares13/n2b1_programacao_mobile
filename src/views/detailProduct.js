import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

export default function DetailProduct() {
  const route = useRoute();
  const { id, title, subtitle, price, time } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.product}>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
    
        <Text>{price}</Text>
        <Text>{time}</Text>
        <View style={styles.img}>
            <Image style={{width: 50, height: 50, }} source={{ uri: "assets/adaptive-icon.png" }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.9,
    height: 400,
  },
  img: {
    borderWidth: 1,
  }
});
