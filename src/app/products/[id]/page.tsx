"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";

async function fetchProduct(productId: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/get/product/${productId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadProductData() {
      const productData = await fetchProduct(id as string);
      setProduct(productData);
    }

    loadProductData();
  }, [id]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="flex items-center p-16 mx-auto container">
      <div className="">
        <div>
          <Image
            src={product.productImage}
            width={300}
            height={300}
            alt={product.name}
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div>
          <AddToCartButton onClick={() => alert("Add to cart")} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
