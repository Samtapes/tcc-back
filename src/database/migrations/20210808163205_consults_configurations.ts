import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('consults_configurations', function(table) {
    table.uuid('medic_id').primary().notNullable().unique();
    table.foreign('medic_id').references('user_id').inTable('medics');

    table.float('price').notNullable();
    table.time('start_of_work').notNullable();
    table.time('end_of_work').notNullable();
    table.string('description').notNullable();
    table.string('additional_info');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('consults_configurations');
}

