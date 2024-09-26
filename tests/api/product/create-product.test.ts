import { setupDb } from "../../util/setupDb";
const frisby = require("frisby");

describe("create-product", () => {
  afterAll(async () => {
    await setupDb();
  });

  it("should create product", async () => {
    const productPayload = {
      name: "created product",
      price: 5,
      stock: 99,
      description: "created product",
    };

    const res = await frisby
      .post("http://localhost:3000/products/", productPayload)
      .expect("status", 200)
      .expect("json", {
        success: true,
      });

    const createdProductId = res.json.data.id;

    return frisby
      .get(`http://localhost:3000/products/${createdProductId}`)
      .expect("status", 200)
      .expect("json", {
        ...productPayload,
        id: createdProductId,
      });
  });

  it("should not create product when price is not positive", async () => {
    const productPayload = {
      name: "created product",
      price: 0,
      stock: 99,
      description: "created product",
    };

    return frisby
      .post("http://localhost:3000/products/", productPayload)
      .expect("status", 422);
  });

  it("should return 500 when db error", async () => {
    await setupDb({ data: [] });
    const productPayload = {
      name: "created product",
      price: 1,
      stock: 99,
      description: "created product",
    };

    return frisby
      .post("http://localhost:3000/products/", productPayload)
      .expect("status", 500);
  });
});
