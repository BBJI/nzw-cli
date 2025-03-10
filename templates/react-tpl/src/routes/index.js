import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const generateRoutes = (routes) => {
  return (
    <For
      of={routes}
      each="route"
      body={(route) => (
        <Choose>
          <When condition={route.redirect}>
            <Route
              key={route.id}
              path={route.path}
              element={<Navigate to={route.redirect} replace />}
            />
          </When>
          <Otherwise>
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            >
              {route.children && generateRoutes(route.children)}
            </Route>
          </Otherwise>
        </Choose>
      )}
    />
  );
};

export const renderRoutes = (routes) => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="page-loading">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 36,
                  }}
                  spin
                />
              }
            />
          </div>
        }
      >
        <Routes>{generateRoutes(routes)}</Routes>
      </Suspense>
    </Router>
  );
};
