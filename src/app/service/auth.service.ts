import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastre: ToastrService, private router: Router) { }

  /**
   * @AngularFireAuth Authentication
   * @Method
   */


  //Login
  login(email: any, password: any){


    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
      this.toastre.success('Login Successfully');
      this.loadUser();
      this.LoggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(e=>{
      this.toastre.error("Wrong users credentials");
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user => {
      // console.log(JSON.parse( JSON.stringify(user)));
      localStorage.setItem('user', JSON.stringify(user));

    })
  }
  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toastre.success("User Logout Successfully");
      localStorage.removeItem('user');
      this.LoggedIn.next(false)
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.LoggedIn.asObservable();
  }
}
