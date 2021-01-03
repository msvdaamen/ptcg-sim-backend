import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateAbilitiesTable extends Migration {

    async up() {
        await Schema.create('abilities', (table: Blueprint) => {
            table.id();
            table.string('name');
            table.text('description').nullable();
        })
    }

    async down() {
        await Schema.dropIfExists('abilities');
    }
}
