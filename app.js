// variable
const services = [
    {
        id: 1,
        title: "Domain Service",
        price: 15,
    },
    {
        id: 2,
        title: "Hosting Service",
        price: 30,
    },
    {
        id: 3,
        title: "Web Design Service",
        price: 150,
    },
    {
        id: 4,
        title: "Maintenance Service",
        price: 100,
    },
];

//selector
const app = document.querySelector("#app");
const invoiceForm = document.querySelector("#invoiceForm");
const selectService = document.querySelector("#selectService");
const quantity = document.querySelector("#quantity");
const lists = document.querySelector("#lists");
const subTotal = document.querySelector("#subTotal");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");
const listTable = document.querySelector("#listTable");
const addServiceOpenBtn = document.querySelector("#addServiceOpenBtn");
// const addServiceModal = document.querySelector("#addServiceModal");
const closeServiceModalBtn = document.querySelector("#closeServiceModalBtn");
const addServiceForm = document.querySelector("#addServiceForm");
const menu = document.querySelectorAll(".menu");
const sideBar = document.querySelector("#sideBar");
const addServiceModal = new bootstrap.Modal("#addServiceModal");



// function
const createTr = (service, quantity) => {
    const tr = document.createElement("tr");
    tr.classList.add("list");
    tr.setAttribute("service-id", service.id);
    const total = service.price * quantity;
    tr.innerHTML = `
    <td class="d-flex justify-content-between">${service.title}
    <div class="dropdown">
    <i class="bi bi-three-dots-vertical" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    </i>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item del-btn" href="#">Delete</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
    </td>
    <td class="text-end list-quantity">${quantity}</td>
    <td class="text-end">${service.price}</td>
    <td class="text-end listTotal">${total}</td>`;
    // console.log(service.title, service.price)
    return tr;
}

//find tax
const calculatedTax = (amount, percentage = 5 ) => {
    return amount * (percentage / 100 )
}


const findTotal = () => {
    const listTotal = document.querySelectorAll(".listTotal")
    let subTotalCalculated = [...listTotal].reduce((pv,cv) => 
    pv += parseFloat(cv.innerText), 0);
    // listTotal.forEach(el => subTotal += parseFloat(el.innerText));
    // console.log(subTotalCalculated);

    subTotal.innerText = subTotalCalculated;
    tax.innerText = calculatedTax(subTotalCalculated);
    total.innerText = subTotalCalculated + calculatedTax(subTotalCalculated);
};

const showTable = () => {
    if (lists.children.length >= 1) {
        console.log(lists.children.length);
        listTable.classList.remove("d-none");
    }
    else{
        listTable.classList.add("d-none");
    }
};
// process ( tasks )
// service option loop
services.forEach((service) => 
    selectService.append(new Option(service.title, service.id))
);
// collect data from form
invoiceForm.addEventListener("submit", (event)=> {
    event.preventDefault();

//     console.log(selectService.value, quantity.valueAsNumber, 
//         selectService.options[selectService.selectedIndex].innerHTML);
// })

 // console.log(selectService.value, quantity.valueAsNumber, 
    //     services.find((service) => service.id == selectService.value));
const selectedService = services.find(
    (service) => service.id == selectService.value
);

const isExistedService = [...lists.children].find(
    (el) => el.getAttribute("service-id") == selectedService.id
);

if (isExistedService) {
    console.log("yes it is existed");
    const existedQuantity = isExistedService.querySelector(".list-quantity");
    existedQuantity.innerText = parseFloat(existedQuantity.innerText) + quantity.valueAsNumber;
    isExistedService.querySelector(".listTotal").innerText = existedQuantity.innerText * selectedService.price;
} else {
    lists.append(createTr(selectedService, quantity.valueAsNumber));
}

   findTotal();
   invoiceForm.reset();
   showTable();
});

app.addEventListener("click", (event) => {
    const currentElement = event.target;
    if(currentElement.classList.contains("del-btn")) {
        //delete function here
        currentElement.closest("tr").remove();
        findTotal();
        showTable();
    }
});

addServiceOpenBtn.addEventListener("click", () => {
    // addServiceModal.classList.remove("d-none");
    addServiceModal.show();
})

closeServiceModalBtn.addEventListener("click", ()=> {
    // addServiceModal.classList.add("d-none");
    addServiceModal.hide();
})

addServiceForm.addEventListener("submit",(event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData.get("serviceTitle"),formData.get("servicePrice"));
    const id = Date.now();

    // add data
    services.push({
        id,
        title: formData.get("serviceTitle"),
        price: formData.get("servicePrice"),
    })

    // add to dom
    selectService.append(new Option(formData.get("serviceTitle"), id));

    // close modal
    addServiceForm.reset();
    // addServiceModal.classList.add("d-none");
    addServiceModal.hide();
})

// side bar toggle
menu.forEach((el) => {
    el.addEventListener("click", () => {
        sideBar.classList.toggle("active");
    })
})