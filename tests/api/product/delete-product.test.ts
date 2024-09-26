const frisby = require("frisby");

import { setupDb } from "../../util/setupDb";

describe("delete-product", () => {
  afterAll(async () => {
    await setupDb();
  });

  it("should delete existing product", async () => {
    await frisby.get("http://localhost:3000/products/2").expect("status", 200);

    await frisby
      .del("http://localhost:3000/products/2")
      .expect("status", 200)
      .expect("json", {
        success: true,
      });

    return frisby.get("http://localhost:3000/products/2").expect("status", 404);
  });

  it("should not delete product that doesnt exist", async () => {
    await frisby
      .del("http://localhost:3000/products/zzz")
      .expect("status", 409)
      .expect("json", {
        success: false,
      });
  });

  it("should return 500 when db error", async () => {
    await setupDb({ data: [] });
    return frisby
      .del("http://localhost:3000/products/xxx")
      .expect("status", 500)
      .expectNot("json");
  });
});
