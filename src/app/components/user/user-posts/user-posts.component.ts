import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../services/post.service';
import {CommentService} from '../../../services/comment.service';
import {NotificationService} from '../../../services/notification.service';
import {ImageService} from '../../../services/image.service';
import {Post} from '../../../models/Post';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded = false;

  // @ts-ignore
  posts: Post[];

  constructor(private postService: PostService,
              private imageService: ImageService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getPostsForCurrentUser().subscribe(data => {
      this.posts = data;
      this.getImagesForPosts(this.posts);
      this.getCommentsForPosts(this.posts);
      this.isUserPostsLoaded = true;
    });
  }

  formatImage(image: any): any {
    return this.imageService.formatImage(image);
  }

  removePost(post: Post, index: number): void {
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      this.postService.deletePost(post.id + '')
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('Post was deleted');
        });
    }
  }

  deleteComment(commentId: string, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('Comment removed');
        post.comments.splice(commentIndex, 1);
      });
  }

  private getImagesForPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id + '')
        .subscribe(data => {
          p.image = data.imageBytes;
        });
    });
  }

  private getCommentsForPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsForPost(p.id + '')
        .subscribe(data => {
          p.comments = data;
        });
    });
  }
}
