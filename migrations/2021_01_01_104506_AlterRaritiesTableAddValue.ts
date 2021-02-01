import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterRaritiesTableAddValue extends Migration {

    tableName = 'rarities';

    async up() {
        await Schema.table(this.tableName, (table) => {
            table.dropColumn('weight');
            table.unsignedSmallInteger('value').default(1);
        });
    }

    async down() {

    }
}
