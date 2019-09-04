import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  // tslint:disable-next-line: prefer-const
  let component: HeroesComponent;
  // tslint:disable-next-line: prefer-const
  let HEROES;
  // tslint:disable-next-line: prefer-const
  let mockHeroService;

  beforeEach( () => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SpiderDude', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove the indicated heroes from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
