import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {TokenService} from '../../../services/token.service';
import {PostService} from '../../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../../services/notification.service';
import {ImageService} from '../../../services/image.service';
import {UserService} from '../../../services/user.service';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  user: User;

  // @ts-ignore
  selectedFile: File;

  // @ts-ignore
  userProfileImage: File;

  previewImageUrl: any;

  isUserDataLoaded = false;

  constructor(private tokenService: TokenService,
              private postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });

    this.imageService.getImageToUser().subscribe(data => {
      this.userProfileImage = data.imageBytes;
    });
  }

  onFileSelected(file: any): void {
    this.selectedFile = file.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };

    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(image: any): any {
    return this.imageService.formatImage(image);
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile).subscribe(() => {
        this.notificationService.showSnackBar('Profile image updated successfully.');
      });
    }
  }
}
