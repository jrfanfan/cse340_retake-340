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
      grid2 +=`<img src="` + vehicle.inv_image +  `" ` + ` alt="Image of ` + vehicle.inv_make + ` `
      + vehicle.inv_model + ` on CSE Motors"/>`
      grid2 += `<hr style="width:490px; margin-left:0px; height: 25px; margin-top: -4px; background-color:green">`
      grid2 += `</div>`
      grid2 += `<div class="aside">`
      grid2 +=  `<h3>` + vehicle.inv_year + ` ` + vehicle.inv_make + ` ` + vehicle.inv_model
      grid2 += `</h3>` 
      grid2 += `<div id="price-view">`
      grid2 += `<p id="as_p">`+ `No-Haggle Price` +`<sup style="color:blue">1</sup>` +
      ` <====> ` + `$` + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + `</p>`
      grid2 += `<p id="as_p2">` + new Intl.NumberFormat('en-US').format(vehicle.inv_miles)
      + ` Miles`+ `</p>`
      grid2 += `</div>`
      grid2 += `</div>`
           
    })
    
  } else { 
    grid2 += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid2
}

Util.buildManagementGrid3 = async function() {
  let grid3
  grid3 = `<h1>`
  grid3 += `Vehicle Management`
  grid3 += `</h1>`
  grid3 += `<div class = "management">`
  grid3 += `<a href="/../inv/addNewClassification">Add New Classification </a> <br><br>` 
  grid3 += `<a href="url">Add New Vehicle</a>` 
  grid3 += `</div>`
     
  return grid3
}

Util.buildAddClassificationGrid4 = async function() {
  let grid4
  grid4 = `<h1>`
  grid4 += `Add New Classification`
  grid4 += `</h1>`
  grid4 += `<div class="addclassification">`
  grid4 += `<h3>Field is required</h3>`
  grid4 += `<div id="form">`
  grid4 += `<h3>Classification Name</h3>`
  grid4 += `<form action="/" id="form1">`
  grid4 += `<label for="addclassification">NAME MUST BE ALPHABETIC CHARACTERS ONLY.</label> <br>`
  grid4 += `<input type="text" id="addclassification" name="addclassification" required autofocus> <br> <br>`
  grid4 += `<input type="submit" value="Add Classification" id="submit"> <br><br>`
  grid4 += `</form>`
  grid4 += `</div>`
  grid4 += `</div>`
  return grid4

}

module.exports = Util