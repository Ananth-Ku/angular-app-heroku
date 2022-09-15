import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((res: any) => {
      if (res !== undefined) {
        this.userList = res;
        console.log(this.userList);
      }
    });
  }

  deleteUser(user: any) {
    const userId = user._id;
    console.log(userId);
    this.userService.deleteUser(user._id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
