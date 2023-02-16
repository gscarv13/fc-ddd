import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

// this format is being used due to ESLint
type ProductRepositoryInterface = RepositoryInterface<Product>
export default ProductRepositoryInterface

/*
// If the goal was to implement any specífic method to this repository
// the best would be to export default interface that extends from RepositoryInterface
// and adding the specífic methods to it like the example bellow

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product>
}

*/