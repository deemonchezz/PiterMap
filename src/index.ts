/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import {
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  markers,
  garages,
} from "./data";
import "./style.css";

let map: google.maps.Map;
const markersGroup = {};

const renderData = (data, key) => {
  markersGroup[`marker${key}`] = [];
  data.forEach((el) => {
    markersGroup[`marker${key}`].push(
      new google.maps.Marker({
        position: { lat: el[0], lng: el[1] },
        map: map,
        icon: {
          url: `b${key}.png`,
          scaledSize: new google.maps.Size(7, 7),
        },
        zIndex: 100,
      }),
    );
  });
};

const renderMarkers = (array) => {
  array.forEach((el) => {
    const marker = new google.maps.Marker({
      position: el?.position,
      map: map,
      icon: {
        url: el?.icon,
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(16, 32),
      },
      title: el?.address,
      zIndex: 300,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: el?.address,
    });

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  });
};

function hideMarkers(key, value) {
  const currentGroup = markersGroup[`marker${key}`];
  for (var i = 0; i < currentGroup.length; i++) {
    currentGroup[i].setVisible(value);
  }
}

function initMap(): void {
  const center = new google.maps.LatLng(59.967502, 30.35128);
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 10,
    center: center,
    gestureHandling: "greedy",
  });

  renderData(data1, 1);
  renderData(data2, 2);
  renderData(data3, 3);
  renderData(data4, 4);
  renderData(data5, 5);
  renderData(data6, 6);
  renderData(data7, 7);
  renderData(data8, 8);
  renderData(data9, 9);
  renderData(data10, 10);
  renderData(data11, 11);
  renderData(data12, 12);
  renderData(data13, 13);

  renderMarkers(markers);
  renderMarkers(garages);

  var noPoi = [
    {
      featureType: "poi",
      elementType: "labels",

      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  map.setOptions({
    styles: noPoi,
  });

  const checkboxes = document.querySelectorAll(".checkbox-item");
  checkboxes.forEach((i: any) => {
    i.addEventListener("click", () => {
      hideMarkers(i.value, i.checked);
    });
  });
}

export { initMap };
