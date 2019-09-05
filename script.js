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

function addRowToElementByArray(element, array) {
  const row = element.insertRow();

  for (let item of array) {
    const cell = row.insertCell();

    cell.innerText = item;
  }

  countsTableElement.append(element);
}

function buildTableBodyByCountsCoincidences(countsCoincidences) {
  const oldTbody = countsTableElement.childNodes[1];
  const tbody = document.createElement("tbody");

  if (oldTbody) oldTbody.remove();

  addRowToElementByArray(tbody, countsCoincidences);
}

function buildTableHeadBySearchKeys() {
  const thead = document.createElement("thead");

  addRowToElementByArray(thead, searchKeys);
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
