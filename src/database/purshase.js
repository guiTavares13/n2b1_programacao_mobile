import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('purchase.db');

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS purchase (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          img TEXT NOT NULL,
          price DOUBLE NOT NULL,
          time INT NOT NULL,
          nameColaborator TEXT NOT NULL,
          speciality TEXT NOT NULL,
          scheduledData TEXT NOT NULL);`,
        [],
        (_, result) => {
          console.log("Tabela criada com sucesso.");
          resolve(result);
        },
        (_, error) => {
          console.log("Erro ao criar tabela:", error);
          reject(error);
        }
      );
    });
  });
};

export const deleteItemByKey = (key) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM purchase WHERE id=?;',
        [key],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


export const insertItem = (item) => {
  console.log(item);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO purchase (title, subtitle, img, price, time, nameColaborator, speciality, scheduledData) VALUES (?,?,?,?,?,?,?,?);',
        [
          item.title,
          item.subtitle,
          item.img,
          item.price,
          item.time,
          item.nameColaborator,
          item.speciality,
          item.scheduledData,
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


export const deleteAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM purchase',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


export const fetchItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM purchase;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
