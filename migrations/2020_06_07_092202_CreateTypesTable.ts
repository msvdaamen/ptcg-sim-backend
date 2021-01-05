import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateTypesTable extends Migration {

    async up() {
        await Schema.create('card_types', (table: Blueprint) => {
           table.id();
           table.string('name').unique();
        });
    }

    async down() {
        await Schema.dropIfExists('types');
    }
}
