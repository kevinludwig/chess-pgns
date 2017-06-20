const fs = require('fs'),
      pegjs = require('pegjs');

const parser = new pegjs.generate(fs.readFileSync('./grammar.peg', 'utf-8'));
console.log(parser.parse('[Result "1-0"]\n[White "kevinl"]\n1. {first comment} e4 {second comment} e5 {third comment} 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6'));
