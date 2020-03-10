import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/model/user";
import { UserService } from "./../../service/user.service";
import { AuthService } from "./../../service/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() id;
  canEdit;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.canEdit = false;
    if (
      this.authService.isAdmin ||
      (this.authService.isEmployed && this.authService.dataOfUser.email === this.user.email)
    ) {
      this.canEdit = true;
    }
  }
}
