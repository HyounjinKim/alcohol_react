import { ConfigProvider } from "antd";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Common } from "../../styles/CommonCss";
import { SButton } from "../../styles/common/reviewProductCss";
import { TableCustom } from "../../styles/common/tableCss";
import { cartCountState } from "../../atom/CountState";
import CountKey from "../../components/basic/CountKey";
import CartDeleteModal from "../../components/modal/CartDeleteModal";
import { cartPickUpGetApi } from "../../api/cartGetApi";
import { useQuery } from "react-query";
import CartAllDeleteModal from "../../components/modal/CartAllDeleteModal";
import CartOrderDelButton from "../../components/cart/CartOrderDelButton";
import CartTotalPay from "../../components/cart/CartTotalPay";
import Divider from "../../components/common/Divider";
import { BigButton, DeleteButton } from "../../styles/common/reviewProductCss";
import { useNavigate } from "react-router";
import { buypage } from '../../api/directPayApi';

const ShippingCart = () => {
  const navigate = useNavigate();
  const [isCartDeleteModalOpen, setCartDeleteModalOpen] = useState(false);
  const [isCartAllDeleteModalOpen, setCartAllDeleteModalOpen] = useState(false);
  const [countState, setCountState] = useRecoilState(cartCountState);
  const [cartDeleteState, setCartDeleteState] = useState({});

  const { data: deliveryData } = useQuery({
    queryKey: ["cartQuery"],
    queryFn: () => cartPickUpGetApi({ shopInfo: "delivery" }),
  });

  const handleCloseCartDeleteModal = () => {
    setCartDeleteModalOpen(false);
  };
  const handleOpenCartDeleteModal = data => {
    setCartDeleteState(data);
    setCartDeleteModalOpen(true);
  };

  const handleCloseCartAllDeleteModal = () => {
    setCartAllDeleteModalOpen(false);
  };
  const handleOpenCartAllDeleteModal = () => {
    setCartAllDeleteModalOpen(true);
  };
  const columnsH = [
    {
      title: "",
      dataIndex: "key",
    },
    {
      title: "이미지",
      dataIndex: "picture",
      render: (pic, record) => (
        <img style={{ width: "80px" }} src={record.picture} alt={`${pic}`} />
      ),
    },
    {
      title: "상품정보",
      dataIndex: "name",
    },
    {
      title: "매장",
      dataIndex: "marketname",
    },
    {
      title: "수량",
      dataIndex: "key",
      render: (text, record) => (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          key={record.id}
        >
          {record.amount}
          {/* <CountKey id={record.key} countState={record} /> */}
        </div>
      ),
    },
    {
      title: "결제금액",
      dataIndex: "price",
      render: (_, record) => (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          key={record.id}
        >
          {/* {calculatePaymentAmount(record.price, cartCount[record.key])} 원 */}
          {record.price.toLocaleString()}원
        </div>
      ),
    },
    {
      title: "삭제",
      render: record => (
        <div>
          <SButton
            onClick={() => {
              handleOpenCartDeleteModal(record);
              setCartDeleteModalOpen(true);
            }}
          >
            삭제
          </SButton>
        </div>
      ),
    },
  ];

  const [userInfo, setUserInfo] = useState([]);

  const [productInfo, setProductInfo] = useState([]);

  const [price,setPrice] = useState([]);

  const totalprice = () =>{
    var tprice = 0;
    for(let i = 0; i < deliveryData.length;i++){
      tprice += (deliveryData[i].price * deliveryData[i].amount);
    }
    price.push(tprice)
  }

  const product = () => {
    for (let i = 0; i < deliveryData.length; i++) {
      if (deliveryData[i].delivery === "PickUp") {
        productInfo.push(
          {
            code: deliveryData[i].alcoholcode,
            name: deliveryData[i].name,
            picture: deliveryData[i].picture,
            price: deliveryData[i].price,
            amount: deliveryData[i].amount,
            market: deliveryData[i].marketname,
            delivery: deliveryData[i].delivery,
            address: deliveryData[i].marketaddress,
            address2: "",
          },
        );
      } else {
        productInfo.push(
          {
            code: deliveryData[i].alcoholcode,
            name: deliveryData[i].name,
            picture: deliveryData[i].picture,
            price: deliveryData[i].price,
            amount: deliveryData[i].amount,
            market: deliveryData[i].marketname,
            delivery: deliveryData[i].delivery,
            address: userInfo.address,
            address2: userInfo.address2,
          },
        );
      }
    }
  };

  const user = async () => {
    const info = await buypage();
    userInfo.push({
      nickname: info.nickname,
      phone: info.phone,
      address: info.address,
      address2: info.address2,
      email: info.email,
    });
  };

  useEffect(() => {
    setCountState(deliveryData);
    deliveryData && user();
    deliveryData && product();
    deliveryData && totalprice()
  }, [deliveryData]);

  return (
    <div>
      {isCartDeleteModalOpen && (
        <CartDeleteModal
          onClose={handleCloseCartDeleteModal}
          data={cartDeleteState}
        />
      )}
      {isCartAllDeleteModalOpen && (
        <CartAllDeleteModal onClose={handleCloseCartAllDeleteModal} />
      )}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Common.color.p900,
          },
          components: {
            Table: {
              headerBg: "none",
              headerColor: Common.color.p500,
            },
          },
        }}
      >
        <TableCustom
          // rowSelection={rowSelection}
          columns={columnsH}
          dataSource={deliveryData}
          pagination={false}
        />
        {/* {showModal && <RvModal onClose={handleCloseModal} />} */}
      </ConfigProvider>
      <Divider />
      <CartTotalPay cartData={deliveryData} />
      <CartOrderDelButton
        handleOpenCartAllDeleteModal={handleOpenCartAllDeleteModal}
        productInfo={productInfo}
        info={userInfo}
        price={price[1]}
      />
      {/* <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div className="cart-button">
          <BigButton
            style={{
              background: `${Common.color.b900}`,
              color: ` ${Common.color.p000}`,
              border: "none",
              fontSize: "16px",
              fontWeight: "normal",
              marginRight: "2rem",
            }}
            onClick={() =>
              navigate("/directpay/buy", {
                state: { info: userInfo, productInfo: productInfo },
              })
            }
          >
            주문하기
          </BigButton>
          <BigButton
            style={{
              background: `${Common.color.b900}`,
              color: ` ${Common.color.p000}`,
              border: "none",
              fontSize: "16px",
              fontWeight: "normal",
            }}
            onClick={() => {
              handleOpenCartAllDeleteModal();
            }}
          >
            전체 삭제하기
          </BigButton>
        </div>
      </div> */}
    </div>
  );
};

export default ShippingCart;
