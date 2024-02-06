// ########################## New Code ##############################
// import statments

import {
  setDataIntoLocalStorage,
  fetchDataFromLocalStorage,
  deleteDataFromLocalStorage,
  clearLocalStorage,
  updateDataInLocalStorage,
  counter,
} from '../storage.js';

document.forms[0].elements.dob.max = new Date().toISOString().split('T')[0]; // to prevent selection of future dates in datepicker

function getUserData(updateElmentId) {
  const name = document.forms[0].elements.name;
  const gender = document.forms[0].elements.gender;
  const dob = document.forms[0].elements.dob;
  const email = document.forms[0].elements.email;
  const phone = document.forms[0].elements.phone;
  const hobbies = Array.from(document.forms[0].elements.hobbies)
    .filter((val) => val.checked)
    .map((val) => val.value)
    .join(', ');

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

  if (phone.value === '') {
    phone.setCustomValidity('Phone number is required!!');
  } else if (!phone.value.match(/^\d{10}$/)) {
    phone.setCustomValidity('invalid phone number');
  } else {
    phone.setCustomValidity('');
  }

  // console.log(gender.value);

  if (name.validity.valid && dob.validity.valid && email.validity.valid && phone.validity.valid) {
    const userId = updateElmentId || counter();
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
document.forms[0].elements.phone.addEventListener('keyup', (e) => {
  console.log(e.target.value);
  if (e.target.value === '') {
    e.target.setCustomValidity('Phone number is required!!');
  } else if (!e.target.value.match(/^\d{10}$/)) {
    e.target.setCustomValidity('please enter a valid 10 digit phone number');
  } else {
    e.target.setCustomValidity('');
  }
});

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
    document.body.lastChild.style.display = 'block';
  } else {
    document.body.childNodes[13].style.display = 'none';
    document.body.lastChild.style.display = 'none';
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
      // console.log();
      const updateBtn = document.createElement('button');
      updateBtn.innerText = 'Update';
      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = 'cancel';

      storedData.forEach((val, index) => {
        const tr = document.createElement('tr');
        for (let x in val) {
          const td = document.createElement('td');
          if (x === 'userId') {
            td.innerText = index + 1;
          } else {
            td.innerText = val[x] ?? '-';
          }

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
          document.forms[0].scrollIntoView();
        });

        updateBtn.addEventListener('click', () => {
          const { userData, status } = getUserData(val.userId);
          if (status) {
            tr.childNodes[1].innerText = userData.name;
            tr.childNodes[2].innerText = userData.gender;
            tr.childNodes[3].innerText = userData.dob;
            tr.childNodes[4].innerText = userData.email;
            tr.childNodes[5].innerText = userData.phone ? userData.phone : '-';

            tr.childNodes[6].innerText = Array.from(document.forms[0].elements.hobbies)
              .filter((val) => val.checked)
              .map((val) => val.value)
              .join(', ');

            document.forms[0].childNodes[13].childNodes[3].removeChild(updateBtn);
            document.forms[0].childNodes[13].childNodes[3].removeChild(cancelBtn);
            document.forms[0].elements.submitData.style.display = 'block';
            updateDataInLocalStorage(userData);
            document.forms[0].reset();
            setTimeout(() => {
              alert('Data updated successfully!!');
            }, 10);
          }
        });

        deleteBtn.addEventListener('click', () => {
          // console.log(tr.childNodes[0].innerText);
          document.body.childNodes[13].childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
          // console.log(parseInt(tr.childNodes[0].innerText));
          deleteDataFromLocalStorage(val.userId);
        });
      });

      console.log('data hai');
    } else {
      console.log('empty data');
    }
  };

  function createNewRow(userInputData) {
    const data = userInputData;
    console.log('%%%', userInputData);

    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update';
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'cancel';

    const tr = document.createElement('tr');
    for (let x in data) {
      const td = document.createElement('td');
      if (x === 'userId') {
        console.log(fetchDataFromLocalStorage().userData.length);
        td.innerText = fetchDataFromLocalStorage().userData.length;
      } else {
        td.innerText = data[x] ?? '-';
      }
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

    editBtn.addEventListener('click', () => {
      document.forms[0].elements[0].value = tr.childNodes[1].innerText;
      document.forms[0].elements[3].value = tr.childNodes[3].innerText;
      document.forms[0].elements[4].value = tr.childNodes[4].innerText;
      document.forms[0].elements[5].value = tr.childNodes[5].innerText;
      document.forms[0].elements[6].value = tr.childNodes[6].innerText;

      document.forms[0].elements.submitData.style.display = 'none';

      document.forms[0].childNodes[13].childNodes[3].appendChild(updateBtn);
      document.forms[0].childNodes[13].childNodes[3].appendChild(cancelBtn);

      document.forms[0].scrollIntoView();
    });

    updateBtn.addEventListener('click', () => {
      const { userData, status } = getUserData(userInputData.userId);
      if (status) {
        // const data = getUserData(parseInt(tr.childNodes[0].innerText)).userData;

        tr.childNodes[1].innerText = userData.name;
        tr.childNodes[2].innerText = userData.gender;
        tr.childNodes[3].innerText = userData.dob;
        tr.childNodes[4].innerText = userData.email;
        tr.childNodes[5].innerText = userData.phone ? userData.phone : '-';

        tr.childNodes[6].innerText = Array.from(document.forms[0].elements.hobbies)
          .filter((val) => val.checked)
          .map((val) => val.value)
          .join(', ');

        document.forms[0].childNodes[13].childNodes[3].removeChild(updateBtn);
        document.forms[0].childNodes[13].childNodes[3].removeChild(cancelBtn);
        document.forms[0].elements.submitData.style.display = 'block';
        updateDataInLocalStorage(userData);
        document.forms[0].reset();
        setTimeout(() => {
          alert('Data updated successfully!!');
        }, 10);
      }
    });

    cancelBtn.addEventListener('click', () => {});

    deleteBtn.addEventListener('click', () => {
      // console.log(tr);
      document.body.childNodes[13].childNodes[2].childNodes[0].childNodes[1].removeChild(tr);
      deleteDataFromLocalStorage(data.userId);
    });

    tbody.appendChild(tr);
    // console.log(tbody);
    table.appendChild(tbody);
  }

  document.forms[0].elements.submitData.addEventListener('click', () => {
    const { userData, status } = getUserData();

    if (status) {
      // Basic table

      setDataIntoLocalStorage(userData);
      createNewRow(userData);
      checkData();
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
  checkData();
}

loadAdvTable();

// ######################### advance table code starts here #####################################
function createAdvTable() {
  // console.log('hello');

  const advContainer = document.getElementById('adv');
  const table = document.createElement('table');

  const tbody = document.createElement('tbody');

  const arr = ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'];

  const updateBtn = document.createElement('button');
  updateBtn.innerText = 'Update';
  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'cancel';

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
          document.forms[0].elements[0].value = tbody.childNodes[1].childNodes[j + 1].innerText;
          document.forms[0].elements.gender.value = tbody.childNodes[2].childNodes[j + 1].innerText;
          document.forms[0].elements[3].value = tbody.childNodes[3].childNodes[j + 1].innerText;
          document.forms[0].elements[4].value = tbody.childNodes[4].childNodes[j + 1].innerText;
          document.forms[0].elements[5].value =
            tbody.childNodes[5].childNodes[j + 1].innerText === '-'
              ? ''
              : tbody.childNodes[5].childNodes[j + 1].innerText;

          // hobbies
          // console.log(tbody.childNodes[6].childNodes[j + 1].innerText.split(','));

          tbody.childNodes[6].childNodes[j + 1].innerText !== '-' &&
            tbody.childNodes[6].childNodes[j + 1].innerText.split(',').forEach((val, index) => {
              // console.log(document.forms[0].elements.hobbies[val]);
              console.log(val);

              // if (document.forms[0].elements.hobbies[index].value === val.trim()) {
              //   console.log('andar', val.trim());
              //   document.forms[0].elements.hobbies[j + 1].checked = true;
              // }
            });

          document.forms[0].elements.submitData.style.display = 'none';
          document.forms[0].childNodes[13].childNodes[3].appendChild(updateBtn);
          document.forms[0].childNodes[13].childNodes[3].appendChild(cancelBtn);

          document.forms[0].scrollIntoView();

          updateBtn.addEventListener('click', () => {
            const { userData, status } = getUserData(j + 1);
            if (status) {
              console.log();
              tbody.childNodes[1].childNodes[j + 1].innerText = userData.name;
              tbody.childNodes[2].childNodes[j + 1].innerText = userData.gender;
              tbody.childNodes[3].childNodes[j + 1].innerText = userData.dob;
              tbody.childNodes[4].childNodes[j + 1].innerText = userData.email;
              tbody.childNodes[5].childNodes[j + 1].innerText = userData.phone ? userData.phone : '-';
              tbody.childNodes[6].childNodes[j + 1].innerText;
              tr.childNodes[6].childNodes[1].innerText = Array.from(document.forms[0].elements.hobbies)
                .filter((val) => val.checked)
                .map((val) => val.value)
                .join(', ');
              document.forms[0].childNodes[13].childNodes[3].removeChild(updateBtn);
              document.forms[0].childNodes[13].childNodes[3].removeChild(cancelBtn);
              document.forms[0].elements.submitData.style.display = 'block';
              updateDataInLocalStorage(userData);
              document.forms[0].reset();
              setTimeout(() => {
                alert('Data updated successfully!!');
              }, 10);
            }
          });
        });

        cancelBtn.addEventListener('click', () => {});

        deleteBtn.addEventListener('click', () => {
          tbody.childNodes.forEach((val) => {
            // console.log(val.childNodes[j + 1].innerText);
            val.childNodes[j + 1].remove();
          });
          deleteDataFromLocalStorage(storedData[j].userId);
        });
      } else {
        if (arr[i] === 'userId') {
          td.innerText = j + 1;
        } else {
          td.innerText = storedData[j][arr[i]] ? storedData[j][arr[i]] : '-';
        }
      }
      tr.appendChild(td);
      // console.log(storedData[j]);
    }
  }

  document.forms[0].elements.submitData.addEventListener('click', () => {});

  table.appendChild(tbody);
  advContainer.appendChild(table);

  //   // ######## submit data ############

  // tbody.appendChild(tr);

  // ########## Submit form data ####################
}

// ######################### advance table code ends here #####################################
