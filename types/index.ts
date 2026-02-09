export interface InventoryItem {
  id: string;
  orderId?: string;
  name: string;
  quantity: number;
  entryDate: any;
  category: string;
  userId: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
}
