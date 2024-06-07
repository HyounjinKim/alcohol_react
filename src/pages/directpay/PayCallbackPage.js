import { Button } from "antd";
import BasicLayout from "../../layout/BasicLayout";
import { buttonPrimaryStyle } from "../../styles/sign/signArea";
import { useNavigate } from "react-router";
import jwtAxios from "../../util/jwtUtil";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../api/config";

const PayCallbackPage = () => {
  const navigate = useNavigate();

  const [info, setInfo] = ([JSON.parse(sessionStorage.getItem("basketInfo"))]);
  const [stocknum, setStocknum] = ([JSON.parse(sessionStorage.getItem("stockNum"))]);

  const deletebasket = async () =>{
    await jwtAxios.delete(`${SERVER_URL}/shoppingbasket/all`)
  }

  const buysave = async () => {
    for(let i = 0; i < info.length; i++){
      var body = {
        ordernumber: info[i].ordernumber,
        stock: stocknum[i],
        amount: info[i].amount,
        price: info[i].price,
        delivery: info[i].delivery,
        address: info[i].address,
        address2: info[i].address2,
        picture: info[i].image,
      };
      await jwtAxios.post(`${SERVER_URL}/purchase/buysave`,body,{
        
      }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    }
    sessionStorage.removeItem("basketInfo");
    sessionStorage.removeItem("stockNum");
  };

  useEffect(() => {
    deletebasket();
    buysave();
  }, []);

  return (
    <>
      <BasicLayout>
        <div style={{ textAlign: "center", margin: "10%" }}>
          <h1>결제가 완료 됐습니다.</h1>
          <h1>마이페이지의 주문배송조회를 확인해주세요.</h1>
          <Button
            type="primary"
            htmlType="submit"
            style={buttonPrimaryStyle}
            onClick={() => navigate("/mypage/order")}
          >
            주문배송조회
          </Button>
        </div>
      </BasicLayout>
    </>
  );
};

export default PayCallbackPage;