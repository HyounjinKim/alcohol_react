import { lazy, Suspense } from "react";
import { Navigate } from "react-router";

const DirectPayPage = lazy(() => import("../pages/directpay/DirectPayPage"));
const PayCallbackPage = lazy(() => import("../pages/directpay/PayCallbackPage"));

const PayRouter = () => {
  return [
    { path: "", element: <Navigate to="buy" /> },
    {
      path: "buy",
      element: (
        <Suspense fallback={<div>Load..</div>}>
          <DirectPayPage/>
        </Suspense>
      ),
    },
  ];
};

export default PayRouter;
