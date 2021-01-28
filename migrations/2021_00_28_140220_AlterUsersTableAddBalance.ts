import {Migration, Blueprint, Schema} from 'migrationjs';


export default class AlterUsersTableAddBalance extends Migration {

    tableName = 'users';

    async up() {
        await Schema.table(this.tableName, (table) => {
            table.unsignedInteger('balance').default(0).after('password');
        });
    }

    async down() {

    }
}
