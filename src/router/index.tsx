// Router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter and other necessary components
import routes, { RouteConfig } from "./routes";

console.log('r',routes)

const renderRoutes = (routes: RouteConfig[]): JSX.Element[] => {
    return routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element}>
        </Route>
    ));
};

const RouterComponent: React.FC = () => {
    const pageRoutes = renderRoutes(routes);

    return (
        <Router>
            <>
                <Routes>{pageRoutes}</Routes>
            </>
        </Router>
    );
};

export default RouterComponent;
