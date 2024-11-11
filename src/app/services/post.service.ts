import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Post } from 'src/model/post.model';
import { Users } from 'src/model/user.model'; // Assuming you have a User interface/model

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/posts';
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts')
    // .pipe(
    //   switchMap(posts => {
    //     const userRequests: Observable<Users>[] = posts.map(post => this.getUserById(post.userId));
    //     return forkJoin(userRequests).pipe(
    //       map(users => {
    //         for (let i = 0; i < posts.length; i++) {
    //           posts[i].username = users[i].username; // Update to use 'username' property
    //         }
    //         return posts;
    //       })
    //     );
    //   })
    // );
  }

  filterPostsByUser(posts: Post[], username: string): Observable<Post[]> {
    // Filter the posts based on the username of the author
    return of(posts.filter(post => post.userId === username));
  }

  getUserById(id: string): Observable<Users> {
    const url = `${this.url}/users/${id}`; // Modify the URL to accept user ID
    return this.http.get<Users>(url).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of({ id: '', username: '', password: '', name: '', email: '', phone: '', role: '', gender: '', status: false } as Users);
        } else {
          throw error;
        }
      })
    );
  }

  createPost(post: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(postId: string): Observable<void> {

    this.getPosts().subscribe(posts => {
      var aa = posts;
    });
    var id: string;
    id = postId.toString()
    return this.http.delete<void>(`http://localhost:3000/posts/${id}`);

  }


  getPostById(id: string): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url);
  }
  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
