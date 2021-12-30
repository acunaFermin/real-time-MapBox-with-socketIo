import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/servicio/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor(public webSocketService:WebsocketService) { }

  
  ngOnInit(): void {
  }

}
