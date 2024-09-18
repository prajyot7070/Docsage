export type Language = 'Python' | 'Rust' | 'Java' | 'C' | 'C++';

export interface ChatMessage {
  query: string;
  response: string;
}

export type ChatHistory = {
  [key in Language]?: ChatMessage[];
};