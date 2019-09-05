"use strict";

const searchKeys = ["a", "b", "c"];
const textInputElement = document.getElementById("testString");
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: searchKeys,
    datasets: [
      {
        data: searchKeys.map(() => 0),
        backgroundColor: searchKeys.map(() => getRandomColor())
      }
    ]
  }
});

textInputElement.oninput = function(event) {
  const currentInputText = event.target.value;
  const countsCoincidences = getCountsCoincidencesOfText(currentInputText);

  updateChartByCountsCoincidences(countsCoincidences);
};

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
