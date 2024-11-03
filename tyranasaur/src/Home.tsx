import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h2>Please select a game from the menu.</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/game1">Play Game 1</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;