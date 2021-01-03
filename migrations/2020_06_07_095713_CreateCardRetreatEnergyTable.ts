import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateCardRetreatEnergyTable extends Migration {

    async up() {
        await Schema.create('card_retreat_energy', (table: Blueprint) => {
            table.unsignedInteger('card_id');
            table.unsignedInteger('energy_id');

            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
            table.foreign('energy_id').references('id').on('energies').onDelete('cascade');
        });
    }

    async down() {
        await Schema.dropIfExists('card_retreat_energy');
    }
}
