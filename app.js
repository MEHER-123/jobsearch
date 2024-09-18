const searchInput = document.getElementById("searchInput");
const form = document.getElementById("form");
const result = document.getElementById("result");
const loadMoreButton = document.getElementById("loadMore");
let currentPage = 1;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentPage = 1;
    const search = searchInput.value;
    const url = `https://jsearch.p.rapidapi.com/search?query=${search}&page=1&num_pages=1`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9be47a18e8mshd9d37c343a15380p15309bjsn308c368241dc',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(res => {
            displayResults(res);
            loadMoreButton.style.display='block';
        })
});
loadMoreButton.addEventListener("click", () => {
    currentPage++;
    const search = searchInput.value;
    const url = `https://jsearch.p.rapidapi.com/search?query=${search}&page=${currentPage}&num_pages=1`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9be47a18e8mshd9d37c343a15380p15309bjsn308c368241dc',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(res => {
            displayResults(res);
            
        })
});


function displayResults(res) {
    if(currentPage===1){
        result.innerHTML = '';
    }
    
    if (res.data && res.data.length > 0) {
        res.data.forEach(data => {
            const resultElement = document.createElement("div");
            resultElement.innerHTML = `
                <p>Job Description: <ul>
                ${data.job_description.split('\n').filter(Boolean).map(point => `<li>${point}</li>`).join('')}
                </ul></p>
                <p>Job_publisher: ${data.job_publisher}</p>
                <p>Job_id: ${data.job_id}</p>
                <p>Job Title: ${data.job_title}</p>
                <p>Job_City: ${data.job_city}</p>
                <p>Job_country: ${data.job_country}</p>
                <p>Job_apply_link: <a href="${data.job_apply_link}" target="_blank">${data.job_apply_link}</a></p>
                <p>Job_posted_at_datetime: ${data.job_posted_at_datetime_utc}</p>

                <hr>
            `;
            result.appendChild(resultElement);
        });
        loadMoreButton.style.display = (res.meta && res.meta.num_pages > currentPage) ? 'block' : 'none';
    } else {
        console.log("No results found.");
    }
}