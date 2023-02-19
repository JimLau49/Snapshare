import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(private postService: PostService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts.map((post) => {
        post.formattedDate = moment(post.date).format('LL');
        return post;
      });
    });

    this.postService.onPostsChanged()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.postService.getAllPosts().subscribe((data) => {
        this.posts = data.posts.map((post) => {
          post.formattedDate = moment(post.date).format('LL');
          console.log(post)
          return post;
        });
        
        this.postService.emitPosts(this.posts);
      });
    });
  }
}