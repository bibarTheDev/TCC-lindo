import { BancoService } from './../banco.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor(private BancoService: BancoService) {
   }

  ngOnInit() {
  }

}
