import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const COMMENT_API = 'http://localhost:9920/api/comment/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  createComment(commentMessage: string, postId: string): Observable<any> {
    return this.httpClient.post(COMMENT_API + postId + '/' + 'create', {
      message: commentMessage
    });
  }

  getCommentsForPost(postId: string): Observable<any> {
    return this.httpClient.get(COMMENT_API + postId + '/' + 'comments');
  }

  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(COMMENT_API + commentId + '/' + 'delete');
  }
}
