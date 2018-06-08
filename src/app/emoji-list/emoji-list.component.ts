import { Component, OnInit, Input } from '@angular/core';

import { Emoji } from 'src/app/models/emoji';
import { ListType } from 'src/app/models/list-type.enum';

@Component({
  selector: 'ist-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {
  @Input() emojis: Emoji[] = [];

  constructor() {}

  ngOnInit() {

  }
}
