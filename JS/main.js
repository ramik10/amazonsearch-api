const response = document.getElementById("response");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  getData();
});
//forms the search query from user input
function formQuery(raw) {
  let query = `http://localhost:8080/?q= + ${raw.value}`;
  return query;
}

function format(num, json) {
  let tr = `<tr>`;
  tr += `<td>${num + 1}</td>`;

  try {
    Object.entries(json).forEach(([key, value]) => {
      tr += `<td>${value}</td>`;
    });
  } catch (error) {
    console.error(error);
  }
  tr += `</tr>`;
  return tr;
}

//displays the response data
function getHeader(str) {
  console.log("str: ", str);
  let headers = Array();
  try {
    Object.entries(str).forEach(([key, value]) => {
      headers.push(key.toUpperCase());
    });
  } catch (error) {
    console.error(error);
  }

  return headers;
}
function display(rawData) {
  console.log(rawData);
  
  try {
    let data = JSON.parse(rawData);
    let table = "<table class='table table-hover table-dark'>";
    data = data.result;
    if (data.length === 0) {
      response.style.transform = "scale(.9, .9)";
      response.innerHTML = `<div class="alert alert-danger" role="alert">
        Please Retry 
        </div>`;
      return;
    }
    
    let headers = getHeader(data[0]);
    table += `<tr>`;
    table += `<th>#</th>`;
    headers.forEach((header) => {
      table += `<th>${header}</th>`;
    });
    table += `</tr>`;

    console.log(table);
    data.forEach((value, key) => {
      console.log(key, value);
      table += format(key, value);
    });
    table += "</table>";
    response.innerHTML = table;
  } catch (error) {
    console.error(error);
  }
}
//sends AJAX request to the API
function getData() {
  const xhttp = new XMLHttpRequest();
  response.style.transform = null;
  response.innerHTML = "Please wait...."; 
  const rawQuery = document.getElementById("query");
  let query = formQuery(rawQuery);
  

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      display(this.responseText);
    }
  };

  xhttp.open("GET", query, true);
  xhttp.send();
}
