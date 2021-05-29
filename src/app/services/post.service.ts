import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const POST_API = 'http://localhost:9920/api/post/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(post: any): Observable<any> {
    return this.httpClient.post(POST_API + 'create', post);
  }

  getPosts(): Observable<any> {
    return this.httpClient.get(POST_API + 'posts');
  }

  getPostsForCurrentUser(): Observable<any> {
    return this.httpClient.get(POST_API + 'user/posts');
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(POST_API + postId + '/delete');
  }

  likePost(postId: string, username: string): Observable<any> {
    return this.httpClient.post(POST_API + postId + '/' + username + '/' + 'like', null);
  }
}
