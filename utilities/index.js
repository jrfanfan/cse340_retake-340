const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    console.log(data)
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid2 = async function(data){
  let grid2
  if(data.length > 0){
    data.forEach(vehicle => { 
      grid2 = `<div class="inv_detail">`
      grid2 += `<p>This vehicle has passed inspection <br> by an ASE-cetified technician.</p> `
      grid2 += `</div>`
      grid2 +=`<img src="` + vehicle.inv_image +  `" ` + ` alt="Image of ` + vehicle.inv_make + ` `
      + vehicle.inv_model + ` on CSE Motors"/>`
      grid2 += `<hr style="width:500px; margin-left:0px; height: 25px; margin-top: -4px; background-color:green">`
      grid2 += `<div class="aside">`
      grid2 +=  `<h3>` + vehicle.inv_year + ` ` + vehicle.inv_make + ` ` + vehicle.inv_model
      grid2 += `</h3>` 
      grid2 += `<div id="price-view">`
      grid2 += `<p>` + `No-Haggle Price` + ` `
      grid2 +=  `$` + vehicle.inv_price
      grid2 += `</p>`
      grid2 += `</div>`
      grid2 += `</div>`
      

      
           
    })
    
  } else { 
    grid2 += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid2
}


module.exports = Util