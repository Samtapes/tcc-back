import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', function(table) {
    table.uuid('id').primary().notNullable().unique();

    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.uuid('sender_id').notNullable();
    table.foreign('sender_id').references('id').inTable('users');

    table.uuid('consult_id').notNullable();
    table.foreign('consult_id').references('id').inTable('consults');

    table.string('title', 100).notNullable();
    table.time('proposed_time');
    table.text('text');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications');
}

