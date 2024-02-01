// Regrex expressions

const regrexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,5})$/;
// const regrexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const dummyData = localStorage.getItem('dummyData') ? JSON.parse(localStorage.getItem('dummyData')) : [];
let tbody = document.querySelector('tbody');

let submitDataBtn = document.getElementById('submitData');

let setData = localStorage.getItem('dummyData') ? JSON.parse(localStorage.getItem('dummyData')) : [];
console.log(setData);

let name = document.getElementById('name');
let dob = document.getElementById('dob');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let gender = document.querySelector('input[name="gender"]:checked');

//################## Advance table JS ##############################

const insertDataToAdvTable = () => {
  const advTableContent = document.querySelector('#adv tbody');
  advTableContent.innerHTML = `

  <tr>
  <th>Name</th>
</tr>
<tr>
<th>Gender</th>
</tr>
<tr>
<th>DOB</th>
</tr>
<tr>
<th>Email</th>
</tr>
<tr>
<th>Phone</th>
</tr>
<tr>
<th>Hobbies</th>
</tr>
<tr>
<th>Actions</th>
<!-- <td>
  <button onclick="">Edit</button>
  <button class="btn">Delete</button>
</td> -->
</tr>


  `;
  const trs = document.querySelectorAll('#adv tr');

  setData?.forEach((item, index) => {
    let val = Object.values(item);

    for (let i = 0; i < 7; i++) {
      let td = document.createElement('td');
      td.classList.add(index);

      td.innerText = val[i] || 'empty';
      if (i == 6) {
        td.innerHTML = `  <button onclick="editEntries(${index})">Edit</button>
        <button class="btn" onclick="deleteData(${index})">Delete</button>`;
      }

      trs[i].appendChild(td);
    }
  });
};
insertDataToAdvTable();

//###################### Create entries ######################################################
let hobbies = [];

const errorHandling = (fieldName) => {
  let flag = []; //will contain all validation boolean values

  // name, gender, dob, email

  let nameFieldLabel = document.querySelector("[class='error-name']");
  let dobFieldLabel = document.querySelector("[class='error-dob']");
  let emailFieldLabel = document.querySelector("[class='error-email']");

  switch (fieldName) {
    case 'name':
      if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
        nameFieldLabel.innerText =
          'Name field should be between 4 to 20 characters, including only alphanumeric characters';
        nameFieldLabel.focus();

        flag.splice(0, 0, false);
      } else {
        nameFieldLabel.innerText = '';
        flag.splice(0, 0, true);
      }

      break;

    case 'date':
      if (!dob.value && fieldName === 'date') {
        console.log('hello');

        dobFieldLabel.innerText = 'Date of birth is required';
        dobFieldLabel.focus();

        flag.splice(1, 0, false);
      } else {
        dobFieldLabel.innerText = '';
        flag.splice(1, 0, true);
      }

      break;

    case 'email':
      if (!email.value.match(regrexEmail) && fieldName === 'email') {
        emailFieldLabel.innerText = 'Invalid Email';
        emailFieldLabel.focus();

        flag.splice(2, 0, false);
      } else {
        emailFieldLabel.innerText = '';
        flag.splice(2, 0, true);
      }

      break;

    default:
      if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
        nameFieldLabel.innerText =
          'Name field should be between 4 to 20 characters, including only alphanumeric characters';
        nameFieldLabel.focus();

        flag.splice(0, 0, false);
      } else {
        nameFieldLabel.innerText = '';
        flag.splice(0, 0, true);
      }
      if (!dob.value) {
        dobFieldLabel.innerText = 'Date of birth is required';
        dobFieldLabel.focus();

        flag.splice(1, 0, false);
      } else {
        dobFieldLabel.innerText = '';
        flag.splice(1, 0, true);
      }
      if (!email.value.match(regrexEmail)) {
        emailFieldLabel.innerText = 'Invalid Email';
        emailFieldLabel.focus();

        flag.splice(2, 0, false);
      } else {
        emailFieldLabel.innerText = '';
        flag.splice(2, 0, true);
      }
      return flag;
  }
};

const createData = () => {
  const pushData = errorHandling().every((item) => item === true);
  hobbies = [];

  gender = document.querySelector('input[name="gender"]:checked');

  let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');

  for (let x of getHobbies) {
    hobbies.push(x.value);
  }

  // if (name.value !== '' && gender.value !== '' && dob.value !== '' && email.value.match(regrexEmail)) {
  if (pushData) {
    setData.push({
      name: name.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      phone: phone.value || 'null',
      hobbies: !hobbies.length == 0 ? hobbies : 'null',
    });
    localStorage.setItem('dummyData', JSON.stringify(setData));
    checkData();

    // resetting the  form entries
    name.value = null;
    dob.value = null;
    email.value = null;
    document.querySelector("[value='Male']").checked = true;
    phone.value = null;

    hobbies?.forEach((val) => {
      document.getElementById(`${val}`).checked = false;
    });

    insertDataToAdvTable();
    alert('Data submitted successfully!!');
    window.scrollTo(0, document.body.scrollHeight);
  }
};

const deleteAllBtn = document.querySelector("[value='Delete all']");

