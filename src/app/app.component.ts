import { Component, TemplateRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GeneralService } from './api/general.service';
import { BsModalService } from 'ngx-bootstrap/modal'
import { HelperService } from './helper/helper.service';
import { UserService } from './api/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    BsModalService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'appAngDW2';
  constructor(
    public helperService: HelperService,
    private generalService: GeneralService,
    public userService:UserService,
    private modalService: BsModalService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.generalService.indexGet().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  showModal(myModal: TemplateRef<any>): void {
    this.modalService.show(myModal);
  }

  closeModal(): void {
    this, this.modalService.hide();
  }

  changeView(route: string): void {
		this.router.navigateByUrl(route);
	}
  closeGlobalMessage(): void {
		document.getElementById('globalMessage')!.style.display = 'none';
	}

	logout(): void {
		this.userService.logout();

		this.router.navigateByUrl('user/login');
	}
}
