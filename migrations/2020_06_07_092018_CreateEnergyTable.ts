import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateEnergyTable extends Migration {

    async up() {
        await Schema.create('energies', (table: Blueprint) => {
            table.id();
            table.string('name').unique();
        })
    }

    async down() {
        await Schema.dropIfExists('energies')
    }
}
