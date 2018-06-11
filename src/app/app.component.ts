import { Component } from '@angular/core';
import { EmojiService } from './services/emoji.service';

@Component({
  selector: 'ist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private emojiService: EmojiService) {
    emojiService.init();
  }
}
