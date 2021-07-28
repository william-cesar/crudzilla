import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.setSectionTitle(this.router.url);
  }

  setSectionTitle(url: string): void {
    if (url === '/students/subscribe') {
      this.sharedService.SECTION_TITLE = 'Cadastro';
    } else {
      this.sharedService.SECTION_TITLE = 'Listagem de alunos';
    }
  }
}
