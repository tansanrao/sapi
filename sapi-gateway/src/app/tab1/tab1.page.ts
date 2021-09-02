import { Component } from '@angular/core';
import { ConfigService, IConfig } from '../config.service';
import { SmsService } from '../sms.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  private config: IConfig = {
    id: null,
    phoneNumber: '',
    userId: null,
    url: '',
    status: '',
  };

  constructor(
    public socket: SocketService,
    public sms: SmsService,
    public configService: ConfigService
  ) {}

  async loadConfig() {
    this.config = await this.configService.getConfig();
  }

  async saveConfig() {
    await this.configService.setConfig(this.config);
  }
}
