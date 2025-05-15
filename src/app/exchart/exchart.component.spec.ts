import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchartComponent } from './exchart.component';

describe('ExchartComponent', () => {
  let component: ExchartComponent;
  let fixture: ComponentFixture<ExchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
