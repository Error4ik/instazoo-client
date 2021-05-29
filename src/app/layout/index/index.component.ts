import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {CommentService} from '../../services/comment.service';
import {NotificationService} from '../../services/notification.service';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // @ts-ignore
  posts: Post[];
  // @ts-ignore
  user: User;

  isPostsLoaded = false;
  isUserDataLoaded = false;

  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      this.getImagesForPosts(this.posts);
      this.getCommentsForPosts(this.posts);
      this.isPostsLoaded = true;
    });

    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });
  }

  likePost(postId: string, postIndex: number): void {
    const post = this.posts[postIndex];

    if (!post.likedUsers.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.likedUsers.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.likedUsers.indexOf(this.user.username);
          post.likedUsers.splice(index, 1);
          this.notificationService.showSnackBar('Disliked!');
        });
    }
  }

  postComment(message: string, postId: string, postIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.createComment(message, postId)
      .subscribe(data => {
        post.comments?.push(data);
        this.notificationService.showSnackBar('Comment was created.');
      });
  }

  formatImage(image: any): any {
    return this.imageService.formatImage(image);
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
