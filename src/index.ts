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
  data14,
  markers,
  garages,
} from "./data";
import "./style.css";

let map: google.maps.Map;
const markersGroup = {};

function hideMarkers(key, value) {
  const currentGroup = markersGroup[`marker${key}`];
  for (var i = 0; i < currentGroup.length; i++) {
    currentGroup[i].setVisible(value);
  }
}

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

    const markerShadow = new google.maps.Marker({
      position: el?.position,
      map: map,
      icon: {
        url: "circle-shadow.png",
        scaledSize: new google.maps.Size(46, 33),
        anchor: new google.maps.Point(16, 24),
      },
      title: el?.address,
      zIndex: 290,
    });

    markerShadow.bindTo("position", marker);

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

function initMap(): void {
  const center = new google.maps.LatLng(59.967502, 30.35128);
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 10,
    center: center,
    gestureHandling: "greedy",
  });
  
  renderMarkers(markers);
  renderMarkers(garages);

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
  renderData(data14, 14);

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

  const checkboxes = document.querySelectorAll(".checkbox-item");
  checkboxes.forEach((i: any) => {
    i.addEventListener("click", () => {
      hideMarkers(i.value, i.checked);
    });
  });

  map.setOptions({
    styles: noPoi,
  });
}

export { initMap };
