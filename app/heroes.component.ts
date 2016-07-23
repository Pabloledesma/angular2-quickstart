import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';


@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html',
	styleUrls: ['app/component.styles.css'],
	directives: [HeroDetailComponent]
})


export class HeroesComponent implements OnInit{

	title = 'Tour of Heroes';
	selectedHero: Hero;
	heroes: Hero[];
	error: any;
	
	constructor(
		private heroService: HeroService,
		private router: Router
		){}


	getHeroes() {
  		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	onSelect(hero: Hero){
		this.selectedHero = hero;
	}

	ngOnInit(){
		this.getHeroes();
	}

	gotoDetail(){
		this.router.navigate(['/detail', this.selectedHero.id]);
	}

	addHero(){
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
	  this.addingHero = false;
	  if (savedHero) { this.getHeroes(); }
	}

	deleteHero(hero: Hero, event: any) {
	  event.stopPropagation();
	  this.heroService
	      .delete(hero)
	      .then(res => {
	        this.heroes = this.heroes.filter(h => h !== hero);
	        if (this.selectedHero === hero) { this.selectedHero = null; }
	      })
	      .catch(error => this.error = error);
	}

}




