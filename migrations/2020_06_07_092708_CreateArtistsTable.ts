import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateArtistsTable extends Migration {

    async up() {
        await Schema.create('artists', (table: Blueprint) => {
            table.id();
            table.string('name').unique();
        })
    }

    async down() {
        await Schema.dropIfExists('artists');
    }
}
