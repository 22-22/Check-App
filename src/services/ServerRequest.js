import axios from "axios";

const BASE_URL = "http://localhost:3001";

const getAllUsers = () => {
  axios.get(`${BASE_URL}/users`).then(({ data }) => {
    console.log(data);
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

const authentification = (gitHubId) => {
  return axios.get(`http://localhost:3001/users?q=${gitHubId}`)
    .then(resp => {
        console.log(resp.data)
        return resp.data;
    }).catch(error => {
        console.log(error);
    });
}

export { getAllUsers, creatNewUser, authentification};
