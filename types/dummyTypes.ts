
export enum PostCategory {
  HADITH = 'Hadith',
  FIQH = 'Fiqh',
  ARTICLE = 'Article',
  EVENT = 'Event',
  QUOTE = 'Daily Quote'
}

export enum PostStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  status: PostStatus;
  author: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Ustadz' | 'Editor';
  status: 'Active' | 'Inactive';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
}

export type ViewType = 'dashboard' | 'articles' | 'users' | 'calendar' | 'settings';
