export enum TabView {
  FORTUNE = 'FORTUNE',
  ZEN = 'ZEN',
  CHAT = 'CHAT',
  INSPIRATION = 'INSPIRATION'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ProductSpec {
  label: string;
  description: string;
  icon?: string;
}

export interface Scenario {
  title: string;
  description: string;
  iconName: string;
}

export type ZodiacSign = {
  name: string;
  icon: string;
  date: string;
  element: string;
};