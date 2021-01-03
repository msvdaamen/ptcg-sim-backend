import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateUsersTable extends Migration {

    async up() {
        await Schema.create('users', (table) => {
            table.id();
            table.string('email');
            table.string('password');
        });
    }

    async down() {
        await Schema.dropIfExists('users');
    }
}
