// // ############################################# Regrex expressions ###########################################

// const regrexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,5})$/;
// const regrexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

// // ################################################## Global declarations ###################################
// const userData = JSON.parse(localStorage.getItem('userData')) ?? [];
// let tbody = document.querySelector('tbody');

// let submitDataBtn = document.getElementById('submitData');

// let setData = JSON.parse(localStorage.getItem('userData')) ?? [];

// let name = document.getElementById('name');
// let dob = document.getElementById('dob');
// let email = document.getElementById('email');
// let phone = document.getElementById('phone');
// let gender = document.querySelector('input[name="gender"]:checked');

// console.log('setData', setData);
// console.log('userData', userData);

// //################## Advance table JS ##############################

// const insertDataToAdvTable = () => {
//   const advTableContent = document.querySelector('#adv tbody');
//   advTableContent.innerHTML = `

//   <tr>
//   <th>Name</th>
// </tr>
// <tr>
// <th>Gender</th>
// </tr>
// <tr>
// <th>DOB</th>
// </tr>
// <tr>
// <th>Email</th>
// </tr>
// <tr>
// <th>Phone</th>
// </tr>
// <tr>
// <th>Hobbies</th>
// </tr>
// <tr>
// <th>Actions</th>
// <!-- <td>
//   <button onclick="">Edit</button>
//   <button class="btn">Delete</button>
// </td> -->
// </tr>


//   `;
//   const trs = document.querySelectorAll('#adv tr');

//   setData?.forEach((item, index) => {
//     let val = Object.values(item);

//     for (let i = 0; i < 7; i++) {
//       let td = document.createElement('td');
//       td.classList.add(index);

//       td.innerText = val[i] || 'empty';
//       if (i == 6) {
//         td.innerHTML = `  <button onclick="editEntries(${index})">Edit</button>
//         <button class="btn" onclick="deleteData(${index})">Delete</button>`;
//       }

//       trs[i].appendChild(td);
//     }
//   });
// };
// insertDataToAdvTable();

// //###################### Create entries ######################################################
// let hobbies = [];

// const checkPhoneNumber = () => {
//   let phoneFieldLabel = document.querySelector("[class='error-phone']");
//   if (!phone.value.match(/^\d{10}$/)) {
//     phoneFieldLabel.innerText = 'Phone should be a number field with 10 digits.';
//     return false;
//   } else {
//     phoneFieldLabel.innerText = '';
//     return true;
//   }
// };

// const errorHandling = (fieldName) => {
//   let flag = []; //will contain all validation boolean values

//   // name, gender, dob, email

//   let nameFieldLabel = document.querySelector("[class='error-name']");
//   let dobFieldLabel = document.querySelector("[class='error-dob']");
//   let emailFieldLabel = document.querySelector("[class='error-email']");

//   switch (fieldName) {
//     case 'phone':
//       checkPhoneNumber();
//       break;
//     case 'name':
//       if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
//         nameFieldLabel.innerText =
//           'Name field should be between 4 to 20 characters, including only alphanumeric characters';
//         nameFieldLabel.focus();

//         flag.splice(0, 0, false);
//       } else {
//         nameFieldLabel.innerText = '';
//         flag.splice(0, 0, true);
//       }

//       break;

//     case 'date':
//       if (!dob.value && fieldName === 'date') {
//         dobFieldLabel.innerText = 'Date of birth is required';
//         dobFieldLabel.focus();

//         flag.splice(1, 0, false);
//       } else if (new Date(dob.value) >= new Date()) {
//         dobFieldLabel.innerText = 'Future dates are not allowed';
//         flag.splice(1, 0, false);
//       } else {
//         dobFieldLabel.innerText = '';
//         flag.splice(1, 0, true);
//       }

//       break;

//     case 'email':
//       if (!email.value.match(regrexEmail) && fieldName === 'email') {
//         emailFieldLabel.innerText = 'Invalid Email';
//         emailFieldLabel.focus();

