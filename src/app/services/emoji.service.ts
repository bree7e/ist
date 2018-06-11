import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, pipe, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, take, filter } from 'rxjs/operators';

import { Emoji } from 'src/app/models/emoji';
import { ListType } from '../models/list-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private emojis = [];
  private emojisSubject = new BehaviorSubject<Emoji[]>([]);
  readonly emojisUrl = 'https://api.github.com/emojis';

  constructor(private http: HttpClient) {}

  private get emojis$(): Observable<Emoji[]> {
    return this.emojisSubject.asObservable();
  }

  private loadGithubEmojis(): void {
    this.http
      .get(this.emojisUrl)
      .pipe(
        map(data =>
          Object.keys(data).map(ghEmoji => new Emoji(ghEmoji, data[ghEmoji]))
        )
      )
      .subscribe(
        emojis => {
          this.emojis = emojis;
          this.emojisSubject.next(emojis.slice());
        },
        error => console.log('Не удалось загрузить emojis')
      );
  }

  public init(): void {
    this.loadGithubEmojis();
    // this.loadFromStorage();
  }

  getAll(): Observable<Emoji[]> {
    return this.emojis$.pipe(
        map( (emojis: Emoji[]) => emojis.filter(emoji => emoji.type !== ListType.Deleted) )
    );
  }

  getFavorites(): Observable<Emoji[]> {
    return this.emojis$.pipe(
        map( (emojis: Emoji[]) => emojis.filter(emoji => emoji.type === ListType.Favorite) )
    );
  }

  getDeleted(): Observable<Emoji[]> {
    return this.emojis$.pipe(
        map( (emojis: Emoji[]) => emojis.filter(emoji => emoji.type === ListType.Deleted) )
    );
  }

  toggleFavorites(emoji: Emoji): void {
    let type;
    if (emoji.type === ListType.All) {
      type = ListType.Favorite;
    } else {
      type = ListType.All;
    }
    this.emojis.find(e => e.name === emoji.name).type = type;
    this.emojisSubject.next(this.emojis);
    this.saveToStorage();
  }

  deleteFromAll(emoji: Emoji): void {
    this.emojis.find(e => e.name === emoji.name).type = ListType.Deleted;
    this.emojisSubject.next(this.emojis);
    this.saveToStorage();
  }

  restoreToAll(emoji: Emoji): void {
    this.emojis.find(e => e.name === emoji.name).type = ListType.All;
    this.emojisSubject.next(this.emojis);
    this.saveToStorage();
  }

  searchEmojis(
    term: string,
    context: ListType = ListType.All
  ): Observable<Emoji[]> {
    if (!term.trim()) {
      return of([]);
    }
    let emojis$;
    switch (context) {
        case ListType.All:
            emojis$ = this.getAll();
            break;
        case ListType.Favorite:
            emojis$ = this.getFavorites();
            break;
        case ListType.Deleted:
            emojis$ = this.getDeleted();
            break;
    }

    return emojis$.pipe(
      map( (emojis: Emoji[]) => emojis.filter(emoji => emoji.name.indexOf(term) > -1) )
    );
  }

  saveToStorage() {
    localStorage.setItem('emojis', JSON.stringify(this.emojis));
  }

  loadFromStorage() {
    // this.emojis = JSON.parse(localStorage.getItem('emojis') || '[]');
  }
}
