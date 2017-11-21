const argv = require('yargs').argv

class Player {
  constructor(name) {
    this.name = name
    this._move = []
  }

  get showMove() {
    return this._move
  }

  set makeMove(move) {
    this._move = move
  }
}

class BigBlue extends Player {
  constructor(name) {
    super(name)
    this.name = 'Computer'
  }

  randomMove() {
    const moves = ['rock', 'paper', 'scissors']
    let randomNum = Math.floor(Math.random() * 3)
    this._move = moves[randomNum]
  }
}

class Game {
  constructor(player) {
    this.player1 = new Player(player)
    this.player2 = new BigBlue()
  }

  playRound() {
    let winner
    if (this.player1.showMove === this.player2.showMove) winner = '~The match is a draw~'
    else if (this.player1.showMove === 'rock') {
      if (this.player2.showMove === 'paper') winner = `~${this.player2.name} wins~`
      else winner = `~${this.player1.name} wins~` //player2 has scissors
    } else if (this.player1.showMove === 'paper') {
      if (this.player2.showMove === 'scissors') winner = `~${this.player2.name} wins~`
      else winner = `~${this.player1.name} wins~` //player2 has rock
    } else { // player1 has scissors
      if (this.player2.showMove === 'rock') winner = `~${this.player2.name} wins~`
      else winner = `~${this.player1.name} wins~` //player2 has paper
    }
    return winner
  }
}

// Start of main code
let match = new Game('Player')
console.log("\nPlaying a match of Roshambo against the computer.")
// Check for valid player move
if (argv.move !== 'rock' && argv.move !== 'paper' && argv.move !== 'scissors') { // if none, end game
  console.log(`\n~${match.player1.name} has choked and failed to make a move!~\n`)
  return
}
match.player1.makeMove = argv.move
// Display player move
console.log(`\n${match.player1.name} plays ${match.player1.showMove}!`)
// Computer makes a random move
match.player2.randomMove()
// Display computer move
console.log(`${match.player2.name} plays ${match.player2.showMove}!`)
// Determine and display winner
let winner = match.playRound()
console.log('\n' + winner + '\n')
