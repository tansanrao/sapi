import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var sms: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  serverUrl;
  socket;
  sendHistory = [];
  recvHistory = [];

  constructor(public androidPermissions: AndroidPermissions) {}

  connectWS() {
    this.socket = io(this.serverUrl);

    this.socket.on('connect', () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on('send-1', (data) => {
      this.sendHistory.push(data);
      this.checkPermissionAndSend(data.to, data.body);
    });

    this.socket.on('disconnect', () => {
      console.log(this.socket.id); // undefined
    });
  }

  getSocketId() {
    if (this.socket) {
      return this.socket.id ? this.socket.id : 'disconnected';
    } else {
      return 'disconnected';
    }
  }
  checkPermissionAndSend(to, body) {
    this.requestPermission();
    let options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '', // send SMS with the native android SMS messaging
        //intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
      },
    };

    // sms.send(
    //   to,
    //   body,
    //   options,
    //   () => console.log('success'),
    //   (error) => console.log(error)
    // );

    var success = function (hasPermission) {
      if (hasPermission) {
        sms.send(
          to,
          body,
          options,
          () => console.log('success'),
          (error) => console.log(error)
        );
      } else {
        // show a helpful message to explain why you need to require the permission to send a SMS
        // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
      }
    };
    var error = function (e) {
      alert('Something went wrong:' + e);
    };
    sms.hasPermission(success, error);
  }

  requestPermission() {
    var success = function (hasPermission) {
      if (!hasPermission) {
        sms.requestPermission(
          function () {
            console.log('[OK] Permission accepted');
          },
          function (error) {
            console.info('[WARN] Permission not accepted');
            // Handle permission not accepted
          }
        );
      }
    };
    var error = function (e) {
      alert('Something went wrong:' + e);
    };
    sms.hasPermission(success, error);
  }
}
