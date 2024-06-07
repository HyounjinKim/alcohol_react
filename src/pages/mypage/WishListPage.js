import React, { useEffect, useState } from "react";
import { GridContainer } from "../../styles/product/proWrapCss";
import { getWishList } from "../../api/wishListApi";
import WishCard from "../../components/product/WishCard";
import { useQuery } from "react-query";

const WishListPage = () => {
  const [wishListData, setWishListData] = useState([]);

  const { data: wishGetListMutate } = useQuery({
    queryKey: ["wishQuery"],
    queryFn: () => getWishList({}),
  });

  useEffect(() => {
    setWishListData(wishGetListMutate);
  }, [wishGetListMutate]);

  return (
    <div>
      <GridContainer>
        {wishListData?.map(product => (
          <WishCard key={product.code} data={product} />
        ))}
      </GridContainer>
    </div>
  );
};

export default WishListPage;
