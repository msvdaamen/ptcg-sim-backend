import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterOrderTablesAddForeignKeys extends Migration {

    async up() {
        await Schema.table('orders', (table) => {
            table.foreign('user_id').references('id').on('users').onDelete('cascade');
            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
        });
        await Schema.table('order_success', (table) => {
            table.foreign('user_id').references('id').on('users').onDelete('cascade');
            table.foreign('card_id').references('id').on('cards').onDelete('cascade');
        });
    }

    async down() {

    }
}
