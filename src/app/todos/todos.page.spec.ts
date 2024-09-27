import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { TodosService } from './data-access/todos.service';
import { TodosPage } from './todos.page';

describe('TodosPage', () => {
  let component: TodosPage;
  let fixture: ComponentFixture<TodosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosService, Storage],
    });
    fixture = TestBed.createComponent(TodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