//         flag.splice(2, 0, false);
//       } else {
//         emailFieldLabel.innerText = '';
//         flag.splice(2, 0, true);
//       }

//       break;

//     default:
//       if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
//         nameFieldLabel.innerText =
//           'Name field should be between 4 to 20 characters, including only alphanumeric characters';
//         nameFieldLabel.focus();

//         flag.splice(0, 0, false);
//       } else {
//         nameFieldLabel.innerText = '';
//         flag.splice(0, 0, true);
//       }
//       if (!dob.value) {
//         // console.log('flag2');
//         dobFieldLabel.innerText = 'Date of birth is required';
//         dobFieldLabel.focus();

//         flag.splice(1, 0, false);
//       } else if (new Date(dob.value) >= new Date()) {
//         dobFieldLabel.innerText = 'Future dates are not allowed';
//         flag.splice(1, 0, false);
//       } else {
//         dobFieldLabel.innerText = '';
//         flag.splice(1, 0, true);
//       }

//       if (!email.value.match(regrexEmail)) {
//         if (email.value === '') {
//           emailFieldLabel.innerText = 'Email is required';
//         } else {
//           emailFieldLabel.innerText = 'Invalid Email';
//         }
//         emailFieldLabel.focus();

//         flag.splice(2, 0, false);
//       } else {
//         emailFieldLabel.innerText = '';
//         flag.splice(2, 0, true);
//       }
//       return flag;
//   }
// };

// // ################################################ INSERT DATA FUNCTIONALITY ###################################

// // Function to check Valid data
// function checkIfInputDataIsValid() {
//   let phoneNumberIsValid = true;
//   if (phone.value) {
//     phoneNumberIsValid = checkPhoneNumber();
//   }

//   return errorHandling().every((item) => item === true) && phoneNumberIsValid;

//   // return boolean
// }

// // function to set Data to localstorage
// function pushDataToLocalStorage() {
//   hobbies = [];

//   gender = document.querySelector('input[name="gender"]:checked');

//   let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');

//   for (let x of getHobbies) {
//     hobbies.push(x.value);
//   }

//   const newDataToPush = {
//     name: name.value,
//     gender: gender.value,
//     dob: dob.value,
//     email: email.value,
//     phone: phone.value || 'null',
//     hobbies: !hobbies.length == 0 ? hobbies : 'null',
//   };

//   setData?.push(newDataToPush);

//   localStorage.setItem('userData', JSON.stringify(setData));
// }

// function clearDataFromInputForm() {
//   name.value = null;
//   dob.value = null;
//   email.value = null;
//   document.querySelector("[value='Male']").checked = true;
//   phone.value = null;

//   hobbies?.forEach((val) => {
//     document.getElementById(`${val}`).checked = false;
//   });

//   setTimeout(() => {
//     alert('Data submitted successfully!!');
//   }, 10);
// }

// // Create data

// function createData() {
//   if (checkIfInputDataIsValid()) {
//     pushDataToLocalStorage();
//     clearDataFromInputForm();
//     checkData();
//     insertDataToAdvTable();
//   }
// }

// //######################################################## UPDATE ENTRIES FUNCTIONALITY #################################

// const submitdataBtn = document.getElementById('submitData');
// const updateDataBtn = document.getElementById('updateDataBtn');
// const cancelUpdateDataBtn = document.getElementById('cancelUpdateDataBtn');

// const editEntries = (rowCount) => {
//   document.getElementById('jumpToThis').scrollIntoView();

//   setData = JSON.parse(localStorage.getItem('userData'));
//   let dataToEdit = setData[rowCount];

//   name.value = dataToEdit?.name;
//   document.querySelector(`[value="${dataToEdit.gender}"]`).checked = 'true';
//   dob.value = dataToEdit?.dob;
//   email.value = dataToEdit?.email;
//   phone.value = dataToEdit?.phone;

