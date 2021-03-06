import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BancoService } from './banco.service';
import {AlertController} from  '@ionic/angular';
import { forEach } from '@angular/router/src/utils/collection';
@Injectable({
  providedIn: 'root'
})
export class DadosService {//Gets e Sets

  constructor(private localNotifications: LocalNotifications, private BancoService: BancoService, private AlertController: AlertController) { }

  dados = [];

  setDados(nome: string, valor: any)
  {
    if(nome && nome.trim() !== ""){

      return;
    }
    this.dados[nome] = valor;
  }

  getDados(nome: string): any
  {
    return (nome && typeof this.dados[nome] !== "undefined") ? this.dados[nome] : false;  
  }

  cont1_nome = "";
  cont2_nome = "";
  cont1_num = "";
  cont2_num = "";

  Nome = "";
  Cpf = "";
  Email = "";
  Celular = "";
  Profissional = null;
  Crp = "";
  DataNasc = "";
  Id = 0;
  data_relatorioS_I = null;
  data_relatorioS_F = null;

  duracao = null;

  getCont1_nome()
  {
    return this.cont1_nome;
  }
  setCont1_nome(x: string)
  {
    this.cont1_nome = x;
  }
  getCont1_num()
  {
    return this.cont1_num;
  }
  setCont1_num(x: string)
  {
    this.cont1_num = x;
  }

  getCont2_nome()
  {
    return this.cont2_nome;
  }
  setCont2_nome(x: string)
  {
    this.cont2_nome = x;
  }
  getCont2_num()
  {
    return this.cont2_num;
  }
  setCont2_num(x: string)
  {
    this.cont2_num = x;
  }

  setDuracao_crise(x: string)
  {
    
    this.duracao = parseInt(x);
  }

  getDuracao_crise()
  {
    return this.duracao;
  }

  getData_relatorioS_I()
  {
    return this.data_relatorioS_I;
  }
  setData_relatorioS_I(x: Date)
  {
    this.data_relatorioS_I = x;
  }
  getData_relatorioS_F()
  {
    return this.data_relatorioS_F;
  }
  setData_relatorioS_F(x: Date)
  {
    this.data_relatorioS_F = x;
  }

  getNome()
  {
    return this.Nome;
  }
  setNome(x: string)
  {
    this.Nome = x;
  }

  getCpf()
  {
    return this.Cpf;
  }
  setCpf(x: string)
  {
    this.Cpf = x;
  }

  getEmail()
  {
    return this.Email;
  }
  setEmail(x: string)
  {
    this.Email = x;
  }

  getCelular()
  {
    return this.Celular;
  }
  setCelular(x: string)
  {
    this.Celular = x;
  }

  getProfissional()
  {
    return this.Profissional;
  }
  setProfissional(x: boolean)
  {
    this.Profissional = x;
  }

  getCrp()
  {
    return this.Crp;
  }
  setCrp(x: string)
  {
    this.Crp = x;
  }

  getDataNasc()
  {
    return this.DataNasc;
  }
  setDataNasc(x: string)
  {
    this.DataNasc = x;
  }
  
  getId()
  {
    return this.Id;
  }
  setId(x: number)
  {
    this.Id = x;
  }

  limpaDados()
  {
    this.setId(0);
    this.setNome("");
    this.setEmail("");
    this.setCpf("");
    this.setCrp("");
    this.setProfissional(null);
    this.setDataNasc("");
    this.setCelular("");
    this.setCont1_nome("");
    this.setCont1_num("");
    this.setCont2_nome("");
    this.setCont2_num("");
  }

//aqui temos a função que verifica a existencia de novos murais no banco de dados, ao percebelos ele gera uma notificação no app do usuario
  Notificacao()
  {
    this.BancoService.selecionarMuralNotifica(this.getId()).then(async(response)=>{
        if(response=="0")
        {
          return null;
        }
        else if(response[0].novo=="1")
        {
          this.localNotifications.schedule({
            id: 1,
            text: 'Você tem um novo mural '+ this.getNome(),
            data: { mydata: "novo mural" }
          });
          this.BancoService.alterarNotifica(this.getId()).then(async(response)=>{
            return null;
          }).catch(async(response)=>{
            if(response==null)
            {
              return null;
            }
          });
        }
      }).catch(async(response)=>{
        if(response==null)
        {
          return null;
        }
      });
  }
}
