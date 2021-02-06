import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateUsersTable extends Migration {

    async up() {
        await Schema.create('users', (table) => {
            table.id();
            table.string('email');
            table.string('password');
            table.double('balance', 15, 2).default(0).after('password');
        });
    }

    async down() {
        await Schema.dropIfExists('users');
    }
}
