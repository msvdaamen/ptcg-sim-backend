import {Migration, Blueprint, Schema} from 'migrationjs';


export default class CreateOrdersTable extends Migration {

    tableName = 'orders';

    async up() {
        await Schema.create(this.tableName, (table) => {
            table.id();
            table.unsignedInteger('user_id');
            table.unsignedInteger('card_id');
            table.unsignedInteger('price');
            table.timestamp('created_at').useCurrent();
            table.dateTime('expire_date');

            table.foreign('user_id').references('id').on('users').onDelete('cascade');
            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
        });
    }

    async down() {
        await Schema.dropIfExists(this.tableName);
    }
}
