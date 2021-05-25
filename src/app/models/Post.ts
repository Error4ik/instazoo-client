import {Comment} from './Comment';

export interface Post {
  id?: number;
  tittle: string;
  username?: string;
  caption: string;
  location: string;
  image?: File;
  likes?: number;
  userLiked?: string[];
  comments?: Comment[];
}
