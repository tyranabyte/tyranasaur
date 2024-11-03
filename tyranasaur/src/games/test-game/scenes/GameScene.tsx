import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.spritesheet('tiles', '/classic-roguelike.png', {
            frameWidth: 8,
            frameHeight: 8
        });
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600);

        this.createWalls();

        this.player = this.physics.add.sprite(400, 300, 'tiles', 84);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(4, 4);

        this.physics.add.existing(this.player);
        this.player.body.setBounce(0);
        this.player.body.setDrag(300);

        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            }) as Phaser.Types.Input.Keyboard.CursorKeys;
        }

        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.handleMovement();
    }

    private createWall(x: number, y: number) {
        const wallSprite = this.walls.create(x, y, 'tiles', 56) as Phaser.Physics.Arcade.Sprite;

        wallSprite.setSize(8, 8);
        wallSprite.setOrigin(0.5, 0.5);
        wallSprite.setScale(4, 4);
        wallSprite.refreshBody();
    }

    private createWalls() {
        this.walls = this.physics.add.staticGroup();

        const canvasWidth = 800;
        const canvasHeight = 600;
        const tileSize = 8 * 4;

        for (let x = tileSize / 2; x < canvasWidth; x += tileSize) {
            this.createWall.call(this, x, tileSize / 2);
            this.createWall.call(this, x, canvasHeight - tileSize / 2);
        }

        for (let y = tileSize / 2; y < canvasHeight; y += tileSize) {
            this.createWall.call(this, tileSize / 2, y);
            this.createWall.call(this, canvasWidth - tileSize / 2, y);
        }
    }

    private handleMovement() {
        const speed = 200;

        this.player.body.setVelocity(0);

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