import {Migration, Blueprint, Schema} from 'migrationjs';


export default class CreatePacksTable extends Migration {

    tableName = 'packs';

    async up() {
        await Schema.create(this.tableName, (table) => {
            table.id();
            table.string('title');
            table.text('description');
            table.unsignedInteger('price')
            table.unsignedTinyInteger('common');
            table.unsignedTinyInteger('uncommon');
            table.unsignedTinyInteger('holo');
            table.unsignedTinyInteger('rare');
        });
    }

    async down() {
        await Schema.dropIfExists(this.tableName);
    }
}
