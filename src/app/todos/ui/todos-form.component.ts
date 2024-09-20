import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import Todo from '../../shared/interfaces/todo.interface';
import { TodosStore } from '../data-access/todos.store';

@Component({
  selector: 'app-todos-form',
  template: `
    <ion-modal
      trigger="open-modal"
      (willDismiss)="onWillDismiss($event)"
    >
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button (click)="cancel()">Cancel</ion-button>
            </ion-buttons>

            <ion-title>Todos</ion-title>

            <ion-buttons slot="end">
              <ion-button
                (click)="confirm()"
                [strong]="true"
              >
                Confirm
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              label="Enter the name of the todo"
              labelPlacement="stacked"
              type="text"
              placeholder="Todo name"
              [(ngModel)]="name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-checkbox
              label-placement="end"
              justify="start"
              [(ngModel)]="completed"
            >
              Completed?
            </ion-checkbox>
          </ion-item>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    CommonModule,
    IonCheckbox,
  ],
})
export class TodosFormComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  public name = '';
  public completed = false;
  public itemBeingUpdated: Todo | null = null;

  protected readonly todoStore = inject(TodosStore);

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.todoStore.selectedItem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedTodo) => {
        if (selectedTodo) {
          this.setTodoToUpdate(selectedTodo);
        }
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel').then();
  }

  confirm() {
    this.modal
      .dismiss({ name: this.name, completed: this.completed }, 'confirm')
      .then();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<
      OverlayEventDetail<{ name: string; completed: boolean }>
    >;

    if (
      ev.detail.role === 'confirm' &&
      ev.detail.data &&
      ev.detail.data.name.trim() !== ''
    ) {
      if (this.itemBeingUpdated) {
        this.updateTodo(ev.detail.data.name.trim(), ev.detail.data.completed);
      } else {
        this.addTodo(ev.detail.data.name.trim());
      }
    }

    this.name = '';
    this.completed = false;
  }

  setTodoToUpdate(todo: Todo) {
    this.name = todo.name;
    this.completed = todo.completed;
    this.itemBeingUpdated = todo;

    this.modal.present().then();
  }

  addTodo(title: string) {
    this.todoStore.addItem({
      name: title,
      completed: false,
    });
  }

  updateTodo(name: string, completed: boolean) {
    const todo: Todo = {
      ...(this.itemBeingUpdated as Todo),
      name,
      completed,
    };

    this.todoStore.updateItem(todo);
    this.itemBeingUpdated = null;
  }
}
