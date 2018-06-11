import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {  } from 'events';

@Component({
  selector: 'ist-emoji-search',
  templateUrl: './emoji-search.component.html',
  styleUrls: ['./emoji-search.component.scss']
})
export class EmojiSearchComponent implements OnInit {
  private searchTerm = new Subject<string>();
  @Output() changeTerm: EventEmitter<string> = new EventEmitter();

  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      tap(term => console.log(term))
    ).subscribe(term => this.changeTerm.emit(term));
  }
}
