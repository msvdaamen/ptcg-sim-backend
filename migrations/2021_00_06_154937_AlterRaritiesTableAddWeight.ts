import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class AlterRaritiesTableAddValue extends Migration {

    async up() {
        await Schema.table('rarities', (table) => {
            table.unsignedMediumInteger('weight').default(100).after('name');
        })
    }

    async down() {

    }
}
