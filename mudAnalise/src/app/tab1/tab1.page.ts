import { BancoService } from './../servicos/banco.service';
import { DadosService } from './../servicos/dados.service';
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user_sessao;
  public profissional;
  public crises;
  public existe = 1;
  public duracao;
  public duracao_text;

  information;

  constructor(
    private alertController: AlertController,
    private callNumber: CallNumber,
    private router: Router,
    private ds: DadosService,
    private bd: BancoService,
    public navCtrl: NavController
  ) {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.profissional = this.ds.getDados("user");
  }

  // PARAMS
  criseId;
  tipo;
  public NavigationExtras = {
    queryParams: {
      criseId: this.criseId,
      tipo: this.tipo
    }
  };


  /**
   * se entrou na pagina, carrega os dados profissional e do paciente selecionado
   */
  ionViewWillEnter() {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.profissional = this.ds.getDados("user");

    if (!this.user_sessao) {
     //console.log('asdasdas');
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");

    } else {
      this.carregarCrises();
      
    }
  }
/**
 * Metodo efetuar chamada telefonica
 */
  async callNow() {
    this.callNumber.callNumber(this.user_sessao.celular, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirAbas() {
    this.router.navigateByUrl('/opcoes-menu/ficha-usuario')
  }

  async onClick(criseId, tipo) {
    // this.router.navigateByUrl('/detalhes-crise/'+criseId);
    this.criseId = criseId;
    this.tipo = tipo;
    this.navCtrl.navigateForward(['/detalhes-crise/'], this.NavigationExtras);

  }

  /**
   * recebe intendidade como int e coloca o correspondente em string
   * @param intensidade 
   */
  public mudaIntensidade(intensidade) {
    if (intensidade == "1") {
      intensidade = "leve"
    } else if (intensidade == "2") {
      intensidade = "moderado"
    } else if (intensidade == "3") {
      intensidade = "forte"
    }
    else if (intensidade == "4") {
      intensidade = "extremo"
    }

    return intensidade;
  }

  //#region aqui vou puxar as crises do banco

  /**
   * Pega os dados vitais da crise e monta um JSON para facilitar a manipulacao dos dados
   * @param crises 
   */
  private geraJSON(crises) {
    let temp = [];
    for (let cri of crises) {
      if(cri.duracao == 0)
        this.duracao_text = "Menos de 10 minutos";
      if(cri.duracao == 200)
        this.duracao_text = "10 - 15 minutos";
      if(cri.duracao == 400)
        this.duracao_text = "15 - 30 minutos";
      if(cri.duracao == 600)
        this.duracao_text = "31 - 45 minutos";
      if(cri.duracao == 800)
        this.duracao_text = "46 - 60 minutos";
      if(cri.duracao == 1000)
        this.duracao_text = "Mais de 60 minutos";
      temp.push(
        {
          "criseId": cri.id_crise,
          "name": moment(cri.created_at).format('DD/MM/YYYY'),
          "intensidade": this.mudaIntensidade(cri.intensidade),
          "duracao": this.duracao_text,

        }
      ); 
    }
    console.log("INFO: ", temp);
    return temp;
  }

  /**
   * Calcula a duracao da Crise
   * @param hora_inicio 
   * @param hora_fim 
   */
  /*public duracao(hora_inicio, hora_fim) {
    var start = moment(hora_inicio, "HH:mm");
    var end = moment(hora_fim, "HH:mm");
    var minutes = end.diff(start, 'minutes');

    if (minutes < 0 || minutes == null || minutes == NaN) {
      minutes = 0;
    }
    return minutes;
  }*/

  /**
   * Carrega a interface com os dados de certa Crise
   */
  carregarCrises() {
    this.bd.selectGenerico("SELECT * FROM crise WHERE usuario_id=" + this.user_sessao.id_usuario + " ORDER BY created_at DESC;")
    .then(async (resposta) => {
      console.log(resposta);
      this.crises = resposta;
      this.information = this.geraJSON(this.crises);
      console.log("crises: ", this.information);
      if(this.information.length == 0){
        this.information = false;
        this.existe = 0;
      }
      else{
        this.information[0].open = true;
        this.existe = 2;
      }
    }).catch(async (resposta) => 
    {  
      //console.log("ERRO: ", resposta)
    })
    .catch(async (resposta) => 
    {
      //console.log("ERRO: ", resposta)

      const alert = await this.alertController.create({
        header: 'ERRO!!',
        subHeader: 'Dados inválidos!',
        message: 'Erro ao buscar crises! Verifique se há conexão com a internet',
        buttons: ['OK']
      });
      await alert.present();
      this.existe = 0;
    })
  }

/**
 * REcarrega as crises pelo metodo de Refresh
 * @param event 
 */
  doRefresh(event) {
    this.carregarCrises();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  } 

  public atualizaCrises() {
    this.carregarCrises();

  }
}
//#endregion


