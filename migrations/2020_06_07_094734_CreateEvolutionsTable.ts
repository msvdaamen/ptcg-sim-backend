import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateEvolutionsTable extends Migration {

    async up() {
        await Schema.create('evolutions', (table: Blueprint) => {
            table.unsignedInteger('card_id');
            table.unsignedInteger('card_evolution_id');

            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
            table.foreign('card_evolution_id').references('id').on('cards').onDelete('cascade');
        })
    }

    async down() {
        await Schema.dropIfExists('evolutions');
    }
}
