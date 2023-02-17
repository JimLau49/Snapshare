export interface Post {
  title: string;
  content: string;
  formattedDate?: string;
  date: Date;
  file?: File | FormData;
  }