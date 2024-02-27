import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelColorComponent } from './model-color.component';

describe('ModelColorComponent', () => {
  let component: ModelColorComponent;
  let fixture: ComponentFixture<ModelColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
