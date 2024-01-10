import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';
import { AuthService } from '../shared/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: '.active1 { background-color: whitesmoke; color: black; border: 1.5px black}'
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;
  isAuthenticated = false;

  constructor (private dataStoreService: DataStorageService, private authService: AuthService) {}
  ngOnDestroy (): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit (): void {
    this.userSubs = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // (!!user)is a short hand of -> (!user ? false : true)
    });
  }

  collapsed = true;
  // @Output() featureSelected = new EventEmitter<string>();

  // // onSelected (feature: string): void {
  // //   this.featureSelected.emit(feature);
  // // }

  onSaveData (): void {
    this.dataStoreService.storeRecipes().subscribe(response => {
      console.log(response);
    });
  }

  onFetchData (): void {
    this.dataStoreService.fetchRecipes().subscribe();
  }

  onLogout () {
    this.authService.logout();
  }
}
