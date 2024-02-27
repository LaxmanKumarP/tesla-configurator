import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionsComponent } from './config-options.component';

describe('ConfigOptionsComponent', () => {
  let component: ConfigOptionsComponent;
  let fixture: ComponentFixture<ConfigOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
