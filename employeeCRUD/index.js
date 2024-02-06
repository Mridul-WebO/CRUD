function createTable(data) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const th = document.createElement('th');

  const heading = ['name', 'age', 'gender'];

  const dummyData = [{ name: 'shiv', age: '23', gender: 'male' }];

  for (let i = 0; i < dummydata.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < heading.length; j++) {
      const td = document.createElement('td');
      td.innerText = dummyData[heading[j]];
      tr.appendChild(td);
    }
  }
}
