export interface ItemCreateDTO {
    title: string;
    description: string;
    findingDate: Date; 
    lossDate: Date;
    locationLat?: number;
    locationLng?: number; 
    advertisementId?: number;
    categoryId: number;
}