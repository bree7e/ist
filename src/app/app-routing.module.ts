import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './pages/all/all.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { DeletedComponent } from './pages/deleted/deleted.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: AllComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'deleted', component: DeletedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
