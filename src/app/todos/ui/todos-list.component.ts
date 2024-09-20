import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { map } from 'rxjs';
import Todo from '../../shared/interfaces/todo.interface';
import { TodosStore } from '../data-access/todos.store';
import { TodosFormComponent } from './todos-form.component';

@Component({
  selector: 'app-todos-list',
  template: `
    <ion-list *ngIf="todo$ | async as todos">
      <ion-list-header class="ion-margin-bottom">
        <ion-label>
          <h2>Todos List</h2>

          <ion-note color="medium"><i>Slide for options...</i></ion-note>
        </ion-label>
      </ion-list-header>

      @for (todo of todos; track todo.name) {
        <ion-item-sliding>
          <ion-item>
            <ion-checkbox
              (ionChange)="toggleTodo(todo)"
              [checked]="todo.completed"
              justify="start"
              labelPlacement="end"
            >
              <ion-text *ngIf="todo.completed">
                <s>{{ todo.name }}</s>
              </ion-text>

              <ion-text *ngIf="!todo.completed">
                {{ todo.name }}
              </ion-text>
            </ion-checkbox>
          </ion-item>

          <ion-item-options>
            <ion-item-option
              (click)="selectTodo(todo)"
              color="warning"
              slot="end"
            >
              <ion-icon
                name="pencil"
                slot="icon-only"
              ></ion-icon>
            </ion-item-option>

            <ion-item-option
              (click)="deleteTodo(todo.id)"
              color="danger"
              slot="end"
            >
              <ion-icon
                name="trash"
                slot="icon-only"
              ></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      } @empty {
        Create your first TODO!
      }
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
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonNote,
  ],
})
export class TodosListComponent {
  @ViewChild(TodosFormComponent) todosFormComponent!: TodosFormComponent;
  @ViewChild(IonList) ionList!: IonList;

  protected readonly todoStore = inject(TodosStore);
  protected readonly todo$ = this.todoStore.items$.pipe(
    map((items) => {
      const notCompleted = items
        .filter((todo) => !todo.completed)
        .sort((x, y) => (x.name > y.name ? 1 : -1));
      const completed = items
        .filter((todo) => todo.completed)
        .sort((x, y) => (x.name > y.name ? 1 : -1));

      return [...notCompleted, ...completed];
    }),
  );

  constructor() {
    addIcons({ pencil, trash });
  }

  selectTodo(todo: Todo) {
    this.todoStore.setSelectedItem(todo);
    this.todosFormComponent?.modal.present();

    this.ionList.closeSlidingItems().then();
  }

  deleteTodo(id: string) {
    this.todoStore.deleteItem(id);
  }

  toggleTodo(todo: Todo) {
    this.todoStore.updateItem({
      ...todo,
      completed: !todo.completed,
    });
  }
}
