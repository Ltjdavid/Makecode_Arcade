namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . 7 . . . . . . 7 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -500)
    mySprite.startEffect(effects.trail, 100)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.rings, 500)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy(effects.confetti, 500)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false, effects.dissolve)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 200)
})
let myEnemy: Sprite = null
let MyFuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`Arwing`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
game.onUpdateInterval(5000, function () {
    MyFuel = sprites.createProjectileFromSide(assets.image`MyFuel`, 0, 50)
    MyFuel.x = randint(5, 155)
    MyFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(500, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`myEnemy`, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