//   dataToEdit.hobbies !== 'null' &&
//     dataToEdit?.hobbies?.forEach((val) => {
//       document.getElementById(`${val}`).checked = true;
//     });

//   // changing the submit button to update
//   errorHandling();
//   submitDataBtn.style.display = 'none';

//   // console.log(updateDataBtn);

//   updateDataBtn.style.display = 'inline';
//   updateDataBtn.value = rowCount;

//   cancelUpdateDataBtn.style.display = 'inline';
// };

// updateDataBtn.addEventListener('click', (val) => {
//   let updateDataBtn = document.getElementById('updateDataBtn');
//   let rowCount = updateDataBtn.value;

//   if (checkIfInputDataIsValid()) {
//     gender = document.querySelector('input[name="gender"]:checked');

//     hobbies = [];

//     let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');
//     for (let x of getHobbies) {
//       hobbies.push(x.value);
//     }

//     let newData = {
//       name: name.value,
//       gender: gender.value,
//       dob: dob.value,
//       email: email.value,
//       phone: phone.value || 'null',
//       hobbies: !hobbies.length == 0 ? hobbies : 'null',
//     };

//     const previousData = JSON.parse(localStorage.getItem('userData'));
//     // console.log(previousData);
//     previousData.splice(rowCount, 1, newData);
//     localStorage.setItem('userData', JSON.stringify(previousData));
//     checkData();
//     insertDataToAdvTable();

//     name.value = null;
//     dob.value = null;
//     email.value = null;
//     phone.value = null;
//     previousData[rowCount].hobbies !== 'null' &&
//       previousData[rowCount].hobbies.forEach((val) => {
//         document.getElementById(`${val}`).checked = false;
//       });
//     document.getElementById('cancelUpdateDataBtn').style.display = 'none';

//     document.querySelector("[onclick='createData()']").style.display = 'block';
//     let updateDataBtn = document.getElementById('updateDataBtn');
//     updateDataBtn.style.display = 'none';

//     setTimeout(() => {
//       alert('Your data has been updated successfully!!');
//     }, 10);

//     // window.scrollTo(0, document.body.scrollHeight);
//   }
// });

// const deleteAllBtn = document.querySelector("[value='Delete all']");

// const checkData = () => {
//   setData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

//   if (setData !== null && setData?.length !== 0) {
//     deleteAllBtn.style.display = 'block';
//   } else {
//     deleteAllBtn.style.display = 'none';
//   }

//   let previousData = '';

//   setData?.forEach((val, index) => {
//     previousData += `<tr id=${index}  >
//         <td>${val.name}</td>
//         <td>${val.gender}</td>
//         <td>${val.dob}</td>
//         <td>${val.email}</td>
//         <td>${val.phone}</td>
//         <td>${val.hobbies}</td>
//         <td>
//           <button onclick="editEntries(${index})">Edit</button>
//           <button onclick="deleteData(${index})">Delete</button>
//         </td>
//       </tr>`;
//   });

//   tbody.innerHTML = previousData;
// };

// checkData();

// //###################### Delete entries ######################################################

// const deleteData = (rowCount) => {
//   let permissionToDeleteEntry = confirm('Are you Sure??');
//   if (permissionToDeleteEntry) {
//     const updatedData = setData.filter((item, index) => {
//       return index !== rowCount;
//     });

//     let row = document.getElementById(rowCount);
//     row.remove();

//     localStorage.setItem('userData', JSON.stringify(updatedData));
//     checkData();
//     insertDataToAdvTable();
//   }
// };

// cancelUpdateDataBtn.addEventListener('click', () => {
//   name.value = null;
//   dob.value = null;
//   email.value = null;
//   phone.value = null;
//   document.querySelectorAll('[type=checkbox]').forEach((val) => {
//     // console.log(val);
//     val.checked = false;
//   });
//   submitdataBtn.style.display = 'block';
//   cancelUpdateDataBtn.style.display = 'none';
//   updateDataBtn.style.display = 'none';
//   // window.scrollTo(0, document.body.scrollHeight);
// });

