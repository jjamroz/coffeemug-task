export enum CommandType {
  CreateOrder = "CreateOrder",
  CreateProduct = "CreateProduct",
  DeleteProduct = "DeleteProduct",
  RestockProduct = "RestockProduct",
  SellProduct = "SellProduct",
}

export interface Command {
  execute(): Promise<{ success: boolean; reason?: string; data?: any }>;
}
