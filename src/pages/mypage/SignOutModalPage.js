// App.js
import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Common } from '../../styles/CommonCss';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import jwtAxios from '../../util/jwtUtil';
import { SERVER_URL } from '../../api/config';
import { removeCookie } from '../../util/cookieUtil';
import {  useResetRecoilState } from "recoil";
import { atomSignState } from '../../atom/loginState';


const SignOutModalPage = ({ setIsModalVisible, isModalVisible }) => {
  const [password, setPassword] = useState('') // 비밀번호
  const [passwordCheck, setPasswordCheck] = useState('') // 비밀번호 확인
  const resetSignState = useResetRecoilState(atomSignState);

  const navigate = useNavigate();

  const handleOk = () => {
    jwtAxios.get(`${SERVER_URL}/user/withdraw`,
    ).then(data => {
      console.log(data);
      Swal.fire({
        title:
          `<p style='font-size:4rem;margin:1rem;'>회원탈퇴되었습니다.\n\n</p>`,
        icon: "info",
        width: 600,
        confirmButtonText: `<span style="display:bolck;font-size:4rem;width:200px;padding:1rem;">확인</span>`,
        confirmButtonColor: `${Common.color.f900}`,
      })
      .then(() => {
        removeCookie("member");
        resetSignState();
        setIsModalVisible(false);
        navigate('/');
        window.scroll(0,0);
      });
    }).catch(e => {
      console.log(e);
    });
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Modal
        title="회원탈퇴"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="탈퇴"
        cancelText="취소"
        style={{ top: '30%' }} // 모달의 위치를 조정합니다.
        okButtonProps={{ style: { backgroundColor: '#1890ff', borderColor: '#1890ff' } }} // 확인 버튼 스타일 조정
        cancelButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' } }} // 취소 버튼 스타일 조정
      >
      </Modal>
    </div>
  );
};

export default SignOutModalPage;