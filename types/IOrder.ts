import IOrderItem from "./IOrderItem";

interface IOrder {
    status: string;
    owner_id: number;
    id: number;
    order_items: IOrderItem[];
    created_at: string;
}

export default IOrder;