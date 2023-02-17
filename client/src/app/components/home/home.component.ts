import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  posts: Post[] = [];

  constructor(private postService: PostService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts.map((post) => {
        post.formattedDate = moment(post.date).format('LL');
        console.log(post)
        return post;
      });
    });
  }

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(CreatePostComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.postService.getAllPosts();
    });
  }
  
}
