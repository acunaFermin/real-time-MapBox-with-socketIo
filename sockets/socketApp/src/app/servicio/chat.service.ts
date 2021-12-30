import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(public wsService:WebsocketService) { }

  sendMessage(mensaje: string){

    const payload = {
      de: 'fermin',
      cuerpo: mensaje
    }

    this.wsService.emit('mensaje', payload)
  }

  getMessages() {

    this.wsService.listen('mensaje-nuevo')

  }

}