// //###################### Search entries ######################################################

// const searchEntries = (e) => {
//   let filterData = setData?.filter((item) => {
//     return item?.name.toLowerCase().includes(e);
//   });

//   let previousData = '';
//   filterData?.forEach((val, index) => {
//     previousData += `<tr id=${index}  >
//         <td>${val.name}</td>
//         <td>${val.gender}</td>
//         <td>${val.dob}</td>
//         <td>${val.email}</td>
//         <td>${val.phone}</td>
//         <td>${val.hobbies}</td>

//         <td>
//           <button onclick="editEntries(${index})">edit</button>
//           <button onclick="deleteData(${index})">Delete</button>
//         </td>
//       </tr>`;
//   });

//   tbody.innerHTML = previousData;
// };

// const sortEntriesAccToDob = () => {
//   const sortBox = document.querySelector("[name='sortEntries']");
//   let sortedData;

//   if (sortBox.checked) {
//     sortedData = setData?.toSorted((firstDate, secondDate) => {
//       return new Date(firstDate.dob) - new Date(secondDate.dob);
//     });
//   } else {
//     sortedData = setData;
//   }

//   let previousData = '';
//   sortedData?.forEach((val, index) => {
//     previousData += `<tr id=${index}  >
//         <td>${val.name}</td>
//         <td>${val.gender}</td>
//         <td>${val.dob}</td>
//         <td>${val.email}</td>
//         <td>${val.phone}</td>
//         <td>${val.hobbies}</td>

//         <td>
//           <button onclick="editEntries(${index})">Edit</button>
//           <button onclick="deleteData(${index})">Delete</button>
//         </td>
//       </tr>`;
//   });

//   tbody.innerHTML = previousData;
// };

// const deleteAll = () => {
//   console.log(setData);
//   const permsisson = confirm('Are you sure');

//   if (permsisson) {
//     localStorage.clear();
//     setData = [];
//     console.log(setData);

//     checkData();
//     insertDataToAdvTable();
//   }
// };

// // const datePicker = document.querySelector('[type="date"]');

// // datePicker.setAttribute('max', new Date());




// ########################## New Code ##############################
// import statments

import { setDataIntoLocalStorage, fetchDataFromLocalStorage, deleteDataFromLocalStorage, clearLocalStorage } from '../storage.js';







function getUserId() {

  const userId = !fetchDataFromLocalStorage().isEmpty ? fetchDataFromLocalStorage().userData.length + 1 : 1

  return userId;
}

function getUserData() {

  const name = document.forms[0].elements.name.value;
  const gender = document.forms[0].elements.gender.value;
  const dob = document.forms[0].elements.dob.value;
  const email = document.forms[0].elements.email.value;
  const phone = document.forms[0].elements.phone.value;
  const hobbies = Array.from(document.forms[0].elements.hobbies).filter((val) => val.checked).map((val) => val.value).join(", ")
  const userId = getUserId()
  const userData = {
    userId: userId, name: name, gender: gender, dob: dob, email: email, phone: phone, hobbies: hobbies || null
  }

  return userData;

}
// document.




function loadTable() {

  const body = document.body;
  const main_container = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.innerText = 'Basic Table'
  main_container.setAttribute('class', 'main-container');
  main_container.appendChild(h3);
  const navbar_container = document.createElement('div');
  navbar_container.setAttribute('id', 'navbar-container');
  const span = document.createElement('span');
  span.innerText = 'Display';
  const deleteAllBtn = document.createElement('button')
  const searchInput = document.createElement('input')
  searchInput.placeholder = "search here..."
  deleteAllBtn.style.backgroundColor = 'red'
  deleteAllBtn.innerText = "delete all"
  navbar_container.appendChild(span);
  // navbar_container.appendChild(searchInput)
  navbar_container.appendChild(deleteAllBtn)
  main_container.appendChild(navbar_container);
  const basicTable = document.createElement('div');
  basicTable.setAttribute('class', 'container container-basic-table');
  basicTable.setAttribute('id', 'basicTable');
  main_container.appendChild(basicTable);






  body.appendChild(main_container);

  createBasicTable();
  checkData()




}

