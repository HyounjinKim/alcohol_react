import BasicLayout from "../../layout/BasicLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginBt } from "../../styles/login/loginCss";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { buttonPrimaryStyle } from "../../styles/sign/signArea";
import { SERVER_URL } from "../../api/config";
import jwtAxios from "../../util/jwtUtil";

const DirectPayPage = () => {
  const location = useLocation();
  const { info, productInfo, price } = location.state || {};
  const navigate = useNavigate();

  const totalPrice = price;

  var productname = "";
  const [basketInfo, setBasketInfo] = useState([]);
  const [stockNum, setStockNum] = useState([]);

  const totalprice = () => {
    console.log(price)
    var total = 0;
    var name = "";
    const orderdate = new Date();
    const date = `${
      orderdate.getFullYear() +
      "-" +
      orderdate.getMonth() +
      "-" +
      orderdate.getDay() +
      " " +
      orderdate.getHours() +
      ":" +
      orderdate.getMinutes()
    }`;
    const rand = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    for (let i = 0; i < productInfo.length; i++) {
      total = productInfo[i].price * productInfo[i].amount;
      name += productInfo[i].name;
      basketInfo.push(
        {
          image: productInfo[i].picture,
          productname: productInfo[i].name,
          purchaseday: date,
          marketname: productInfo[i].market,
          amount: productInfo[i].amount,
          ordernumber: rand,
          delivery: productInfo[i].delivery,
          address: productInfo[i].address,
          address2: "",
          price: total,
        },
      );
    }
    productname = name;
    saveBasket();
  };

  const saveBasket = async () => {
    for (let i = 0; i < basketInfo.length; i++) {
      var body = {
        alcoholname: basketInfo[i].productname,
        marketname: basketInfo[i].marketname,
      };
      await jwtAxios
        .post(`${SERVER_URL}/purchase/stockcode`, body, {})
        .then(res => {
          stockNum.push(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (stockNum.length !== 0) {
      sessionStorage.setItem("stockNum", JSON.stringify(stockNum));
    }
  };

  useEffect(() => {
    totalprice();
  }, []);

  const tosspay = async () => {
    const body = {
      price: price,
      productname: productname,
    };
    await jwtAxios
      .post(`${SERVER_URL}/purchase/toss`, body, {})
      .then(res => {
        console.log(res);
        if (JSON.stringify(res.status).startsWith("2")) {
          sessionStorage.setItem("basketInfo", JSON.stringify(basketInfo));
          window.location.href = res.data.checkoutPage;
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <BasicLayout>
      <div className="pay">
        <div className="payline1"></div>
        <div className="buyinfo">
          <ul>
            <li>
              <h2>주문정보</h2>
            </li>
            <li>
              <h2>상품정보</h2>
            </li>
            <li>
              <h2>상품명</h2>
            </li>
            <li>
              <h2>수량</h2>
            </li>
            <li>
              <h2>결제금액</h2>
            </li>
            <li>
              <h2>선택매장</h2>
            </li>
            <li>
              <h2>구매방식</h2>
            </li>
          </ul>
        </div>
        <div className="payline2"></div>
        <div className="info">
          <div className="user">
            <h2>구매자 : {info.nickname}</h2>
            <h2>휴대폰번호 : {info.phone}</h2>
            <h2>배송지 : {info.address}</h2>
            <h2>이메일 : {info.email}</h2>
          </div>
          <div className="product">
            {productInfo.map((product, index) => {
              return (
                <div key={index}>
                  <div className="product-map">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "220px",
                      }}
                    >
                      <img
                        className="product-info"
                        style={{ width: "100px", height: "100px" }}
                        src={product.picture}
                        alt="이미지"
                      />
                      <h2 className="product-name">{product.name}</h2>
                      <h2 className="product-count">{product.amount}</h2>
                      <h2 className="product-price">{product.price}</h2>
                      <h2 className="product-market">{product.market}</h2>
                      <h2 className="product-way">{product.delivery}</h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="payline2"></div>
        <div>
          <h1>주문금액</h1>
          <div className="payline1"></div>
          <div>
            <div className="total">
              <h2>총 상품금액</h2>
              <h2>총 배송비</h2>
              <h2>결제예정금액</h2>
            </div>
            <div className="payline2"></div>
            <div className="total">
              <h1>{price}원</h1>
              <h1>0원</h1>
              <h1>{price}원</h1>
            </div>
            <div className="payline2"></div>
          </div>
        </div>
        <div>
          <h1>결제수단</h1>
          <div className="payline1"></div>
          <div className="paybtndiv">
            <Button
              type="primary"
              htmlType="submit"
              style={buttonPrimaryStyle}
              onClick={tosspay}
            >
              토스결제
            </Button>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default DirectPayPage;
