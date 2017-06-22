const chai = require('chai'),
      path = require('path'),
      fs = require('fs'),
      pegjs = require('pegjs'),
      should = chai.should();

describe('grammar', () => {
    const grammar = fs.readFileSync(path.join(__dirname, '../grammar.peg'), 'utf-8');
    const parser = pegjs.generate(grammar);

    it('should parse basic movetext', () => {
        const result = parser.parse('1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6 *');
        result.moves.should.have.lengthOf(4);
    });

    it('should parse headers', () => {
        const result = parser.parse('[Event "LACC Botvinnik Open"]\n[White "Kasparov"]\n1. d4 d5 2. c4 c6 3. cxd5 cxd4 1/2-1/2');
        result.moves.should.have.lengthOf(3);
    });

    it('should allow no move numbers', () => {
        const result = parser.parse('e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 *');
        result.moves.should.have.lengthOf(6);
    });

    it('should allow move numbers no periods', () => {
        const result = parser.parse('1 e4 e5 2 Nf3 Nc6 3 Bc4 Bc5 4 b4 Bxb4 5 c3 Ba5 6 d4 exd4 *');
        result.moves.should.have.lengthOf(6);
    });

    it('should allow castles', () => {
        const result = parser.parse('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O dxc3 *');
        result.moves.should.have.lengthOf(7);
    });

    it('should allow castles long', () => {
        const result = parser.parse('1. e4 d5 2. exd5 Qxd5\n3. Nf3 Bg4\n4. Be2 Nc6\n5. h3 O-O-O\n*');
        result.moves.should.have.lengthOf(5);
    });

    it('should allow promotions', () => {
        const result = parser.parse('1. e4 e5 2. Nf3 Nc6 3. f8=Q+ dxe1=N+ *');
        result.moves.should.have.lengthOf(3);
    });
    
    it('should allow newlines', () => {
        const result = parser.parse('1. e4 e5\n2. Nf3 Nc6\n3.Bc4 Bc5 1-0');
        result.moves.should.have.lengthOf(3);
    });

    it('should allow checkmates', () => {
        const result = parser.parse('1. f3 e5 2. g4 Qh4#\n0-1');
        result.moves.should.have.lengthOf(2);
    });

    it('should allow NAG', () => {
        const result = parser.parse('1. f3 $2 e5 $1 2. g4 $4 $15 Qh4#\n0-1');
        result.moves.should.have.lengthOf(2);
    });

    it('should allow commentary', () => {
        const result = parser.parse('1. f3 {some comment} e5 {another comment} 2. g4 Qh4#\n0-1');
        result.moves.should.have.lengthOf(2);
    });

    it('should allow disambiguation moves', () => {
        const result = parser.parse('1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. e3 Nbd7 *');
        result.moves.should.have.lengthOf(5);
    });
});