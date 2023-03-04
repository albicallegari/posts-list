export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface FormState {
  title: string;
  body: string;
  userId: Number;
}
