import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('items.db');

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          img TEXT NOT NULL,
          price DOUBLE NOT NULL,
          time INT NOT NULL);`,
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
        'INSERT INTO products (title, subtitle, img, price, time) VALUES (?,?,?,?,?);',
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
        'DELETE FROM products',
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
        'SELECT * FROM products;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
