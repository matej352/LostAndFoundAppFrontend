export interface CreateMessageDTO {
    content: string;
    recieverId: number;
    accountId: number; 
    sendDateTime: Date;
}