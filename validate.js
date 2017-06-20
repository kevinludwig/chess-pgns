const path = require('path'),
      fs = require('fs'),
      util = require('util'),
      readDir = util.promisify(fs.readdir),
      readFile = util.promisify(fs.readFile),
      Chess = require('chess.js').Chess;

function validate([fn, pgn]) {
    const chess = new Chess();
    if (!chess.load_pgn(pgn)) {
        console.log('Error validating', fn);
    } else {
        console.log('Validate OK', fn);
    }
}

async function validateDir(dir) {
    const entries = await readDir(dir);
    const pgns = [];
    for (entry of entries) {
        const fn = path.join(dir, entry);
        const pgn = await readFile(fn, 'utf-8');
        pgns.push([fn, pgn]);
    }
    pgns.forEach(pgn => validate(pgn));
}

(async function() {
    try {
        await validateDir('./White');
        await validateDir('./Black');
    } catch (ex) {
        console.log(ex);
    }
})();

