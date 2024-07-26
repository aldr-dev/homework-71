export interface ApiDishForm {
  title: string;
  price: string;
  image: string;
}

export interface ApiDishFormMutation {
  title: string;
  price: number;
  image: string;
}

export interface ApiDishes extends ApiDishFormMutation {
 id: string
}

export interface CartDish {
  dish: ApiDishes;
  amount: number;
}

export interface OrderInfo {
  [id: string]: number;
}

export interface ApiOrdersInfo {
  [id: string]: OrderInfo;
}

export interface OrderList {
  id: string;
  dishes: CartDish[];
  totalCost: number;
}