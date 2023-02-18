import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface CreatePostDialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  title: string;
  content: string;
  file: File;
  date: string;
  postForm: FormGroup;
  previewImage: string;

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: CreatePostDialogData, 
    private snackBar: MatSnackBar, 
    private postService: PostService,
    private fb: FormBuilder,
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: ['', Validators.required]
    });
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append('imagePath', this.file);
    formData.append('title', this.postForm.value.title);
    formData.append('content', this.postForm.value.content);
    formData.append('date', new Date().toISOString());
    console.log(formData)
    this.postService.createPost(formData).subscribe((response) => {
      if (response.success) {
        this.dialogRef.close();
        this.snackBar.open('Post created successfully', '', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Error creating post', '', {
          duration: 3000,
        });
      }
    });
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.file = file;
    this.postForm.patchValue({ file });
  
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}