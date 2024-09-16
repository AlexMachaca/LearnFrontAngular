import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.existsSession()) {
    return true;
  } else {
    console.log("Por favor, inicie sesion :)")
    Swal.fire({
      title: 'Acceso Restringido',
      html: '<p>Por favor, inicia sesión para acceder a esta página.</p>',
      icon: 'info',
      showConfirmButton: true,
      confirmButtonText: 'Ir a Inicio de Sesión',
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'custom-popup-class',
        confirmButton: 'btn btn-primary'
      },
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      didOpen: () => {
        setTimeout(() => {
          Swal.clickConfirm();
        }, 3000); // Automáticamente hace clic en Confirmar después de 3 segundos
      }
    }).then((result) => {
      if (result.isDismissed || result.isConfirmed) {
        router.navigateByUrl('user/login');
        userService.logout();
      }
    });
    return false;
  }

};
