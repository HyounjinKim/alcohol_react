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
import { getDetail } from "../../api/productApi";
import { useParams } from "react-router";
import { buypage } from "../../api/directPayApi";
const PickUpCart = () => {
  const [isCartDeleteModalOpen, setCartDeleteModalOpen] = useState(false);
  const [isCartAllDeleteModalOpen, setCartAllDeleteModalOpen] = useState(false);
  const [countState, setCountState] = useRecoilState(cartCountState);
  const [cartDeleteState, setCartDeleteState] = useState({});

  const { data: pickupData } = useQuery({
    queryKey: ["cartQuery"],
    queryFn: () => cartPickUpGetApi({ shopInfo: "pickup" }),
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

  const calculatePaymentAmount = (price, amount) => {
    return (price * amount).toLocaleString(); // 콤마를 추가하여 반환합니다.
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

  var [price,setPrice] = useState([]);

  const totalprice = () =>{
    var tprice = 0;
    for(let i = 0; i < pickupData.length;i++){
      tprice += (pickupData[i].price * pickupData[i].amount);
    }
    price.push(tprice)
  }

  const product = () => {
    for (let i = 0; i < pickupData.length; i++) {
      if (pickupData[i].delivery === "PickUp") {
        productInfo.push(
          {
            code: pickupData[i].alcoholcode,
            name: pickupData[i].name,
            picture: pickupData[i].picture,
            price: pickupData[i].price,
            amount: pickupData[i].amount,
            market: pickupData[i].marketname,
            delivery: pickupData[i].delivery,
            address: pickupData[i].marketaddress,
            address2: "",
          },
        );
      } else {
        productInfo.push(
          {
            code: pickupData[i].alcoholcode,
            name: pickupData[i].name,
            picture: pickupData[i].picture,
            price: pickupData[i].price,
            amount: pickupData[i].amount,
            market: pickupData[i].marketname,
            delivery: pickupData[i].delivery,
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
    setCountState(pickupData);
    pickupData && user();
    pickupData && product();
    pickupData && totalprice()
  }, [pickupData]);

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
          dataSource={pickupData}
          pagination={false}
        />
        {/* {showModal && <RvModal onClose={handleCloseModal} />} */}
      </ConfigProvider>
      <Divider />
      <CartTotalPay cartData={pickupData} />
      <CartOrderDelButton
        handleOpenCartAllDeleteModal={handleOpenCartAllDeleteModal}
        productInfo={productInfo}
        info={userInfo}
        price={price[0]}
      />
    </div>
  );
};

export default PickUpCart;
