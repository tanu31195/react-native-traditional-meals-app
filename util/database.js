import * as SQLite from "expo-sqlite";
import { TABLES } from "../constants/sql";

const db = SQLite.openDatabase("traveler.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLES.PLACES} (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insert(tableName, data) {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).fill("?").join(", ");
  const values = Object.values(data);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
        values,
        (tx, results) => {
          resolve(results);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetch(tableName) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, results) => {
          const len = results.rows.length;
          const rows = [];
          for (let i = 0; i < len; i++) {
            rows.push(results.rows.item(i));
          }
          resolve(rows);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function fetchById(tableName, id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id],
        (tx, results) => {
          resolve(results.rows._array[0]);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
