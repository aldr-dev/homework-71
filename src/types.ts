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