import { CpfValidator } from '../validators/cpf';
import { BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})

export class CadastroUserPage implements OnInit {

  @ViewChild('signupSlider') signupSlider;

	/*public slideOneForm: FormGroup;*/
  
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private BD: BancoService, public formBuilder: FormBuilder) {
    /*this.slideOneForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf])]
     });*/


   }

   

  
  public slideOneForm:FormGroup = new FormGroup({
    'nome' : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')]),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'datanasc' : new FormControl(null, [Validators.required]),
    'celular' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+')]),
    'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+')]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'confirmasenha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })


    save(){
      this.submitAttempt = true;

      if(!this.slideOneForm.valid){
          this.signupSlider.slideTo(0);
      } 
      else {
          console.log("success!")
          console.log(this.slideOneForm.value);
      }
    }

  
 /* public Validar(name:string)
  {
    if(name == 'nome')
    {
      if(this.dadosUser.controls.nome.valid)
        document.getElementById(name).style.color='#020B04';
      else if(!this.dadosUser.controls.nome.valid)
        document.getElementById(name).style.color='#f53d3d';
    }
  }

  inserirUsuario()
  {
    let nome = (<HTMLInputElement>document.getElementById("0")).value;
    let email = (<HTMLInputElement>document.getElementById("1")).value;
    let datanasc = (<HTMLIonDatetimeElement>document.getElementById("2")).value;
    let celular = (<HTMLInputElement>document.getElementById("3")).value;
    let cpf = (<HTMLInputElement>document.getElementById("4")).value;
    let senha = (<HTMLInputElement>document.getElementById("5")).value;
    let sql = "INSERT INTO usuario (id_usuario, nome)"
    this.BD.selectGenerico(sql);

}*/
ngOnInit() {
}
}