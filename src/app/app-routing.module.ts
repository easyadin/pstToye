import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
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
  {
    path: 'audio',
    loadChildren: () => import('./admin/audio/audio.module').then(m => m.AudioPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./admin/video/video.module').then(m => m.VideoPageModule)
  },
  {
    path: 'devotional',
    loadChildren: () => import('./admin/devotional/devotional.module').then(m => m.DevotionalPageModule)
  },
  {
    path: 'quote',
    loadChildren: () => import('./admin/quote/quote.module').then(m => m.QuotePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },

  {
    path: 'upload',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./admin/upload/upload.module').then(m => m.UploadPageModule)
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
