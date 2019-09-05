"use strict";

const searchKeys = ["a", "b", "c"];
const startCountsCoincidences = searchKeys.map(() => 0);
const textInputElement = document.getElementById("testString");
const countsTableElement = document.getElementById("countsResultTable");
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: searchKeys,
    datasets: [
      {
        data: startCountsCoincidences,
        backgroundColor: searchKeys.map(() => getRandomColor())
      }
    ]
  }
});

buildTableHeadBySearchKeys();
buildTableBodyByCountsCoincidences(startCountsCoincidences);

textInputElement.oninput = function(event) {
  const currentInputText = event.target.value;
  const countsCoincidences = getCountsCoincidencesOfText(currentInputText);

  updateChartByCountsCoincidences(countsCoincidences);
  buildTableBodyByCountsCoincidences(countsCoincidences);
};

function buildTableBodyByCountsCoincidences(countsCoincidences) {
  const oldTbody = countsTableElement.childNodes[1];
  const tbody = document.createElement("tbody");
  const row = tbody.insertRow();

  if (oldTbody) oldTbody.remove();

  for (let countsCoincidence of countsCoincidences) {
    const cell = row.insertCell();

    cell.innerText = countsCoincidence;
  }

  countsTableElement.append(tbody);
}

function buildTableHeadBySearchKeys() {
  const thead = document.createElement("thead");
  const row = thead.insertRow();

  for (const searchKey of searchKeys) {
    const cell = row.insertCell();

    cell.innerText = searchKey;
  }

  countsTableElement.append(thead);
}

function getCountsCoincidencesOfText(text) {
  return searchKeys.map(searchKey => {
    let coincidencesArray;

    if (text) coincidencesArray = text.match(new RegExp(searchKey, "g"));

    return coincidencesArray ? coincidencesArray.length : 0;
  });
}

function getRandomColor() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

function updateChartByCountsCoincidences(countsCoincidences) {
  chart.data.datasets[0].data = countsCoincidences;
  chart.update();
}
