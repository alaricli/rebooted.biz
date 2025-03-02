"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import { formatCurrency } from "@/app/utility/formatCurrency";

async function fetchProduct(sku: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/public/get/products/sku/${sku}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductPage = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!sku) {
      return;
    }

    async function loadProductData() {
      const productData = await fetchProduct(sku as string);
      setProduct(productData);
    }

    loadProductData();
  }, [sku]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="flex items-center p-16 mx-auto container">
      <div className="">
        <div>
          <Image
            src={product.mainImage}
            width={300}
            height={300}
            alt={product.name}
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{formatCurrency(product.unitAmount)}</p>
        </div>
        <div>
          <AddToCartButton onClick={() => alert("Add to cart")} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
