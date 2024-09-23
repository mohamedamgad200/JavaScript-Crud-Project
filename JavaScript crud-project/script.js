const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const taxesInput = document.getElementById("taxes");
const adsInput = document.getElementById("ads");
const discountsInput = document.getElementById("discounts");
const countInput = document.getElementById("count");
const categoryInput = document.getElementById("category");
const btnSubmit = document.getElementById("submit");
const total = document.getElementById("total");
const tableBody = document.querySelector("tbody");
const searchInput = document.getElementById("search");
const btnSearchByCategory = document.getElementById("searchCategory");
const btnSearchByTitle = document.getElementById("searchTitle");
//get total
const getTotal = function () {
  if (priceInput.value !== "") {
    let price =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountsInput.value;
    total.textContent = price;
    total.style.backgroundColor = "#040";
  } else {
    total.style.backgroundColor = "#a00d02";
    total.textContent = "";
  }
};
let data;
let mode = "create";
let updatedIndex;
//create product
if (localStorage.products) {
  data = JSON.parse(localStorage.products);
} else {
  data = [];
}
//clear input
const clearData = function () {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountsInput.value = "";
  categoryInput.value = "";
  countInput.value = "";
  total.textContent = "";
  total.style.backgroundColor = "#a00d02";
};
//update
const updateProduct = function (index) {
  const { title, price, taxes, ads, discount, total, category } = data[index];
  titleInput.value = title;
  priceInput.value = price;
  taxesInput.value = taxes;
  adsInput.value = ads;
  discountsInput.value = discount;
  getTotal();
  categoryInput.value = category;
  countInput.style.display = "none";
  btnSubmit.innerHTML = "Update";
  mode = "update";
  updatedIndex = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};
const createProduct = function () {
  const product = {
    title: titleInput.value,
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountsInput.value,
    total: total.textContent,
    category: categoryInput.value,
  };
  if (
    titleInput.value !== "" &&
    priceInput.value !== "" &&
    taxesInput.value !== "" &&
    adsInput.value !== "" &&
    discountsInput.value !== "" &&
    total.textContent !== "" &&
    categoryInput.value !== ""
  ) {
    if (mode === "create") {
      //count
      if (countInput.value > 1) {
        for (let i = 0; i < +countInput.value; i++) {
          data.push(product);
        }
      } else {
        data.push(product);
      }
    } else if (mode === "update") {
      data[updatedIndex] = product;
      mode = "create";
      btnSubmit.innerHTML = "Create";
      countInput.style.display = "block";
    }
    clearData();
  }
  //save on local storage
  localStorage.setItem("products", JSON.stringify(data));
  tableBody.innerHTML = "";
  showData();
};
btnSubmit.addEventListener("click", createProduct);
//read Data
console.log(data);
const showData = function () {
  for (let i = data.length - 1; i >= 0; i--) {
    const { title, price, taxes, ads, discount, total, category } = data[i];
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `<tr>
                        <td>${i}</td>
                        <td>${title}</td>
                        <td>${price}</td>
                        <td>${taxes}</td>
                        <td>${ads}</td>
                        <td>1${discount}</td>
                        <td>${total}</td>
                        <td>${category}</td>
                        <td><button id="update" onClick="updateProduct(${i})" >update</button></td>
                        <td><button id="delete" onClick="deleteProduct(${i})">delete</button></td>
                    </tr>`
    );
  }
  if (data.length > 0 && !document.getElementById("deleteAll")) {
    const deleteDev = document.getElementById("deleteDev");
    deleteDev.insertAdjacentHTML(
      "afterbegin",
      `<button id="deleteAll" onClick="deleteAll()">DeleteAll (${data.length})</button>`
    );
  } else if (data.length === 0) {
    deleteDev.innerHTML = "";
  }
};
showData();
//delete
const deleteProduct = function (index) {
  data.splice(index, 1);
  localStorage.products = JSON.stringify(data);
  tableBody.innerHTML = "";
  showData();
};
//delete All
const deleteAll = function () {
  //clear data
  localStorage.clear();
  data.splice(0);
  tableBody.innerHTML = "";
  showData();
};
//search By Category
const searchByCategory = function () {
  const dataFilterd = data.filter((d) =>
    d.category.includes(searchInput.value)
  );
  tableBody.innerHTML = "";
  for (let i = dataFilterd.length - 1; i >= 0; i--) {
    const { title, price, taxes, ads, discount, total, category } =
      dataFilterd[i];
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `<tr>
                        <td>${i}</td>
                        <td>${title}</td>
                        <td>${price}</td>
                        <td>${taxes}</td>
                        <td>${ads}</td>
                        <td>1${discount}</td>
                        <td>${total}</td>
                        <td>${category}</td>
                        <td><button id="update" onClick="updateProduct(${i})" >update</button></td>
                        <td><button id="delete" onClick="deleteProduct(${i})">delete</button></td>
                    </tr>`
    );
  }
};
//search By Title
const searchByTitle = function () {
  const dataFilterd = data.filter((d) => d.title.includes(searchInput.value));
  tableBody.innerHTML = "";
  for (let i = dataFilterd.length - 1; i >= 0; i--) {
    const { title, price, taxes, ads, discount, total, category } =
      dataFilterd[i];
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `<tr>
                        <td>${i}</td>
                        <td>${title}</td>
                        <td>${price}</td>
                        <td>${taxes}</td>
                        <td>${ads}</td>
                        <td>1${discount}</td>
                        <td>${total}</td>
                        <td>${category}</td>
                        <td><button id="update" onClick="updateProduct(${i})" >update</button></td>
                        <td><button id="delete" onClick="deleteProduct(${i})">delete</button></td>
                    </tr>`
    );
  }
};
btnSearchByTitle.addEventListener("click", searchByTitle);
btnSearchByCategory.addEventListener("click", searchByCategory);
searchInput.addEventListener("input", function () {
  if (searchInput.value === "") {
    tableBody.innerHTML = "";
    showData();
  }
});
