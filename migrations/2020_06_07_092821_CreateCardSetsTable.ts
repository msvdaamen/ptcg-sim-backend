import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateCardSetsTable extends Migration {

    async up() {
        await Schema.create('card_sets', (table: Blueprint) => {
            table.id();
            table.string('name').unique();
            table.string('code').unique();
        })
    }

    async down() {
        await Schema.dropIfExists('card_sets');
    }
}
