import { Item } from './Item';
export interface AdvertisementWithItem {
     status: string;
     accountId: number;
     advertisementId: number;
     creationDate: Date;
     expirationDate: Date;
     lost: number;
     found: number;
     item: Item
}