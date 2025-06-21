import React from 'react';
import Weather from './components/Weather';
import 'antd/dist/reset.css';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Weather />
    </div>
  );
};

export default App;
