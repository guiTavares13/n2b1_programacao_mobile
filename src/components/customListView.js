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

import { useState, useEffect } from "react";

import imageMapping from "../../assets/imageMapping";

const CustomListView = ({ colaboratorData, onItemPress }) => {
    console.log("Aqui esta o colaboratir: " + colaboratorData[1].img);
    return (
      <View style={styles.flatList}>
        <FlatList
          data={colaboratorData}
          renderItem={({ item }) => (
              // Pass item.img instead of colaboratorData[item.img]
              <DataItem item={item} img={item.img} onItemPress={onItemPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  

const DataItem = ({ item, img, onItemPress }) => {
    const [imageSource, setImageSource] = useState(null);
  
    console.log(imageSource)
  
    useEffect(() => {
        if (imageMapping.hasOwnProperty(img)) {
          setImageSource({ uri: 'assets/workers/' + imageMapping[img] });
        }
      }, [img]);
      
      
  function detailProduct() {
    onItemPress(item);
  }

  return (
    <TouchableHighlight style={styles.container} onPress={detailProduct}>
      <View style={styles.button}>
        <Text>{item.name}</Text>
        <View style={styles.img}>
        <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={imageSource}  />

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
        borderWidth: 0.2,
        borderRadius: 10,
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
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        paddingLeft: 40
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
        borderWidth: 0.3,
        borderRadius: 10
    },
});


export default CustomListView;
