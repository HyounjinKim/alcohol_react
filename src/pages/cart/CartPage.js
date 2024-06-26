import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import ReviewBt from "../../components/mypage/ReviewBt";
import { PB20 } from "../../styles/basic";
import { MyWrap } from "../../styles/basic/sideWrap";
import { MarginB20 } from "../../styles/common/reviewProductCss";
import { Common } from "../../styles/CommonCss";
import PickUpCart from "./PickUpCart";
import ShippingCart from "./ShippingCart";
import BasicLayout from "../../layout/BasicLayout";

const CartPage = () => {
  const [activeNavBt, setActiveNavBt] = useState(1);
  const handleBtClick = cartId => {
    setActiveNavBt(cartId);
  };
  
  const InfoWrap = styled.div`
    width: 100%;
    position: relative;
    hr {
      background-color: ${Common.color.b900};
      height: 3px;
    }
  `;

  return (
    <BasicLayout>
      <MyWrap>
        <InfoWrap>
          <PB20>장바구니</PB20>
          <MarginB20 />
          <div>
            <ReviewBt
              btName="픽업 결제"
              cartId={1}
              active={activeNavBt === 1}
              onClick={() => {
                handleBtClick(1);
              }}
            />
            <ReviewBt
              btName="배송 결제"
              cartId={2}
              active={activeNavBt === 2}
              onClick={() => handleBtClick(2)}
            />
          </div>
          <hr />
          <div className="page-content">
            {activeNavBt === 1 ? <PickUpCart /> : <ShippingCart />}
          </div>
        </InfoWrap>
      </MyWrap>
    </BasicLayout>
  );
};

export default CartPage;
