// App.js
import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Common } from '../../styles/CommonCss';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const SignFindIdPwModalPage = ({ setIsModalVisible, isModalVisible,changePasswordApi }) => {
  const [password,setPassword] = useState('') // 비밀번호
  const [passwordCheck,setPasswordCheck] = useState('') // 비밀번호 확인

  const navigate = useNavigate();

  const handleOk = () => {
    console.log(password.target.value,passwordCheck.target.value)
    if(password || passwordCheck){
      if(password.target.value !== passwordCheck.target.value){
        Swal.fire({
          title:
            `<p style='font-size:4rem;margin:1rem;'>\n\n 비밀번호가 일치하지 않습니다.\n\n</p>`,
          icon: "info",
          width: 600,
          confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
          confirmButtonColor: `${Common.color.f900}`,
        })
      }
      else{
        changePasswordApi(password,passwordCheck);
        Swal.fire({
          title:
            `<p style='font-size:4rem;margin:1rem;'>비밀번호\n\n 변경되었습니다.\n\n</p>`,
          icon: "info",
          width: 600,
          confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
          confirmButtonColor: `${Common.color.f900}`,
        })
        setIsModalVisible(false);
      }
    }
    navigate('/sign/in');
    window.scroll(0,0)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Modal
        title="비밀번호 변경"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="변경"
        cancelText="취소"
        style={{ top: '30%' }} // 모달의 위치를 조정합니다.
        okButtonProps={{ style: { backgroundColor: '#1890ff', borderColor: '#1890ff' } }} // 확인 버튼 스타일 조정
        cancelButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' } }} // 취소 버튼 스타일 조정
      >
        <Form
          name="normal_login"
          className="login-form"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해 주세요!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="비밀번호"
              name="password"
              type='password'
              onChange={setPassword}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "20px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="passwordCheck"
            rules={[
              {
                required: true,
                message: "비밀번호 확인 입력해주세요",
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
              placeholder="비밀번호확인"
              name="passwordCheck"
              onChange={setPasswordCheck}
            />
          </Form.Item>

        </Form>

      </Modal>
    </div>
  );
};

export default SignFindIdPwModalPage;