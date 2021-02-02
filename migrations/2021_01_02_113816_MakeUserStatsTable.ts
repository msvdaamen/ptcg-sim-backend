import {Migration, Blueprint, Schema} from 'migrationjs';


export default class MakeUserStatsTable extends Migration {

    tableName = 'user_stats';

    async up() {
        await Schema.create(this.tableName, (table) => {
            table.unsignedInteger('user_id');
            table.unsignedInteger('packs_opened').default(0);

            table.primary('user_id');
            table.foreign('user_id').references('id').on('users').onDelete('cascade');
        });
    }

    async down() {
        await Schema.dropIfExists(this.tableName);
    }
}
