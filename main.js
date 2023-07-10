(() => {

    // Event listener for the "Show All Countries" button:
    showAllCountriesButton.addEventListener("click", async function showAllCountries() {
        try {
            const url = "https://restcountries.com/v3.1/all";
            const response = await fetch(url);
            const countries = await response.json();
            displayCountries(countries); // Display the countries
            const regions = getRegions(countries); // Get regions and counts
            displayRegions(regions); // Display the regions
        }
        catch (err) {
            alert(err.message);
        }
    });

    // Display the countries in the table:
    function displayCountries(countries) {
        let content = "";
        for (const country of countries) {
            const tr = `
                <tr>
                    <td>${country.name.official}</td>
                    <td>${country.population}</td>
                </tr>
            `;
            content += tr;
        }
        tableBody.innerHTML = content; // Set the table body content
        const table = document.getElementsByTagName("table")[0];
        table.style.visibility = "visible"; // Make the table visible

        const total = totalCountries(countries); // Calculate total number of countries
        totalCountriesPar.innerHTML = "Total countries result: " + total; // Display total countries

        const totalPopulation = totalCountriesPopulation(countries); // Calculate total population
        totalPopulationPar.innerHTML = "Total Countries Population: " + totalPopulation; // Display total population

        const avgPopulation = averagePopulation(totalPopulation, total); // Calculate average population
        avgPopulationPar.innerHTML = "Average population: " + avgPopulation; // Display average population
    }

    // Calculate total number of countries:
    function totalCountries(countries) {
        const totalCountries = countries.length;
        return totalCountries;
    }

    // Calculate total population of all countries:
    function totalCountriesPopulation(countries) {
        let totalPopulation = 0;
        for (const country of countries) {
            const population = country.population;
            totalPopulation += population;
        }
        return totalPopulation;
    }

    // Calculate average population:
    function averagePopulation(totalPopulation, total) {
        const avg = totalPopulation / total;
        return Math.round(avg);
    }

    // Event listener for the "Search Countries" button:
    searchCountriesButton.addEventListener("click", async function searchCountries() {
        const name = searchBox.value;
        if (name === "") {
            swal("Error!", "Missing name of country!", "error");
            searchBox.style.backgroundColor = "pink";
            return false;
        }
        searchBox.style.backgroundColor = "";
        searchBox.value = "";
        try {
            const url = `https://restcountries.com/v3.1/name/${name}`;
            const response = await fetch(url);
            const countries = await response.json();
            displayCountries(countries); // Display the searched countries
            const regions = getRegions(countries); // Get regions and counts
            displayRegions(regions); // Display the regions
        }
        catch (err) {
            alert(err.message);
        }
    });

    // Get regions and their counts:
    function getRegions(countries) {
        const map = new Map();

        for (const country of countries) {

            // If region doesn't exist:
            if (!map.has(country.region)) {
                map.set(country.region, 1);
            }
            else { // Region exists:
                const counter = map.get(country.region);
                map.set(country.region, counter + 1);
            }

        }

        const regions = [];
        for (const key of map.keys()) {
            regions.push({
                region: key,
                count: map.get(key)
            });
        }

        return regions;
    }

    // Display the regions and their counts:
    function displayRegions(regions) {
        let content = "";
        for (const region of regions) {
            const tr = `
                <tr>
                    <td>${region.region}</td>
                    <td>${region.count}</td>
                </tr>
            `;
            content += tr;
        }
        tBody.innerHTML = content; // Set the table body content
        const table = document.getElementsByTagName("table")[1];
        table.style.visibility = "visible"; // Make the table visible
    }

})();
