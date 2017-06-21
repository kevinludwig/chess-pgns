const fs = require('fs'),
      pegjs = require('pegjs');

const parser = new pegjs.generate(fs.readFileSync('./grammar.peg', 'utf-8'));
const pgn = '[Result "1-0"]\n' +
    '[White "kevinl"]\n' +
    '1. {first comment} e4 {second comment} e5\n' +
    '2. d4 exd4+ 3. Nf3+ Nc6 4. Bc4 Bc5 \n' +
    '5. d1=Q+ exf8=N 6. O-O+ Bxc3 {last comment}\n' +
    '7. Ra2\n1-0';

/* 
 * last move half move is broken
 * no RAV support yet
 * no NAG support yet
 */
const result = parser.parse(pgn);
console.log(result);
