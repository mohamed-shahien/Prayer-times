# Prayer-times
# Prayer Times Project

This project displays prayer times for Egyptian cities using an external API.

## Technologies Used

1. **HTML:** To build the page structure.
2. **CSS:** To style and visually organize the page.
3. **JavaScript:** To add interactivity and dynamic content to the page.
4. **Axios:** A library to fetch data from the API.
5. **API:** Aladhan API is used to retrieve prayer times.

## How to Install Libraries

### 1. Installing Axios
To install Axios, you can use npm or include it directly from a CDN.

#### Using npm:
npm install axios
#### Using CDN:
Add the following code to your HTML file within the <head> tag:

#### html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
Usage Examples
1. List of Cities
A list of Egyptian cities with their names in Arabic and English:

 #### javascript
```bash
let cities = [
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الإسكندرية", en: "Alexandria" },
  { ar: "الغربية", en: "Gharbia" },
  { ar: "الدقهلية", en: "Dakahlia" },
  { ar: "كفر الشيخ", en: "Kafr El-Sheikh" },
  { ar: "الشرقية", en: "Sharqia" },
  { ar: "البحيرة", en: "Beheira" },
  { ar: "دمياط", en: "Damietta" },
  { ar: "بورسعيد", en: "Port Said" },
  { ar: "الإسماعيلية", en: "Ismailia" },
  { ar: "السويس", en: "Suez" },
  { ar: "شمال سيناء", en: "North Sinai" },
  { ar: "جنوب سيناء", en: "South Sinai" },
  { ar: "بني سويف", en: "Beni Suef" },
  { ar: "الفيوم", en: "Fayoum" },
  { ar: "المنيا", en: "Minya" },
  { ar: "أسيوط", en: "Assiut" },
  { ar: "الوادي الجديد", en: "New Valley" },
  { ar: "سوهاج", en: "Sohag" },
  { ar: "قنا", en: "Qena" },
  { ar: "الأقصر", en: "Luxor" },
  { ar: "أسوان", en: "Aswan" }
];
2. Adding Cities to the Select Element
Cities are added to an HTML select element:

javascript
let selectElement = document.getElementById('country');
cities.forEach(city => {
  let optionElement = document.createElement('option');
  optionElement.textContent = city.ar;
  selectElement.appendChild(optionElement);
});
3. Change Event for the Select Element
When a city is selected from the dropdown, prayer times for that city are fetched:

javascript
selectElement.addEventListener("change", function () {
  let trans = "";
  cities.forEach(item => {
    if (item.ar == this.value) {
      trans = item.en;
      getprayertiming(trans);
      document.querySelector('.city').innerHTML = item.ar;
    }
  });
});
4. Fetching Prayer Times from the API
Axios is used to fetch prayer times:

javascript
function getprayertiming(cityName) {
  let params = {
    country: "EG",
    city: cityName
  };
  axios.get('http://api.aladhan.com/v1/timingsByCity', { params })
    .then(response => {
      console.log(response);
      const timings = response.data.data.timings;
      const date = response.data.data.date;
      const timingElements = {
        fagr_time: timings.Fajr,
        sunrise_time: timings.Sunrise,
        alzohr_time: timings.Dhuhr,
        alasre_time: timings.Asr,
        sunset_time: timings.Maghrib,
        asha_time: timings.Isha,
        dayNmae: date.hijri.weekday.ar,
        readable: date.readable
      };
      for (let time in timingElements) {
        fillTiming(time, timingElements[time]);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

const fillTiming = (id, time) => {
  document.getElementById(id).innerHTML = time;
};
