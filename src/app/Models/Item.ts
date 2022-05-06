import { Category } from "./Category";

export interface Item {
    itemId: number;
    title: string; 
    description: string; 
    pictureUrl: string; 
    findingDate: Date; 
    lossDate: Date;
    AdvertisementId: number;
    category: Category;
}