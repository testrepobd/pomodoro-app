/**
 * Created by Owner on 1/6/2017.
 */
import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutability', () => {

    describe('A List', () => {

        function addMovie(movieCollection,newMovie) {
            return movieCollection.update("movies",(x)=>x.push(newMovie));
        }

        it('is immutable', () => {
            let movieCollection = Map({
                movies:List.of("Terminator","Sunshine")
            });
            let newMovie = "Jurassic Park";
            let newCollection = addMovie(movieCollection,newMovie);

            expect(newCollection).to.equal(Map({
                movies:List.of("Terminator","Sunshine","Jurassic Park")
            }));
            expect(movieCollection).to.equal(Map({
                movies:List.of("Terminator","Sunshine")
            }));
        });

    });

});