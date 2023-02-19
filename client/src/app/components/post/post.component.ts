import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent {
  
  @Input() post: any;
  @Input() formattedDate: Date;
  postURI = 'http://localhost:3000/'
  constructor(private dialog: MatDialog, private postService: PostService) {
    this.post = []
  }

  onDeletePost(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this post?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(this.post._id).subscribe((data) => {
          console.log(data);
  
          // Re-fetch the updated list of posts from the server
          this.postService.getAllPosts().subscribe((data) => {
            this.post = data.posts.map((post) => {
              post.formattedDate = moment(post.date).format('LL');
              return post;
            });
            
            // Emit the new posts list
            this.postService.emitPosts(this.post);
          });
        });
      }
    });
  }

}
