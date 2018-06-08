import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';

@Component({
  selector: 'ist-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    emojis$: Observable<Emoji[]>;

    constructor(private emojiService: EmojiService) {}

    ngOnInit() {
      this.emojis$ = this.emojiService.getFavorites();
    }
}
