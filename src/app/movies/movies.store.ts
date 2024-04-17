import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
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

    this.loadMovies();
  }

  public movies$!: Observable<Movie[]>;

  readonly loadMovies = this.effect<void>(() => {
    return this.movieService.getMovies().pipe(
      tap({
        next: (movies) => {
          console.log('before setState');
          this.setState({ movies });
        },
        error: (e) => console.error(e),
      }),
      catchError(() => EMPTY),
      tap(() => {
        this.movies$ = this.select((state) => state.movies);
      }),
    );
  });

  readonly addMovie = this.effect<string>((title$) => {
    return title$.pipe(
      switchMap((title) =>
        this.movieService.createMovie(title).pipe(
          tap({
            next: () => this.loadMovies,
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  readonly updaterMovies = this.updater((state, movies: Movie[]) => ({
    movies,
  }));

  readonly updateMovie = this.effect<Movie>((updatedMovie$) => {
    return updatedMovie$.pipe(
      switchMap((updatedMovie) =>
        this.movieService.updateMovie(updatedMovie).pipe(
          tap({
            next: (movies) => {
              console.log('before calling loadMovies');
              this.loadMovies();
              console.log('after calling loadMovies');
              // this.updaterMovies(movies);
            },
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  readonly deleteMovie = this.effect<string>((id$) => {
    return id$.pipe(
      switchMap((id) =>
        this.movieService.deleteMovie(id).pipe(
          tap({
            next: () => this.loadMovies,
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
