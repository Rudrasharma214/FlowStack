import { Outlet } from 'react-router-dom';
import { logger } from '@/services/logger';

const App = () => {
  logger.info('App layout component rendered');
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header/Navigation can be added here */}
      <main>
        <Outlet />
      </main>
      {/* Footer can be added here */}
    </div>
  );
};

export default App;
