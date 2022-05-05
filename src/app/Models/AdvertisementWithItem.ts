import { Item } from './Item';
export interface AdvertisementWithItem {
     status: string;
     accountId: number;
     advertisementId: number;
     creationDate: Date;
     item: Item
}