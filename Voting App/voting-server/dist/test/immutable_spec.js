'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

/**
 * Created by Owner on 1/6/2017.
 */
describe('immutability', function () {

    describe('A List', function () {

        function addMovie(movieCollection, newMovie) {
            return movieCollection.update("movies", function (x) {
                return x.push(newMovie);
            });
        }

        it('is immutable', function () {
            var movieCollection = (0, _immutable.Map)({
                movies: _immutable.List.of("Terminator", "Sunshine")
            });
            var newMovie = "Jurassic Park";
            var newCollection = addMovie(movieCollection, newMovie);

            (0, _chai.expect)(newCollection).to.equal((0, _immutable.Map)({
                movies: _immutable.List.of("Terminator", "Sunshine", "Jurassic Park")
            }));
            (0, _chai.expect)(movieCollection).to.equal((0, _immutable.Map)({
                movies: _immutable.List.of("Terminator", "Sunshine")
            }));
        });
    });
});
//# sourceMappingURL=immutable_spec.js.map