import {Comment} from './Comment';

export interface Post {
  id?: string;
  title: string;
  username?: string;
  caption: string;
  location: string;
  image?: File;
  numberOfLikes: number;
  likedUsers: string[];
  comments: Comment[];
}
