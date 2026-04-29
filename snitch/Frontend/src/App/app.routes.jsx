import {createBrowserRouter} from "react-router"
import Home from "../features/products/pages/Home"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import CreateProduct from "../features/products/pages/CreateProduct"
export const routes = createBrowserRouter ([
    {path:"/",
        element:<Home/>
    },
    {path:"/login",
        element:<Login/>
    },
    {path:"/register",
        element:<Register/>
    },
    {path:"/create-product",
        element:<CreateProduct/>
    }
])