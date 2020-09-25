import React from "react";


const CLIENT_ID = 'f7926aa925a8fc8061df';
const CLIENT_SECRET = '8c9eb89db34609e00f8220c2aeb8fd9b750eee30';
const CALLBACK_URL = 'http://localhost:3000/callback';

const URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

function Callback({ history }) {

  return (
    <div className="git-hub-auth">
      <div className="git-hub-auth__wrapper">
        asdasdas
        {console.log(history.location.search)}
      </div>
    </div>
  );
}

export default Callback;