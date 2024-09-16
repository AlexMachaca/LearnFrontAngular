import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { PersonService } from '../../../api/person.service';
import Swal from 'sweetalert2';
import { OfficeService } from '../../../api/office.service';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class OfficeInsertComponent {
  frmInsertOffice:UntypedFormGroup;

  get descripcionFb (){return this.frmInsertOffice.controls['descripcion']}
  get paisFb (){return this.frmInsertOffice.controls['pais']}
  get fechaCreacionFb (){return this.frmInsertOffice.controls['fechaCreacion']}
  get estadoFb (){return this.frmInsertOffice.controls['estado']}

  constructor(
    private formBuilder:FormBuilder,
    private officeService:OfficeService
  ){
    this.frmInsertOffice=this.formBuilder.group({
      descripcion:[null,[]],
      pais:[null,[]],
      fechaCreacion:[null,[]],
      estado:[null,[]],
    });

  }

  onClickBtnSubmit(): void {
		let formData: FormData = new FormData();

		formData.append('descripcion', this.descripcionFb.value);
		formData.append('pais', this.paisFb.value);
		formData.append('estado', this.estadoFb.value);
		formData.append('fechaCreacion', this.fechaCreacionFb.value);
    
		this.officeService.insert(formData).subscribe({
			next: (response: any) => {
				if(response.type=="success"){
          let messages = response.listMessage.join('<br>');
          this.frmInsertOffice.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: messages,
            showConfirmButton: false,
            timer: 5000,
            toast: true
          })
        }else if(response.type=="error"){
          let messages = response.listMessage.join('<br>');
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: messages,
            showConfirmButton: false,
            timer: 5000,
            toast: true
          })
          }
			},
			error: (error: any) => {
				console.log(error);
        Swal.fire('Error', 'Ocurrió un error al insertar los datos.', 'error');
			}
		});
	}


}
