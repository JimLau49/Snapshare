import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent {
  posts: Post[] = []
  username: string | null
  private ngUnsubscribe = new Subject<void>();

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.username = this.route.snapshot.paramMap.get('username');
    this.postService.getPostsByUser(this.username).subscribe((data)=>{
      this.posts = data.posts.map((post)=>{
        post.formattedDate = moment(post.date).format('LL');
        return post;
      })
    })
    this.postService.onPostsChanged()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
