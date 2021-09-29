import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medics', function (table) {
    table.uuid('user_id').primary().unique().notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.uuid('specialization_id').notNullable();
    table.foreign('specialization_id').references('id').inTable('specializations');

    table.string('register_number', 50).unique().notNullable();
    table.string('description');
    table.string('phone_number', 50).unique().notNullable();
    table.string('patient_preferences');
    
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medics');
}

