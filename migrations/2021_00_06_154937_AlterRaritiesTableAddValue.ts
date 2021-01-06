import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class AlterRaritiesTableAddValue extends Migration {

    async up() {
        await Schema.table('rarities', (table) => {
            table.double('value', 4, 3).default(1).after('name');
        })
    }

    async down() {

    }
}
