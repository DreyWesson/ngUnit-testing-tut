import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';
import { FormsModule } from '@angular/forms';


describe('HeroDetailComponent', () => {
// tslint:disable-next-line: prefer-const
let fixture: ComponentFixture<HeroDetailComponent>;
let mockActivatedRoute, mockHeroService, mockLocation;

beforeEach( () => {
  mockActivatedRoute = {
    snapshot: {paramMap: {get: () => '3'}}
  };
  mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
  mockLocation = jasmine.createSpyObj(['back']);
  // mockActivatedRoute = jasmine.createSpyObj(['getHero', 'updateHero']);

  TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ HeroDetailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
      ]
    });
  fixture = TestBed.createComponent(HeroDetailComponent);

  mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it(`should render hero name in h2 tag`, () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // it(`should call updateHero when save is called`, fakeAsync( () => {
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();

  //   fixture.componentInstance.save();
  //   flush();
  //   expect(mockHeroService.updateHero).toHaveBeenCalled();
  // }));

  it(`should call updateHero when save is called`, async( () => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
