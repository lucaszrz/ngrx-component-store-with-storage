import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  providers: [StorageService],
})
export class AppComponent {
  storageService = inject(StorageService);

  constructor() {
    this.init().then();
  }

  async init() {
    await this.storageService.init();
  }
}
