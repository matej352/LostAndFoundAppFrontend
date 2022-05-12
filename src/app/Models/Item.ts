import { Category } from "./Category";

export interface Item {
    itemId: number;
    title: string; 
    description: string; 
    imageData: string; 
    findingDate: Date; 
    lossDate: Date;
    AdvertisementId: number;
    category: Category;
}