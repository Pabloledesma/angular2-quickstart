import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';

@Injectable()
export class HeroService {

	private heroesUrl = 'app/heroes';

	constructor(private http: Http){}

	getHeroes(): Promise<Hero[]>{
		return this.http.get(this.heroesUrl)
				.toPromise()
				.then( response => response.json().data )
				.catch( this.handleError );
	}

	getHeroesSlowly() {
		return new Promise<Hero[]>(resolve =>
			setTimeout(() => resolve(HEROES), 2000) // 2 seconds
		);
	}

	getHero(id: number){
		return this.getHeroes().then(
				heroes => heroes.find( hero => hero.id === id )
			);
	}

	private handleError(error: any) {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}

}