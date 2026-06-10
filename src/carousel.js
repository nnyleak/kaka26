// early-adventures, dance, memory-lane

const carousels = {
  "early-adventures": {
    denial: [
      { img: "denial/230512.jpg", date: "05.12.2023" },
      { img: "denial/230514.jpg", date: "05.14.2023" },
      { img: "denial/230514-2.jpg", date: "05.14.2023" },
      { img: "denial/230516.jpg", date: "05.16.2023" },
      { img: "denial/230517.jpg", date: "05.17.2023" },
      { img: "denial/230521.jpg", date: "05.21.2023" },
      { img: "denial/230521-2.jpg", date: "05.21.2023" },
      { img: "denial/230523.jpg", date: "05.23.2023" },
      { img: "denial/230525.jpg", date: "05.25.2023" },
      { img: "denial/230601.jpg", date: "06.01.2023" },
      { img: "denial/230610.jpg", date: "06.10.2023" },
    ],
    goofy: [
      { img: "goofy/230915.jpg", date: "09.15.2023" },
      { img: "goofy/230915-2.jpg", date: "09.15.2023" },
      { img: "goofy/230915-3.jpg", date: "09.15.2023" },
      { img: "goofy/231014.jpg", date: "10.14.2023" },
      { img: "goofy/231014-2.jpg", date: "10.14.2023" },
      { img: "goofy/231014-3.jpg", date: "10.14.2023" },
      { img: "goofy/231027.jpg", date: "10.27.2023" },
      { img: "goofy/231104.jpg", date: "11.04.2023" },
      { img: "goofy/231122.jpg", date: "11.22.2023" },
      { img: "goofy/231201.jpg", date: "12.01.2023" },
      { img: "goofy/231202.jpg", date: "12.02.2023" },
      { img: "goofy/231216-3.jpg", date: "12.16.2023" },
      { img: "goofy/231216-4.jpg", date: "12.16.2023" },
      { img: "goofy/231216-5.jpg", date: "12.16.2023" },
      { img: "goofy/231216-6.jpg", date: "12.16.2023" },
      { img: "goofy/231231.jpg", date: "12.31.2023" },
      { img: "goofy/240408.jpg", date: "04.08.2024" },
      { img: "goofy/240409.jpg", date: "04.09.2024" },
      { img: "goofy/240412.jpg", date: "04.12.2024" },
      { img: "goofy/240501-2.jpg", date: "05.01.2024" },
      { img: "goofy/240510-2.jpg", date: "05.10.2024" },
    ],
    gaymer: [
      { img: "gaymer/230629.jpg", date: "06.29.2023" },
      { img: "gaymer/230816.jpg", date: "08.16.2023" },
      { img: "gaymer/240104.jpg", date: "01.04.2024" },
      { img: "gaymer/240112.jpg", date: "01.12.2024" },
      { img: "gaymer/240512.jpg", date: "05.12.2024" },
    ],
    "dress-up": [
      { img: "dress-up/231031.jpg", date: "10.31.2023" },
      { img: "dress-up/240229.jpg", date: "02.29.2024" },
      { img: "dress-up/240323.jpg", date: "03.23.2024" },
      { img: "dress-up/240427.jpg", date: "04.27.2024" },
      { img: "dress-up/240504.jpg", date: "05.04.2024" },
    ],
    grad: [
      { img: "grad/240509.jpg", date: "05.09.2024" },
      { img: "grad/240510.jpg", date: "05.10.2024" },
    ],
    together: [
      { img: "together/230616.jpg", date: "06.16.2023" },
      { img: "together/230803.jpg", date: "08.03.2023" },
      { img: "together/230902.jpg", date: "09.02.2023" },
      { img: "together/230922.jpg", date: "09.22.2023" },
      { img: "together/231027-2.jpg", date: "10.27.2023" },
      { img: "together/231031-2.jpg", date: "10.31.2023" },
      { img: "together/231112.jpg", date: "11.12.2023" },
      { img: "together/231113.jpg", date: "11.13.2023" },
      { img: "together/231213.jpg", date: "12.13.2023" },
      { img: "together/231216.jpg", date: "12.16.2023" },
      { img: "together/231216-2.jpg", date: "12.16.2023" },
      { img: "together/240210.jpg", date: "02.10.2024" },
      { img: "together/240224.jpg", date: "02.24.2024" },
      { img: "together/240224-2.jpg", date: "02.24.2024" },
      { img: "together/240224-3.jpg", date: "02.24.2024" },
      { img: "together/240327.jpg", date: "03.27.2024" },
      { img: "together/240328.jpg", date: "03.28.2024" },
      { img: "together/240328-2.jpg", date: "03.28.2024" },
      { img: "together/240329.jpg", date: "03.29.2024" },
      { img: "together/240421.jpg", date: "04.21.2024" },
      { img: "together/240501.jpg", date: "05.01.2024" },
      { img: "together/240511.jpg", date: "05.11.2024" },
    ],
  },

  dance: {
    nova: [],
    ang3lz: [],
  },

  "memory-lane": {
    "section-one": [],
    "section-two": [],
  },
};

document.querySelectorAll(".sec-carousel").forEach((carousel) => {
  const winId = carousel.closest(".window").id;
  const section = carousel.dataset.section;

  if (!carousels[winId]?.[section]) return;

  carousels[winId][section].forEach((photo) => {
    const container = document.createElement("div");
    container.classList.add("carousel-img");

    const img = document.createElement("img");
    img.src = `assets/images/${winId}/${photo.img}`;
    container.appendChild(img);

    if (photo.date) {
      const date = document.createElement("span");
      date.classList.add("img-date");
      date.innerText = photo.date;
      container.appendChild(date);
    }

    if (photo.caption) {
      const caption = document.createElement("span");
      caption.classList.add("img-caption");
      caption.innerText = photo.caption;
      container.appendChild(caption);
    }

    carousel.appendChild(container);
  });
});
