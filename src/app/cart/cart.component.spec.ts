//import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { CartComponent } from './cart.component';

/*describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { AuthService } from '../home/_service/auth.service';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    // Mock local storage methods
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'localCart') {
        return JSON.stringify([{ prodId: 1, qnt: 2, productPrice: 10 }]);
      }
      return null;
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart details from local storage', () => {
    component.CartDetails();
    expect(component.getCartDetails.length).toBe(1);
  });

  
  it('should increment the quantity of an item', () => {
    component.IncQnt(1, 2);
    expect(component.getCartDetails[0].qnt).toBe(2);
  });

  
});

