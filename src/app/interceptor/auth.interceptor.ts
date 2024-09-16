import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn =(request,next)=> {
  const router = inject(Router);
  const userService = inject(UserService);
    // Obtén el token del localStorage o de algún servicio
    const token = localStorage.getItem('token');
    //Si la solicitud es para la ruta de "login", no se adjunta el token
    if(request.url.includes('/login')){
      console.log("No se pone el token");
      return next(request);
    }else{
      console.log("Colocando el token: "+token)
    }
    // Clona la solicitud para agregar el nuevo encabezado Authorization
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Envía la solicitud clonada con el token al siguiente manejador
    return next(authReq).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err.status==401){
          /*Swal.fire({
            title:'No esta autorizado para esta operación',
            icon: 'error',
            timer:5000
          });*/
          Swal.fire({
            title: 'Acceso Denegado',
            html: `
              <p>No estás autorizado para realizar esta operación.</p>
              <p>Parece que tu sesión ha expirado o tu token es inválido.</p>
              <p>Por favor, inicia sesión nuevamente para continuar.</p>
            `,
            icon: 'error',
            confirmButtonText: 'Iniciar Sesión',
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
              popup: 'custom-popup-class',
              confirmButton: 'btn btn-primary'
            },
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Z0MGoxMTdhZHpjZXI3eGEybnBwcjJkenp6aHVibGs3N2x0b3UzeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nR4L10XlJcSeQ/giphy.gif")
              left top
              no-repeat
            `,
            didOpen: () => {
              setTimeout(() => {
                Swal.clickConfirm();
              }, 5000); // Automáticamente hace clic en Confirmar después de 5 segundos
            }
          }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
              // Limpiar sesión local
              userService.logout();
              
              // Redirigir a la página de inicio de sesión
              router.navigateByUrl('user/login')
            }
          });
        }else if(err.status===400){
          Swal.fire({
            title:'Existe un error, contacte al administrador',
            icon: 'error',
            timer:5000
          });
        }
        return new Observable<never>();
      })
    );
  }
