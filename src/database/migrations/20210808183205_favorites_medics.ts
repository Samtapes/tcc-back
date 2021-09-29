import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favorites_medics', function (table) {
    table.uuid('id').primary().unique().notNullable();

    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.uuid('medic_id').notNullable();
    table.foreign('medic_id').references('id').inTable('users');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favorites_medics');
}

