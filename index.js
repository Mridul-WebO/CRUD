// ########################## New Code ##############################
// import statments

import {
  setDataIntoLocalStorage,
  fetchDataFromLocalStorage,
  deleteDataFromLocalStorage,
  clearLocalStorage,
  updateDataInLocalStorage,
} from '../storage.js';

document.forms[0].elements.dob.max = new Date().toISOString().split('T')[0]; // to prevent selection of future dates in datepicker

function getUserId() {
  const userId = !fetchDataFromLocalStorage().isEmpty ? fetchDataFromLocalStorage().userData.length + 1 : 1;

  return userId;
}

function getUserData(id) {
  const name = document.forms[0].elements.name;
  const gender = document.forms[0].elements.gender;
  const dob = document.forms[0].elements.dob;
  const email = document.forms[0].elements.email;
  const phone = document.forms[0].elements.phone;
  const hobbies = Array.from(document.forms[0].elements.hobbies)
    .filter((val) => val.checked)
    .map((val) => val.value)
    .join(', ');
  const userId = id ?? getUserId();

  // console.log(userId);

  // return userData;

  if (name.value === '') {
    name.setCustomValidity('name is required!!');
  } else if (!name.value.match(/^[a-zA-Z0-9 ]{4,20}$/)) {
    name.setCustomValidity('invalid name.');
  } else {
    name.setCustomValidity('');
  }

  if (dob.value === '') {
    dob.setCustomValidity('Date of birth is required!!');
  } else {
    dob.setCustomValidity('');
  }

  if (email.value === '') {
    email.setCustomValidity('Email is required!!');
  } else if (!email.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,5})$/)) {
    email.setCustomValidity('invalid email');
  } else {
    email.setCustomValidity('');
  }

  // console.log(gender.value);

  if (name.validity.valid && dob.validity.valid && email.validity.valid) {
    console.log("valid toh hain");
    const userData = {
      userId: userId,
      name: name.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      phone: phone.value || null,
      hobbies: hobbies || null,
    };

    return { userData: userData, status: true };
  } else {


    return { status: false };
  }
}

document.forms[0].elements.name.addEventListener('keyup', (e) => {
  if (e.target.value === '') {
    e.target.setCustomValidity('name is required!!');
  } else if (!e.target.value.match(/^[a-zA-Z0-9 ]{4,20}$/)) {
    e.target.setCustomValidity('invalid name!!');
  } else {
    e.target.setCustomValidity('');
  }
  e.target.reportValidity();
});

document.forms[0].elements.dob.addEventListener('focus', (e) => {

  if (e.target.value === '') {
    e.target.setCustomValidity('Date of birth is required!!');
  } else {
    e.target.setCustomValidity('');
  }
  e.target.reportValidity();
});
document.forms[0].elements.email.addEventListener('keyup', (e) => {
  if (e.target.value === '') {
    e.target.setCustomValidity('Email is required!!');
  } else if (!e.target.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,5})$/)) {
    e.target.setCustomValidity('invalid email');
  } else {
    e.target.setCustomValidity('');
  }

  e.target.reportValidity();
});
// document.forms[0].elements.phone.addEventListener('keyup', (e) => {
//   e.target.setCustomValidity('fields cannot be empty!!')

//   console.log(e.target.validationMessage);
// })

function loadBasicTable() {
  const body = document.body;
  const main_container = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.innerText = 'Basic Table';
  main_container.setAttribute('class', 'main-container');
  main_container.appendChild(h3);
  const navbar_container = document.createElement('div');
  navbar_container.setAttribute('id', 'navbar-container');
  const span = document.createElement('span');
  span.innerText = 'Display';
  const deleteAllBtn = document.createElement('button');
  const searchInput = document.createElement('input');
  searchInput.placeholder = 'search here...';
  deleteAllBtn.style.backgroundColor = 'red';
  deleteAllBtn.innerText = 'delete all';
  navbar_container.appendChild(span);
  // navbar_container.appendChild(searchInput)
  // navbar_container.appendChild(deleteAllBtn)
  main_container.appendChild(navbar_container);
  const basicTable = document.createElement('div');
  basicTable.setAttribute('class', 'container container-basic-table');
  basicTable.setAttribute('id', 'basicTable');
  main_container.appendChild(basicTable);

  body.appendChild(main_container);

  createBasicTable();
  checkData();
}

