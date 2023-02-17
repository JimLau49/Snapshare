import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent {
  
  @Input() post: any;
  @Input() formattedDate: Date;
  postURI = 'http://localhost:3000/'
  
  constructor(private dialog: MatDialog, private postService: PostService) {}

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Post',
        message: 'Are you sure you want to delete this post?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deletePost();
      }
    });
  }

  deletePost(): void {
    this.postService.deletePost(this.post._id).subscribe(
      () => {
        // Post deleted successfully
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

}
