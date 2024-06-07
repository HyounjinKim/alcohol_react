import React from "react";
import { TotalPayWrap, TotalTh } from "../../styles/cart/CartTableCss";
import { PB20 } from "../../styles/basic";

const CartTotalPay = ({ cartData }) => {
  const totalOrderAmount = data => {
    let total = 0;
    data?.forEach(item => {
      total += item.price * item.amount;
    });
    return total;
  };
  return (
    <TotalPayWrap>
      <TotalTh>
        <PB20>결제금액</PB20>
        <PB20>배송비</PB20>
        <PB20></PB20>
        <PB20>예상결제금액</PB20>
      </TotalTh>
      <TotalTh>
        <PB20>{totalOrderAmount(cartData).toLocaleString()} 원</PB20>
        <PB20>0원</PB20>
        <PB20>=</PB20>
        <PB20>{totalOrderAmount(cartData).toLocaleString()} 원</PB20>
      </TotalTh>
    </TotalPayWrap>
  );
};

export default CartTotalPay;
