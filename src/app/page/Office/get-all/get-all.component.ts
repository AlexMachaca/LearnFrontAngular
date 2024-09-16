import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { OfficeService } from '../../../api/office.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.scss'
})
export class OfficeGetAllComponent {
  frmEditOffice: UntypedFormGroup;
  frmSearch:UntypedFormGroup;

  get searchFb(){return this.frmSearch.controls['search']}

  get codigoOficinaFb (){return this.frmEditOffice.controls['codigoOficina']}
  get descripcionFb (){return this.frmEditOffice.controls['descripcion']}
  get paisFb (){return this.frmEditOffice.controls['pais']}
  get fechaCreacionFb (){return this.frmEditOffice.controls['fechaCreacion']}
  get estadoFb (){return this.frmEditOffice.controls['estado']}

  listOffice: any[] = [];
  indexToModify: number = -1;
 

  constructor(
    private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.frmEditOffice = this.formBuilder.group({
      codigoOficina:[null,[]],
      descripcion: [null, []],
      pais: [null, []],
      fechaCreacion: [null, []],
      estado: [null, []]
    });
    this.frmSearch=this.formBuilder.group({
      search:[null,[]]
    })
  }

  ngOnInit(): void {
    this.officeService.getAll().subscribe({
      next: (response: any[]) => {
        this.listOffice = response;
        console.log(response)
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deletePerson(codigo: string, index: number): void {
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
        this.officeService.delete(codigo).subscribe({
          next: (response: any): void => {
            // Eliminar el elemento de la lista local después de éxito
            /*const index = this.listPerson.findIndex(person => person.id === id);
            if (index!== -1) {
              this.listPerson.splice(index, 1);
            }*/
            this.listOffice.splice(index, 1);
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

    this.codigoOficinaFb.setValue(this.listOffice[index].codigoOficina);
    this.descripcionFb.setValue(this.listOffice[index].descripcion);
    this.paisFb.setValue(this.listOffice[index].pais);
    this.fechaCreacionFb.setValue(this.listOffice[index].fechaCreacion.toString().substring(0, 10));
    this.estadoFb.setValue(this.listOffice[index].estado.toString());

    this.modalService.show(modalEditPerson);
  }
  closeModal(){
    this.modalService.hide();
  }

  onClickSaveChanges(){
    let formData: FormData = new FormData();

    formData.append('codigoOficina', this.codigoOficinaFb.value);
    formData.append('descripcion', this.descripcionFb.value);
    formData.append('pais', this.paisFb.value);
    formData.append('fechaCreacion', this.fechaCreacionFb.value);
    formData.append('estado', this.estadoFb.value);

    this.officeService.update(formData).subscribe({
      next: (response: any) => {

        this.listOffice[this.indexToModify].descripcion=this.descripcionFb.value;
        this.listOffice[this.indexToModify].pais=this.paisFb.value;
        this.listOffice[this.indexToModify].fechaCreacion=this.fechaCreacionFb.value;
        this.listOffice[this.indexToModify].estado=this.estadoFb.value;
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Actualizado!',
          text: 'La oficina ha sido actualizada con éxito.',
        });
        this.closeModal(); // Cierra el modal después de mostrar la alerta
      },
      error: (error: any) => {
        console.error(error);
        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al actualizar la oficina.',
        });
      }
    });
  }
//SOLO EL FRONTEND
  //OnClickSearch():void{
    /*let formData: FormData = new FormData();
    formData.append('search', this.searchFb.value);*/
    /*this.officeService.getAll().subscribe({
      next: (allOffices: any[]) =>{
        const filteredOffices = allOffices.filter(office => 
          office.descripcion.toLowerCase().includes(this.searchFb.value.toLowerCase())
        );

        this.listOffice=filteredOffices;
        console.log(filteredOffices);
      },
      error: (error: any) =>{
        console.error(error);
      }
    });
  }*/


//CON EL BACKEND
  OnClickSearch():void{
    /*let formData: FormData = new FormData();
    formData.append('search', this.searchFb.value);*/
    this.officeService.search(this.searchFb.value).subscribe({
      next: (filteredData: any[]) =>{

        this.listOffice=filteredData;
        console.log(filteredData);

        // Muestra un mensaje de éxito usando SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Búsqueda Exitosa',
        text: 'Se encontraron ' + filteredData.length + ' oficinas.',
      });

      },
      error: (error: any) =>{
        console.error(error);

         // Muestra un mensaje de error usando SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error en la Búsqueda',
        text: 'Hubo un problema al realizar la búsqueda.',
      });

      }
    });
  }
}
