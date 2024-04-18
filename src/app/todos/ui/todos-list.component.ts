import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import Todo from '../../shared/interfaces/todo.interface';
import { TodosStore } from '../data-access/todos.store';
import { TodosFormComponent } from './todos-form.component';

@Component({
  selector: 'app-todos-list',
  template: `
    <ion-list *ngIf="todo$ | async as todos">
      <ion-list-header>Todos List</ion-list-header>

      <ion-item *ngFor="let todo of todos">
        <ion-text> {{ todo.name }}</ion-text>

        <ion-button (click)="selectTodo(todo)">
          <ion-icon name="pencil"></ion-icon>
        </ion-button>

        <ion-button (click)="deleteTodo(todo.id)">
          <ion-icon name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  imports: [
    IonButton,
    IonList,
    IonListHeader,
    IonItem,
    CommonModule,
    IonIcon,
    IonText,
  ],
})
export class TodosListComponent {
  @ViewChild(TodosFormComponent) todosFormComponent!: TodosFormComponent;

  protected readonly todoStore = inject(TodosStore);
  protected readonly todo$ = this.todoStore.items$;

  constructor() {
    addIcons({ pencil, trash });
  }

  selectTodo(todo: Todo) {
    this.todoStore.setSelectedItem(todo);
    this.todosFormComponent?.modal.present();
  }

  deleteTodo(id: string) {
    this.todoStore.deleteItem(id);
  }
}
