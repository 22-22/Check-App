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

const fetchTask = (title) => {
  const path = title === null ? '/tasks' : `/tasks/?title=${title}`;
  return axios.get(`http://localhost:3001${path}`)
    .then(resp => {
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}

const fetchTaskById = (id) => {
  const path = id === null ? '/tasks' : `/tasks/?id=${id}`;
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

const fetchReviewRequests = async () => {
  const path = '/reviewRequests';
  try {
    const resp = await axios.get(`${BASE_URL}${path}`);
    return resp.data;
  }
  catch (error) {
    console.log(error);
  }
}

const fetchReviewRequestsById = async (id) => {
  try {
    const resp = await axios.get(`${BASE_URL}/reviewRequests/?id=${id}`);
    return resp.data;
  }
  catch (error) {
    console.log(error);
  }
}

const fetchSortAndFilterTasks = async (status, sortBy, sortAs) => {
  const path = status === null ? '' : `/?status=${status}`;
  const pathSortBy = sortBy === null ? '' : `${status === null ? '?' : '&'}_sort=${sortBy}&_order=${sortAs}`;
  // console.log(`http://localhost:3001${path}${pathSortBy}`);
  try {
    const resp = await axios.get(`http://localhost:3001/tasks${path}${pathSortBy}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

const sendTask = (task) => {
    return axios.post(`${BASE_URL}/tasks`,task).then((res) => console.log(res.data))
};

const getTaskId = () => {
    return axios.get(`${BASE_URL}/tasks`).then(res => res.data.length)
}

const changeTask = (id,task) => {
    return axios.put(`${BASE_URL}/tasks/?id=${id}`,task).then(res => console.log(res))
};


const sendReviewRequest = (reviewRequest) => {
  return axios.post(`${BASE_URL}/reviewRequests`,reviewRequest).then((res) => console.log(res.data))
};

const fetchUserVerification = (gitHubId) => {
  return axios.get(`http://localhost:3001/users?id=${gitHubId}`)
    .then(resp => {
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
  axios.post(`${BASE_URL}/users`, startUserObj)
    .then((resp) => {
      localStorage.setItem("gitHubUser", gitHubId);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchTaskInfo = (title) => {
  return axios.get(`${BASE_URL}/tasks`)
    .then(resp =>  resp.data)
    .then(allTasks => allTasks.find(task => task.title === title))
    .catch(err => console.log(err))
}

const addNewScore = (score) => {
   axios.post(`${BASE_URL}/scores`, score)
    .catch(err => console.log(err))
};

export { fetchTaskInfo, addNewScore, getAllUsers, creatNewUser, authentification, getUsersByRole, fetchTasks, fetchScores, fetchReviewRequests, fetchReviewRequestsById, fetchSortAndFilterTasks, fetchUserVerification, sendTask,fetchTaskById,getTaskId,changeTask,sendReviewRequest ,fetchTask};
