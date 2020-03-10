import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../model/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  showAddMessage;
  user: User;
  id;
  constructor(
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user = this.router.getCurrentNavigation().extras.state.userData;
    this.id = this.router.getCurrentNavigation().extras.state.idData;
    this.userService.form.setValue(this.user);
}

  ngOnInit() {
    this.showAddMessage = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSubmit() {
    console.log(this.userService.form.value);
    const data = this.userService.form.value;

    this.userService.updateUserById(this.id, data).then(
        res => {
          this.openSnackBar(
            'L\'utilisateur est mis à jour !',
            'Succès !'
          );
        },
        err => {
          this.openSnackBar('L\'actualité n\'est pas enregistrée !', 'Echec !');
        }
      );
  }
}
