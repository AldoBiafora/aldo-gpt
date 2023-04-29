import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface';
import { ToolService } from 'src/app/service/tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: [new FormControl, Validators.required],
    password: [new FormControl, Validators.required]
  })

  isLoading: boolean = false;


  constructor(private toolService: ToolService,
              private router: Router,
              private formBuilder: FormBuilder) {

  }
  
  ngOnInit(): void {
    this.loginForm.reset()
  }


  onSubmitLogin(): void {
    this.isLoading = true;
    let formData = this.loginForm.value;
    let returnData: User = {
      email: formData.email,
      password: formData.password /* this.toolService.hashMd5(formData.password) */
    }
    this.toolService.login(returnData).subscribe(res => {
      console.log(res)
      if(res){
        this.router.navigate(['./Home']);
      }
      else {
        this.toolService.openSnackBarError('Attenzione! Email o Password errate, Riprovare', '')
        this.isLoading = false;
        this.loginForm.reset();
      }
    })
  }

}
