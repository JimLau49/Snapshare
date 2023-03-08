import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:3000/api/posts';
  private postsSubject = new Subject<Post[]>();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllPosts(): Observable<{ success: boolean, posts: Post[] }> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ success: boolean, posts: Post[] }>(`${this.baseUrl}/`, { headers });
  }

  getPostsByUser(username: string | null): Observable<{success: boolean, posts: Post[]}>
  {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ success: boolean, posts: Post[] }>(`${this.baseUrl}/user?username=${username}`, { headers });
  }

  createPost(formData: FormData): Observable<{success: boolean, post: Post}>{
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean, post: Post }>(`${this.baseUrl}/create`, formData ,{ headers });
  }

  deletePost(id: string): Observable<{ success: boolean, posts: Post[] }> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<{ success: boolean, posts: Post[] }>(`${this.baseUrl}/?id=${id}`, { headers });
  }

  emitPosts(posts: Post[]): void {
    this.postsSubject.next(posts);
  }

  onPostsChanged(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }
}