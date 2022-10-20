import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

public setRoles(roles: []) {
  localStorage.setItem('roles', JSON.stringify(roles));
}




public getRoles(): [] {
  return  JSON.parse(localStorage.getItem('roles')!);
}

// public setToken(jwtToken: string):{
//   localStorage.setItem('access_token', jwtToken);
// }

public getToken(): string {
  return localStorage.getItem('access_token')!;
}

public clear() {
  localStorage.clear();
}

public isLoggedIn() {
   if(this.getRoles() !== null && this.getToken() !== null) {
   return true
}
else {
  return false;
}

}

}
