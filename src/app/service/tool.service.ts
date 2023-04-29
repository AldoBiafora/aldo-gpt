import { Injectable } from '@angular/core';
import { User } from '../models/interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private snackBar: MatSnackBar) { }

  login(user: User): Observable<boolean> {
    let result: Observable<boolean> = new Observable();
    if(user.email === user.password){
      result = of(true);
    }else {
      result = of(false)
    }
    return result;
  }

  openSnackBarError(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['mat-toolbar', 'warning']
    });
  }

  openSnackBarConfirm(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['mat-toolbar', 'confirm']
    });
  }

}
