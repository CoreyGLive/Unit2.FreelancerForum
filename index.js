 /**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === Helper Functions ===
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomRate(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /** Returns a single freelancer object */
    function createRandomFreelancer() {
      return {
        name: getRandomElement(NAMES),
        occupation: getRandomElement(OCCUPATIONS),
        rate: getRandomRate(PRICE_RANGE.min, PRICE_RANGE.max),
      };
    }

    // === Application State ===
    const freelancers = Array.from({ length: NUM_FREELANCERS }, createRandomFreelancer);

    function calculateAverageRate(freelancers) {
      const total = freelancers.reduce((sum, f) => sum + f.rate, 0);
      return (total / freelancers.length).toFixed(2);
    }

    const averageRate = calculateAverageRate(freelancers);

    // === Component Functions ===
    function FreelancerRow({ name, occupation, rate }) {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${name}</td>
        <td>${occupation}</td>
        <td>$${rate}/hr</td>
      `;

      return tr;
    }

    function FreelancerRows(freelancers) {
      const tbody = document.createElement("tbody");
      tbody.id = "FreelancerRows";

      freelancers.forEach(freelancer => {
        tbody.appendChild(FreelancerRow(freelancer));
      });

      return tbody;
    }

    function AverageRateComponent(avgRate) {
      const div = document.createElement("div");
      div.innerHTML = `<h2>Average Hourly Rate: $${avgRate}</h2>`;
      return div;
    }

    function App() {
      const container = document.createElement("div");

      const avgRateEl = AverageRateComponent(averageRate);
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody id="FreelancerRows"></tbody>
      `;

      table.querySelector("#FreelancerRows").replaceWith(FreelancerRows(freelancers));

      container.appendChild(avgRateEl);
      container.appendChild(table);

      return container;
    }

    // === Render Function ===
    function render() {
      const app = document.getElementById("app");
      app.innerHTML = ""; // Clear any previous content
      app.appendChild(App());
    }

    render();