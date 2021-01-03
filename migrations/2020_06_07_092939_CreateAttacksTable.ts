import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateAttacksTable extends Migration {

    async up() {
        await Schema.create('attacks', (table: Blueprint) => {
            table.id();
            table.string('name').unique();
            table.integer('converted_energy_cost').nullable();
            table.string('damage', 10).nullable();
            table.text('description').nullable();
        })
    }

    async down() {
        await Schema.dropIfExists('attacks');
    }
}
