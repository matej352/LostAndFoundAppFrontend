export interface ItemCreateDTO {
    title: string;
    description: string;
    findingDate: Date; 
    lossDate: Date; 
    advertisementId?: number;
    categoryId: number;
}