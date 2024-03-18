import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";

export default function DashProducts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userProducts, setUserProducts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [prodIdToDelete, setProdIdToDelete] = useState("");
  useEffect(
    () => {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/prod/get-products`);
          const data = await res.json();
          if (res.ok) {
            setUserProducts(data.products);
            if (data.products.length < 9) {
              setShowMore(false);
            }
          }
          console.log("ss", data.products);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchProducts();
      // if (currentUser.isAdmin) {
      //   fetchProducts();
      // }
    },
    []
    // [currentUser._id]
  );
  const handleShowMore = async () => {
    const startIndex = userProducts.length;
    try {
      const res = await fetch(
        `/api/prod/get-products?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserProducts((prev) => [...prev, ...data.products]);
        if (data.products.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteProd = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/prod/delete-product/${prodIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserProducts((prev) =>
          prev.filter((prod) => prod._id !== prodIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userProducts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Cost price</Table.HeadCell>
              <Table.HeadCell>Selling Price</Table.HeadCell>
              <Table.HeadCell>Label Price</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Brand</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userProducts.map((prod) => (
              <Table.Body key={prod._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(prod.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link to={`/post/${prod.slug}`}> */}
                    <Link to={`/prod/${prod.name}`}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/prod/${prod.name}`}
                      // to={`/post/${prod.slug}`}
                    >
                      {prod.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{prod.category}</Table.Cell>
                  <Table.Cell>{prod.costPrice}</Table.Cell>
                  <Table.Cell>{prod.sellingPrice}</Table.Cell>
                  <Table.Cell>{prod.labelPrice}</Table.Cell>
                  <Table.Cell>{prod.qty}</Table.Cell>
                  <Table.Cell>{prod.brand}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setProdIdToDelete(prod._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      // to={`/update-post/${prod._id}`}
                      // /update-product/:prodId
                      to={`/update-product/${prod._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no products yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteProd}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
