import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; 

import Buttom from "../components/commonButtom";

export default function Home() {
    const navigation = useNavigation();

    function navigateScreem(props) {
        navigation.navigate('Products', {props});
    }

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.regionTitle}>
                <Text style={styles.title}>Estética e Bem-estar</Text>
                <Text style={styles.subtitle}>Seja bem vindo ao seu App de agendamento de procedimentos estéticos</Text>
            </View>
            <View style={styles.body}>
                <Text style={[{margin: 30}]}>Veja nossas modalidades</Text>
                <Buttom 
                    title={"Estética facial"}
                    onClick={ () =>
                        navigateScreem("EF")
                      }/>
                <Buttom title={"Bem estar e relaxamento "}
                    onClick={ () =>
                        navigateScreem("BER")
                  }/>
                <Buttom title={"Estética corporal "}
                    onClick={ () =>
                        navigateScreem("EC")
                      }/>
                <Buttom title={"Estética avançada"}
                    onClick={ () =>
                        navigateScreem("EA")
                      }/>
            </View>
                
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        margin: 10
    },
    subtitle: {
        fontSize: 15
    },
    regionTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 400,
        textAlign: "center",
        margin: 10,
        padding: 10
    },
    body : {
        flex: 0.75
    },
    
});