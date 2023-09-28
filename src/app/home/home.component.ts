import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
interface productInterface {
  qnt: number;
  prodId: number;
  productName: string;
  productDetail: string;
  productImg: string;
  productWeight: number;
  productPrice: number;
}

const productArray: productInterface[] = [
  {
    prodId: 1,
    qnt: 1,
    productName: 'Samsung',
    productDetail:
      'Samsung S20 : The smartphone dimension is 151.7 x 69.1 x 7.9 mm. The screen is a Dynamic AMOLED 2X capacitive touchscreen, which has a size of 6.2 inches. .',
    productImg:
      'https://images.news18.com/ibnlive/uploads/2022/03/galaxy-a53-5g.jpg',
    productWeight: 176,
    productPrice: 86000,
  },
  {
    prodId: 2,
    qnt: 1,
    productName: 'Apple',
    productDetail:
      'iphone 12 : The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches',
    productImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KghMhhiq-aqRsO_5-sMv8aMuhc0xLJfd8bkOoLVVlIfpQYRXWbO7qJYCKVXHDjqb5ws&usqp=CAU',
    productWeight: 198,
    productPrice: 100000,
  },
  {
    prodId: 3,
    qnt: 1,
    productName: 'Oppo',
    productDetail:
      'Oppo Reno5 5G : Resolution, 1080 x 2400 pixels, 20:9 ratio (~409 ppi density) ; Protection, Corning Gorilla Glass 5 ; OS, Android 11, upgradable to Android 12, Display. Size: 6.4"(16.33cm) · Camera ; Chips. CPU: Qualcomm® Snapdragon™ 720G · Battery ; Sensors. Geomagnetic sensor · Cellular Network.',
    productImg:
      'https://www.fda.gov/files/smartphone.jpg',
    productWeight: 210,
    productPrice: 20000,
  },
  {
    prodId: 4,
    qnt: 1,
    productName: 'Redmi',
    productDetail:
      'Xiaomi Redmi Note12 : 4G Type, AMOLED, 120Hz, 450 nits (typ), 700 nits (HBM), 1200 nits (peak) ; Size, 6.67 inches, 107.4 cm2 (~85.3% screen-to-body ratio).',
    productImg:
      'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Redmi_note_11_pro_5g_xiaomi_6.jpg',
    productWeight: 150,
    productPrice: 35000,
  },
  {
    prodId: 5,
    qnt: 1,
    productName: 'Apple',
    productDetail:
      'iPhone 13 : Display 6.10-inch (1170x2532) ; Processor Apple A15 Bionic ; Front Camera 12MP ; Rear Camera 12MP + 12MP ; Storage 128GB, 256GB, 512GB.',
    productImg:
      'https://i.insider.com/5df10433fd9db22a525cfde4?width=1000&format=jpeg&auto=webp',
    productWeight: 182,
    productPrice: 150000,
  },
  {
    prodId: 6,
    qnt: 1,
    productName: 'Samsung',
    productDetail:
      'Samsung Galaxy S23 : Resolution, 1080 x 2340 pixels, 19.5:9 ratio (~425 ppi density) ; Protection, Corning Gorilla Glass Victus 2 ; OS, Android 13, One UI 5.1.',
    productImg:
      'https://media.wired.com/photos/5e8d09b9798a15000821feb0/4:3/w_2400,h_1800,c_limit/Gear-Feature-Samsung-Galaxy-A51-front-SOURCE-Samsung.jpg',
    productWeight: 210,
    productPrice: 76000,
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  //void {}
  containProductArray = productArray;

  inc(pd) {
    //console.log(pd);
    if (pd.qnt != 10) {
      pd.qnt += 1;
    }
  }
  dec(pd) {
    //console.log(pd);
    if (pd.qnt != 1) {
      pd.qnt -= 1;
    }
  }

  itemsCart: any = [];
  addCart(category) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = category.prodId;
      let index: number = -1;
      this.itemsCart = JSON.parse(cartDataNull);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].prodId)) {
          this.itemsCart[i].qnt = category.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();

    //localStorage.setItem('localCart', JSON.stringify(category));
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }
}
