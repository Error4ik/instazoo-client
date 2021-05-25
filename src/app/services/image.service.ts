import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const IMAGE_API = 'http://localhost:9920/api/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.httpClient.post(IMAGE_API + 'upload', uploadData);
  }

  uploadImageToPost(postId: string, file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.httpClient.post(IMAGE_API + postId + '/' + 'upload', uploadData);
  }

  getImageToUser(): Observable<any> {
    return this.httpClient.get(IMAGE_API + 'profile-image');
  }

  getImageToPost(postId: string): Observable<any> {
    return this.httpClient.get(IMAGE_API + postId + '/' + 'post-image');
  }
}
