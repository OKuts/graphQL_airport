import {Navigate} from "react-router-dom";
import {Home, Clients, Flights} from "../pages";

export const routes = [
    {path: '/', element: <Home/>},
    {path: '/home', element: <Navigate to="/"/>},
    {path: '/clients', element: <Clients />},
    {path: '/flights', element: <Flights/>},

    {path: '*', element: <Navigate to="/"/>}
]