import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { StorageService } from '../shared/services/storage.service';
import { TodosStore } from './data-access/todos.store';
import { TodosFormComponent } from './ui/todos-form.component';
import { TodosListComponent } from './ui/todos-list.component';

@Component({
  selector: 'app-todos',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Todos Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <app-todos-list></app-todos-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end" id="open-modal">
        <ion-fab-button>
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <app-todos-form></app-todos-form>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonListHeader,
    IonText,
    TodosListComponent,
    TodosFormComponent,
  ],
  providers: [TodosStore, StorageService],
})
export class TodosPage {
  constructor() {
    addIcons({ add });
  }
}
