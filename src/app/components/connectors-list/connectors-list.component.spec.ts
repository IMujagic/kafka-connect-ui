import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorsListComponent } from './connectors-list.component';

describe('ConnectorsListComponent', () => {
  let component: ConnectorsListComponent;
  let fixture: ComponentFixture<ConnectorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
