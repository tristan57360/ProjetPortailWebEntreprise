import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from '../../model/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  //@Input() user: User;
  showAddMessage;
  user: User;
  id;
  constructor(
    public userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    /* this.user = { lastname:'',
  firstname:'',
email:'',
role:'',
photo:'',
equipe:'',
numero:'' }; */
this.user = this.router.getCurrentNavigation().extras.state.userData;
this.id = this.router.getCurrentNavigation().extras.state.idData;
this.userService.form.setValue(this.user);
}

  ngOnInit() {
    this.showAddMessage = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSubmit() {
    console.log(this.userService.form.value);
    let data = this.userService.form.value;

    /*if (data.titre != null && data.html != null) {*/
    this.userService.updateUserById(this.id,data).then(
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
    /*} else if (data.titre == null) {
      this.openSnackBar("Le champ titre est vide", "Echec !");
    } else if (data.html == null) {
      this.openSnackBar("Le champ HTML est vide", "Echec !");
    } else {
      this.openSnackBar("Les champs sont vides", "Echec !");
    }*/
  }
}
