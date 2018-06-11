import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';

import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';
import { ListType } from 'src/app/models/list-type.enum';

@Component({
  selector: 'ist-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {
  emojis$: Observable<Emoji[]>;

  constructor(private emojiService: EmojiService) {  }

  ngOnInit() {
    this.emojis$ = this.emojiService.getFavorites();
  }

  onChangeTerm(term: string): void {
    this.emojis$ = this.emojiService.searchEmojis(term, ListType.Favorite);
  }
}
