"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "../utility/formatCurrency";

async function fetchProducts(
  category: string,
  page: number,
  pageSize: number
): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:8080/api/public/get/products/paginated/category/${category}?page=${page}&size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  console.log("API Response:", data); // Debug log to see the actual response structure

  // Check if the response is an object with a content property (common in Spring Boot pagination)
  if (data && data.content && Array.isArray(data.content)) {
    return data.content;
  }

  // If the response is already an array
  if (Array.isArray(data)) {
    return data;
  }

  // If we can't determine the structure, return an empty array
  console.error("Unexpected API response structure:", data);
  return [];
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(40);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts(category, page, pageSize);
        console.log("Fetched products:", fetchedProducts); // Debug log
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      }
    }
    loadProducts();
  }, [category, page, pageSize]); // Added page and pageSize as dependencies

  const renderHeading = () => {
    switch (category) {
      case "component":
        return "PC Components";
      case "system":
        return "Desktops & Laptops";
      case "accessory":
        return "Accessories";
      default:
        return "All Products";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-8">
        {renderHeading()}
      </h1>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 container mx-auto">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.sku} className="items-center">
              <Link
                href={{ pathname: `/products/${product.sku}` }}
                className="space-y-2"
              >
                <div>
                  <Image
                    src={product.mainImage || "/placeholder.png"}
                    alt={product.name || "Product image"}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="font-medium">
                  {product.name || "Unknown Product"}
                </h2>
                <p className="text-sm text-gray-600">
                  {product.brand || "Unknown Brand"}
                </p>
                {product.blurb && (
                  <p className="text-sm italic">{product.blurb}</p>
                )}
                <p className="font-semibold">
                  {formatCurrency(product.unitAmount) || "$0.00"}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p>{error || "No products found"}</p>
          </div>
        )}
        {error && !products.length && (
          <div className="col-span-full text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
