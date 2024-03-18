import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductPage() {
  const { prodName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/prod/get-products?name=${prodName}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          console.log("pp", data.products);
          console.log("pname", prodName);
          const index = data.products.findIndex((obj) => obj.name === prodName);
          setProduct(data.products[index]);

          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [prodName]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {product && product.name}
      </h1>
      <Link
        to={`/search?category=${product && product.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {product && product.category}
        </Button>
      </Link>
      <img
        src={product && product.image}
        alt={product && product.name}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        Product Description
        {/* <span>
          {product && new Date(product.createdAt).toLocaleDateString()}
        </span> */}
        {/* <span className='italic'>{product && (product.desc.length /1000).toFixed(0)} mins read</span> */}
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: product && product.desc }}
      ></div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        Product Cost
        {/* <span>
          {product && new Date(product.createdAt).toLocaleDateString()}
        </span> */}
        {/* <span className='italic'>{product && (product.desc.length /1000).toFixed(0)} mins read</span> */}
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: product && product.costPrice }}
      ></div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        Product Category
        {/* <span>
          {product && new Date(product.createdAt).toLocaleDateString()}
        </span> */}
        {/* <span className='italic'>{product && (product.desc.length /1000).toFixed(0)} mins read</span> */}
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: product && product.category }}
      ></div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        Product Category
        {/* <span>
          {product && new Date(product.createdAt).toLocaleDateString()}
        </span> */}
        {/* <span className='italic'>{product && (product.desc.length /1000).toFixed(0)} mins read</span> */}
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: product && product.category }}
      ></div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        Product Brand
        {/* <span>
          {product && new Date(product.createdAt).toLocaleDateString()}
        </span> */}
        {/* <span className='italic'>{product && (product.desc.length /1000).toFixed(0)} mins read</span> */}
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: product && product.brand }}
      ></div>
    </main>
  );
}
