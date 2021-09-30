/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import { data } from "./data";
import "./style.css";

let map: google.maps.Map;
const markersGroup = {};

function hideMarkers(key, value) {
  const currentGroup = markersGroup[`marker${key}`];
  for (let i = 0; i < currentGroup.length; i++) {
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
          scaledSize: new google.maps.Size(10, 10),
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
      zIndex: 300
    });

    const markerShadow = new google.maps.Marker({
      position: el?.position,
      map: map,
      icon: {
        url: "circle-shadow.png",
        scaledSize: new google.maps.Size(46, 33),
        anchor: new google.maps.Point(16, 24),
      },
      zIndex: 290
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

    map.addListener("click", () => {
      infoWindow.close();
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

  data.markers.forEach(el => renderMarkers(el));
  data.areas.forEach(el => renderData(el, data.areas.indexOf(el)+1));

  let noPoi = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ];

  const checkboxes = document.querySelectorAll(".checkbox-item");
  checkboxes.forEach((i: any) => {
    i.addEventListener("click", () => {
      hideMarkers(i.value, i.checked);
    });
  });

  const checkboxAll: any = document.querySelector("#checkbox-item-all");
  checkboxAll.addEventListener("click", () => {
    checkboxes.forEach((i: any) => {
      if (checkboxAll.checked !== i.checked){
        i.click();
      }
    });
  });

  map.setOptions({
    styles: noPoi
  });
}

export { initMap };
