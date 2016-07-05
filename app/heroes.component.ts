import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
	
	constructor(private heroService: HeroService) { }


	getHeroes() {
  		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	onSelect(hero: Hero){
		this.selectedHero = hero;
	}

	ngOnInit(){
		this.getHeroes();
	}
}




