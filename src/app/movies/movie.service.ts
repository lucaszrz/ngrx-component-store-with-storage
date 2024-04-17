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
        this.storageService.set<Movie[]>(
          this.storageKey,
          movies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie,
          ),
        );

        return movies;
      }),
    );
  }

  deleteMovie(id: string): Observable<void> {
    return this.getMovies().pipe(
      map((movies) => movies.filter((movie) => movie.id !== id)),
      tap((movies) =>
        this.storageService.set<Movie[]>(this.storageKey, movies),
      ),
      switchMap(() => EMPTY),
    );
  }
}
