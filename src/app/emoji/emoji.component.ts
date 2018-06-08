import { Component, OnInit, Input } from '@angular/core';
import { Emoji } from 'src/app/models/emoji';

@Component({
  selector: 'ist-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  @Input() emoji: Emoji = null;

  constructor() {}

  ngOnInit() {}
}
