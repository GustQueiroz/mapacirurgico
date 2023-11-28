import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductList } from "./product-list";
import { ProdutoDto, AgendamentoProdutoDto } from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'product-list-dialog',
    templateUrl: './product-list-dialog.component.html',
    styleUrls: ['./product-list-dialog.component.css']
  })
  export class ProductListDialogComponent {
    constructor(  public dialogRef: MatDialogRef<ProductListDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: ProductList) {
        
    }

    remover(item: AgendamentoProdutoDto){
        if(item.quantidade > 0){
            const idx = this.data.produtos.indexOf(item);
            this.data.produtos[idx].quantidade--;
        }
    }
    
    adicionar(item: AgendamentoProdutoDto){
        if(item.quantidade < item.produtoQuantidadeEstoque){
            const idx = this.data.produtos.indexOf(item);
            this.data.produtos[idx].quantidade++;
        }
    }
  
  }