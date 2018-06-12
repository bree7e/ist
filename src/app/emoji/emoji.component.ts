import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Emoji } from 'src/app/models/emoji';
import { ListType } from '../models/list-type.enum';

@Component({
  selector: 'ist-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmojiComponent implements OnInit {
  @Input() emoji: Emoji = null;
  @Input() highlighted = false;
  @Input() context: ListType = ListType.All;
  @Output() changeList: EventEmitter<ListType> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onFavoriteClick(): void {
    this.changeList.emit(ListType.Favorite);
  }

  onDeleteClick(): void {
    switch (this.context) {
      case ListType.All:
        this.changeList.emit(ListType.Deleted);
        break;
      case ListType.Favorite:
        this.changeList.emit(ListType.All);
        break;
      default:
        throw new Error('Клик на удаление в неподдерживаемом контексте');
    }
  }

  onRestoreClick(): void {
    this.changeList.emit(ListType.All);
  }

  showFavoriteButton(): boolean {
    return this.context === ListType.All;
  }

  showDeleteButton(): boolean {
    return this.context === ListType.All || this.context === ListType.Favorite;
  }

  showRestoreButton(): boolean {
    return this.context === ListType.Deleted;
  }
}
