import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Emoji } from 'src/app/models/emoji';
import { EmojiService } from 'src/app/services/emoji.service';

@Component({
  selector: 'ist-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  emojis$: Observable<Emoji[]>;

  constructor(private emojiService: EmojiService, route: ActivatedRoute) {
    console.log(route.snapshot.data.title);
  }

  ngOnInit() {
    this.emojis$ = this.emojiService.getAll();
  }
}
