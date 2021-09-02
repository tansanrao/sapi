import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(public socket: SocketService) {}
}
