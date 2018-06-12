import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllComponent } from './pages/all/all.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { EmojiComponent } from './emoji/emoji.component';
import { EmojiListComponent } from './emoji-list/emoji-list.component';
import { EmojiSearchComponent } from './emoji-search/emoji-search.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    FavoritesComponent,
    DeletedComponent,
    EmojiComponent,
    EmojiListComponent,
    EmojiSearchComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
