import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';

@Component({
  selector: 'ist-deleted',
  templateUrl: './deleted.component.html'
})
export class DeletedComponent implements OnInit {
  emojis$: Observable<Emoji[]>;

  constructor(private emojiService: EmojiService) {  }

  onChangeTerm() {  }

  ngOnInit() {
    this.emojis$ = this.emojiService.getDeleted();
  }
}
