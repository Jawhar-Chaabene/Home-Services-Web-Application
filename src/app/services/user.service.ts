import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Roleaccess, Role, Usercred, Userinfo, Users } from 'src/model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  APIBaseUrl = 'http://localhost:3000/users'

  UserRegisteration(userdata: Users) {
    return this.http.post(this.APIBaseUrl, userdata);
  }

  UserLogin(userdata: Usercred): Observable<{ user: Userinfo | null; isBanned: boolean }> {
    return this.http.get<Userinfo[]>(`${this.APIBaseUrl}?username=${userdata.username}&password=${userdata.password}`).pipe(
      map(users => {
        const user = users[0];
        if (user) {
          const isBanned = !user.status;
          return { user, isBanned };
        } else {
          return { user: null, isBanned: false };
        }
      })
    );
  }


  Duplicateusername(username: string): Observable<Userinfo[]> {
    return this.http.get<Userinfo[]>(this.APIBaseUrl + '?username=' + username);
  }


  GetMenubyRole(userrole: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>('http://localhost:3000/roleaccess?role=' + userrole);
  }
  HaveMenuAccess(userrole: string, menuname: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>('http://localhost:3000/roleaccess?role=' + userrole + '&menu=' + menuname);
  }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.APIBaseUrl);
  }

  GetAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:3000/role');
  }

  SetUserToLoaclStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

  UpdateUser(userid: number, role: string) {
    return this.http.get<Users>(this.APIBaseUrl + '/' + userid).pipe(
      switchMap((data) => {
        data.role = role;
        return this.http.put(this.APIBaseUrl + '/' + userid, data)
      })
    )
  }

  Getuserdatafromstorage() {
    let _obj: Userinfo = {
      id: 0,
      username: '',
      email: '',
      name: '',
      phone: '',
      role: '',
      status: false
    }
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }

  }
  getUserByUsername(username: string): Observable<Userinfo> {
    return this.http.get<Userinfo[]>(`${this.APIBaseUrl}?username=${username}`).pipe(
      map(users => users[0])
    );
  }
  banUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.APIBaseUrl}/${userId}/ban`, {});
  }

  unbanUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.APIBaseUrl}/${userId}/unban`, {});
  }
  updateUser(user: Users): Observable<void> {
    const url = `${this.APIBaseUrl}/${user.id}`;
    return this.http.put<void>(url, user);
  }

}
