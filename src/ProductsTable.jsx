import React, { useEffect, useState } from "react";
import Style from "./SignUp.module.css";

const ProductsTable = () => {
  const [editId, setEditId] = useState(-1);

  const handleEdit = (id)=>{
    setEditId(id);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/data/getbyid/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUProductName(result.data.productName);
        setUProductQuantity(result.data.productQuantity);
        setUProductPrice(result.data.productPrice);
      })
      .catch(error => console.log('error', error));
  }

  const [uProductName, setUProductName] = useState('');
  const [uProductQuantity, setUProductQuantity] = useState('');
  const [uProductPrice, setUProductPrice] = useState('');

  const updateProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      productName: uProductName,
      productQuantity: uProductQuantity,
      productPrice: uProductPrice,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/data/update/product/${editId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

      setEditId(-1);
  };

  const deleteProduct = (e) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/api/data/delete/product/${e.target.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const [responseSave, setResponseSave] = useState("");
  const initialValues = {
    productName: "",
    productQuantity: "",
    productPrice: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const submitData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      productName: formValues.productName,
      productQuantity: formValues.productQuantity,
      productPrice: formValues.productPrice,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "http://localhost:8080/api/data/products/save/product",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => setResponseSave(res.message))
      .catch((error) => setResponseSave(error.message));
  };

  const [response, setResponse] = useState([]);

  let fetchApi = () => {
    let data = window.fetch("http://localhost:8080/api/data/fetch");
    data.then((m) => {
      let finalData = m.json();
      finalData.then((msg) => {
        setResponse(msg.data);
      });
    });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  // --------



  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = response.slice(firstIndex, lastIndex);
  const npage = Math.ceil(response.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);



// --------


  return (
    <>
      <h1 className={Style.tableh1}>
        <u>Fetch Products</u>
      </h1>

      <form className={Style.tableform}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formValues.productName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productQuantity"
          placeholder="Quantity"
          value={formValues.productQuantity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productPrice"
          placeholder="Price"
          value={formValues.productPrice}
          onChange={handleChange}
        />
        <button onClick={submitData}>Add Product</button>
      </form>

      <table
        cellPadding="0px"
        cellSpacing="0px"
        border="1px"
        className={Style.table}
      >
        <thead>
          <tr className={Style.tr}>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Qty</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((m, index) => (
            m.productId === editId ?
            <tr key={index} className={Style.tr}>
              <td>{m.productId}</td>
              <td><input type="text" value={uProductName} onChange={e=> setUProductName(e.target.value)} className={Style.edittr} /></td>
              <td><input type="text" value={uProductQuantity} onChange={e=> setUProductQuantity(e.target.value)} className={Style.edittr} /></td>
              <td><input type="text" value={uProductPrice} onChange={e=> setUProductPrice(e.target.value)} className={Style.edittr} /></td>
              <td><button className={Style.tablebutton} onClick={updateProduct}>Update</button></td>
            </tr>
            :
            <tr key={index} className={Style.tr}>
              <td>{m.productId}</td>
              <td>{m.productName}</td>
              <td>{m.productQuantity}</td>
              <td>{m.productPrice}</td>
              <td>
                <button className={Style.tablebutton} onClick={()=> handleEdit(m.productId)}>Edit</button>
                <button
                  className={Style.tablebutton}
                  value={m.productId}
                  onClick={deleteProduct}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <nav>
        <ul className={Style.pagination}>
          <li className={Style.page_item}>
            <a href="#" className={Style.page_link} onClick={prePage} >
              Prev
            </a>
          </li>
          {
            numbers.map((n, i) => (
              <li className={`${Style.page_item} ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href="#" className={Style.page_link} onClick={()=> changeCPage(n)}>
                  {n}
                </a>
              </li>
            ))
          }
          <li className={Style.page_item}>
            <a href="#" className={Style.page_link} onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>


    </>
  );


  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage (id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }


};

export default ProductsTable;
