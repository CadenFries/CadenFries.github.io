document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));   
});

const submitBtn = document.querySelector('#submitBtn');

submitBtn.onclick = function() {
    const nameInput = document.querySelector('#name');
    const setsInput = document.querySelector('#sets');
    const repsInput = document.querySelector('#reps');
    const dayInput = document.querySelector('#day');
    const name = nameInput.value;
    const sets = setsInput.value;
    const reps = repsInput.value;
    const day = dayInput.value;
    nameInput.value = "";
    setsInput.value = "";
    repsInput.value = "";
    dayInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name, sets : sets, reps : reps, day : day})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0){
        table.innerHTML = "<tr><td class ='no-data' colspan='6'>No Data</td></tr>"
        return;
    }
    let tableHtml = "";
    data.forEach(function({Id, Name, Sets, Reps, Day}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${Id}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Sets}</td>`;
        tableHtml += `<td>${Reps}</td>`;
        tableHtml += `<td>${Day}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${Id}>Delete</button></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.Id}>Delete</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function switchTheme(){
    var website = document.body;
    if (website.classList.contains("lightMode")){
        return website.classList.toggle("darkMode");
    }else{
        return website.classList.toggle("lightMode");
    }
}

function getFeedbackData(){
    var numOfWords = countWords()
    var rating = getRating()
    alert("Number of words in your feedback: " + numOfWords + "\nYour Rating: " + rating);
}

function countWords(){
    var text = document.getElementById("feedback").value;
    var numWords = 0;
    for (var i = 0; i < text.length; i++) {
        var currentCharacter = text[i];
        if (currentCharacter == " ") {
            numWords += 1;
        }
    }
    numWords += 1;
    return numWords.toString();
}

function getRating(){
    if (document.getElementById("1Star").checked == true){
        return "1";
    }else if (document.getElementById("2Star").checked == true){
        return "2";
    }else if (document.getElementById("3Star").checked == true){
        return "3";
    }else if (document.getElementById("4Star").checked == true){
        return "4";
    }else if (document.getElementById("5Star").checked == true){
        return "5";
    }
}