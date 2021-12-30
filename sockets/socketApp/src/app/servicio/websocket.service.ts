import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})



export class WebsocketService extends Socket {

  mensajeRecibido: EventEmitter<any> = new EventEmitter();

  constructor(){
    super({
      url:'http://localhost:5500/'
    })

    this.checkStatus();
  }

  public socketStatus = false;

  


  checkStatus(){
    console.log('hola')

    this.ioSocket.on('connect', () => {
      console.log('conectaado al servidor');
      this.socketStatus = true;
    })

    this.ioSocket.on('disconnect', () => {
      console.log('desconectaado al servidor');
      this.socketStatus = false;
    })
  }

  emit(event:string, payload: any){

    console.log('emitiendoooo')

    this.ioSocket.emit(event, payload)

  }

  listen = ( evento:string ) => {

    return this.ioSocket.on(evento, (msg: any) => {

      this.mensajeRecibido.emit(msg);

    });

  }

}
