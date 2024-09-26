import { JSONFilePreset } from "lowdb/node";
import { Low } from "lowdb";
import { Product } from "./repositories/interfaces/Product.js";
import { Order } from "./repositories/interfaces/Order.js";
import { logger } from "./logger.js";

export type Data = {
  products: Product[];
  orders: Order[];
};

const initialData: Data = {
  products: [
    {
      id: "1",
      name: "product1",
      description: "desc of p1",
      price: 10,
      stock: 2,
    },
    {
      id: "2",
      name: "product2",
      description: "desc of p2",
      price: 2,
      stock: 1,
    },
  ],
  orders: [],
};

let DB: Low<Data> | undefined;

export const getDB = async () => {
  if (!DB) {
    const dbFile = process.env.DB_FILE ?? "db.json";
    DB = await JSONFilePreset<Data>(dbFile, initialData);
    logger.info(`[DB] working with file ${dbFile}`);
  }
  return DB;
};
