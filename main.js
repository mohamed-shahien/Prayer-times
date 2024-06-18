
let cities = [
  {
    ar: "القاهرة",
    en: "Cairo"
  },
  {
    ar: "الإسكندرية",
    en: "Alexandria"
  },
  {
    ar: "الغربية",
    en: "Gharbia"
  },
  {
    ar: "الدقهلية",
    en: "Dakahlia"
  },
  {
    ar: "كفر الشيخ",
    en: "Kafr El-Sheikh"
  },
  {
    ar: "الشرقية",
    en: "Sharqia"
  },
  {
    ar: "البحيرة",
    en: "Beheira"
  },
  {
    ar: "دمياط",
    en: "Damietta"
  },
  {
    ar: "بورسعيد",
    en: "Port Said"
  },
  {
    ar: "الإسماعيلية",
    en: "Ismailia"
  },
  {
    ar: "السويس",
    en: "Suez"
  },
  {
    ar: "شمال سيناء",
    en: "North Sinai"
  },
  {
    ar: "جنوب سيناء",
    en: "South Sinai"
  },
  {
    ar: "بني سويف",
    en: "Beni Suef"
  },
  {
    ar: "الفيوم",
    en: "Fayoum"
  },
  {
    ar: "المنيا",
    en: "Minya"
  },
  {
    ar: "أسيوط",
    en: "Assiut"
  },
  {
    ar: "الوادي الجديد",
    en: "New Valley"
  },
  {
    ar: "سوهاج",
    en: "Sohag"
  },
  {
    ar: "قنا",
    en: "Qena"
  },
  {
    ar: "الأقصر",
    en: "Luxor"
  },
  {
    ar: "أسوان",
    en: "Aswan"
  }
];

let selectElement = document.getElementById('country');
cities.forEach(city => {
  let optionElement = document.createElement('option');
  optionElement.textContent = city.ar;
  selectElement.appendChild(optionElement);
});
selectElement.addEventListener("change", function () {
  let trans = "";
  cities.forEach(item => {
    if (item.ar == this.value) {
      trans = item.en;
      getprayertiming(trans);
      document.querySelector('.city').innerHTML = item.ar;
    }
  })

});
function getprayertiming (cityName){
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
