export interface Message {
    messageId: number;
    content: string; 
    recieverId: number; 
    accountId: number; 
    sendDateTime: Date; 
    ReadDateTime: Date;
    isRead: number;
}