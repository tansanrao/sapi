import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ConfigService } from './config.service';
import { SmsService } from './sms.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private config;
  public socket;
  public sendHistory = [];
  public recvHistory = [];

  constructor(public sms: SmsService, private configService: ConfigService) {}

  async connectWS() {
    this.config = await this.configService.getConfig();
    this.socket = io(this.config.url);

    this.socket.on('connect', () => {
      console.log('socket: connected with id ' + this.socket.id);
      // Wait 5 seconds and call setEventListener
      setTimeout(async () => {
        await this.sms.setEventListener(
          this.config,
          this.socket,
          this.recvHistory
        );
      }, 5000); // x8WIv7-mJelg7on_ALbx

      // wait 5 seconds and set up send channel on socketID
      setTimeout(() => {
        this.socket.on('send-' + this.socket.id, (data) => {
          this.sendHistory.push(data);
          this.sms.checkPermissionAndSend(data.to, data.body);
        });
      }, 5000);
    });

    this.socket.emit('announce', this.config);

    this.socket.on('disconnect', () => {
      console.log('socket: disconnected'); // undefined
    });
  }

  disconnectWS() {
    this.socket.disconnect();
  }

  getSocketId() {
    if (this.socket) {
      return this.socket.id ? this.socket.id : 'disconnected';
    } else {
      return 'disconnected';
    }
  }

  isSocketConnected() {
    if (this.socket) {
      if (this.socket.id) return true;
      return false;
    } else {
      return false;
    }
  }
}
