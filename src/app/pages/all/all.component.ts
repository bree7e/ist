import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ist-all',
  templateUrl: './all.component.html'
})
export class AllComponent implements OnInit {
  emojis$: Observable<Emoji[]>;
  title: '';

  constructor(private emojiService: EmojiService, route: ActivatedRoute) {
    this.title = route.snapshot.data.title;
  }

  ngOnInit(): void {
    this.emojis$ = this.emojiService.getAll();
  }

  onChangeTerm(term: string): void {
    this.emojis$ = this.emojiService.searchEmojis(term);
  }
}
