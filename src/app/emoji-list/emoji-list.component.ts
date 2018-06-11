import { Component, OnInit, Input } from '@angular/core';

import { Emoji } from 'src/app/models/emoji';
import { ListType } from 'src/app/models/list-type.enum';
import { EmojiService } from 'src/app/services/emoji.service';

@Component({
  selector: 'ist-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {
  @Input() emojis: Emoji[] = [];

  constructor(private emojiService: EmojiService) {}

  ngOnInit() {

  }

  onEmojiChangeList(emoji: Emoji, newListType: ListType) {
      switch (newListType) {
          case ListType.Favorite:
              this.emojiService.toggleFavorites(emoji);
              break;
          case ListType.Deleted:
              this.emojiService.deleteFromAll(emoji);
              break;
          case ListType.All:
              this.emojiService.restoreToAll(emoji);
              break;
      }
  }
}
