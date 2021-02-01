import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterImagesTableAddHasDownloaded extends Migration {

    tableName = 'images';

    async up() {
        await Schema.table(this.tableName, (table) => {
            table.boolean('has_downloaded').default(false);
        });
    }

    async down() {

    }
}
