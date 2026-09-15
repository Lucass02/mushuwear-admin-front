import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SizeList } from './size-list';

describe('SizeList', () => {
  let component: SizeList;
  let fixture: ComponentFixture<SizeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeList],
    }).compileComponents();

    fixture = TestBed.createComponent(SizeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
