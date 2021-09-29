import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts_data', function (table) {
    table.uuid('user_id').primary().unique().notNullable();
    table.foreign('user_id').references('id').inTable('id');

    table.integer('age', 3);
    table.float('mass');
    table.string('chronic_diseases');

    table.timestamp('updated_at');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts_data');
}

