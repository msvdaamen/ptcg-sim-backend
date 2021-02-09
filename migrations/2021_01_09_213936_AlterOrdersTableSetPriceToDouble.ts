import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterOrdersTableSetPriceToDouble extends Migration {

    tableName = 'orders';

    async up() {
        await Schema.table(this.tableName, (table) => {
            table.double('price', 15, 2).change();
        });
    }

    async down() {

    }
}
