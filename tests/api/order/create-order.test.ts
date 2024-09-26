import { setupDb } from "../../util/setupDb";
const frisby = require("frisby");

describe("create-order", () => {
  afterAll(async () => {
    await setupDb();
  });

  const products = [
    {
      id: "1",
      name: "product1",
      description: "desc of p1",
      price: 10,
      stock: 1,
    },
    {
      name: "product2",
      price: 5,
      stock: 5,
      description: "new product",
      id: "2",
    },
  ];

  it("should create order and decrease products stocks", async () => {
    await setupDb({ products, orders: [] });

    const orderPayload = {
      customerId: "customerId",
      products: ["1", "2"],
    };

    const res = await frisby
      .post("http://localhost:3000/orders/", orderPayload)
      .expect("status", 200)
      .expect("json", {
        success: true,
      });

    await frisby
      .get("http://localhost:3000/products")
      .expect("status", 200)
      .expect("json", [
        {
          ...products[0],
          stock: products[0].stock - 1,
        },
        {
          ...products[1],
          stock: products[1].stock - 1,
        },
      ]);

    const createdOrderId = res.json.data.id;

    return frisby
      .get(`http://localhost:3000/orders/${createdOrderId}`)
      .expect("status", 200)
      .expect("json", {
        ...orderPayload,
        id: createdOrderId,
      });
  });

  it("should not create order when one product out of stock", async () => {
    const orderPayload = {
      customerId: "customerId",
      products: ["1", "2"],
    };

    await setupDb({
      products: [{ ...products[0], stock: 0 }, products[1]],
      orders: [],
    });

    return frisby
      .post("http://localhost:3000/orders/", orderPayload)
      .expect("status", 409)
      .expect("json", {
        success: false,
        reason: "One of the products is out of stock",
      });
  });

  it("should not create order when one product unavailable", async () => {
    await setupDb({ products: [products[1]], orders: [] });

    const orderPayload = {
      customerId: "customerId",
      products: ["1", "2"],
    };

    return frisby
      .post("http://localhost:3000/orders/", orderPayload)
      .expect("status", 409)
      .expect("json", {
        success: false,
        reason: "One of the products is unavailable",
      });
  });

  it("should return 500 when db error", async () => {
    await setupDb({ data: [] });

    const orderPayload = {
      customerId: "customerId",
      products: ["1", "2"],
    };

    return frisby
      .post("http://localhost:3000/orders/", orderPayload)
      .expect("status", 500);
  });
});
