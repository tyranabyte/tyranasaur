import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; // Reference to the player
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // Reference for input
    private walls!: Phaser.Physics.Arcade.StaticGroup; // Reference for walls

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
    }

    create() {
        // Set the physics world bounds
        this.physics.world.setBounds(0, 0, 800, 600);

        // Create walls
        this.createWalls();

        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player'); // Create a sprite using a key
        this.player.setCollideWorldBounds(true); // Prevent the player from going out of bounds

        // Enable physics for the player
        this.physics.add.existing(this.player);
        this.player.body.setBounce(0); // No bounce
        this.player.body.setDrag(300); // Friction

        // Setup cursor keys for WASD movement
        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            }) as Phaser.Types.Input.Keyboard.CursorKeys;
        }

        // Collisions
        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.handleMovement();
    }

    private createWalls() {
        this.walls = this.physics.add.staticGroup();
        // Create a graphics object for drawing
        const graphics = this.add.graphics();

        // Define wall dimensions and positions
        const wallDimensions = [
            { x: 100, y: 100, width: 200, height: 20, color: 0xff0000 }, // Top wall (red)
            { x: 100, y: 400, width: 200, height: 20, color: 0x00ff00 }, // Bottom wall (green)
            { x: 600, y: 250, width: 20, height: 300, color: 0x0000ff }, // Right wall (blue)
            { x: 100, y: 250, width: 20, height: 300, color: 0xffff00 }  // Left wall (yellow)
        ];

        // Create walls and draw them
        wallDimensions.forEach(dim => {
            // Create a physics body for collision
            const wallSprite = this.walls.create(dim.x + dim.width / 2, dim.y + dim.height / 2) as Phaser.Physics.Arcade.Sprite;

            // Set the size for the physics body
            wallSprite.setSize(dim.width, dim.height); // Set the physics collider size
            wallSprite.setOrigin(0.5, 0.5); // Center the origin for proper positioning

            // Refresh the body to apply the new size
            wallSprite.refreshBody();

            // Create a wall graphics rectangle
            const rect = new Phaser.Geom.Rectangle(dim.x, dim.y, dim.width, dim.height);

            // Set the fill style for the wall based on the color defined in wallDimensions
            graphics.fillStyle(dim.color, 1); // Use the specified color

            // Draw the wall using fillRectShape
            graphics.fillRectShape(rect);
        });
    }

    private handleMovement() {
        const speed = 200; // Movement speed

        // Reset velocity
        this.player.body.setVelocity(0);

        // Check for WASD input and set the player's velocity accordingly
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        }
        if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        }
        if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }
    }
}