function checkData() {
  if (!fetchDataFromLocalStorage().isEmpty) {
    document.body.childNodes[17].style.display = 'block'

  } else {
    document.body.childNodes[17].style.display = 'none'
  }

}






loadTable()



function createBasicTable() {
  const container = document.getElementById("basicTable")
  const table = document.createElement('table')

  // console.log(container);
  const thead = document.createElement('thead')

  const tr = document.createElement('tr')

  container.appendChild(table)
  table.appendChild(thead)
  thead.appendChild(tr);



  ['Sr. no.', 'Name', 'Gender', 'DOB', 'Email', 'Phone', 'Hobbies', 'Actions'].forEach(
    (val) => {

      const th = document.createElement('th')
      tr.appendChild(th)
      th.innerText = val
    }
  );

  // console.log(table.innerHTML);

  const tbody = document.createElement('tbody');

  function createNewRow(userInputData) {
    console.log(userInputData);

    const tr = document.createElement('tr')
    for (let x in userInputData) {
      const td = document.createElement('td')
      tr.appendChild(td)
      td.innerText = userInputData[x] ?? '-'

    }
    const td = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    td.appendChild(editBtn)
    td.appendChild(deleteBtn)
    tr.appendChild(td)


    editBtn.addEventListener('click', () => {

      document.forms[0].elements[0].value = tr.childNodes[1].innerText;
      document.forms[0].elements[3].value = tr.childNodes[3].innerText;
      document.forms[0].elements[4].value = tr.childNodes[4].innerText;
      document.forms[0].elements[5].value = tr.childNodes[5].innerText;
      document.forms[0].elements[6].value = tr.childNodes[6].innerText;

    })

    deleteBtn.addEventListener('click', () => {
      console.log(tr);
      document.body.lastChild.childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
      deleteDataFromLocalStorage(parseInt(tr.childNodes[0].innerText));

    })



    tbody.appendChild(tr)
    console.log(tbody);
    table.appendChild(tbody);





  }



  document.forms[0].elements.submitData.addEventListener('click', () => {
    // console.log("hello");
    // console.log(tr);

    const userData = getUserData();
    // console.log(userData);
    setDataIntoLocalStorage(userData);
    // console.log(valid);
    createNewRow(userData);
    checkData();


  });









};

(() => {



  if (!fetchDataFromLocalStorage().isEmpty) {

    document.body.lastChild.childNodes[2].childNodes[0].appendChild(document.createElement('tbody'));

    const storedData = fetchDataFromLocalStorage().userData;

    storedData.forEach((val) => {

      const tr = document.createElement('tr');
      for (let x in val) {
        const td = document.createElement('td');
        td.innerText = val[x] ?? '-';

        tr.appendChild(td);
      }


      const td = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      td.appendChild(editBtn);

      td.appendChild(deleteBtn);
      tr.appendChild(td);
      document.body.lastChild.childNodes[2].childNodes[0].childNodes[1].appendChild(tr);

      editBtn.addEventListener('click', () => {

        document.forms[0].elements[0].value = tr.childNodes[1].innerText;
        document.forms[0].elements[3].value = tr.childNodes[3].innerText;
        document.forms[0].elements[4].value = tr.childNodes[4].innerText;
        document.forms[0].elements[5].value = tr.childNodes[5].innerText;
        document.forms[0].elements[6].value = tr.childNodes[6].innerText;

      })

      deleteBtn.addEventListener('click', () => {
        console.log(tr);
        document.body.lastChild.childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
        deleteDataFromLocalStorage(parseInt(tr.childNodes[0].innerText));

      })




    })





    console.log("data aii");
  } else {
    console.log("empty data");
  }



})()