const checkData = () => {
  setData = localStorage.getItem('dummyData') ? JSON.parse(localStorage.getItem('dummyData')) : [];

  if (setData !== null && setData?.length !== 0) {
    deleteAllBtn.style.display = 'block';
  } else {
    deleteAllBtn.style.display = 'none';
  }

  let previousData = '';

  setData?.forEach((val, index) => {
    previousData += `<tr id=${index}  >
        <td>${val.name}</td>
        <td>${val.gender}</td>
        <td>${val.dob}</td>
        <td>${val.email}</td>
        <td>${val.phone}</td>
        <td>${val.hobbies}</td>
        <td>
          <button onclick="editEntries(${index})">Edit</button>
          <button onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tbody.innerHTML = previousData;
};

checkData();

//###################### Delete entries ######################################################

const deleteData = (rowCount) => {
  let permissionToDeleteEntry = confirm('Are you Sure??');
  if (permissionToDeleteEntry) {
    const updatedData = setData.filter((item, index) => {
      return index !== rowCount;
    });

    let row = document.getElementById(rowCount);
    row.remove();

    localStorage.setItem('dummyData', JSON.stringify(updatedData));
    checkData();
    insertDataToAdvTable();
  }
};

//###################### Edit entries ######################################################

const editEntries = (rowCount) => {
  document.getElementById('jumpToThis').scrollIntoView();

  setData = JSON.parse(localStorage.getItem('dummyData'));
  let dataToEdit = setData[rowCount];

  name.value = dataToEdit?.name;
  document.querySelector(`[value="${dataToEdit.gender}"]`).checked = 'true';
  dob.value = dataToEdit?.dob;
  email.value = dataToEdit?.email;
  phone.value = dataToEdit?.phone;

  dataToEdit.hobbies !== 'null' &&
    dataToEdit?.hobbies?.forEach((val) => {
      document.getElementById(`${val}`).checked = true;
    });

  // changing the submit button to update
  errorHandling();
  document.getElementById('submitData').style.display = 'none';

  let updateDataBtn = document.getElementById('updateDataBtn');
  console.log(updateDataBtn);
  updateDataBtn.style.display = 'block';
  updateDataBtn.value = rowCount;
};

updateDataBtn.addEventListener('click', (val) => {
  let updateDataBtn = document.getElementById('updateDataBtn');
  let rowCount = updateDataBtn.value;

  if (name.value !== '' && gender.value !== '' && dob.value !== '' && email.value.match(regrexEmail)) {
    gender = document.querySelector('input[name="gender"]:checked');

    hobbies = [];

    let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let x of getHobbies) {
      hobbies.push(x.value);
    }

    let newData = {
      name: name.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      phone: phone.value || 'null',
      hobbies: !hobbies.length == 0 ? hobbies : 'null',
    };

    const previousData = JSON.parse(localStorage.getItem('dummyData'));
    console.log(previousData);
    previousData.splice(rowCount, 1, newData);
    localStorage.setItem('dummyData', JSON.stringify(previousData));
    checkData();
    insertDataToAdvTable();

    name.value = null;
    dob.value = null;
    email.value = null;
    phone.value = null;
    previousData[rowCount].hobbies !== 'null' &&
      previousData[rowCount].hobbies.forEach((val) => {
        document.getElementById(`${val}`).checked = false;
      });

    document.querySelector("[onclick='createData()']").style.display = 'block';
    let updateDataBtn = document.getElementById('updateDataBtn');
    updateDataBtn.style.display = 'none';

    alert('Your data has been updated successfully!!');
    window.scrollTo(0, document.body.scrollHeight);
  }
});

//###################### Search entries ######################################################

const searchEntries = (e) => {
  let filterData = setData?.filter((item) => {
    return item?.name.toLowerCase().includes(e);
  });

  let previousData = '';
  filterData?.forEach((val, index) => {
    previousData += `<tr id=${index}  >
        <td>${val.name}</td>
        <td>${val.gender}</td>
        <td>${val.dob}</td>
        <td>${val.email}</td>
        <td>${val.phone}</td>
        <td>${val.hobbies}</td>

        <td>
          <button onclick="editEntries(${index})">edit</button>
          <button onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tbody.innerHTML = previousData;
};

const sortEntriesAccToDob = () => {
  const sortBox = document.querySelector("[name='sortEntries']");
  let sortedData;

  if (sortBox.checked) {
    sortedData = setData?.toSorted((firstDate, secondDate) => {
      return new Date(firstDate.dob) - new Date(secondDate.dob);
    });
  } else {
    sortedData = setData;
  }

  let previousData = '';
  sortedData?.forEach((val, index) => {
    previousData += `<tr id=${index}  >
        <td>${val.name}</td>
        <td>${val.gender}</td>
        <td>${val.dob}</td>
        <td>${val.email}</td>
        <td>${val.phone}</td>
        <td>${val.hobbies}</td>

        <td>
          <button onclick="editEntries(${index})">Edit</button>
          <button onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tbody.innerHTML = previousData;
};

const deleteAll = () => {
  console.log(setData);
  const permsisson = confirm('Are you sure');

  if (permsisson) {
    alert('pakku ne bhai??');
    alert('Haji ek var pachu vichari Leje pachi ni keto');
    alert('chheli var puchu chu bhai vichari lai');

    localStorage.clear();
    setData = [];
    console.log(setData);

    checkData();
    insertDataToAdvTable();
  }
};
