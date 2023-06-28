/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('produtos', table => {
        table.increments('id')
        table.text('descricao',255)
        table.text('marca',128)
        table.float('valor')
        table.time('created_at').defaultTo(knex.fn.now())
        table.time('updated_at')
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("produtos");
};
