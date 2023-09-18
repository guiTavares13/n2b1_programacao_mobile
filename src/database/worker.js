import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('roker.db');

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS worker (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          name TEXT NOT NULL,
          img TEXT NOT NULL,
          speciality TEXT NOT NULL);`,
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
  console.log(item)
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO worker (name, img, speciality) VALUES (?,?,?);',
        [item.title,
        item.subtitle,
        item.img,
        item.price,
        item.time],
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
        'DELETE FROM worker',
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
        'SELECT * FROM worker;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
