alert('If your page is empty after you click OK, you must go to visual code, go to terminal (Run active file) and enter in node server.js. After entering in you will see "Server is running on http://localhost:3000"      Go to the Link. Otherwise ignore this message.')
document.addEventListener('DOMContentLoaded', (event) => {

    let usersData = []; // To store the users data

    // Fetch the users data from data.json
    fetch('js/data.json')
        .then(response => response.json())
        .then(data => {
            usersData = data.users; // Store the users data
            displayUsers(1); // Display users for the first page
            setupPagination(); // Setup pagination buttons
        })
        .catch(error => console.error('Error fetching data:', error));

    const usersPerPage = 10; // Number of users to display per page
    let currentPage = 1; // Current page

// Function to display users for a given page
function displayUsers(page) {
    const userList = document.getElementById('user-list');
    const totalUsersElem = document.getElementById('totalUsers');
    
    // Clear previous list
    userList.innerHTML = '';

    // Calculate start and end index of users for the current page
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = usersData.slice(startIndex, endIndex);

    // Update total users count
    totalUsersElem.textContent = usersData.length;

    // Loop through paginated users and display them
    paginatedUsers.forEach(user => {
        const userElement = `
        <div class="user-item">
            <div class="user-info">
                <img src="${user.image}" alt="${user.name}" />
                <div class="user-details">
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            <div class="joined-info">
                <p>Joined: ${user.joined}</p>
            </div>
        </div>`;
        userList.innerHTML += userElement;
    });
}

    // Function to set up pagination buttons
    function setupPagination() {
        const totalPages = Math.ceil(usersData.length / usersPerPage);
        const paginationButtons = document.getElementById('pagination-buttons');
        
        // Clear previous pagination buttons
        paginationButtons.innerHTML = '';

        // Create buttons for each page
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;

            // Add event listener to each button
            button.addEventListener('click', () => {
                currentPage = i;
                displayUsers(currentPage);
            });

            paginationButtons.appendChild(button);
        }
    }

});

