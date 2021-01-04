import {Migration} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateUserHasCardtable extends Migration {

    async up() {
        await Schema.create('user_has_card', (table) => {
            table.bigIncrements('id');
            table.unsignedInteger('user_id');
            table.unsignedInteger('card_id');

            table.foreign('user_id').references('id').on('users').onDelete('cascade');
            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
        });
    }

    async down() {
        await Schema.dropIfExists('user_has_card');
    }
}
