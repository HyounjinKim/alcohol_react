import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../styles/CommonCss";
import { LoginBt, LoginTitle, LoginWrap } from "../../styles/login/loginCss";
import axios from "axios";
import { SERVER_URL } from "../../api/config";
import Swal from "sweetalert2";
import SignFindIdPwModalPage from "./SignFindIdPwModalPage";

const SignFindIdPwPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirth] = useState("");
  const [tempPw, setTempPw] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);


  const findEmail = () => {
    if (!birthdate.target) {
      Swal.fire({
        title: "<p style='font-size:4rem;margin:1rem;'>생년월일을 입력하세요</p>",
        icon: "info",
        width: 600,
        confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
        confirmButtonColor: `${Common.color.f900}`,
      })

    } else if (!phone.target) {
      Swal.fire({
        title: "<p style='font-size:4rem;margin:1rem;'>폰번호를 입력하세요</p>",
        icon: "info",
        width: 600,
        confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
        confirmButtonColor: `${Common.color.f900}`,
      })
    } else {
      axios.post(`${SERVER_URL}/login/findEmail`, {
        birthdate: birthdate.target.value,
        phone: phone.target.value,
      }).then((response) => {
        console.log(response.data);
        Swal.fire({
          title:
            `<p style='font-size:4rem;margin:1rem;'>EMAIL\n\n ${response.data}\n\n</p>`,
          icon: "info",
          width: 600,
          confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
          confirmButtonColor: `${Common.color.f900}`,
        })
      }).catch((error) => {
        console.log(error.response);
        Swal.fire({
          title:
            `<p style='font-size:4rem;margin:1rem;'>EMAIL\n\n ${error.response.data}\n\n</p>`,
          icon: "info",
          width: 600,
          confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
          confirmButtonColor: `${Common.color.f900}`,
        })
      });
    }
  };

  const emailauth = async () => {
    await axios.post(`${SERVER_URL}/login/tempPw?email=${email}`, {
    }).then(res => {
      if (JSON.stringify(res.status).startsWith('2')) {
        Swal.fire('인증번호가 발송됐습니다.');
      }
    }).catch(e => {
      console.log(e)
    })
  }

  const changePasswordApi = (password,passwordCheck)=>{
    console.log(password,passwordCheck)
    axios.post(`${SERVER_URL}/login/changePw`, {
      email,
      tempPw: tempPw.target.value,
      newPassword:password.target.value,
      passwordch:passwordCheck.target.value
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  const modalShow = () => {
    if (email || tempPw)
      axios.post(`${SERVER_URL}/login/validateTemp`, {
        email,
        tempPw: tempPw.target.value,
      }).then((response) => {
        if(JSON.stringify(response.status).startsWith('2'))
        setIsModalVisible(true);
      }).catch((error) => {
        console.log(error.response);
        Swal.fire({
          title:
            `<p style='font-size:4rem;margin:1rem;'>인증이 실패되었습니다. 이메일을 확인하세요.\n\n</p>`,
          icon: "info",
          width: 600,
          confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
          confirmButtonColor: `${Common.color.f900}`,
        })
      });
    else{
      Swal.fire({
        title:
          `<p style='font-size:4rem;margin:1rem;'>이메일과 인증번호를 입력하세요.\n\n</p>`,
        icon: "info",
        width: 600,
        confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
        confirmButtonColor: `${Common.color.f900}`,
      })
    }
  };

  return (
    <div>
      <SignFindIdPwModalPage 
          setIsModalVisible={setIsModalVisible} 
          isModalVisible={isModalVisible}
          changePasswordApi={changePasswordApi} />
      <LoginWrap>
        <LoginTitle>
          <p className="logo">ALCHOHOL HOLIC</p>
          <div className="email-line">
            <div className="line"></div>
            <p>이메일 찾기</p>
            <div className="line"></div>
          </div>
        </LoginTitle>
        <Form
          name="normal_login"
          className="login-form"
        >
          <Form.Item
            name="birthdate"
            rules={[
              {
                required: true,
                message: "생년월일을 입력해 주세요!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="생년월일"
              name="birthdate"
              onChange={setBirth}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "20px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "핸드폰번호를 입력해주세요",
              },
            ]}
          >
            <Input.Password
              style={{
                width: "100%",
                height: "60px",
                fontSize: "20px",
              }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="핸드폰번호"
              name="phone"
              onChange={setPhone}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "60px",
                background: `${Common.color.f900}`,
                fontSize: "20px",
              }}
              onClick={findEmail}
            >
              이메일 찾기
            </Button>
          </Form.Item>
        </Form>
        <LoginTitle>
          <div className="login-line">
            <div className="line"></div>
            <p>비밀번호찾기</p>
            <div className="line"></div>
          </div>
        </LoginTitle>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "올바른 이메일 형식을 입력하세요.",
            },
            {
              required: true,
              message: "이메일을 입력하세요.",
            },
            // {
            //   pattern:
            //     /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
            //   message: "이메일 형식에 맞게 작성해주세요",
            // },
            {
              whitespace: true,
              message: "이메일은 공백만으로 만들 수 없습니다",
            },
          ]}
        >
          <Input
            placeholder="이메일(대소문자를 확인해 주세요)"
            style={{ width: "78%", height: 60, fontSize: "20px" }}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="button"
            style={{
              width: "20%",
              height: "60px",
              backgroundColor: `${Common.color.p900}`,
              border: "none",
              marginLeft: "8px",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onClick={emailauth}
          >
            인증하기
          </Button>
        </Form.Item>
        <Form.Item
          name="tempPw"
          rules={[
            {
              required: true,
              message: "인증번호를 입력해주세요",
            },
          ]}
        >
          <Input.Password
            style={{
              width: "100%",
              height: "60px",
              fontSize: "20px",
            }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="인증번호"
            name="tempPw"
            onChange={setTempPw}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            height: "60px",
            background: `${Common.color.f900}`,
            fontSize: "20px",
          }}
          onClick={modalShow}
        >
          비밀번호 변경
        </Button>
      </LoginWrap>
    </div>
  );
};

export default SignFindIdPwPage;
