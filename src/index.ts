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
  markers,
  garages,
} from "./data";
import "./style.css";

function initMap(): void {
  const center = new google.maps.LatLng(59.967502, 30.35128);
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 10,
      center: center,
      gestureHandling: "greedy",
    },
  );

  const renderData = (data, icon) => {
    data.forEach((el) => {
      return new google.maps.Marker({
        position: { lat: el[0], lng: el[1] },
        map: map,
        icon: {
          url: icon,
          scaledSize: new google.maps.Size(7, 7),
        },
        zIndex: 100,
      });
    });
  };

  const renderMarkers = (array) => {
    array.forEach((el) => {
      const marker = new google.maps.Marker({
        position: el?.position,
        map: map,
        icon: {
          url: el?.icon,
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32),
        },
        title: el?.address,
        zIndex: 300,
      });

      const infowindow = new google.maps.InfoWindow({
        content: el?.address,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    });
  };

  renderData(data1, "b1.png");
  renderData(data2, "b2.png");
  renderData(data3, "b3.png");
  renderData(data4, "b4.png");
  renderData(data5, "b5.png");
  renderData(data6, "b6.png");
  renderData(data7, "b7.png");
  renderData(data8, "b8.png");
  renderData(data9, "b9.png");
  renderData(data10, "b10.png");

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
}
export { initMap };
