import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji } from 'src/app/models/emoji';
import { ListType } from '../models/list-type.enum';

@Component({
  selector: 'ist-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  @Input() emoji: Emoji = null;
  @Output() changeList: EventEmitter<ListType> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  isFavorite(): boolean {
      return this.emoji.type === ListType.Favorite;
  }

  addToFavorites(): void {
    this.changeList.emit(ListType.Favorite);
  }

  delete(): void {
    this.changeList.emit(ListType.Deleted);
  }

  restore(): void {
    this.changeList.emit(ListType.All);
  }

  showDeleteButton(): boolean {
    return this.emoji.type === ListType.Deleted;
  }

}
