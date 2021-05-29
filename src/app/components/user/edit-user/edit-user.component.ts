import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../services/notification.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // @ts-ignore
  public profileEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.userService.updateUser(this.updateUser()).subscribe(() => {
      this.notificationService.showSnackBar('User edit successfully.');
      this.dialogRef.close();
    });
  }

  private createProfileForm(): FormGroup {
    return this.formBuilder.group({
      username: [this.data.user.username, Validators.compose([Validators.required])],
      surname: [this.data.user.surname, Validators.compose([Validators.required])],
      biography: [this.data.user.biography, Validators.compose([Validators.required])],
    });
  }

  private updateUser(): User {
    this.data.user.username = this.profileEditForm.value.username;
    this.data.user.surname = this.profileEditForm.value.surname;
    this.data.user.biography = this.profileEditForm.value.biography;
    return this.data.user;
  }
}
