import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('connections', function(table) {
    table.uuid('user_id').primary().unique().notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.string('socket_id', 50).unique();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('connections');
}

