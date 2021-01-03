import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class CreateCardsTable extends Migration {

    async up() {
        await Schema.create('cards', (table: Blueprint) => {
            table.id();
            table.string('custom_id');
            table.unsignedInteger('image_id').nullable();
            table.unsignedInteger('hres_image_id').nullable();
            table.unsignedInteger('card_set_id');
            table.unsignedInteger('artist_id').nullable();
            table.unsignedInteger('series_id');
            table.unsignedInteger('subtype_id').nullable();
            table.unsignedInteger('supertype_id');
            table.unsignedInteger('ability_id').nullable();
            table.unsignedInteger('rarity_id').nullable();
            table.string('name');
            table.string('hp').nullable();
            table.unsignedInteger('number').nullable();
            table.unsignedInteger('national_pokedex_number').nullable();
            table.text('description').nullable();
            table.string('ancient_trait').nullable();

            table.foreign('image_id').references('id').on('images').onDelete('set null');
            table.foreign('hres_image_id').references('id').on('images').onDelete('set null');
            table.foreign('card_set_id').references('id').on('card_sets').onDelete('cascade');
            table.foreign('artist_id').references('id').on('artists').onDelete('set null');
            table.foreign('series_id').references('id').on('series').onDelete('cascade');
            table.foreign('subtype_id').references('id').on('types').onDelete('set null');
            table.foreign('supertype_id').references('id').on('types').onDelete('cascade');
            table.foreign('ability_id').references('id').on('abilities').onDelete('set null');
            table.foreign('rarity_id').references('id').on('rarities').onDelete('set null');
        });
    }

    async down() {
        await Schema.dropIfExists('cards');
    }
}
