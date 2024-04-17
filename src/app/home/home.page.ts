import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonList, IonItem,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    RouterLink,
  ],
})
export class HomePage {
  constructor() {}
}
