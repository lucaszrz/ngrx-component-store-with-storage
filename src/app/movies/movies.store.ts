import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  catchError,
  EMPTY,
  exhaustMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { MovieService } from './movie.service';

export interface Movie {
  id: string;
  name: string;
}

export interface MoviesState {
  movies: Movie[];
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  private movieService = inject(MovieService);

  constructor() {
    super({ movies: [] });
  }

  readonly movies$: Observable<Movie[]> = this.select((state) => state.movies);

  readonly loadMovies = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => {
        return this.movieService.getMovies().pipe(
          tapResponse({
            next: (movies) => this.patchState({ movies }),
            error: (error) => console.error(error),
          }),
        );
      }),
    ),
  );

  readonly addMovieUpdater = this.updater((state, movie: Movie) => ({
    movies: [...state.movies, movie],
  }));

  readonly addMovieEffect = this.effect<string>((title$) =>
    title$.pipe(
      switchMap((title) =>
        this.movieService.createMovie(title).pipe(
          tap({
            next: (movie) =>
              this.addMovieUpdater(movie).add(() =>
                console.info('Adding movie to the sync queue!', movie),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  readonly updateMovieUpdater = this.updater((state, movies: Movie[]) => ({
    movies,
  }));

  readonly updateMovieEffect = this.effect<Movie>((updatedMovie$) =>
    updatedMovie$.pipe(
      switchMap((updatedMovie) =>
        this.movieService.updateMovie(updatedMovie).pipe(
          tap({
            next: (movies) =>
              this.updateMovieUpdater(movies).add(() =>
                console.info('Adding movie to the sync queue!', updatedMovie),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  readonly deleteMovieUpdater = this.updater((state, movies: Movie[]) => ({
    movies,
  }));

  readonly deleteMovieEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.movieService.deleteMovie(id).pipe(
          tap({
            next: (movies) =>
              this.deleteMovieUpdater(movies).add(() =>
                console.info('Adding movie to the sync queue!', id),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
