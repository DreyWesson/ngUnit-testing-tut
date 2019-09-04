import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroComponent } from '../hero/hero.component';
import { Input, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line: use-host-property-decorator
  host: { '(click)': 'onClick' }
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (deep test)', () => {
  // tslint:disable-next-line: prefer-const
  let fixture: ComponentFixture<HeroesComponent>;
  // tslint:disable-next-line: prefer-const
  let mockHeroService;
  let HEROES;

  beforeEach( () => {
    // tslint:disable-next-line: prefer-const
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],

    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
    // tslint:disable-next-line: prefer-const
    let heroComponentDebbuger = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDebbuger.length).toBe(3);
    for (let i = 0; i < heroComponentDebbuger.length; i++) {
      expect(heroComponentDebbuger[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero,
      when the Hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // ( <HeroComponent>heroComponents[0].componentInstance ).delete.emit(undefined);
        heroComponents[0].triggerEventHandler('delete', null);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should add a new hero to the hero list when the add button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

});
