import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateSeriesTable extends Migration {

    async up() {
        await Schema.create('series', (table: Blueprint) => {
            table.id();
            table.string('name').unique();
        });
    }

    async down() {
        await Schema.dropIfExists('series');
    }
}
