import IProduct from "./IProduct";

interface IOrderItem {
    id: number;
    product_id: number;
    quantity: number;
    product: IProduct;
}

export default IOrderItem;