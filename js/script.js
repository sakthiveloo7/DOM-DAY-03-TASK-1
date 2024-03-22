// Creating XML Request object
const req = new XMLHttpRequest();
// What should i do and where i have to connect
req.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
// Sending the request to the server
req.send() 
// what to do when the request is completed successfully
req.onload = function () {
        const jsonData = JSON.parse(this.response)

// Number of items per page
const itemsPerPage = 10;

// Current page
let currentPage = 1;

// Function to create pagination buttons
function createPaginationButtons(totalPages) {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    // First button
    const firstButton = document.createElement('button');
    firstButton.textContent = 'First';
    firstButton.addEventListener('click', function() {
        currentPage = 1;
        renderTable();
    });
    paginationContainer.appendChild(firstButton);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create buttons from 1 to totalPages
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', function() {
            currentPage = i;
            renderTable();
        });
        paginationContainer.appendChild(button);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    paginationContainer.appendChild(nextButton);

    // Last button
    const lastButton = document.createElement('button');
    lastButton.textContent = 'Last';
    lastButton.addEventListener('click', function() {
        currentPage = totalPages;
        renderTable();
    });
    paginationContainer.appendChild(lastButton);

return paginationContainer;

}

// Function to render table with data
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, jsonData.length);
    const currentData = jsonData.slice(startIndex, endIndex);

    const tableBody = document.querySelector('#table tbody');
    tableBody.innerHTML = ''; // Clear table body before rendering new data

    currentData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
        `;
        tableBody.appendChild(row);
    });

    const paginationButtons = createPaginationButtons(Math.ceil(jsonData.length / itemsPerPage));

    // Clear previous pagination buttons
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';
    buttonsContainer.appendChild(paginationButtons);
}

renderTable()
}