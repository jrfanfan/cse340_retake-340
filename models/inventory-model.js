const pool = require("../database/")
const utilities =  require("../utilities/")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationDetail(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      WHERE i.inv_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


/* ***************************
 *  Add new classification_name 
 * ************************** */
 async function addNewClassification(x) {
  return await pool.query(`INSERT INTO public.classification (classification_name) VALUES ("${x}")`);
 }




module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByClassificationDetail, addNewClassification};
