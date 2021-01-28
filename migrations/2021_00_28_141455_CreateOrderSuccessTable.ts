import {Migration, Blueprint, Schema} from 'migrationjs';


export default class CreateOrderSuccessTable extends Migration {

    tableName = 'order_success';

    async up() {
        await Schema.create(this.tableName, (table) => {
            table.id();
            table.unsignedInteger('user_id');
            table.unsignedInteger('card_id');
            table.unsignedInteger('price');
            table.timestamp('created_at').useCurrent();
        });
    }

    async down() {
        await Schema.dropIfExists(this.tableName);
    }
}