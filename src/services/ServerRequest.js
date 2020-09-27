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

const fetchTask = (title) => {
  const path = title === null ? '/tasks' : `/tasks/?title=${title}`;
  return axios.get(`${BASE_URL}${path}`)
    .then(resp => {
      return resp.data;
    }).catch(error => {
      console.log(error);
    });
}

const fetchTaskById = (id) => {
  const path = id === null ? '/tasks' : `/tasks/?id=${id}`;
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

const fetchAllScores = () => {
  return axios.get(`${BASE_URL}/scores`)
    .then(resp => resp.data)
    .catch(error => console.log(error));
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

const fetchAllTasks = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/tasks`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

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
  return axios.get(`${BASE_URL}/users?id=${gitHubId}`)
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
  return axios.post(`${BASE_URL}/scores`, score)
    .catch(err => console.log(err))
};

const changeTaskStatus = (status, id) => {
  axios.patch(`${BASE_URL}/tasks/${id}`, {status: status})
    .catch((error) => console.log(error));
};

const updateScore = (id, task, change) => {
  return axios.put(`${BASE_URL}/scores/${id}`, { ...task, ...change })
    .then((res) => console.log(res.data))
    .catch(err => console.log(err))
}

const updateReviewRequest = (id, task, change) => {
  return axios.put(`${BASE_URL}/reviewRequests/${id}`, { ...task, ...change })
    .then((res) => console.log(res.data))
    .catch(err => console.log(err))
}

export {
  fetchTaskInfo, 
  addNewScore,
  getAllUsers,
  creatNewUser,
  authentification,
  getUsersByRole,
  fetchTasks,
  fetchScores,
  fetchAllScores,
  fetchReviewRequests,
  fetchReviewRequestsById,
  fetchAllTasks,
  fetchUserVerification,
  sendTask,
  fetchTaskById,
  getTaskId,
  changeTask,
  sendReviewRequest,
  fetchTask,
  changeTaskStatus,
  updateScore,
  updateReviewRequest
};
