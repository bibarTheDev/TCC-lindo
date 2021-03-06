
import { DadosService } from './../dados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { BancoService } from '../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';


@Component({
  selector: 'app-relatorio-semanal',
  templateUrl: './relatorio-semanal.page.html',
  styleUrls: ['./relatorio-semanal.page.scss'],
})

export class RelatorioSemanalPage implements OnInit {
  @ViewChild(IonSlides) IonSlides: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  dummyList:any;
  public slide1form: FormGroup;
  public slide3form: FormGroup;
  public slide4form: FormGroup;

  public cont = 0;
  public cont2 = 0;
  public cont3 = 0;
  public solta = 0;
  public conta3 = 0;

  constructor(public navCtrl: NavController, private BD: BancoService,public formBuilder: FormBuilder,private AlertController: AlertController, private router: Router, private dadosService: DadosService) { 
    
    this.slide1form = formBuilder.group({
        qtdCarboidratos: ['' ,  Validators.compose([Validators.required])],
        qtdProteinas: ['' ,  Validators.compose([Validators.required])],
        qtdLaticinios: ['' ,  Validators.compose([Validators.required])],
        qtdVerdFrut: ['' ,  Validators.compose([Validators.required])],
        qtdAgua: ['' ,  Validators.compose([Validators.required])]
    });
    
    this.slide3form = formBuilder.group({
        qtdLazer: ['', Validators.compose([Validators.required])]
    });

    this.slide4form = formBuilder.group({
        horaDormir: ['', Validators.compose([Validators.required])]
    });
  } //validações
  
  ngOnInit() {
    this.IonSlides.lockSwipes(true);
    document.getElementById("lblTemp").innerHTML = '- de 30 mins';
  }

