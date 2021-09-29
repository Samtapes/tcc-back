import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table){
    table.uuid('id').primary().unique().notNullable();

    table.string('image_url');
    table.string('name', 100).notNullable();
    table.string('email', 150).notNullable().unique();
    table.string('password', 100).notNullable();

    table.boolean('is_medic').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

