import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

interface IOrder {
    status: string;
    owner_id: number;
    id: number;
    order_items: IOrderItem[];
    created_at: string;
    owner:  IUser;
}

export default IOrder;