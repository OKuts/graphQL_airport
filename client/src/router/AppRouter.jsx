import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from './routes';

export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route => <Route key={route.path} {...route} />)}
        </Routes>
    );
};
