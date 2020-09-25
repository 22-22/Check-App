import axios from "axios";

const BASE_URL = "https://ilya-ilay-cool-project.herokuapp.com";

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

// НАДО ПЕРЕБРАТЬ ВСЕ ЗАПРОСЫ И ПЕРЕПИСАТЬ АДЕКВАТНО

const authentification = (gitHubId) => {
  return axios.get(`${BASE_URL}/users?q=${gitHubId}`)
    .then(resp => {
        console.log(resp.data)
        return resp.data[0];
    }).catch(error => {
        console.log(error);
    });
}

const fetchTasks = (status) => {
  const path = status === null ? '/tasks' : `/tasks/?status=${status}`;
  return axios.get(`${BASE_URL}${path}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}
const fetchScores = (task) => {
  const path = task === null ? '/scores' : `/scores/?task=${task}`;
  return axios.get(`${BASE_URL}${path}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}


const fetchSortAndFilterTasks = (status, sortBy, sortAs) => {
  const path = status === null ? '' : `/?status=${status}`;
  const pathSortBy = sortBy === null ? '' : `${status === null ? '?' : '&'}_sort=${sortBy}&_order=${sortAs}`;
  console.log(`${BASE_URL}${path}${pathSortBy}`);
  return axios.get(`${BASE_URL}/tasks${path}${pathSortBy}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
};

const sendTask = (task) => {
    return axios.post(`${BASE_URL}/tasks`,task).then((res) => console.log(res.data))
};

const fetchUserVerification = (gitHubId) => {
  return axios.get(`${BASE_URL}/users?id=${gitHubId}`)
    .then(resp => {
      console.log(resp.data)
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}

const creatNewUser = (gitHubId, role) => {
  const startUserObj = {
    "id": gitHubId,
    "role": role,
    "courses": {
      "active": [],
      "completed": []
    },
    "tasks": []
  };
  return axios.post(`${BASE_URL}/users`, startUserObj)
    .then((resp) => {
      localStorage.setItem("gitHubUser", gitHubId);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAllUsers, creatNewUser, authentification, getUsersByRole, fetchTasks, fetchScores, fetchSortAndFilterTasks, fetchUserVerification, sendTask };
