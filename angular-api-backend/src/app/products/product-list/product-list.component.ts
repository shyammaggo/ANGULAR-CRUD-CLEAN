import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product ={
    name: '',
    id: undefined
  }
   edit = true;
   add = false;
   products: Product[] | undefined;

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.getProducts();
  }
  
  private getProducts() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addProduct() {
    const data = {
      name: this.product.name,
      id: this.product.id 
    };
    this.productService.createProduct(data).subscribe(response => {
      console.log(response)
      this.getProducts();
    });
  }

  setProductEdit(product: Product) {
    this.product.name = product.name;
    this.product.id = product.id ;
    this.edit = false;
    this.add = true;
  }

  resetValues() {
    this.product.name = "";
    this.product.id = undefined;
    this.edit = true;
    this.add = false;
  }

  removeProduct(product: Product) {
    const id = product.id;
    console.log(product)
    this.productService.deleteProduct(id).subscribe(product => console.log(product));
    this.getProducts()
  }
  
  updateProduct(){
    this.productService.editProduct(this.product).subscribe(response => console.log(response));
    this.getProducts()
    this.resetValues()
  }
  
}
