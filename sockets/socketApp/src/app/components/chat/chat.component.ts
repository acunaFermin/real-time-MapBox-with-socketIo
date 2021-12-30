import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/servicio/chat.service';
import { WebsocketService } from 'src/app/servicio/websocket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  mensajeSubscription!: Subscription;

  mensajes:any[] = []

  elemento!: HTMLElement;


  constructor(
    public chatService: ChatService,
    public wsService: WebsocketService) { 

  }
  

  ngOnInit(): void {

    this.chatService.getMessages()

    this.mensajeSubscription = this.wsService.mensajeRecibido.subscribe(msj => {

          this.elemento = document.getElementById('chat-mensajes')!





          this.mensajes.push(msj)




          setTimeout(() => {
            
            this.elemento.scrollTop= this.elemento.scrollHeight;

          }, 50);

    })

  }



  ngOnDestroy(): void {
    
    this.mensajeSubscription.unsubscribe;

  }




  texto:string = ''

  enviar(){

    if(this.texto.trim().length !== 0){

      this.chatService.sendMessage(this.texto)

      this.texto = '';

    }

  }

}
