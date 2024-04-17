import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add, pencil, trash } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';
import { Movie, MoviesStore } from './movies.store';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
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
  ],
  providers: [MoviesStore, StorageService],
})
export class MoviesPage {
  @ViewChild(IonModal) modal!: IonModal;

  public name: string = '';
  public itemBeingUpdated: Movie | null = null;

  constructor(protected readonly movieStore: MoviesStore) {
    addIcons({ add, trash, pencil });

    this.movieStore.loadMovies();
  }

  setMovieToUpdate(movie: Movie) {
    this.name = movie.name;
    this.itemBeingUpdated = movie;

    this.modal.present().then();
  }

  updateMovie(movie: Movie) {
    this.movieStore.updateMovie(movie);
    this.itemBeingUpdated = null;
  }

  deleteMovie(id: string) {
    this.movieStore.deleteMovie(id);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel').then();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm').then();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (
      ev.detail.role === 'confirm' &&
      ev.detail.data &&
      ev.detail.data.trim() !== ''
    ) {
      if (this.itemBeingUpdated) {
        this.updateMovie({
          ...this.itemBeingUpdated,
          name: ev.detail.data.trim(),
        });
      } else {
        this.movieStore.addMovie(ev.detail.data.trim());
      }
    }

    this.name = '';
  }
}
