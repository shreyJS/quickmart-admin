import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";
export default function DashOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const [userOrders, setUserOrders] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderIdToDelete, setorderIdToDelete] = useState("");

  useEffect(
    () => {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`/api/order/get-orders`);
          const data = await res.json();
          if (res.ok) {
            setUserOrders(data.orders);
            if (data.orders.length < 9) {
              setShowMore(false);
            }
          }
          //console.log("ss", data.orders);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchOrders();
      // if (currentUser.isAdmin) {
      //   fetchProducts();
      // }
    },
    []
    // [currentUser._id]
  );

  const handleShowMore = async () => {
    const startIndex = userOrders.length;
    try {
      const res = await fetch(`/api/order/get-orders?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserOrders((prev) => [...prev, ...data.orders]);
        if (data.orders.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteOrder = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/order/delete-orders/${orderIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserOrders((prev) =>
          prev.filter((order) => order._id !== orderIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userOrders.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>

              <Table.HeadCell>Customer Name</Table.HeadCell>
              <Table.HeadCell>Customer ID</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Bill</Table.HeadCell>
              <Table.HeadCell>Discount</Table.HeadCell>
              <Table.HeadCell>Amount Payable</Table.HeadCell>
              <Table.HeadCell>Payment Method</Table.HeadCell>
              <Table.HeadCell>Items</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userOrders.map((order) => (
              <Table.Body key={order._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link to={`/post/${prod.slug}`}> */}
                    <Link to={`/order/${order._id}`}>
                      <img
                        src="https://cdn.pixabay.com/photo/2017/06/10/07/20/milk-2389222_1280.png"
                        alt={order._id}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/order/${order._id}`}
                      // to={`/post/${prod.slug}`}
                    >
                      {order.custId}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>{order.bill}</Table.Cell>
                  <Table.Cell>{order.disc}</Table.Cell>
                  <Table.Cell>{order.amtPayable}</Table.Cell>
                  <Table.Cell>{order.paymentMethod}</Table.Cell>
                  {/* <Table.Cell>{order.items}</Table.Cell> */}

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setorderIdToDelete(order._id);
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
                      to={`/update-orders/${order._id}`}
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
        <p>You have no orders yet!</p>
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
              Are you sure you want to delete this order?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteOrder}>
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
