"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import Image from "next/image";

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:8080/api/get/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await response.json();
  return products;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <h2>{product.name}</h2>
                <div>
                  <Image
                    src={product.productImage}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                </div>
                <p>${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
