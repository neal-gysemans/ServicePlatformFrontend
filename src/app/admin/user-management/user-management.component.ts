import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserStatusResponse} from "../../dto/UserStatusResponse";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: UserStatusResponse[] = [];

  toggledUser: UserStatusResponse = {
    id: BigInt(0),
    name: '',
    email: '',
    active: false
  };

  first = 0;

  rows = 10;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAllRegularUsers().toPromise().then((users) => {
      this.users = users ?? [];
    });
  }

  toggleUserActive(userId: bigint) {
    this.adminService.toggleUserActive(userId).toPromise().then((response) => {
      if (response) {
        this.toggledUser = response;
        this.adminService.getAllRegularUsers().toPromise().then((users) => (this.users = users ?? []));
      }
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage()
    :
    boolean {
    return this.users ? this.first === this.users.length - this.rows : true;
  }

  isFirstPage()
    :
    boolean {
    return this.users ? this.first === 0 : true;
  }
}
