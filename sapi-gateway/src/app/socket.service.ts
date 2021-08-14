import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { SmsService } from './sms.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public serverUrl;
  public socket;
  public sendHistory = [];
  public recvHistory = [];

  constructor(public sms: SmsService) {}

  connectWS() {
    this.socket = io(this.serverUrl);

    this.socket.on('connect', () => {
      console.log('socket: connected with id ' + this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    // wait 2 seconds and set up send channel on socketID
    setTimeout(() => {
      this.socket.on('send-' + this.socket.id, (data) => {
        this.sendHistory.push(data);
        this.sms.checkPermissionAndSend(data.to, data.body);
      });
    }, 5000);

    this.socket.on('disconnect', () => {
      console.log('socket: disconnected'); // undefined
    });

    // Wait 2 seconds and call setEventListener
    setTimeout(() => {
      this.sms.setEventListener(this.socket, this.recvHistory);
    }, 5000);
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
