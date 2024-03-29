const invModel = require("../models/inventory-model")
const pool = require("../database/")
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
  grid3 += `<a href="/../inv/addInventory">Add New Vehicle</a>` 
  grid3 += `</div>`
     
  return grid3



}






Util.buildAddClassificationGrid4 = async function() {
  let grid4
  grid4 = `<h1>`
  grid4 += `Add New Classification`
  grid4 += `</h1>`
  grid4 += `<div class="newClassification">`
  grid4 += `<h3>Field is required</h3>`
  grid4 += `<div id="form">`
  grid4 += `<h3>Classification Name</h3>`
  grid4 += `<form action="/inv/addNewClassification/" id="form1" method="get">
  <label for="newClassification">NAME MUST BE ALPHABETIC CHARACTERS ONLY.</label>
  <input type="text" id="newClassification" name="classification_name" pattern="[A-Za-z]{3,20}"  required autofocus>
  <br><br>
  <p id="demo">There</p>
  <input type="submit" value="New Classification" id="submit" onclick="loadDoc()" >`
  grid4 += `</form>`
  grid4 += `</div>`     
  grid4 += `</div>`
  grid4 += `<script>` +
  async function loadDoc() {
    let a = document.querySelector('#newClassification').value;
    invModel.addNewClassification(toString("je suis"));
    
  }
  
  grid4 += `</script>`
  return grid4
  
  }

 
  


Util.builAddInvetorydGrid5 =  async function() {
  let data = await invModel.getClassifications()
  let grid5
  grid5 = `<h1>`
  grid5 += `Add New Inventory`
  grid5 += `</h1>`
  grid5 += `<div class="newInventory">`
  grid5 += `<h3>ALL FIELDS ARE REQUIRED</h3>`
  grid5 += `<div id="form">`
  grid5 += `<form action="" id="form2">`
  grid5 += `<label for="chooseClassification">Classification</label>`
  grid5 += `<select id="chooseClassification" name="classification" required>`
  grid5 +=` <option value="">--Choose a Classification--</option>`
  grid5 += `<ul>`
  data.rows.forEach((row) => {
    grid5 += `<li>`
    grid5 += `<option>` 
    grid5 +=  row.classification_name
    grid5 += `</option>`
    grid5 += `</li>`
  })
  grid5 += `</ul>`
  grid5 += `</select> <br>`
  grid5 += `<label for="invMake">Make</label>
  <input name="inv_make" id="invMake" type="text"  minlength="3" placeholder="Min of 3 characters" required><br>
  <label for="invModel">Model</label>
  <input name="inv_model" id="invModel" type="text"  minlength="3" placeholder="Min of 3 characters" required>
  <label for="invDescription">Description</label> <textarea name=" inv_description" id="description" rows="4" cols="25" required></textarea>
  <label for="invImage">Image Path</label> <input name="inv_image" id="invImage" type="text" placeholder="/images/vehicles/no-image.png">
  <label for="invImageThumbnail">Thumbnail Path</label> <input name="inv_thumbnail" id="invThumnail" type="text" placeholder="/images/vehicles/no-image.png">
  <label for="invPrice">Price</label><input name="inv_price" id="invPrice" type="text"  placeholder="Decimal or integer" required>
  <label for="invYear">Year</label><input name="inv_year" id="invYear" type="text" minlength="4"  maxlength="4" placeholder="4-digit Year" required>
  <label for="invColor">Color</label><input name="inv_color" id="invColor" type="text" minlength="4" required><br>
  <input type="submit" value="Add Inventory" id="submit"><br><br>`
  grid5 += `</form>`
  grid5 += `</div>`
  grid5 += `</div>`
  return grid5
}
module.exports = Util