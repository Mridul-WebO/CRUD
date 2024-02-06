export function setDataIntoLocalStorage(userData) {
  try {
    const dataToPush = JSON.parse(localStorage.getItem('userData')) ?? [];
    dataToPush.push(userData);
    // console.log(dataToPush);
    localStorage.setItem('userData', JSON.stringify(dataToPush));

    return true;
  } catch (error) {
    return error;
  }
}

export function fetchDataFromLocalStorage() {
  try {
    if (!localStorage.getItem('userData')) {
      const arr = [];
      localStorage.setItem('userData', JSON.stringify(arr));
    }

    const userData = JSON.parse(localStorage.getItem('userData')) ?? [];
    if (userData.length === 0) {
      throw { message: 'User data is empty', isEmpty: true };
    }
    return { userData, isEmpty: false };
  } catch (error) {
    return error;
  }
}

export function deleteDataFromLocalStorage(userId) {
  console.log(userId);
  // console.log(JSON.parse(localStorage.getItem('userData')));

  try {
    const newData = fetchDataFromLocalStorage().userData.filter((val) => val.userId !== userId);

    localStorage.setItem('userData', JSON.stringify(newData));
  } catch (error) {
    return error;
  }
}

export function updateDataInLocalStorage(updatedData) {
  try {
    const newData = fetchDataFromLocalStorage().userData;
    newData.splice(updatedData.userId - 1, 1, updatedData);
    console.log(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
  } catch (error) {
    return { message: 'record not updated successfully', err: error };
  }
}

export function clearLocalStorage() {
  try {
    localStorage.clear();
    localStorage.setItem('count', 0);
    return true;
  } catch (error) {
    return error;
  }
}

if (!localStorage.getItem('count') || fetchDataFromLocalStorage().isEmpty) {
  localStorage.setItem('count', 0);
}

export function counter() {
  var id = 'id' + Math.random().toString(16).slice(2);

  return id;
}
