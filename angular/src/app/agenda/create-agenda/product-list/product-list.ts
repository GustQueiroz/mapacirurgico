import { FornecedorDto, ProdutoDto, AgendamentoProdutoDto } from "@shared/service-proxies/service-proxies";

export interface ProductList {
    fornecedor: FornecedorDto;
    produtos: AgendamentoProdutoDto[];

  }