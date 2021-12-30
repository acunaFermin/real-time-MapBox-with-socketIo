import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';

// const config: SocketIoConfig = { 
//   url: environment.wsUrl, options: {
//     path: '/'
//   } 
// };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SocketIoModule.forRoot(config)
    FormsModule,
    SocketIoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
