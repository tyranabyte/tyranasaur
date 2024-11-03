import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TestGame from './games/test-game/TestGame';
import Home from './Home';

const App: React.FC = () => {
    return (
        <div>
            <h1>tyranasaur</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tyranasaur/" element={<Home />} />
                <Route path="/game1" element={<TestGame />} />
            </Routes>
        </div>
    );
};

export default App;