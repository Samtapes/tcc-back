import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('consults', function (table) {
    table.uuid('id').primary().unique().notNullable();

    table.uuid('medic_id').notNullable();
    table.foreign('medic_id').references('id').inTable('users_id');

    table.uuid('patient_id').notNullable();
    table.foreign('patient_id').references('id').inTable('user_id');

    table.date('date').notNullable();
    table.time('scheduled_time').notNullable();

    table.string('additional_info');
    table.boolean('confirmed').notNullable().defaultTo(0);

    table.time('started_at');
    table.time('finished_at');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('consults');
}

