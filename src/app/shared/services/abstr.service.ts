import { BehaviorSubject, Observable } from 'rxjs';
import { isEqual } from '../utils/isEqual';

export interface Service<T> {
  defaultState: Partial<T>;
  state: T;
  setState: (state: T | ((state: T) => T)) => void;
  getState: () => T;
  patchState: (state: Partial<T> | ((state: T) => Partial<T>)) => void;
  onChange: () => Observable<T>;
  state$: BehaviorSubject<T>;
}

export class AppService<T> implements Service<T> {
  public state: T;
  public defaultState: Partial<T>;
  public state$: BehaviorSubject<T>;

  constructor(defaultState: Partial<T>) {
    this.defaultState = defaultState;
    this.state = { ...defaultState } as T;
    this.state$ = new BehaviorSubject<T>(this.state);
  }

  setState = (state: T | ((state: T) => T)) => {
    const prevState = this.state$.value;
    const newState =
      typeof state === 'function'
        ? (state as (prevState: T) => T)(prevState)
        : state;
    if (!isEqual(prevState, newState)) {
      this.state$.next(newState);
    }
  };

  patchState = (state: Partial<T> | ((state: T) => Partial<T>)) => {
    const prevState = this.state$.value;
    const newState =
      typeof state === 'function'
        ? state(prevState)
        : { ...prevState, ...state };
    if (!isEqual(prevState, newState)) {
      this.state$.next({ ...prevState, ...newState } as T);
    }
  };

  getState = (): T => {
    return this.state$.value;
  };

  onChange = () => {
    return this.state$.asObservable();
  };
}
