export function setData(userData) {
  localStorage.setItem('employeeData', JSON.stringify(userData));

  return true;
}

export function getData(id) {
  return JSON.parse(localStorage.getItem('employeeData')) ?? [];
}

export function deleteData(id) {
  const prevData = [
    { userId: 'a12sed', name: 'shiv', age: '10' },
    { userId: 'a12sew', name: 'shiv', age: '10' },
  ];

  const newData = prevData.filter((val) => {
    return val.userId !== 'a12sed';
  });

  return newData;
}

export function updateData() {}
