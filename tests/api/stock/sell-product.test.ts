import { setupDb } from "../../util/setupDb";

const frisby = require("frisby");

describe("restock-product", () => {
  afterAll(async () => {
    await setupDb();
  });

  it("should sell product and decrease the stock", async () => {
    const res = await frisby
      .post("http://localhost:3000/products/2/sell")
      .expect("status", 200)
      .expect("json", {
        success: true,
      });

    return frisby
      .get("http://localhost:3000/products/2")
      .expect("status", 200)
      .expect("json", {
        name: "product2",
        price: 5,
        stock: 5,
        description: "new product",
        id: "2",
      });
  });

  it("should not sell product that doesnt exist", async () => {
    return frisby
      .post("http://localhost:3000/products/zzz/sell")
      .expect("status", 409)
      .expect("json", {
        success: false,
        reason: "Product unavailable",
      });
  });

  it("should return 500 when db error", async () => {
    await setupDb({ data: [] });
    return frisby
      .post("http://localhost:3000/products/zzz/sell")
      .expect("status", 500);
  });
});
