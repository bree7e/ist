import { Component, OnInit } from '@angular/core';

import { ListType } from 'src/app/models/list-type.enum';
import { Emoji } from 'src/app/models/emoji';
import { Observable } from 'rxjs';
import { EmojiService } from '../../services/emoji.service';

@Component({
  selector: 'ist-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  emojis$: Observable<Emoji[]>;

  constructor(private emojiService: EmojiService) {}

  ngOnInit() {
    this.emojis$ = this.emojiService.getAll();
  }
}
