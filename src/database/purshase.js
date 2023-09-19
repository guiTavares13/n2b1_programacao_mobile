import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('purshase.db');

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS purshase (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          img TEXT NOT NULL,
          price DOUBLE NOT NULL,
          time INT NOT NULL),
          nameColaborator TEXT NOT NULL,
          specialty TEXT NOT NULL,
          scheduledData Date NOT NULL;`,
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

export const insertItem = (item) => {
  console.log(item);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO purshase (title, subtitle, img, price, time, nameColaborator, specialty, scheduledData) VALUES (?,?,?,?,?,?,?,?);',
        [
          item.title,
          item.subtitle,
          item.img,
          item.price,
          item.time,
          item.nameColaborator,
          item.specialty,
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
        'DELETE FROM purshase',
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
        'SELECT * FROM purshase;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
