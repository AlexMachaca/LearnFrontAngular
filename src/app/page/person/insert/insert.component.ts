
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';

import { PersonService } from '../../../api/person.service';
import Swal from 'sweetalert2';
import { CpShowErrorComponent } from '../cp-show-error/cp-show-error.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CpShowErrorComponent],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})

export class PersonInsertComponent {
  frmInsertPerson:UntypedFormGroup;

  get firstNameFb (){return this.frmInsertPerson.controls['firstName']}
  get surNameFb (){return this.frmInsertPerson.controls['surName']}
  get dniFb (){return this.frmInsertPerson.controls['dni']}
  get genderFb (){return this.frmInsertPerson.controls['gender']}
  get birthDateFb (){return this.frmInsertPerson.controls['birthDate']}

  constructor(
    private formBuilder:FormBuilder,
    private personService:PersonService
  ){
    this.frmInsertPerson=this.formBuilder.group({
      firstName:["",[Validators.required]],
      surName:["",[Validators.required]],
      dni:["",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]],
      gender:["",[Validators.required]],
      birthDate:["",[Validators.required]]
    });

  }


  onClickBtnSubmit():void{
    /*if(!this.frmInsertPerson.valid){
      this.frmInsertPerson.markAllAsTouched();
      this.frmInsertPerson.markAsDirty();
    }*/
    let formData:FormData=new FormData();

    formData.append('firstName', this.firstNameFb.value);
    formData.append('surName', this.surNameFb.value);
    formData.append('dni', this.dniFb.value);
    formData.append('gender', this.genderFb.value);
    formData.append('birthDate', this.birthDateFb.value);
    /*try {
      const response = this.personService.insert(formData); 
      Swal.fire('Éxito', 'Datos insertados correctamente.', 'success');
      console.log(response);
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al insertar los datos.', 'error');
      console.error(error);
    }*/
    this.personService.insert(formData).subscribe({
			next: (response: any) => {
        if(response.type=='success'){
          Swal.fire('Éxito', 'Datos insertados correctamente.', response.type);//'success'
				console.log(response);
        }
        else if(response.type=='error'){
          let errorsListHtml = '<ul>';
          response.listMessage.forEach((err: { message: string; }) => {
            errorsListHtml += `<li>${err.message}</li>`;
          });
          errorsListHtml += '</ul>';
          Swal.fire('Error', errorsListHtml, response.type);//'success'
				console.log(response);
        }
			},
			error: (errorResponse: HttpErrorResponse) => {

        if (errorResponse.error && Array.isArray(errorResponse.error)) {
          let errorsListHtml = '<ul>';
          errorResponse.error.forEach((err: { message: string; }) => {
            errorsListHtml += `<li>${err.message}</li>`;
          });
          errorsListHtml += '</ul>';
      
          Swal.fire({
            icon: 'error',
            html: errorsListHtml,
            title: 'Error'
          });
      
          console.error(errorsListHtml);
        } else {
          Swal.fire('Error', 'Ocurrió un error al insertar los datos.', 'error');
        }
    }
		});
	}



}
