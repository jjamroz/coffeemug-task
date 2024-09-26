import { setupDb } from "../../util/setupDb";

const frisby = require("frisby");

describe("get-products", () => {
  afterAll(async () => {
    await setupDb();
  });

  it("should fetch product list", async () => {
    await setupDb();
    return frisby
      .get("http://localhost:3000/products")
      .expect("status", 200)
      .expect("json", [
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
      ]);
  });

  it.skip("should return 500 when db error", async () => {
    await setupDb({ data: [] });
    return frisby.get("http://localhost:3000/products").expect("status", 500);
  });
});
