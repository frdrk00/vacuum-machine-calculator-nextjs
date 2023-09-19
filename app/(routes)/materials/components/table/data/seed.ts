import { faker } from "@faker-js/faker"

import { labels, priorities, statuses } from "./data"
import axios from "axios";

const apiUrl = "/api/materials/"; 

interface ApiResponse {
  id: number;
  title: string;
  description: string;
  // Add other fields as needed
}

async function fetchData() {
  try {
    // Fetch data from the API
    const response = await axios.get<ApiResponse[]>(apiUrl); // Provide the expected type as a generic parameter

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const tasks = response.data.map((item) => ({
        id: `TASK-${item.id}`,
        title: item.title,
        description: item.description,
        status: faker.helpers.arrayElement(statuses).value,
        label: faker.helpers.arrayElement(labels).value,
        priority: faker.helpers.arrayElement(priorities).value,
      }));

      console.log("✅ Tasks data fetched from the API.");
      console.log(tasks); // Output the fetched data to the console

      // You can process the fetched data as needed, but no need to write it to tasks.json
    } else {
      console.error("❌ Failed to fetch data from the API.");
    }
  } catch (error) {
    console.error("❌ An error occurred while fetching data:", error);
  }
}

// Call the fetchData function to initiate the data fetching process
fetchData();