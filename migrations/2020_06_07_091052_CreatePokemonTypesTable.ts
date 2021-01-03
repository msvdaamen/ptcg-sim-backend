import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreatePokemonTypesTable extends Migration {

    async up() {
       await Schema.create('pokemon_types', (table: Blueprint) => {
           table.id();
           table.string('name').unique();
       })
    }

    async down() {
       await Schema.dropIfExists('pokemon_types');
    }
}