function checkData() {
  if (!fetchDataFromLocalStorage().isEmpty) {
    document.body.childNodes[13].style.display = 'block';
  } else {
    document.body.childNodes[13].style.display = 'none';
  }
}

loadBasicTable();

// ################### Basic table ###################################

function createBasicTable() {
  const container = document.getElementById('basicTable');
  const table = document.createElement('table');

  // console.log(container);
  const thead = document.createElement('thead');

  const tr = document.createElement('tr');

  container.appendChild(table);
  table.appendChild(thead);
  thead.appendChild(tr);

  ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'].forEach((val) => {
    const th = document.createElement('th');
    tr.appendChild(th);
    th.innerText = val;
  });

  const tbody = document.createElement('tbody');

  window.onload = function () {
    // console.log('hello-------------');
    if (!fetchDataFromLocalStorage().isEmpty) {
      document.body.childNodes[13].childNodes[2].childNodes[0].appendChild(tbody);

      const storedData = fetchDataFromLocalStorage().userData;
      const updateBtn = document.createElement('button');
      updateBtn.innerText = 'Update';
      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = 'cancel';

      storedData.forEach((val) => {
        console.log(val);

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
        tbody.appendChild(tr);



        editBtn.addEventListener('click', () => {

          // document.forms[]

          document.forms[0].elements[0].value = tr.childNodes[1].innerText;
          document.forms[0].elements.gender.value = tr.childNodes[2].innerText;
          document.forms[0].elements[3].value = tr.childNodes[3].innerText;
          document.forms[0].elements[4].value = tr.childNodes[4].innerText;
          document.forms[0].elements[5].value = tr.childNodes[5].innerText === '-' ? '' : tr.childNodes[5].innerText;
          // document.forms[0].elements[6].value = tr.childNodes[6].innerText;
          // document.forms[0].elements[7].value =
          // console.log(tr.childNodes[6]);
          tr.childNodes[6].innerText !== '-' &&
            tr.childNodes[6].innerText.split(',').forEach((val, index) => {
              // console.log(val, index);

              if (document.forms[0].elements.hobbies[index].value === val.trim()) {
                document.forms[0].elements.hobbies[index].checked = true;
              }
            });

          // show update and cancel button in form


          document.forms[0].elements.submitData.style.display = 'none';

          document.forms[0].childNodes[13].childNodes[3].appendChild(updateBtn);
          document.forms[0].childNodes[13].childNodes[3].appendChild(cancelBtn);
          document.forms[0].scrollIntoView()


        });

        updateBtn.addEventListener('click', () => {
          if (getUserData().status) {
            const data = getUserData(parseInt(tr.childNodes[0].innerText)).userData;

            tr.childNodes[1].innerText = data.name;
            tr.childNodes[2].innerText = data.gender;
            tr.childNodes[3].innerText = data.dob;
            tr.childNodes[4].innerText = data.email;
            tr.childNodes[5].innerText = data.phone ? data.phone : '-';

            tr.childNodes[6].innerText = Array.from(document.forms[0].elements.hobbies)
              .filter((val) => val.checked)
              .map((val) => val.value)
              .join(', ');

            document.forms[0].childNodes[13].childNodes[3].removeChild(updateBtn);
            document.forms[0].childNodes[13].childNodes[3].removeChild(cancelBtn);
            document.forms[0].elements.submitData.style.display = 'block';
            updateDataInLocalStorage(data);
            document.forms[0].reset()
            setTimeout(() => {
              alert('Data updated successfully!!');
            }, 10);
          }
        });

        deleteBtn.addEventListener('click', () => {
          console.log(tr);
          document.body.childNodes[13].childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
          deleteDataFromLocalStorage(parseInt(tr.childNodes[0].innerText));
        });
      });

      console.log('data hai');
    } else {
      console.log('empty data');
    }
  };

  function createNewRow(userInputData) {
    const data = userInputData;

    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update';
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'cancel';


    const tr = document.createElement('tr');
    for (let x in data) {
      // console.log(x);
      const td = document.createElement('td');
      tr.appendChild(td);
      td.innerText = data[x] ?? '-';
    }
    const td = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    td.appendChild(editBtn);
    td.appendChild(deleteBtn);
    tr.appendChild(td);

    editBtn.addEventListener('click', () => {
      document.forms[0].elements[0].value = tr.childNodes[1].innerText;
      document.forms[0].elements[3].value = tr.childNodes[3].innerText;
      document.forms[0].elements[4].value = tr.childNodes[4].innerText;
      document.forms[0].elements[5].value = tr.childNodes[5].innerText;
      document.forms[0].elements[6].value = tr.childNodes[6].innerText;


      document.forms[0].elements.submitData.style.display = 'none';

      document.forms[0].childNodes[13].childNodes[3].appendChild(updateBtn);
      document.forms[0].childNodes[13].childNodes[3].appendChild(cancelBtn);

      document.forms[0].scrollTop()


    });

    updateBtn.addEventListener('click', () => {
      if (getUserData().status) {
        const data = getUserData(parseInt(tr.childNodes[0].innerText)).userData;

        tr.childNodes[1].innerText = data.name;
        tr.childNodes[2].innerText = data.gender;
        tr.childNodes[3].innerText = data.dob;
        tr.childNodes[4].innerText = data.email;
        tr.childNodes[5].innerText = data.phone ? data.phone : '-';

        tr.childNodes[6].innerText = Array.from(document.forms[0].elements.hobbies)
          .filter((val) => val.checked)
          .map((val) => val.value)
          .join(', ');

        document.forms[0].childNodes[13].childNodes[3].removeChild(updateBtn);
        document.forms[0].childNodes[13].childNodes[3].removeChild(cancelBtn);
        document.forms[0].elements.submitData.style.display = 'block';
        updateDataInLocalStorage(data);
        document.forms[0].reset()
        setTimeout(() => {
          alert('Data updated successfully!!');
        }, 10);
      }
    });

    deleteBtn.addEventListener('click', () => {
      console.log(tr);
      document.body.lastChild.childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
      deleteDataFromLocalStorage(parseInt(tr.childNodes[0].innerText));
    });

    tbody.appendChild(tr);
    // console.log(tbody);
    table.appendChild(tbody);
  }


  document.forms[0].elements.submitData.addEventListener('click', () => {

    const { userData, status } = getUserData()

    const trsAdv = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes;

    const arr = ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'];


    if (status) {



      // console.log(userData);
      setDataIntoLocalStorage(userData);
      // console.log(valid);
      createNewRow(userData);
      checkData();


      for (let i = 0; i < arr.length; i++) {
        // console.log(trsAdv[i].childNodes[0]);
        const td = document.createElement('td');
        if (arr[i] === 'Actions') {
          const editBtn = document.createElement('button');
          editBtn.innerText = 'Edit';
          const deleteBtn = document.createElement('button');
          deleteBtn.innerText = 'Delete';
          td.appendChild(editBtn);
          td.appendChild(deleteBtn);

          editBtn.addEventListener('click', () => {
            // console.log(tbody);
            document.forms[0].elements[0].value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[1].childNodes[userData.userId].innerText;
            document.forms[0].elements.gender.value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[2].childNodes[userData.userId].innerText;
            document.forms[0].elements[3].value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[3].childNodes[userData.userId].innerText;
            document.forms[0].elements[4].value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[4].childNodes[userData.userId].innerText;
            document.forms[0].elements[5].value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[5].childNodes[userData.userId].innerText;
            document.forms[0].elements[6].value = document.body.lastChild.childNodes[2].childNodes[0].childNodes[0].childNodes[6].childNodes[userData.userId].innerText;
            document.forms[0].scrollIntoView();
          });

          deleteBtn.addEventListener('click', () => {
            console.log("delete from adv")
          });


        } else {
          // console.log(data[arr[i]]);

          td.innerText = userData[arr[i]] ? userData[arr[i]] : '-';
        }

        trsAdv[i].appendChild(td);
        // console.log(storedData[j]);
      }
      document.forms[0].reset();

    }
  });


}

