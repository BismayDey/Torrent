// Dummy data for torrents
const torrents = [
  {
    name: "Movie A",
    category: "movies",
    seeders: 250,
    leechers: 30,
    size: "1.5 GB",
    magnet: "#",
    download: "#",
  },
  {
    name: "Game B",
    category: "games",
    seeders: 400,
    leechers: 50,
    size: "5 GB",
    magnet: "#",
    download: "#",
  },
  {
    name: "App C",
    category: "apps",
    seeders: 100,
    leechers: 10,
    size: "500 MB",
    magnet: "#",
    download: "#",
  },
  {
    name: "Movie D",
    category: "movies",
    seeders: 500,
    leechers: 60,
    size: "2.5 GB",
    magnet: "#",
    download: "#",
  },
  {
    name: "App E",
    category: "apps",
    seeders: 50,
    leechers: 5,
    size: "200 MB",
    magnet: "#",
    download: "#",
  },
];

let currentPage = 1;
const torrentsPerPage = 3;
let filteredTorrents = torrents;

// Populate torrents
function populateTorrents(page = 1) {
  const torrentList = document.getElementById("torrent-list");
  const startIndex = (page - 1) * torrentsPerPage;
  const endIndex = startIndex + torrentsPerPage;
  const paginatedTorrents = filteredTorrents.slice(startIndex, endIndex);

  torrentList.innerHTML = ""; // Clear current list

  paginatedTorrents.forEach((torrent) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <strong>${highlightSearchTerm(torrent.name)}</strong><br>
            <div class="details">
                Seeders: ${torrent.seeders}, Leechers: ${
      torrent.leechers
    }, Size: ${torrent.size}<br>
                <a href="${torrent.magnet}">Magnet Link</a> | <a href="${
      torrent.download
    }">Download</a>
            </div>`;
    listItem.onclick = () => alert(`Opening details for ${torrent.name}`);
    torrentList.appendChild(listItem);
  });
}

// Search function
function searchTorrents() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  filteredTorrents = torrents.filter((torrent) =>
    torrent.name.toLowerCase().includes(searchInput)
  );
  currentPage = 1;
  populateTorrents();
}

// Highlight search term in results
function highlightSearchTerm(name) {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  if (!searchInput) return name;
  return name.replace(
    new RegExp(searchInput, "gi"),
    (match) => `<span class="highlight">${match}</span>`
  );
}

// Sort torrents
function sortTorrents() {
  const sortBy = document.getElementById("sort-by").value;
  if (sortBy === "seeders") {
    filteredTorrents.sort((a, b) => b.seeders - a.seeders);
  } else if (sortBy === "size") {
    filteredTorrents.sort((a, b) => parseSize(b.size) - parseSize(a.size));
  } else if (sortBy === "name") {
    filteredTorrents.sort((a, b) => a.name.localeCompare(b.name));
  }
  populateTorrents(currentPage);
}

function parseSize(size) {
  const [value, unit] = size.split(" ");
  const multiplier = unit === "GB" ? 1024 : 1;
  return parseFloat(value) * multiplier;
}

// Filter by category
function filterCategory(category) {
  filteredTorrents =
    category === "all"
      ? torrents
      : torrents.filter((torrent) => torrent.category === category);
  currentPage = 1;
  populateTorrents();
}

// Dark/Light Mode Toggle
document.getElementById("theme-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// Pagination
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    populateTorrents(currentPage);
  }
}

function nextPage() {
  if (currentPage * torrentsPerPage < filteredTorrents.length) {
    currentPage++;
    populateTorrents(currentPage);
  }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loader").style.display = "none"; // Hide loader
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }
  populateTorrents();
});
