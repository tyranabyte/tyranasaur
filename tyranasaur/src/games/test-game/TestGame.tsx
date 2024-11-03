import Phaser from 'phaser';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GameScene from './scenes/GameScene';
import './TestGame.css';

const TestGame: React.FC = () => {
    const navigate = useNavigate();
    const gameContainer = useRef<HTMLDivElement | null>(null);
    const testGameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (!testGameRef.current && gameContainer.current) {
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: gameContainer.current,
                scene: GameScene,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { x: 0, y: 0 }, // No gravity
                        debug: true // Set to true for debugging
                    }
                },
            };

            testGameRef.current = new Phaser.Game(config);
        }

        return () => {
            if (testGameRef.current) {
                testGameRef.current.destroy(true);
                testGameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="phaser-container">
            <div ref={gameContainer} />
            <div style={{ marginTop: '10px', display: 'block' }}>
                <button onClick={() => navigate('/')}>Back to Menu</button>
            </div>
        </div>
    );
};

export default TestGame;