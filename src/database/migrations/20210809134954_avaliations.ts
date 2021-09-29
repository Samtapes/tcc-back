import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('avaliations', function (table) {
    table.uuid('consult_id').primary().notNullable().unique();
    table.foreign('consult_id').references('id').inTable('consults');

    table.integer('stars', 1).notNullable();
    table.string('text');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('avaliations');
}