// ################################## adv table ########################################

function loadAdvTable() {
  const body = document.body;
  const main_container = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.innerText = 'Advance Table';
  main_container.setAttribute('class', 'main-container');
  main_container.appendChild(h3);
  const navbar_container = document.createElement('div');
  navbar_container.setAttribute('id', 'navbar-container');
  const span = document.createElement('span');
  span.innerText = 'Display';
  // const deleteAllBtn = document.createElement('button')
  // const searchInput = document.createElement('input')
  // searchInput.placeholder = "search here..."
  // deleteAllBtn.style.backgroundColor = 'red'
  // deleteAllBtn.innerText = "delete all"
  navbar_container.appendChild(span);
  // // navbar_container.appendChild(searchInput)
  // // navbar_container.appendChild(deleteAllBtn)
  main_container.appendChild(navbar_container);
  const advTable = document.createElement('div');
  advTable.setAttribute('class', 'container advance-table container-basic-table');
  advTable.setAttribute('id', 'adv');
  main_container.appendChild(advTable);

  body.appendChild(main_container);

  createAdvTable();
}

loadAdvTable();

// ######################### advance table code starts here #####################################
function createAdvTable() {
  console.log("hello");
  const advContainer = document.getElementById('adv');
  const table = document.createElement('table');

  const tbody = document.createElement('tbody');

  const arr = ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'];



  const storedData = fetchDataFromLocalStorage().userData;

  for (let i = 0; i < arr.length; i++) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.innerText = arr[i];

    tr.appendChild(th);
    tbody.appendChild(tr);

    for (let j = 0; j < storedData?.length; j++) {
      const td = document.createElement('td');
      if (arr[i] === 'Actions') {
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        td.appendChild(editBtn);
        td.appendChild(deleteBtn);

        editBtn.addEventListener('click', () => {
          // console.log(tbody);
          document.forms[0].elements[0].value = tbody.childNodes[1].childNodes[j + 1].innerText;
          document.forms[0].elements.gender.value = tbody.childNodes[2].childNodes[j + 1].innerText;
          document.forms[0].elements[3].value = tbody.childNodes[3].childNodes[j + 1].innerText;
          document.forms[0].elements[4].value = tbody.childNodes[4].childNodes[j + 1].innerText;
          document.forms[0].elements[5].value = tbody.childNodes[5].childNodes[j + 1].innerText;
          document.forms[0].elements[6].value = tbody.childNodes[6].childNodes[j + 1].innerText;
          document.forms[0].scrollIntoView();
        });

        deleteBtn.addEventListener('click', () => {

          tbody.childNodes.forEach((val) => {
            // console.log(val.childNodes[j + 1].innerText);
            val.childNodes[j + 1].remove()
          })
          deleteDataFromLocalStorage(storedData[j].userId)

        })
      } else {
        td.innerText = storedData[j][arr[i]] ? storedData[j][arr[i]] : '-';
      }
      tr.appendChild(td);
      // console.log(storedData[j]);
    }
  }




  table.appendChild(tbody);
  advContainer.appendChild(table);

  //   // ######## submit data ############

  // tbody.appendChild(tr);

  // ########## Submit form data ####################
}

// ######################### advance table code ends here #####################################

