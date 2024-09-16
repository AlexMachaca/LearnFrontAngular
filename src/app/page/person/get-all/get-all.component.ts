import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../../api/person.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.scss'
})
export class PersonGetAllComponent implements OnInit {
  frmEditPerson: UntypedFormGroup;


  listPerson: any[] = [];
  indexToModify: number = -1;

  get idPersonFb() { return this.frmEditPerson.controls["idPerson"]; }
  get firstNameFb() { return this.frmEditPerson.controls['firstName']; }
  get surNameFb() { return this.frmEditPerson.controls['surName']; }
  get dniFb() { return this.frmEditPerson.controls['dni']; }
  get genderFb() { return this.frmEditPerson.controls['gender']; }
  get birthDateFb() { return this.frmEditPerson.controls['birthDate']; }

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.frmEditPerson = this.formBuilder.group({
      idPerson: [null, []],
      firstName: [null, []],
      surName: [null, []],
      dni: [null, []],
      gender: [null, []],
      birthDate: [null, []]
    });
  }

  ngOnInit(): void {
    this.personService.getAll().subscribe({
      next: (response: any) => {
        this.listPerson = response.dto.listPerson;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


  deletePerson(id: string, index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.delete(id).subscribe({
          next: (response: any): void => {
            // Eliminar el elemento de la lista local después de éxito
            /*const index = this.listPerson.findIndex(person => person.id === id);
            if (index!== -1) {
              this.listPerson.splice(index, 1);
            }*/
            this.listPerson.splice(index, 1);
            Swal.fire(
              'Eliminado!',
              'La persona ha sido eliminada.',
              'success'
            );
          },
          error: (error: any): void => {
            console.error("Error deleting person", error);
            Swal.fire(
              'Error!',
              'Hubo un error al intentar eliminar la persona.',
              'error'
            );
          }
        });
      }
    });
  }

  showModal(modalEditPerson: TemplateRef<any>, index: any): void {
    this.indexToModify = index;

    this.idPersonFb.setValue(this.listPerson[index].idPerson);
    this.firstNameFb.setValue(this.listPerson[index].firstName);
    this.surNameFb.setValue(this.listPerson[index].surName);
    this.dniFb.setValue(this.listPerson[index].dni);
    this.genderFb.setValue(this.listPerson[index].gender.toString());
    this.birthDateFb.setValue(this.listPerson[index].birthDate.toString().substring(0, 10));

    this.modalService.show(modalEditPerson);
  }

  closeModal(): void {
    this.modalService.hide();
  }

  onClickSaveChanges(): void {
    let formData: FormData = new FormData();

    formData.append('idPerson', this.idPersonFb.value);
    formData.append('firstName', this.firstNameFb.value);
    formData.append('surName', this.surNameFb.value);
    formData.append('dni', this.dniFb.value);
    formData.append('gender', this.genderFb.value);
    formData.append('birthDate', this.birthDateFb.value);

    this.personService.updatePerson(formData).subscribe({
      next: (response: any) => {
        if(response.type=="success"){
          this.listPerson[this.indexToModify].firstName=this.firstNameFb.value;
          this.listPerson[this.indexToModify].surName=this.surNameFb.value;
          this.listPerson[this.indexToModify].dni=this.dniFb.value;
          this.listPerson[this.indexToModify].gender=this.genderFb.value=='true';
          this.listPerson[this.indexToModify].birthDate=this.birthDateFb.value;
          let messages = response.listMessage.join('<br>');
          // Mostrar alerta de éxito con SweetAlert2
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: messages,
            showConfirmButton: false,
            timer: 5000,
            toast: true
          });
          this.closeModal(); // Cierra el modal después de mostrar la alerta
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

