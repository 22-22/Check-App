import axios from "axios";

const BASE_URL = "http://localhost:3001";

const getAllUsers = () => {
  axios.get(`${BASE_URL}/users`).then(({ data }) => {
    console.log(data);
  });
};

const getUsersByRole = ( role ) => {
  return axios.get(`${BASE_URL}/users/?role=${role}`).then(({ data }) => {
    return data;
  });
};

const creatNewUser = (obj) => {
  axios.post(`${BASE_URL}/users`, obj)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// НАДО ПЕРЕБРАТЬ ВСЕ ЗАПРОСЫ И ПЕРЕПИСАТЬ АДЕКВАТНО

const authentification = (gitHubId) => {
  return axios.get(`http://localhost:3001/users?q=${gitHubId}`)
    .then(resp => {
        console.log(resp.data)
        return resp.data[0];
    }).catch(error => {
        console.log(error);
    });
}

const fetchTasks = (status) => {
  const path = status === null ? '/tasks' : `/tasks/?status=${status}`;
  return axios.get(`http://localhost:3001${path}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}
const fetchScores = (task) => {
  const path = task === null ? '/scores' : `/scores/?task=${task}`;
  return axios.get(`http://localhost:3001${path}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}


const fetchSortAndFilterTasks = (status, sortBy, sortAs) => {
  const path = status === null ? '' : `/?status=${status}`;
  const pathSortBy = sortBy === null ? '' : `${status === null ? '?' : '&'}_sort=${sortBy}&_order=${sortAs}`;
  console.log(`http://localhost:3001${path}${pathSortBy}`);
  return axios.get(`http://localhost:3001/tasks${path}${pathSortBy}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
};

const sendTask = (task) => {
    return axios.post(`${BASE_URL}/tasks`,task).then((res) => console.log(res.data))
};



export { getAllUsers, creatNewUser, authentification, getUsersByRole, fetchTasks, fetchScores, fetchSortAndFilterTasks,sendTask};
