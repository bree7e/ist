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

  saveToStorage() {
    localStorage.setItem('emojis', JSON.stringify(this.emojis));
  }

  /**
   * Объеденить значения из local storage с новыми url картинок от github
   */
  loadFromStorage() {
    const localEmojis = JSON.parse(localStorage.getItem('emojis') || '[]');
    // debugger;
    if (localEmojis.length > 0) {
      this.emojis = localEmojis.map(emoji =>
        Object.assign(emoji, { url: this.emojis.find(e => e.name === emoji.name).url })
      );
    }
    // this.emojisSubject.next(this.emojis);
    this.emojisSubject.next(this.emojis);
  }

  private getGithubEmojis(): Observable<Emoji[]> {
    return this.http
      .get(this.emojisUrl)
      .pipe(
        map(data =>
          Object.keys(data).map(ghEmoji => new Emoji(ghEmoji, data[ghEmoji]))
        )
      );
  }

  public init(): void {
    this.getGithubEmojis().subscribe(
      emojis => {
        this.emojis = emojis;
        this.loadFromStorage();
      },
      () => console.error('Не удалось загрузить emojis')
    );
  }

  getAll(): Observable<Emoji[]> {
    return this.emojis$.pipe(
      map((emojis: Emoji[]) =>
        emojis.filter(emoji => emoji.type !== ListType.Deleted)
      )
    );
  }

  getFavorites(): Observable<Emoji[]> {
    return this.emojis$.pipe(
      map((emojis: Emoji[]) =>
        emojis.filter(emoji => emoji.type === ListType.Favorite)
      )
    );
  }

  getDeleted(): Observable<Emoji[]> {
    return this.emojis$.pipe(
      map((emojis: Emoji[]) =>
        emojis.filter(emoji => emoji.type === ListType.Deleted)
      )
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
    if (!term.trim()) {
      return emojis$;
    }

    return emojis$.pipe(
      map((emojis: Emoji[]) =>
        emojis.filter(emoji => emoji.name.indexOf(term) > -1)
      )
    );
  }
}
