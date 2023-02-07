import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent {
  id!: string;
  user!: User;

  constructor(private route: ActivatedRoute , private userService : ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id) {
      this.userService.getUserById(this.id).subscribe({
        next: (res : User) => {
          this.user = res
        },
        error : (err : any) => {
          console.error(err);
        }
      })
    } 
  }
}
