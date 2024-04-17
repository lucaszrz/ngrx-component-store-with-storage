import { inject, Injectable } from '@angular/core';
import { EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Movie } from './movies.store';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly storageKey = 'movies';

  private storageService = inject(StorageService);

  constructor() {}

  getMovies(): Observable<Movie[]> {
    return this.storageService.get<Movie[]>(this.storageKey).pipe(
      map((movies) => {
        if (!movies) {
          return [];
        }

        return movies;
      }),
    );
  }

  createMovie(title: string): Observable<Movie> {
    return this.getMovies().pipe(
      map((movies) => {
        const newMovie: Movie = {
          id: crypto.randomUUID(),
          name: title,
        };

        this.storageService.set<Movie[]>(this.storageKey, [
          ...movies,
          newMovie,
        ]);

        return newMovie;
      }),
    );
  }

  updateMovie(updatedMovie: Movie): Observable<Movie[]> {
    return this.getMovies().pipe(
      map((movies) => {
        const updatedMovies: Movie[] = movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie,
        );

        this.storageService.set<Movie[]>(this.storageKey, updatedMovies);

        return updatedMovies;
      }),
    );
  }

  deleteMovie(id: string): Observable<Movie[]> {
    return this.getMovies().pipe(
      map((movies) => {
        const filteredMovies: Movie[] = movies.filter(
          (movie) => movie.id !== id,
        );

        this.storageService.set<Movie[]>(this.storageKey, filteredMovies);

        return filteredMovies;
      }),
    );
  }
}
