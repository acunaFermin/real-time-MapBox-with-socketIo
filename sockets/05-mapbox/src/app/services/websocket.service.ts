import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService extends Socket {
	nuevoMarcador: EventEmitter<any> = new EventEmitter();
	borrarMarcador: EventEmitter<any> = new EventEmitter();
	moverMarcador: EventEmitter<any> = new EventEmitter();

	constructor() {
		super({
			url: 'http://localhost:5500/',
		});
		this.listen('marcador-nuevo');
		this.listen('marcador-borrar');
		this.listen('marcador-mover');
	}

	public socketStatus = false;

	checkStatus() {
		this.ioSocket.on('connect', () => {
			console.log('conectado al servidor');
			this.socketStatus = true;
		});

		this.ioSocket.on('disconnect', () => {
			console.log('desconectado al servidor');
			this.socketStatus = false;
		});
	}

	emit(event: string, payload: any) {
		this.ioSocket.emit(event, payload);
	}

	listen = (evento: any) => {
		return this.ioSocket.on(evento, (msg: any) => {
			if (evento == 'marcador-nuevo') {
				this.nuevoMarcador.emit(msg);
			}
			if (evento == 'marcador-borrar') {
				this.borrarMarcador.emit(msg);
			}
			if (evento == 'marcador-mover') {
				this.moverMarcador.emit(msg);
			}
		});
	};
}
