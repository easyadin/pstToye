import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'audioplayer',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./audioplayer/audioplayer.module').then(m => m.AudioplayerPageModule)
      }
    ]
  },
  {
    path: 'videoplayer',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./videoplayer/videoplayer.module').then(m => m.VideoplayerPageModule)
      }
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
