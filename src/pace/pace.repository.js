function createPaceRepository(knex, table = "pace_record") {
  /**
   * @param {number} id - 顧客の ID
   * @return {Promise<Object|undefined>} id に合致する顧客データ、不合致の場合は undefined
   */
  const findById = async (id) => {
    const chk = await knex(table).where("id", id).first();
    return chk;
  };
  return { findById };
}

module.exports = { createPaceRepository };
