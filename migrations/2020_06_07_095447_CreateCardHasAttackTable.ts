import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateCardHasAttackTable extends Migration {

    async up() {
        await Schema.create('card_has_attack', (table: Blueprint) => {
            table.unsignedInteger('card_id');
            table.unsignedInteger('attack_id');

            table.unique(['card_id', 'attack_id']);

            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
            table.foreign('attack_id').references('id').on('attacks').onDelete('cascade');
        });
    }

    async down() {
        await Schema.dropIfExists('card_has_attack');
    }
}
