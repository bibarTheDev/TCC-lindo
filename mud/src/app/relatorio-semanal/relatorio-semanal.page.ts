import { DadosService } from './../dados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { BancoService } from '../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { async, delay } from 'q';
import { validateConfig } from '@angular/router/src/config';


@Component({
  selector: 'app-relatorio-semanal',
  templateUrl: './relatorio-semanal.page.html',
  styleUrls: ['./relatorio-semanal.page.scss'],
})

export class RelatorioSemanalPage implements OnInit {
  @ViewChild(IonSlides) IonSlides: IonSlides;
  public slide1form: FormGroup;
  public slide3form: FormGroup;
  public slide4form: FormGroup;

  public cont = 0;
  public cont2 = 0;
  public cont3 = 0;
  public solta = 0;

  constructor(public navCtrl: NavController, private BD: BancoService,public formBuilder: FormBuilder,private AlertController: AlertController) { 
    
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
  }
  
  ngOnInit() {
    this.IonSlides.lockSwipes(true);
    document.getElementById("lblTemp").innerHTML = '- de 30 mins';
  }

  fezAtvd()
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

  dedicou()
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

  despertou()
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

  duracAtv()
  {
    let temp = (<HTMLInputElement>document.getElementById("temp")).value;
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
 
   async proxSlide1()
  {
    if(this.slide1form.valid)
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
      this.IonSlides.lockSwipes(true);
    }
  }

  proxSlide2()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
  }

  async proxSlide3()
  {
    let dedics = (<HTMLInputElement>document.getElementById("dedicous")).checked;
    if(this.slide3form.invalid && dedics == true)
    {
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
      this.IonSlides.lockSwipes(true);
    }
  }

  async proxSlide4()
  {
    if(this.slide4form.invalid)
    {
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
      this.IonSlides.lockSwipes(true);
    }
  }

  antSlide()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);
  }
  

  salva()
  {
    //alimentação
    let carboidratos = (<HTMLInputElement>document.getElementById("1")).value;
    let proteinas = (<HTMLInputElement>document.getElementById("1")).value;
    let lacticinios = (<HTMLInputElement>document.getElementById("1")).value;
    let verdfrut = (<HTMLInputElement>document.getElementById("1")).value;
    let agua = (<HTMLInputElement>document.getElementById("1")).value;

    //Atividade-Física
    let fez_atv = (<HTMLInputElement>document.getElementById("1")).value;
    let duracao_atv = (<HTMLInputElement>document.getElementById("1")).value;
    let intensidade_atv = (<HTMLInputElement>document.getElementById("1")).value;
    
    //Lazer
    let fez_lazer = (<HTMLInputElement>document.getElementById("1")).value;
    let vezes_Lazer = (<HTMLInputElement>document.getElementById("1")).value;
    let acomp_lazer = (<HTMLInputElement>document.getElementById("1")).value;
    

    //Sono
    let horario_dorm = (<HTMLInputElement>document.getElementById("1")).value;
    let despertou = (<HTMLInputElement>document.getElementById("1")).value;
    let vezes_sono = (<HTMLInputElement>document.getElementById("1")).value;
    let acorou_precoce = (<HTMLInputElement>document.getElementById("1")).value;

    //comentários
    let coment_lazer = (<HTMLInputElement>document.getElementById("1")).value;
    let coment_final = (<HTMLInputElement>document.getElementById("1")).value;



    



    
  }
}


/* Falta: Campo de observação do relatório em geral, campo de observação do tópico de lazer */