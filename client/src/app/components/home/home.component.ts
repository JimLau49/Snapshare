import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data: {success: boolean, posts: Post[]}) => {
      if (data.success) {
        this.posts = data.posts.map(post => {
          return {
            ...post,
            imagePath: `http://localhost:3000\\${post.imagePath}`
          }
        });
      }
    });
  }
}
