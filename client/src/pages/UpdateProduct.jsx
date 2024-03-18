import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateProduct() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { prodId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchProd = async () => {
        const res = await fetch(`/api/prod/get-products?prodId=${prodId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.products[0]);
        }
      };

      fetchProd();
    } catch (error) {
      console.log(error.message);
    }
  }, [prodId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/prod/update-product/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        //data.slug
        navigate(`/prod/${data.name}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Name of the product"
            id="name"
            required
            className="flex-5"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            value={formData.name}
          />
          <Select className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select category</option>
            <option value="grocery">Grocery</option>
            <option value="soaps-and-detergents">Soaps and Detergents</option>
            <option value="general">General</option>
            <option value="flours">Flours</option>
            <option value="toothbrush">Toothbrush</option>
            <option value="broom">Broom</option>
            <option value="biscuit">Biscuit</option>
          </Select>
          <TextInput
            type="number"
            placeholder="Product Qty"
            id="qty"
            className="flex-1"
            required
            onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
            value={formData.qty}
          />
          <TextInput
            type="text"
            placeholder="Brand"
            id="brand"
            className="flex-3"
            required
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }/>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <TextInput
            type="number"
            placeholder="Buying cost"
            id="costPrice"
            className="flex-1"
            required
            onChange={(e) =>
              setFormData({ ...formData, costPrice: e.target.value })
            }
            value={formData.costPrice}
          />
          <TextInput
            type="number"
            placeholder="Selling cost"
            id="sellingPrice"
            className="flex-1"
            required
            onChange={(e) =>
              setFormData({ ...formData, sellingPrice: e.target.value })
            }
            value={formData.sellingPrice}
          />
          <TextInput
            type="number"
            placeholder="Label cost"
            id="labelPrice"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, labelPrice: e.target.value })
            }
            value={formData.labelPrice}
          />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between"></div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.desc}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, desc: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update product
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
