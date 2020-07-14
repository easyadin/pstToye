import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  _userIsAuthenticated = false;
  currentUser; // local user details
}
