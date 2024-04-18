import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  template: `
    <ion-menu contentId="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-list>
          <ion-item [routerLink]="'/todos'">Todos</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <ion-header [translucent]="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>

          <ion-title>Todos App</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content [fullscreen]="true">
        <ion-item>
          <ion-text color="info">
            Click the menu button to access the app pages
          </ion-text>
        </ion-item>
      </ion-content>
    </div>
  `,
  styles: `
    #container {
      text-align: center;

      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    #container strong {
      font-size: 20px;
      line-height: 26px;
    }

    #container p {
      font-size: 16px;
      line-height: 22px;

      color: #8c8c8c;

      margin: 0;
    }

    #container a {
      text-decoration: none;
    }
  `,
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    RouterLink,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonText,
  ],
})
export class HomePage {}
