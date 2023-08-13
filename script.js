// Function to fetch JSON data
async function fetchJobListings() {
    try {
      const response = await fetch('jobs-data.json');
      const data = await response.json();
      return data.jobListings;
    } catch (error) {
      console.error('Error fetching job listings:', error);
      return []; // Return an empty array in case of an error
    }
  }
  
  // Function to populate the job listings on the page
  async function populateJobListings() {
    const jobListings = await fetchJobListings();
  
    const jobListElement = document.getElementById('job-list');
    jobListElement.innerHTML = ''; // Clear the existing job listings
  
    // Loop through the jobListings array and create HTML elements for each job listing
    jobListings.forEach((job) => {
      const jobItem = document.createElement('li');
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p>Company: ${job.company}</p>
        <p>Location: ${job.location}</p>
        <p>Description: ${job.description}</p>
        <a href="${job.applyLink}" target="_blank">Apply Now</a>
      `;
      jobListElement.appendChild(jobItem);
    });
  }
  
  // Call the function to populate the job listings on page load
  populateJobListings();
  





  // Add this function to filter jobs based on keywords and location
// Update the filtering function to handle cases with one filter input
function filterJobsByKeywordsAndLocation(jobs, keywords, location) {
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(keywords.toLowerCase());
    const descriptionMatch = job.description.toLowerCase().includes(keywords.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());

    // Filter when both keywords and location are entered
    if (keywords && location) {
      return (titleMatch || descriptionMatch) && locationMatch;
    }

    // Filter when only one filter is entered (either keywords or location)
    return keywords ? titleMatch || descriptionMatch : locationMatch;
  });
  return filteredJobs;
}

  
  // Function to handle job search
  async function searchJobs(event) {
    event.preventDefault();
  
    const keywordInput = document.getElementById('keywordInput').value;
    const locationInput = document.getElementById('locationInput').value;
  
    const jobListings = await fetchJobListings();
  
    const filteredJobs = filterJobsByKeywordsAndLocation(jobListings, keywordInput, locationInput);
  
    const jobListElement = document.getElementById('job-list');
    jobListElement.innerHTML = ''; // Clear the existing job listings
  
    // Loop through the filteredJobs array and create HTML elements for each job listing
    filteredJobs.forEach((job) => {
      const jobItem = document.createElement('li');
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p>Company: ${job.company}</p>
        <p>Location: ${job.location}</p>
        <p>Description: ${job.description}</p>
        <a href="${job.applyLink}" target="_blank">Apply Now</a>
      `;
      jobListElement.appendChild(jobItem);
    });
  }
  
  // Call the function to populate the job listings on page load
  populateJobListings();
  
  async function initializeJobListings() {
    const jobListings = await fetchJobListings();
    console.log(jobListings); // Check if the fetched data is displayed in the console
    displayJobListings(jobListings);
  }
  

