// select all selectors from HTML into JavaScript:
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let customers = document.getElementById("customers");
let add = document.getElementById("add");

// so the user won't submit blank input fields I validated them
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failed");
    msg.innerHTML = "Customer Name cannot be blank";
    // I had to invoke the function "acceptData"
    // inside of an else statement for it to work with form validation
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// to collect and store the user input into the local data:
let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createCustomers();
};

// to create new customer:
let createCustomers = () => {
  customers.innerHTML = "";
  data.map((x, y) => {
    return (customers.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>

          <span class="options">
            <i onClick= "editCustomer(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteCustomer(this);createCustomers()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

// to delete customer
let deleteCustomer = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

};

// to edit the information
let editCustomer = (e) => {
  let selectedCustomer = e.parentElement.parentElement;

  textInput.value = selectedCustomer.children[0].innerHTML;
  dateInput.value = selectedCustomer.children[1].innerHTML;
  textarea.value = selectedCustomer.children[2].innerHTML;

  deleteCustomer(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// to get data from the local stoage
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createCustomers();
})();
