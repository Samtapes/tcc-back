import { Knex } from "knex";
import { GetDateTime } from "../GetDateTime";

const getDateTime = new GetDateTime();


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('open_days', function(table) {
    table.uuid('id').primary().unique().notNullable();

    table.uuid('medic_id').notNullable();
    table.foreign('medic_id').references('user_id').inTable('medics');

    table.date('date').notNullable().defaultTo(getDateTime.date());

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('open_days');
}

