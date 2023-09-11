import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "../presentation/views/Home/Home";
import { ROUTES } from "./routes";
import { NeedListView } from "../presentation/views/Needs/list/NeedListView";
import { NeedDetailView } from "../presentation/views/Needs/detail/NeedDetailView";
import { AddNewNeedView } from "../presentation/views/Needs/new/addNewNeedView";

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Home/>
    },
    {
        path: ROUTES.NEED_LIST,
        element: <NeedListView/>
    },
    {
        path: `${ROUTES.NEED_DETAIL}/:id`,
        element: <NeedDetailView/>
    },
    {
        path: ROUTES.ADD_NEED,
        element: <AddNewNeedView/>
    },
]);

export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
