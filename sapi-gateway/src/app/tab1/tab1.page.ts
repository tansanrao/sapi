import { Component } from '@angular/core';
import { SmsService } from '../sms.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public socket: SocketService, public sms: SmsService) {}
}
