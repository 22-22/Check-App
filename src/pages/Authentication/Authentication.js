import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Radio } from "antd";
import { Form, Input, Button } from "antd";
import { Typography } from "antd";

import {
  fetchUserVerification,
  creatNewUser,
} from "../../services/ServerRequest";

import checkAuth from "../../utils/checkAuth";
function Authentication({ history }) {
  const { Title } = Typography;

  const dispatch = useDispatch();
  const [gitHubId, setGitHubId] = React.useState("");
  const [roleUser, setRoleUser] = React.useState("student");
  const [visibleModal, setVisibleModal] = React.useState(false);

  const { authentication } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    checkAuth(history, authentication, dispatch, "/home");
  }, [authentication]);

  const changeInput = (event) => {
    setGitHubId(event.target.value);
  };
  const authUser = () => {
    localStorage.setItem("gitHubUser", gitHubId);
    checkAuth(history, authentication, dispatch, "/home");
  };
  const createNewUser = () => {
    creatNewUser(gitHubId, roleUser).then(ok => checkAuth(history, authentication, dispatch, "/home"))
  };
  const cancelModal = () => {
    setVisibleModal(!visibleModal);
    setGitHubId("");
  };

  const submitForm = () => {
    fetchUserVerification(gitHubId).then((res) =>
      res.length ? authUser() : setVisibleModal(!visibleModal)
    );
  };
  
  return (
    !authentication && (
      <div className="authentication">
        <div className="wrapper authentication__wrapper">
          <Title> X Check App / RS Assessment Tool</Title>
          <Title level={4}>Группа 21</Title>

          <div className="authentication__form">
            <Form
              name="basic"
              onFinish={submitForm}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожайлуcта, введите свой gitHub!",
                  },
                ]}
              >
                <Input
                  placeholder="Ваш GitHub"
                  value={gitHubId}
                  onChange={changeInput}
                />
              </Form.Item>
              <br />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Авторизироваться
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Modal
            title={`Данный пользователь(${gitHubId}) не зарегистрирован`}
            visible={visibleModal}
            onOk={createNewUser}
            onCancel={cancelModal}
          >
            <p>Выберите статус(роль) аккаунта и зарегистрируйтесь</p>
            <Radio.Group
              onChange={(event) => setRoleUser(event.target.value)}
              value={roleUser}
            >
              <Radio value="admin">Admin</Radio>
              <Radio value="student">Student</Radio>
            </Radio.Group>
          </Modal>
      </div>
      </div>
    )
  );
}

export default Authentication;
