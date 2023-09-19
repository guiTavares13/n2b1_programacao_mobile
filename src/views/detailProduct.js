import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import CustomListView from '../components/customListView';
import { colaboratorData } from '../json/worker';
import { initializeDatabase, insertItem, fetchItems, deleteAllItems } from '../database/purshase';

export default function DetailProduct() {
  const route = useRoute();
  const { id, title, subtitle, price, time } = route.params;
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [customDateStyles, setCustomDateStyles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);


  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    if (selectedPerson) {
      setCustomDateStyles(
        selectedPerson.availableDates.map((date) => ({
          date,
          style: { backgroundColor: 'green' },
          textStyle: { color: 'white' },
          containerStyle: {},
        }))
      );
    }
  }, [selectedPerson]);

  const openCalendar = () => {
    setListVisible(false);
    setCalendarVisible(true);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  const openList = () => {
    setListVisible(true);
  };

  const getCustomDateStyles = () => {
    if (!selectedPerson) return [];

    return selectedPerson.availableDates.map((date) => ({
      date,
      style: { backgroundColor: 'green' },
      textStyle: { color: 'white' },
      containerStyle: {},
    }));
  };

  const saveData = () => {
    if (!selectedPerson || !selectedDate) {
      alert('Por favor, selecione um colaborador e uma data antes de salvar.');
      return;
    }
  
    const item = {
      title: title,
      subtitle: subtitle,
      img: 'assets/adaptive-icon.png',
      price: price,
      time: time,
      nameColaborator: selectedPerson.name,
      specialty: subtitle,
      scheduledData: selectedDate,
    };
  
    insertItem(item)
      .then(() => {
        alert('Dados salvos com sucesso!');
        //aqui eu vou redirecionar para tela inicial
      })
      .catch((error) => {
        alert('Erro ao salvar os dados: ' + error.message);
      });
  };
  
  


  const handleItemPress = (item) => {
    console.log('Item selecionado:', item);
    setSelectedPerson(item);
    setListVisible(false);
    openCalendar();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.product}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.img}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: 'assets/adaptive-icon.png' }}
          />
        </View>

        <Text style={styles.price}>R$ {price}</Text>
        <Text style={styles.time}>Tempo médio: {time} minutos</Text>

        <TouchableHighlight style={styles.buttom} onPress={openList}>
          <Text>Contratar</Text>
        </TouchableHighlight>
      </View>

      {listVisible && (
        <View style={styles.customListViewWrapper}>
          <CustomListView colaboratorData={colaboratorData} onItemPress={handleItemPress} />
        </View>
      )}

      {calendarVisible && (
        <Modal
          animationType="slide"
          visible={calendarVisible}
          transparent
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarWrapper}>
              <CalendarPicker
                customDatesStyles={customDateStyles}
                minDate={
                  selectedPerson ? selectedPerson.availableDates[0] : new Date()
                }
                maxDate={
                  selectedPerson
                    ? selectedPerson.availableDates[
                    selectedPerson.availableDates.length - 1
                    ]
                    : new Date()
                }
                onDateChange={(dateStr) => {
                  const selectedDate = new Date(dateStr);
                  const formattedSelectedDate = `${selectedDate.getFullYear()}-${(
                    '0' +
                    (selectedDate.getMonth() + 1)
                  ).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;

                  if (
                    selectedPerson &&
                    selectedPerson.availableDates.some((availableDate) => {
                      const formattedAvailableDate = `${availableDate.getFullYear()}-${(
                        '0' +
                        (availableDate.getMonth() + 1)
                      ).slice(-2)}-${('0' + availableDate.getDate()).slice(-2)}`;
                      return formattedSelectedDate === formattedAvailableDate;
                    })
                  ) {
                    console.log('Data selecionada:', dateStr);
                    setSelectedDate(formattedSelectedDate);
                  } else {
                    alert('Você só pode selecionar datas em verde.');
                  }
                }}
                width={Dimensions.get('window').width * 0.9}
                textStyle={{ fontSize: 14 }}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  closeModal();
                  saveData();
                }}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  product: {
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    height: 550,
  },
  customListViewWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  img: {
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    alignSelf: 'center',
  },
  price: {
    fontSize: 25,
    alignSelf: 'center',
  },
  time: {
    alignSelf: 'center',
    fontSize: 15,
    margin: 5,
  },
  buttom: {
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.9,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
  },
  confirmButtonText: {
    color: '#fff',
  },
});
