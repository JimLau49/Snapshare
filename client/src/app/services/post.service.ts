import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllPosts(): Observable<{ success: boolean, posts: Post[] }> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ success: boolean, posts: Post[] }>(`${this.baseUrl}/`, { headers });
  }

  getPostsByUser(username: string): Observable<Post[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Post[]>(`${this.baseUrl}/user/${username}`, { headers });
  }

  createPost(formData: FormData): Observable<{success: boolean, post: Post}>{
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean, post: Post }>(`${this.baseUrl}/create`, formData ,{ headers });
  }

  deletePost(id: string): Observable<{ success: boolean, posts: Post }> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<{ success: boolean, posts: Post }>(`${this.baseUrl}?id=${id}`, { headers });
  }
}