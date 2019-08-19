import { Router } from '@angular/router';
import { IUsuario } from './../interfaces/IUsuario';
import { BancoService } from './../servicos/banco.service';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { from } from 'rxjs';
import { async } from 'q';
import { setFirstTemplatePass } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public murais = [
  ];



   ngOnInit() {
     this.addMural();
   }

  public profissional: IUsuario;
  public user_sessao;

  

  constructor(
    private dadosService: DadosService,
    private BancoService: BancoService,
    private AlertController: AlertController,
    private router: Router
  ) {
    this.profissional = dadosService.getDados("user");
    this.user_sessao = this.dadosService.getDados("user_sessao");

  }


  ionViewDidEnter() {
    this.profissional = this.dadosService.getDados("user");
    if (!this.profissional) {
      this.dadosService.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }

  public deleteMural(mural)
  {
    
  this.BancoService.deletarMural(this.user_sessao.id_usuario, this.profissional.id_usuario, mural.id_mural).then(async (response) => {
    const alert = await this.AlertController.create({
      header: 'deletou',
      subHeader: 'Deletado!',
      message: JSON.stringify(response),
      buttons: ['OK']
    });
    this.addMural();
    await alert.present();
  }
  )
    .catch(async (response) => {

      const alert = await this.AlertController.create({
        header: 'deu ruim',
        subHeader: 'Erro ao deletar!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });

      await alert.present();
    })
  }
  public addMural()
  {
    let id=this.dadosService.getId();
    this.BancoService.selecionarMuralProf(this.user_sessao.id_usuario,this.profissional.id_usuario).then(async(response)=>{
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response[0].id_usuario),
        buttons: ['OK']
      });

      let n=0;
      do
      {
        this.murais.splice(0,n);
        n++;
      }while(response[n]!=null)

      let a=0;
      do
      {
        this.murais.push(response[a]);
        a++;
      }while(response[a]!=null)

      await alert.present();
    }
  )
  .catch(async(response)=>{

    const alert = await this.AlertController.create({
      header: 'xiiiii',
      subHeader: 'Erro!',
      message: JSON.stringify(response),
      buttons: ['OK']
    });

    await alert.present()
  })

 }

public async alertaDeletar(mural){
  const alert = await this.AlertController.create({
    header: 'Apagar Resgistro',
    message: 'realmente quer deletar mural?',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Sim',
        handler: () => {
          
          this.deleteMural(mural);
        }
      }
    ]

  });
  await alert.present();
}
  async inserirMural() {
    let titulo = (<HTMLInputElement>document.getElementById("1")).value;
    let texto = (<HTMLInputElement>document.getElementById("2")).value;

    // JP, coloquei o campo this.profissional.id_usuario para sring pq o inserir  mural pede isso
    this.BancoService.inserirMural(titulo, texto, this.user_sessao.id_usuario, this.profissional.id_usuario.toString()).then(async (response) => {
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
      this.addMural();
      await alert.present();
    }
    )
      .catch(async (response) => {

        const alert = await this.AlertController.create({
          header: 'Confirmação',
          subHeader: 'Erro!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });

        await alert.present();
      })

  }
}
