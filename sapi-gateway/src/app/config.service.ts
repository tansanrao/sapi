import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export interface IConfig {
  id: number;
  phoneNumber: string;
  userId: number;
  url: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: IConfig = {
    id: null,
    phoneNumber: '',
    userId: null,
    url: '',
    status: '',
  };

  constructor(private nativeStorage: NativeStorage) {}

  async setConfig(config: IConfig) {
    try {
      await this.nativeStorage.setItem('config', config);
    } catch (e) {
      console.log(e);
    }
  }

  async getConfig(): Promise<IConfig> {
    try {
      return await this.nativeStorage.getItem('config');
    } catch (e) {
      console.log(e);
    }
  }
}
