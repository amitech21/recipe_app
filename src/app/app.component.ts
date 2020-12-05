import { Component, OnInit } from '@angular/core';
// import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private store: Store<fromApp.AppState>, 
    private loggingService: LoggingService) {}

  ngOnInit(): void {
    //this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin() );
    //this.loggingService.printLog('Hello from app component');
  }

}
