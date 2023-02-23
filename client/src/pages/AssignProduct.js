import Container from "react-bootstrap/Container";
import Cart from "../components/Cart";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { ASSIGN_PRODUCT_TO_BOOTH, SINGLE_UPLOAD } from "../utils/mutations";
const AssignProduct = () => {
  const { id } = useParams();
  let categoryData = [];

  // Queries
  const categories = useQuery(QUERY_CATEGORIES);

  // Mutations

  const [assignProductToBooth, assignproductRes] = useMutation(
    ASSIGN_PRODUCT_TO_BOOTH
  );
  const [imageUpload, singleUploadRes] = useMutation(SINGLE_UPLOAD);

  // States
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: 1,
    category: "",
    condition: "",
    image: "",
  });

  // Use Effect

  useEffect(() => {}, [categories]);

  if (categories.loading === false) {
    categoryData = categories.data.categories;
  }

  // Methods

  async function handleUploadImage(event) {
    let target = event.target;
    let files = target.files;

    let base64Image = await encodeImageFileAsURL(files[0]);

    let imageResponse = await imageUpload({
      variables: { base64Image: base64Image },
    });

    setProduct({
      ...product,
      image: imageResponse.data.imageUpload,
    });
  }

  function handleInput(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    product.price = parseFloat(product.price);
    product.quantity = parseFloat(product.quantity);

    if (product.category === "" || product.category === "-1") {
      alert("Please select category");
      return;
    }

    product.boothId = id;

    await assignProductToBooth({
      variables: product,
    });

    window.location.assign("/booth/" + id);
  }

  // helpers

  function encodeImageFileAsURL(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <div className="container my-1">
        <Link to={"/booth/" + id} className="mb-4 mb-4">
          ← Go to Booth
        </Link>
        <h2 className="mb-4 mb-4">Add Product to the Booth</h2>
        <form onSubmit={handleSubmit} className="mt-4 mb-4">
          <div className="flex-row space-between my-2">
            <label htmlFor="name">Product Name:</label>
            <input
              placeholder=""
              name="name"
              type="name"
              id="name"
              defaultValue={product.name}
              onChange={handleInput}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={handleInput}
              name="description"
              id="description"
              defaultValue={product.description}
            ></textarea>
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="price">Product Price:</label>
            <input
              placeholder=""
              name="price"
              type="price"
              id="price"
              value={product.price}
              onChange={handleInput}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="quantity">Product quantity:</label>
            <input
              placeholder=""
              name="quantity"
              type="quantity"
              id="quantity"
              onChange={handleInput}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="condition">Product Category:</label>
            <select
              name="category"
              className="width-100"
              onChange={handleInput}
            >
              <option value="-1">Choose category</option>
              {categoryData.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="condition">Condition:</label>
            <input
              placeholder=""
              name="condition"
              type="condition"
              id="condition"
              value={product.condition}
              onChange={handleInput}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="image">Image:</label>
            <input
              placeholder=""
              name="image"
              type="file"
              id="image"
              onChange={handleUploadImage}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Container>
        <Cart />
      </Container>
    </>
  );
};
export default AssignProduct;
