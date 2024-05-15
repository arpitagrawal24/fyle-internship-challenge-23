import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'fyle-frontend-challenge';
  zeroState = true;
  
  user: any;
  repos: any[] = [];
  loading: boolean = false;
  username: string = '';
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  currentPage: number = 1;
  totalRepos: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.loadUser('sxyazi');
  }

  loadRepos(username: string) {
    this.loading = true;
    this.apiService
      .getRepos(username, this.currentPage, this.pageSize)
      .subscribe(
        (repos: any) => {
          this.repos = repos;
          this.loading = false;
          // console.log('Total Repos:', this.totalRepos);
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.loading = false;
        }
      );
  }

  loadUser(username: string) {
    this.apiService.getUser(username).subscribe(
      (user: any) => {
        this.user = user;
        this.zeroState = false;
        this.totalRepos = user.public_repos;
        console.log('Total Repos:', this.totalRepos);
        setTimeout(() => {
          if (this.user) this.loadRepos(this.user.login);
        }, 3000);
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.user = null;
        this.loading = false;
      }
    );
  }

  searchUser(username: any) {
    this.loading = true;
    this.loadUser(username);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadRepos(this.user.login);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.loadRepos(this.user.login);
  }
}
