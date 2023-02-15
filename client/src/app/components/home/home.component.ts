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
  // posts: Array<Post> = [
  //   {
  //     title: 'Test Post 1',
  //     date: moment("2022-01-01").toDate(),
  //     imagePath: "http://localhost:3000/uploads/1676429156237.jpg"

  //   },
    // {
    //   title: 'Test Post 2',
    //   date: moment("2022-01-01").toDate(),
    //   imagePath: '/client/src/images/test-image.jpg'
    // },
    // {
    //   title: 'Test Post 3',
    //   date: moment("2022-01-01").toDate(),
    //   imagePath: '/client/src/images/test-image.jpg'
    // }
  // ];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data: {success: boolean, posts: Post[]}) => {
      if (data.success) {
        this.posts = data.posts.map(post => {
          return {
            ...post,
            imagePath: `http://localhost:3000${post.imagePath}`
          }
        });
      }
    });
  }
}
