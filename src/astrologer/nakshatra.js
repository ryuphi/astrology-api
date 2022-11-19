const nakshatras = ["Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishaka",
    "Anuradha",
    "Jyeshta",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhishak",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"
]

const nakshatraLength = 360 / 27
const padaLength = (360 / 27) / 4
   
const getNakshatras = (longitude) => {
    let nakshatraNumber = getNakshatrasNumber(longitude)
    let pada = (getPadaNumber(longitude) % 4) + 1
    return {name : nakshatras[nakshatraNumber], pada: pada}
} 

const getNakshatrasNumber = (longitude) => {
  return  (Math.floor(longitude / nakshatraLength) % 27) 
}

const getPadaNumber = (longitude) => {
    return (Math.floor(longitude / padaLength ) % 108)
}

module.exports = getNakshatras