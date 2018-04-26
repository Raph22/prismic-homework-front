import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GitService } from '../../services/git.service';
import { Repository } from '../../models/Repository';
import { Contributor } from '../../models/Contributor';
import { UserImpact } from '../../models/UserImpact';
import { Commit } from '../../models/Commit';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  owner: string = this.route.snapshot.paramMap.get('owner');
  repository: string = this.route.snapshot.paramMap.get('repository');

  contributors: Contributor[];

  contributorsImpact: UserImpact[];

  commits: Commit[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private gitService: GitService,
    private messageService: MessageService
  ) { }


  ngOnInit () {
    const currentRepository = new Repository(this.owner, this.repository);
    this.gitService.getContributors(currentRepository)
    .subscribe(contributors => {
      this.contributors = contributors.body;
    }, (err) => {
      if (err.status === 404) {
        this.messageService.add('Aucun contributeurs trouvé ou ce repository n\'existe pas.'); // should not appear (owner)
      } else if (err.status === 403) {
        this.messageService.add('Vous avez dépassé le nombre de requète autorisé par GitHub. Réessayez dans 1 heure.');
      } else { // 500 and eventuals others
        this.messageService.add('Une erreur interne est survenue. veuillez réessayer ultérieurement.');
      }
  });

    this.gitService.getUsersImpact(currentRepository)
    .subscribe(contributorsImpact => {
      this.contributorsImpact = contributorsImpact.body;
    }, (err) => {
      if (err.status === 404) {
        this.messageService.add('Aucun commit trouvé ou ce repository n\'existe pas. L\'impact utilisateur ne peut donc pas être calculé.');
      } else if (err.status === 403) {
        this.messageService.add('Vous avez dépassé le nombre de requètes autorisé par GitHub. Réessayez dans 1 heure.');
      } else { // 500 and eventuals others
        this.messageService.add('Une erreur interne est survenue. veuillez réessayer ultérieurement.');
      }
    });

    this.gitService.getLatestCommit(currentRepository)
    .subscribe(commits => {
      this.commits = commits.body;
    }, (err) => {
        if (err.status === 404) {
          this.messageService.add('Aucun commit trouvé ou ce repository n\'existe pas.');
        } else if (err.status === 403) {
          this.messageService.add('Vous avez dépassé le nombre de requètes autorisé par GitHub. Réessayez dans 1 heure.');
        } else { // 500 and eventuals others
          this.messageService.add('Une erreur interne est survenue. veuillez réessayer ultérieurement.');
        }
    });
  }

  private stringDateToDate(date: string) {
    return new Date(date);
  }
}
