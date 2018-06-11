import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';
import { ListType } from '../../models/list-type.enum';

@Component({
  selector: 'ist-deleted',
  templateUrl: './deleted.component.html'
})
export class DeletedComponent implements OnInit {
  emojis$: Observable<Emoji[]>;

  constructor(private emojiService: EmojiService) {  }

  ngOnInit(): void {
    this.emojis$ = this.emojiService.getDeleted();
  }

  onChangeTerm(term: string): void {
    this.emojis$ = this.emojiService.searchEmojis(term, ListType.Deleted);
  }

}
