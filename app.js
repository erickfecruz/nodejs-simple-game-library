const games = require('./games.js')
const yargs = require('yargs')

// Add command
yargs.command ({
    command: 'add',
    describe: 'Add new game',
    builder: {
        title: {
            describe: 'Game title',
            demandOption: true,
            type: 'string'
        },
        publisher: {
            describe: 'Game publisher',
            demandOption: true,
            type: 'string'
        }, 
        status: {
            describe: 'Game status',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        games.addGame(argv.title, argv.publisher, argv.status)
    }
})

// Delete command
yargs.command ({
    command: 'del',
    describe: 'Delete a game',
    builder: {
        title: {
            describe: 'Game title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        games.delGame(argv.title)
    }
})

// Read command
yargs.command ({
    command: 'read',
    describe: 'Read game info',
    builder: {
        title: {
            describe: 'Game title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        games.readGameInfo(argv.title)
    }
})

// List command
yargs.command ({
    command: 'list',
    describe: 'List all games',
    handler: () => {
        games.listGames()
    }
})

// List by publisher command
yargs.command ({
    command: 'listpub',
    describe: 'List games by publisher',
    builder: {
        publisher: {
            describe: 'Game publisher',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        games.listGamesFromPublisher(argv.publisher)
    }
})

// Change game status
yargs.command ({
    command: 'change',
    describe: 'Change game status',
    builder: {
        title: {
            describe: 'Game title',
            demandOption: true,
            type: 'string'
        },
        status: {
            describe: 'Game status',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        games.changeGameStatus(argv.title, argv.status)
    }
})

// List on hold games
yargs.command ({
    command: 'onhold',
    describe: 'List on hold games',
    handler: () => {
        games.listOnHoldGames()
    }
})

// List playing games
yargs.command ({
    command: 'playing',
    describe: 'List playing games',
    handler: () => {
        games.listPlayingGames()
    }
})

// List completed games
yargs.command ({
    command: 'completed',
    describe: 'List completed games',
    handler: () => {
        games.listCompletedGames()
    }
})

yargs.parse()