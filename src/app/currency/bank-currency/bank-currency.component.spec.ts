import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCurrencyComponent } from './bank-currency.component';

describe('BankCurrencyComponent', () => {
  let component: BankCurrencyComponent;
  let fixture: ComponentFixture<BankCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
