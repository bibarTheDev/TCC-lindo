import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { BancoService } from "../banco.service";
import { DadosService } from "../dados.service";

import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { validateConfig } from '@angular/router/src/config';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-sessoes',
  templateUrl: './sessoes.page.html',
  styleUrls: ['./sessoes.page.scss'],
})
export class SessoesPage implements OnInit {

  constructor(private bancoService: BancoService,private dadosService: DadosService,private barcodeScanner: BarcodeScanner, private alertController: AlertController) 
  {
  }

  dado: any;

  /**
   * altera a view de acordo com a existencia de sessao de um id
   * 
   * @param id id a ser usado como 
   */
  async updateSessoesView(id)
  {
    let resp = await this.buscaSessoes(id);

    if(resp === false){
      //view sem sessao
    }
    else{
      //view com sessao

    }
  }

  /**
   * atualiza um registro de uma sessao no banco de acordo com o hash escaneado
   * 
   * @param hash hash a ser ustilizado como parametro de busca no banco
   * @param id id do usuario que participa da sessao
   * @return Promise, que resolve true ou false para sucesso ou fracasso da operacao
   */
  updateSessao(hash, id)
  {
    let sql = "UPDATE sessao SET " + 
      "usuario_id = " + id + ", " +
      "status = 1, " + 
      "updated_at=now() " +
      "WHERE hash = '" + hash + "';";
      
    this.bancoService.updateGenerico(sql)
    .then(async(response)=>{
      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: 'Sessão Iniciada com sucesso!',
        buttons:  [
          {
            text: 'OK',
          }
        ],
        });

        await alert.present();
     })
    .catch(async(response)=>{
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Erro ao iniciar sessão com o código lido',
          buttons:  [
            {
              text: 'OK',
            }
          ],
          });

          await alert.present();
       })
  }

  /**
   * busca dados de todas as sessoes vinculadas com um id
   * thougth of the day: por que o typescript implemta overloading, mas so pra funcoes com o mesmo numero de args?
   *  
   * @param id id do usuario que participa da sessao
   * @returns Promisse, com o resultado da query de busca
   */
  buscaSessoes(id)
  {
    return new Promise((resolve, reject) => {
      let sql = "SELECT nome, s.created_at FROM sessao AS s " +
        "INNER JOIN usuario AS u ON u.id_usuario = s.profissional_id " + 
        "WHERE usuario_id = " + id + " AND status = 1;";

      this.bancoService.selectGenerico(sql).then(response => {
        
        if (response[0].created_at !== null) {
          
          resolve(response[0]);
        } else {
          
          resolve(false);
        }
      }).catch(ex => {
        
        resolve(false);
      });
    });
  }

  /**
   * startSessao
   * 
   * liga a camera pra ler o qrcode, e dps valida e ativa a sessao no banco
   */
  async startSessao(){
    
    //options
    let opts = {
      preferFrontCamera : false,
      showFlipCameraButton : true,
      showTorchButton : true,
      torchOn: false,
      saveHistory: false,
      prompt : "Escaneie o codigo QR", // Android
      resultDisplayDuration: 500,
      formats : "QR_CODE",
      orientation : "portrait",
      disableAnimations : true,
      disableSuccessBeep: true
    };

    //leitura do codigo
    this.barcodeScanner.scan(opts)
    //sucesso
    .then(result => {
      this.dado = result.text;
      this.updateSessao(this.dado, this.dadosService.getId());
      this.updateSessoesView(this.dadosService.getId());
    })
    //erro
    .catch(ex => {
       
    });
    
  }

  

  ngOnInit() 
  {
    
  }

}
