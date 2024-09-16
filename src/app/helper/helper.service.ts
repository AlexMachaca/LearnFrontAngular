import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  showSuccessMessage(message: string): void {
		document.getElementById('globalMessage')!.classList.remove('toastSuccess');
		document.getElementById('globalMessage')!.classList.remove('toastWarning');
		document.getElementById('globalMessage')!.classList.remove('toastError');
		document.getElementById('globalMessage')!.classList.remove('toastException');

		document.getElementById('globalMessage')!.classList.add('toastSuccess');

		document.getElementById('globalMessage')!.style.display = 'inline-block';
		document.getElementById('globalMessageTitle')!.innerText = 'Correcto';
		document.getElementById('globalMessageBody')!.innerHTML = message;

		setTimeout(() => {
			document.getElementById('globalMessage')!.style.display = 'none';
		}, 5000);
	}

	showWarningMessage(listMessage: string[]): void {
		document.getElementById('globalMessage')!.classList.remove('toastSuccess');
		document.getElementById('globalMessage')!.classList.remove('toastWarning');
		document.getElementById('globalMessage')!.classList.remove('toastError');
		document.getElementById('globalMessage')!.classList.remove('toastException');

		document.getElementById('globalMessage')!.classList.add('toastWarning');

		document.getElementById('globalMessage')!.style.display = 'inline-block';
		document.getElementById('globalMessageTitle')!.innerText = 'Alerta';

		let joinMessage = '';

		listMessage.forEach((element, index) => {
			joinMessage += element + ((index + 1) != listMessage.length ? '<hr>' : '');
		});

		document.getElementById('globalMessageBody')!.innerHTML = joinMessage;

		setTimeout(() => {
			document.getElementById('globalMessage')!.style.display = 'none';
		}, 10000);
	}

	showErrorMessage(listMessage: string[]): void {
		document.getElementById('globalMessage')!.classList.remove('toastSuccess');
		document.getElementById('globalMessage')!.classList.remove('toastWarning');
		document.getElementById('globalMessage')!.classList.remove('toastError');
		document.getElementById('globalMessage')!.classList.remove('toastException');

		document.getElementById('globalMessage')!.classList.add('toastError');

		document.getElementById('globalMessage')!.style.display = 'inline-block';
		document.getElementById('globalMessageTitle')!.innerText = 'Error';

		let joinMessage = '';

		listMessage.forEach((element, index) => {
			joinMessage += element + ((index + 1) != listMessage.length ? '<hr>' : '');
		});

		document.getElementById('globalMessageBody')!.innerHTML = joinMessage;

		setTimeout(() => {
			document.getElementById('globalMessage')!.style.display = 'none';
		}, 10000);
	}

	showExceptionMessage(listMessage: string[]): void {
		document.getElementById('globalMessage')!.classList.remove('toastSuccess');
		document.getElementById('globalMessage')!.classList.remove('toastWarning');
		document.getElementById('globalMessage')!.classList.remove('toastError');
		document.getElementById('globalMessage')!.classList.remove('toastException');

		document.getElementById('globalMessage')!.classList.add('toastException');

		document.getElementById('globalMessage')!.style.display = 'inline-block';
		document.getElementById('globalMessageTitle')!.innerText = 'Excepción';

		let joinMessage = '';

		listMessage.forEach((element, index) => {
			joinMessage += element + ((index + 1) != listMessage.length ? '<hr>' : '');
		});

		document.getElementById('globalMessageBody')!.innerHTML = joinMessage;

		setTimeout(() => {
			document.getElementById('globalMessage')!.style.display = 'none';
		}, 10000);
	}


}
