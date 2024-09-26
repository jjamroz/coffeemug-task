import { setupDb } from "../../util/setupDb";

const frisby = require("frisby");

describe("get-product", () => {
  afterAll(async () => {
    await setupDb();
  });

  it("should fetch existing product", async () => {
    return frisby
      .get("http://localhost:3000/products/2")
      .expect("status", 200)
      .expect("json", {
        name: "product2",
        price: 5,
        stock: 6,
        description: "new product",
        id: "2",
      });
  });

  it("should not fetch product that doesnt exist", async () => {
    return frisby
      .get("http://localhost:3000/products/xxx")
      .expect("status", 404)
      .expectNot("json");
  });

  it("should return 500 when db error", async () => {
    await setupDb({ data: [] });
    return frisby
      .get("http://localhost:3000/products/xxx")
      .expect("status", 500)
      .expectNot("json");
  });
});
