const fs = require("node:fs");

const db = {
  products: [
    {
      id: "1",
      name: "product1",
      description: "desc of p1",
      price: 10,
      stock: 0,
    },
    {
      name: "product2",
      price: 5,
      stock: 6,
      description: "new product",
      id: "2",
    },
  ],
  orders: [
    {
      id: "order1",
      customerId: 1,
      products: ["1"],
    },
  ],
};

export const setupDb = async (data?: any) => {
  await fs.promises.writeFile(process.env.DB_FILE, JSON.stringify(data ?? db));
};
