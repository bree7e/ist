import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { Emoji } from 'src/app/models/emoji';
import { ListType } from '../models/list-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  // TODO BehaviorSubject
  public emojis: Emoji[] = [];
  readonly emojisUrl = 'https://api.github.com/emojis';

  constructor(private http: HttpClient) {}

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
    this.getGithubEmojis().subscribe(emojis => (this.emojis = emojis));
    // this.loadFromStorage();
  }

  getAll(): Observable<Emoji[]> {
    return of(
      this.emojis.filter((emoji: Emoji) => {
        return (emoji.type !== ListType.Deleted);
      })
    );
  }

  getFavorites(): Observable<Emoji[]> {
    return of(
      this.emojis.filter((emoji: Emoji) => {
        return emoji.type === ListType.Favorite;
      })
    );
  }

  getDeleted(): Observable<Emoji[]> {
    return of(
      this.emojis.filter((emoji: Emoji) => {
        return emoji.type === ListType.Deleted;
      })
    );
  }

  toggleFavorites(emoji: Emoji): void {
    if (emoji.type === ListType.All) {
      emoji.type = ListType.Favorite;
    } else {
      emoji.type = ListType.All;
    }
    // this.emojis = [...this.emojis, emoji];
    let findedEmoji = this.emojis.find(e => e.name === emoji.name);
    findedEmoji = emoji;
    // TODO next to Subject
    this.saveToStorage();
  }

  deleteFromAll(emoji: Emoji): void {
    // emoji.type = ListType.Deleted;
    // this.emojis = [...this.emojis, emoji];
    this.emojis.find(e => e.name === emoji.name).type = ListType.Deleted;
    this.saveToStorage();
  }

  restoreToAll(emoji: Emoji): void {
    // emoji.type = ListType.All;
    this.emojis.find(e => e.name === emoji.name).type = ListType.All;
    this.saveToStorage();
  }

  searchEmojis(
    term: string,
    context: ListType = ListType.All
  ): Observable<Emoji[]> {
    if (!term.trim()) {
      return of([]);
    }
    return of(this.emojis);
  }

  saveToStorage() {
    localStorage.setItem('emojis', JSON.stringify(this.emojis));
  }

  loadFromStorage() {
    // this.emojis = JSON.parse(localStorage.getItem('emojis') || '[]');
  }
}
