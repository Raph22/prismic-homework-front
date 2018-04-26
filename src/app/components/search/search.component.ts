import { Component, OnInit } from '@angular/core';
import { Repository } from '../../models/Repository';
import { GitService } from '../../services/git.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'Homework de Prismic';
  repositories: Repository[];
  searchTerm: String;

  ngOnInit() {
  }


  constructor(private gitService: GitService, public messageService: MessageService) { }

  search(): void {
    this.gitService.search(this.searchTerm)
    .subscribe((repositories) => {
      this.repositories = repositories.body;
      this.messageService.clear();
    }, (err) => {
      this.repositories = [];
      this.messageService.clear();
      if (err.status === 404) {
        this.messageService.add('Impossible de trouver de repository contenant le terme "' + this.searchTerm + '".');
      } else {
        this.messageService.add('Une erreur interne est survenue. Veuillez réessayer ultérieurement.');
      }
    });
  }

}
