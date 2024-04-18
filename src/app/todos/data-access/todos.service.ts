import { Injectable } from '@angular/core';
import Todo from '../../shared/interfaces/todo.interface';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService extends BaseService<Todo> {
  constructor() {
    super('todos');
  }
}
