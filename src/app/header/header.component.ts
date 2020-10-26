import { Component,EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    
    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService){}
    

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
            console.log(this.isAuthenticated);
        });
    }

    collapsed = true;
    @Output('featureSelected') featureSelected = new EventEmitter<string>();

    onSelect(featureSelected: string){
        //this.featureSelected = featureSelected;
        this.featureSelected.emit(featureSelected);
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}