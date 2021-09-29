import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('specializations', function (table) {
    table.uuid('id').primary().unique().notNullable();

    table.string('name', 100).notNullable().unique();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('specializations');
}

