import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var sms: any;
declare var SMSReceive: any;

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  watcherRunning = false;

  constructor(public platform: Platform) {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      this.requestPermission();
    }
    this.watcherRunning = false;
  }

  checkPermissionAndSend(to, body) {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      this.requestPermission();
      let options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: '', // send SMS with the native android SMS messaging
          //intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
        },
      };

      let success = function (hasPermission) {
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
      let error = function (e) {
        alert('Something went wrong:' + e);
      };
      sms.hasPermission(success, error);
    }
  }

  requestPermission() {
    let success = function (hasPermission) {
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
    let error = function (e) {
      alert('Something went wrong:' + e);
    };
    sms.hasPermission(success, error);
  }

  startSMSWatch() {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      SMSReceive.startWatch(
        () => {
          console.log('smsreceive: watching started');
          this.watcherRunning = true;
        },
        () => {
          console.warn('smsreceive: failed to start watching');
        }
      );
    }
  }

  stopSMSWatch() {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      SMSReceive.stopWatch(
        () => {
          console.log('smsreceive: watching stopped');
          this.watcherRunning = false;
        },
        () => {
          console.warn('smsreceive: failed to stop watching');
        }
      );
    }
  }

  isWatcherRunning() {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      return this.watcherRunning;
    } else {
      return false;
    }
  }

  setEventListener(socket, recvHistory) {
    /* Initialize incoming SMS event listener */
    console.log('smsreceive: set event listener on socket ID ' + socket.id);
    document.addEventListener('onSMSArrive', function (e: any) {
      console.log('onSMSArrive()');
      var IncomingSMS = e.data;
      console.log('sms.address:' + IncomingSMS.address);
      console.log('sms.body:' + IncomingSMS.body);
      /* Debug received SMS content (JSON) */
      console.log(JSON.stringify(IncomingSMS));
      recvHistory.push({
        from: IncomingSMS.address,
        body: IncomingSMS.body,
        to: '',
      });
      socket.emit('receivedSMS', {
        from: IncomingSMS.address,
        body: IncomingSMS.body,
        to: '',
      });
    });
  }
}
