import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './pages/all/all.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { DeletedComponent } from './pages/deleted/deleted.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: AllComponent, data: { title: 'Все' }  },
  { path: 'favorites', component: FavoritesComponent, data: { title: 'Избранные' }  },
  { path: 'deleted', component: DeletedComponent, data: { title: 'Удалённые' }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
