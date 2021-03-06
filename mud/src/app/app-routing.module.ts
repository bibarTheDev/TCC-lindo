import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: 'perfil-user', loadChildren: './perfil-user/perfil-user.module#PerfilUserPageModule' },
  { path: '', loadChildren: './login-page/login-page.module#LoginPagePageModule' },
  { path: 'login-page', loadChildren: './login-page/login-page.module#LoginPagePageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cadastro', loadChildren: './cadastro-user/cadastro-user.module#CadastroUserPageModule' },
  { path: 'relatorio-semanal', loadChildren: './relatorio-semanal/relatorio-semanal.module#RelatorioSemanalPageModule' },
  { path: 'relatorio-crise', loadChildren: './relatorio-crise/relatorio-crise.module#RelatorioCrisePageModule' },
  { path: 'mural', loadChildren: './mural/mural.module#MuralPageModule' },
  { path: 'editar-sintoma', loadChildren: './editar-sintoma/editar-sintoma.module#EditarSintomaPageModule' },
  { path: 'animacao', loadChildren: './animacao/animacao.module#AnimacaoPageModule' },
  { path: 'sessoes', loadChildren: './sessoes/sessoes.module#SessoesPageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'esqueci', loadChildren: './esqueci/esqueci.module#EsqueciPageModule' },
  { path: 'ligar', loadChildren: './ligar/ligar.module#LigarPageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'contato', loadChildren: './contato/contato.module#ContatoPageModule' },
  { path: 'guia', loadChildren: './guia/guia.module#GuiaPageModule' },


  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
