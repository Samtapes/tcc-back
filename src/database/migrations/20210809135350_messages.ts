import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', function (table) {
    table.uuid('id').primary().unique().notNullable();

    table.uuid('consult_id').notNullable();
    table.foreign('consult_id').references('id').inTable('consults');

    table.uuid('sender_id').notNullable();
    table.foreign('sender_id').references('id').inTable('users');

    table.text('text').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages')
}

