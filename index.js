const regrexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regrexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const dummyData = localStorage.getItem('dummyData') ? JSON.parse(localStorage.getItem('dummyData')) : [];
let tbody = document.querySelector('tbody');

let setData = localStorage.getItem('dummyData') ? JSON.parse(localStorage.getItem('dummyData')) : [];
// console.log(setData);
let name = document.getElementById('name');
let dob = document.getElementById('dob');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let gender = document.querySelector('input[name="gender"]:checked');


let hobbies = [];

//###################### Create entries ######################################################

const createData = () => {
  // console.log('gender', gender);
  hobbies = [];

  // gender = document.querySelector('input[name="gender"]:checked');

  // console.log(gender.value);
  let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');
  // console.log(getHobbies);
  for (let x of getHobbies) {
    hobbies.push(x.value);
    // console.log(x);
  }

  if (name.value !== '' && gender.value !== '' && dob.value !== '' && email.value.match(regrexEmail)) {
    dummyData.push({
      name: name.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      phone: phone.value || null,
      hobbies: hobbies || null,
    });
    localStorage.setItem('dummyData', JSON.stringify(dummyData));
    checkData();

    // resetting the  form entries
    name.value = null;
    dob.value = null;
    email.value = null;
    phone.value = null;
    hobbies.forEach((val, index) => {
      document.getElementById(`${val}`).checked = false;
    });
    // hobbies = ""
    insertDataToAdvTable()
  }
};

const checkData = () => {
  setData = JSON.parse(localStorage.getItem('dummyData'));

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
          <button onclick="editEntries(${index})">edit</button>
          <button onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tbody.innerHTML = previousData;
};

checkData();

//###################### Delete entries ######################################################

const deleteData = (rowCount) => {
  // console.log("setData", setData);
  console.log('rowCount', rowCount);

  let permissionToDeleteEntry = confirm('Are you Sure??');
  if (permissionToDeleteEntry) {
    const updatedData = setData.filter((item, index) => {
      // console.log(index);
      return index !== rowCount;
    });
    console.log(updatedData);
    let row = document.getElementById(rowCount);
    row.remove();

    localStorage.setItem('dummyData', JSON.stringify(updatedData));
    checkData();
    insertDataToAdvTable()
  }
};

//###################### Edit entries ######################################################

const editEntries = (rowCount) => {
  document.getElementById('jumpToThis').scrollIntoView();
  console.log(rowCount);

  setData = JSON.parse(localStorage.getItem('dummyData'));
  let dataToEdit = setData[rowCount];
  console.log('datatoedit', dataToEdit);

  // console.log(dataToEdit.gender);

  name.value = dataToEdit?.name;
  document.querySelector(`[value="${dataToEdit.gender}"]`).checked = 'true';
  dob.value = dataToEdit?.dob;
  email.value = dataToEdit?.email;
  phone.value = dataToEdit?.phone;

  dataToEdit?.hobbies?.forEach((val) => {
    document.getElementById(`${val}`).checked = true;
  });

  // changing the submit button to update
  document.querySelector("[onclick='createData()']").style.display = 'none';
  let updateDataBtn = document.getElementById('updateDataBtn');
  updateDataBtn.style.display = 'block';
  updateDataBtn.value = rowCount;
};

updateDataBtn.addEventListener('click', (val) => {
  let updateDataBtn = document.getElementById('updateDataBtn');
  let rowCount = updateDataBtn.value;

  if (name.value !== '' && gender.value !== '' && dob.value !== '' && email.value.match(regrex)) {
    gender = document.querySelector('input[name="gender"]:checked');
    // console.log(rowNumber);
    // console.log(gender.value);

    hobbies = [];

    // console.log(gender.value);
    let getHobbies = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let x of getHobbies) {
      hobbies.push(x.value);
    }

    let newData = {
      name: name.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      phone: phone.value || null,
      hobbies: hobbies || null,
    };

    console.log(newData);

    const previousData = JSON.parse(localStorage.getItem('dummyData'));
    previousData.splice(rowCount, 1, newData);
    localStorage.setItem('dummyData', JSON.stringify(previousData));
    checkData();
    insertDataToAdvTable()

    console.log(previousData);

    name.value = null;
    dob.value = null;
    email.value = null;
    phone.value = null;
    previousData[rowCount].hobbies.forEach((val, index) => {
      document.getElementById(`${val}`).checked = false;
    });

    document.querySelector("[onclick='createData()']").style.display = 'block';
    let updateDataBtn = document.getElementById('updateDataBtn');
    updateDataBtn.style.display = 'none';

    alert('Your data has been updated successfully!!');
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

//################## Advance table JS ##############################

const insertDataToAdvTable = () => {
  const advTableContent = document.querySelector("#adv tbody")
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
  <button onclick="">edit</button>
  <button class="btn">Delete</button>
</td> -->
</tr>
  
  
  `
  const trs = document.querySelectorAll('#adv tr');
  // setData = JSON.parse(localStorage.getItem("dummyData"));
  // console.log("setData", setData);

  setData?.forEach((item, index) => {



    let val = Object.values(item);

    for (let i = 0; i < 7; i++) {
      // if (trs[i])sss

      // console.log(val);
      let td = document.createElement('td');
      td.classList.add(index)

      td.innerText = val[i] || "empty";
      if (i == 6) {
        td.innerHTML = `  <button onclick="editEntries(${index})">edit</button>
        <button class="btn" onclick="deleteData(${index})">Delete</button>`

      }

      trs[i].appendChild(td);


    }
  });





};
insertDataToAdvTable()


const sortEntriesAccToDob = () => {

  const sortBox = document.querySelector("[name='sortEntries']")

  if (sortBox.checked) {
    const sortedData = setData?.sort((firstDate, secondDate) => {
      return new Date(firstDate.dob) - new Date(secondDate.dob)



    })




    // let filterData = setData?.filter((item) => {
    //   return item?.name.toLowerCase().includes(e);
    // });
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
          <button onclick="editEntries(${index})">edit</button>
          <button onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>`;
    });

    tbody.innerHTML = previousData;

  }




}

