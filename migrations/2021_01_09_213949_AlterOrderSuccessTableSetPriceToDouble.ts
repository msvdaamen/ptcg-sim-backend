import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterOrderSuccessTableSetPriceToDouble extends Migration {

    tableName = 'orders_success';

    async up() {
        await Schema.table(this.tableName, (table) => {
            table.double('price', 15, 2).change();
        });
    }

    async down() {

    }
}
