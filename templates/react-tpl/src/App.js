import { renderRoutes } from './routes';
import { routes } from './routes/config';

const App = () => {
  return <div id="app">{renderRoutes(routes)}</div>;
};

export default App;
