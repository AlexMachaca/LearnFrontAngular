import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { HelperService } from '../../../../helper/helper.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../api/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
		ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  frmLoginUser: UntypedFormGroup;

	get userNameFb(){ return this.frmLoginUser.controls['userName']; }
	get passwordFb(){ return this.frmLoginUser.controls['password']; }

	constructor(
		private helperService: HelperService,
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService
	) {
		this.frmLoginUser = this.formBuilder.group({
			userName: ['', []],
			password: ['', []]
		});
	}

	onClickBtnSubmit(): void {
		if(!this.frmLoginUser.valid) {
			this.frmLoginUser.markAllAsTouched();
			this.frmLoginUser.markAsDirty();

			this.helperService.showErrorMessage(['Complete y corrija toda la información.']);

			return;
		}

		let formData: FormData = new FormData();

		formData.append('userName', this.userNameFb.value);
		formData.append('password', this.passwordFb.value);

		this.userService.login(formData).subscribe({
			next: (response: any) => {
				switch(response.type) {
					case 'success':
						this.helperService.showSuccessMessage(response.listMessage[0]);

					break;

					case 'warning':
						this.helperService.showWarningMessage(response.listMessage);

					break;

					case 'error':
						this.helperService.showErrorMessage(response.listMessage);

					break;

					case 'exception':
						this.helperService.showExceptionMessage(response.listMessage);

					break;
				}

				if(response.type == 'success' || response.type == 'warning') {
					localStorage.setItem('idUser', response.dto.user.idUser);
					localStorage.setItem('userName', response.dto.user.userName);
					localStorage.setItem('token', response.token);

					this.router.navigateByUrl('person/get-all');

					this.frmLoginUser.reset();
				}
			},
			error: (error: any) => {
				this.helperService.showExceptionMessage([error]);
			}
		});
	}
}
