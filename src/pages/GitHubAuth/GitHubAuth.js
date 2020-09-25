import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


import checkAuth from "../../utils/checkAuth";

const CLIENT_ID = 'f7926aa925a8fc8061df';
const CLIENT_SECRET = '8c9eb89db34609e00f8220c2aeb8fd9b750eee30';
const CALLBACK_URL = 'http://localhost:3000/';

const URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

function GitHubAuth({ history }) {
  
  function getToken(code){
    const obj = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code
    }
    console.log(obj);
    axios.get(`https://github.com/login/oauth/access_token?client_id=f7926aa925a8fc8061df&client_secret=8c9eb89db34609e00f8220c2aeb8fd9b750eee30&code=45716adf5361be4121c0`)
    .then((res)=> console.log(res))
  }

  function checkCodeGitHub (history){
    const [basicUrl, code] = history.location.search.split('code=');
    if(code) getToken(code);
  }

  React.useEffect(()=>{
    checkCodeGitHub(history);
  })
 

  return (
    <div className="git-hub-auth">
      <div className="git-hub-auth__wrapper">
        {history.location.search}
        <a href ={URL}>переход  на ПШЕ</a>
      </div>
    </div>
  );
}

export default GitHubAuth;
