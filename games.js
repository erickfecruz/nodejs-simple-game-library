const fs = require('fs')
const chalk = require('chalk')

const addGame = (title, publisher, status) => {
    const games = loadGames()
    const duplicateGames = games.find ((game) => game.title === title)

    const validStatus = () => ((status !== 'On Hold') || (status !== 'Playing') || (status !== 'Completed'))

    if (duplicateGames) {
        console.log(chalk.red('Game already exist!'))
    } else if (!validStatus) {
        console.log(chalk.red('Invalid status!'))
    } else {
        games.push({
            title: title,
            publisher: publisher,
            status: status
        })
        saveGames(games)
    }
}

const delGame = (title) => {
    const games = loadGames()
    const newGames = games.filter((game) => game.title !== title)

    if (games.length !== newGames.length) {
        console.log(chalk.green('Game Removed!'))
    } else {
        console.log(chalk.red('Game not found!'))
    }

    saveGames(newGames)
}

const listGames = () => {
    const games = loadGames()
    console.log(chalk.bgGreen('Your games...'))
    games.forEach(game => {
        console.log(game.title)
    });
}

const listGamesFromPublisher = (publisher) => {
    const games = loadGames()
    
    const gamesFromPublisher = games.filter((game) => game.publisher === publisher)
    
    console.log(chalk.green('Games from ' + publisher))
    gamesFromPublisher.forEach(game => {
        console.log(game.title)
    });
}

const listOnHoldGames = () => {
    const games = loadGames()
    const gamesByStatus = games.filter((game) => game.status === 'On Hold')
    console.log(chalk.green('On Hold Games:'))
    gamesByStatus.forEach(game => {
        console.log(game.title)
    });
}

const listPlayingGames = () => {
    const games = loadGames()
    const gamesByStatus = games.filter((game) => game.status === 'Playing')
    console.log(chalk.green('Playing Games:'))
    gamesByStatus.forEach(game => {
        console.log(game.title)
    });
}

const listCompletedGames = () => {
    const games = loadGames()
    const gamesByStatus = games.filter((game) => game.status === 'Completed')
    console.log(chalk.green('Complete Games:'))
    gamesByStatus.forEach(game => {
        console.log(game.title)
    });
}

const changeGameStatus = (title, status) => {
    const games = loadGames()
    const myGame = games.find((game) => game.title === title)
    const validStatus = () => ((status !== 'On Hold') || (status !== 'Playing') || (status !== 'Completed'))
    
    if (!validStatus) {
        console.log(chalk.red('Invalid status!'))
    } else if (!myGame) {
        console.log(chalk.red('Game not found!'))
    } else {
        const pub = myGame.publisher 
        delGame(title)
        addGame(title, pub, status)
        console.log(chalk.green('Status Changed!'))
    }
}

const readGameInfo = (title) => {
    const games = loadGames()
    const myGame = games.find((game) => game.title === title)

    if (myGame) {
        console.log(chalk.green('Game found!'))
        console.log('Name: ' +  myGame.title + ", Publisher: " + myGame.publisher + ", Status: " + myGame.status)
    } else {
        console.log(chalk.red('Game not found!'))
    }
}

const loadGames = () => {
    try {
        const readJSON = fs.readFileSync('library.json')
        const stringGames = readJSON.toString()
        return JSON.parse(stringGames)
    } catch {
        return []
    }
}

const saveGames = (games) => {
    const stringNewGames = JSON.stringify(games)
    fs.writeFileSync('library.json', stringNewGames)
}

module.exports = {
    addGame: addGame,
    delGame: delGame,
    changeGameStatus: changeGameStatus,
    listGames: listGames,
    listGamesFromPublisher: listGamesFromPublisher, 
    listOnHoldGames: listOnHoldGames,
    listPlayingGames: listPlayingGames,
    listCompletedGames: listCompletedGames,
    readGameInfo: readGameInfo
}