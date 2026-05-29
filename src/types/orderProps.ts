import type { itemsOrder } from "./itemsOrder";

export interface orderProps {
  date: string;
  id: string;
  items: itemsOrder[];
  total: string;
  userId: string;
}