  antSlide() //vai pro slide anterior
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);
    this.conta3--;
    if(this.conta3 == 0)
    {
      document.getElementById("botoes").style.display='none';
      document.getElementById("btnProximo").style.display='unset';
    }
    if(this.conta3 == 2)
    {
      document.getElementById("concluir").style.display='none';
      document.getElementById("botoes").style.display='unset';
    }
  }

  async proxSlide() //vai pro proximo slide
  {
    if(this.conta3 == 3)
    {
      if(this.slide4form.invalid)
      {
        this.IonSlides.slideTo(0);
        const alert = await this.AlertController.create({
          header: 'Erro',
          message: 'Por favor, preencha todos os campos.',
          buttons: ['OK']
        });
        
        await alert.present();
      }
      else
      {
        this.salva()
      }
    }
    if(this.conta3 == 2)
    {
      let dedics = (<HTMLInputElement>document.getElementById("dedicous")).checked;
      if(this.slide3form.invalid && dedics == true)
      {
        this.IonSlides.slideTo(0);
        const alert = await this.AlertController.create({
          header: 'Erro',
          message: 'Por favor, preencha todos os campos.',
          buttons: ['OK']
        });
        
        await alert.present();
      }
      else
      {
        this.IonSlides.lockSwipes(false);
        this.IonSlides.slideNext();
        this.ScrollToTop();
        this.IonSlides.lockSwipes(true);
        this.conta3++;
        document.getElementById("botoes").style.display='none';
        document.getElementById("concluir").style.display='unset';
      }
    }
    if(this.conta3 == 1)
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.IonSlides.lockSwipes(true);
      this.conta3++;
    }
  }

  async troca() //troca os botões
  {
    if(this.slide1form.invalid)
    {
      this.IonSlides.slideTo(0);
      const alert = await this.AlertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    else
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.ScrollToTop();
      this.IonSlides.lockSwipes(true);
      this.conta3++;
      document.getElementById("btnProximo").style.display='none';
      document.getElementById("botoes").style.display='unset';
    }
  }

  fezAtvd() //aparece div se fez
  {
    this.cont++;
    if(this.cont==1)
    {
      document.getElementById("fezatv").style.display='unset';
    }
    if(this.cont==2)
    {
      document.getElementById("fezatv").style.display='none';
      this.cont = 0;
    }
  }

  dedicou() //aparece div se dedicou
  {
    this.cont2++;
    if(this.cont2==1)
    {
      document.getElementById("dedico").style.display='unset';
    }
    if(this.cont2==2)
    {
      document.getElementById("dedico").style.display='none';
      this.cont2 = 0;
    }
  }

  despertou() //aparece div se despertou
  {
    this.cont3++;
    if(this.cont3==1)
    {
      document.getElementById("desperto").style.display='unset';
    }
    if(this.cont3==2)
    {
      document.getElementById("desperto").style.display='none';
      this.cont3 = 0;
    }
  }

  duracAtv() //muda os labels
  {
    let temp = (<HTMLInputElement>document.getElementById("atv_temp")).value;
    if(temp == "0")
    {
      document.getElementById("lblTemp").innerHTML = '- de 30 mins';
    }
    else if(temp == "200")
    {
      document.getElementById("lblTemp").innerHTML = '30 - 60 mins';
    }
    else if(temp == "400")
    {
      document.getElementById("lblTemp").innerHTML = '1 - 2 hrs';
    }
    else if(temp == "600")
    {
      document.getElementById("lblTemp").innerHTML = '2 - 3 hrs';
    }
    else if(temp == "800")
    {
      document.getElementById("lblTemp").innerHTML = '+ de 3 hrs';
    }
  }

  maisVzs() 
  {
    let pega = (<HTMLInputElement>document.getElementById("mostraVzs")).innerText;
    this.solta = parseInt(pega);
    this.solta++;
    document.getElementById("mostraVzs").innerHTML = this.solta.toString();
  }

  menosVzs()
  {
    let pega2 = (<HTMLInputElement>document.getElementById("mostraVzs")).innerText;
    this.solta = parseInt(pega2);
    if(this.solta == 1)
    {
      document.getElementById("mostraVzs").innerHTML = this.solta.toString();
    }
    else
    {
        this.solta--;
        document.getElementById("mostraVzs").innerHTML = this.solta.toString();
        this.solta = 0;
    } 
  }
 

  async salva() //salva os dados
  {
    let horario_dorm="";
    //alimentação
    let carboidratos = (<HTMLInputElement>document.getElementById("carb")).value;
    let proteinas = (<HTMLInputElement>document.getElementById("prot")).value;
    let lacticinios = (<HTMLInputElement>document.getElementById("lac")).value;
    let verdfrut = (<HTMLInputElement>document.getElementById("verfrut")).value;
    let agua = (<HTMLInputElement>document.getElementById("agua")).value;

    //Atividade-Física
    let fez_atv_sim = (<HTMLInputElement>document.getElementById("atv_sim")).checked;
    let fez_atv = false;
    if(fez_atv_sim)
    {
      fez_atv = true;
    }
    let duracao_atv = (<HTMLInputElement>document.getElementById("atv_temp")).value;
    let intensidade_atv = 0;
    if((<HTMLInputElement>document.getElementById("atv_leve")).checked)
    {
      intensidade_atv = 0; // leve
    }
    if((<HTMLInputElement>document.getElementById("atv_moderado")).checked)
    {
      intensidade_atv = 1;
    }
    if((<HTMLInputElement>document.getElementById("atv_alto")).checked)
    {
      intensidade_atv = 2;
    }
    
    //Lazer
    let fez_lazer_sim = (<HTMLInputElement>document.getElementById("dedicous")).checked;
    let fez_lazer = false;
    if(fez_lazer_sim)
    {
      fez_lazer = true;
    }
    let vezes_Lazer = (<HTMLInputElement>document.getElementById("lazer_vezes")).value;
    if(!vezes_Lazer)
    {
      vezes_Lazer="0";
    }
    let acomp_lazer_sim = (<HTMLInputElement>document.getElementById("lazer_sim")).checked;
    let acomp_lazer = false;
    if(acomp_lazer_sim)
    {
      acomp_lazer = true;
    }
    

    //Sono
    let horario_dorm1 = (<HTMLInputElement>document.getElementById("hrDormir")).value;
    horario_dorm=horario_dorm1;
    horario_dorm=horario_dorm.substr(11,2);

    let despertou_sim = (<HTMLInputElement>document.getElementById("sono_sim")).checked;
    let despertou = false;
    if(despertou_sim)
    {
      despertou = true;
    }
    let vezes_sono = (<HTMLInputElement>document.getElementById("mostraVzs")).innerText;
    if(despertou ==false)
    {
      vezes_sono="0";
    }
    let acordou_precoce_sim = (<HTMLInputElement>document.getElementById("sono_sim2")).checked;
    let acordou_precoce = false;
    if(acordou_precoce_sim)
    {
      acordou_precoce = true;
    }

    //comentários
    let coment_lazer = (<HTMLInputElement>document.getElementById("comentLazerInput")).value;
    if(!coment_lazer)
    {
        coment_lazer="null";
    }
    let coment_final = (<HTMLInputElement>document.getElementById("comentFinalInput")).value;
    if(!coment_final)
    {
        coment_final="null";
    }


    this.BD.enviarRelatorioSemanal(this.dadosService.getId().toString(),coment_final,this.dadosService.getData_relatorioS_I(),this.dadosService.getData_relatorioS_F(),carboidratos,proteinas,lacticinios,verdfrut,agua,fez_atv.toString(),duracao_atv,intensidade_atv.toString(),fez_lazer.toString(),coment_lazer,vezes_Lazer,acomp_lazer.toString(),parseInt(horario_dorm,10),despertou.toString(),vezes_sono,acordou_precoce.toString())
    .then(async(response)=>{
        const alert = await this.AlertController.create({
          header: 'Relátorio enviado',
          subHeader: 'Novo relátorio enviado',
          message: JSON.stringify(response[0].id_usuario),
          buttons: [
            {
              text: "OK",
              role: "ok",
              handler: data => {
                this.navCtrl.navigateForward('/tabs/tab2');
                // this.router.navigateByUrl('/tabs/tabs2');
              }
            },
        ]
        });
         await alert.present();
        
      }
    )
    .catch(async(response)=>{

      const alert = await this.AlertController.create({
        header: 'Erro',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
      await alert.present()
    })


    
  }
  logScrollStart(){
    console.log("logScrollStart : When Scroll Starts");
  }
 
  logScrolling(){
    console.log("logScrolling : When Scrolling");
  }
 
  logScrollEnd(){
    console.log("logScrollEnd : When Scroll Ends");
  }
 
  ScrollToBottom(){
    this.content.scrollToBottom(1500);
  }
 
  ScrollToTop(){
    this.content.scrollToTop();
  }
 
  
  ScrollToPoint(X,Y){
    this.content.scrollToPoint(X,Y,1500);
  }// iniciar próximo slide no topo da tela

  volta()
  {
    this.router.navigateByUrl('/tabs/tabs2');
  }//sai do relatório 

}
