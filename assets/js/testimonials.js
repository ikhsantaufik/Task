// // <=========================OOP Concept=================================>

// class Testimonial {
//   image = "";
//   content = "";
//   author = "";

//   constructor(image, content, author) {
//     this.image = image;
//     this.content = content;
//     this.author = author;
//   }

//   html() {
//     throw new Error(
//       "You should use one of 'AuthorTestimonial' or 'CompanyTestimonial'"
//     );
//   }
// }

// class AuthorTestimonial extends Testimonial {
//   html() {
//     return `<div class="testimonial">
//             <img src="${this.image}" class="profile-testimonial" />
//             <p class="quote">"${this.content}"</p>
//             <p class="author">- ${this.author}</p>
//         </div>`;
//   }
// }

// class CompanyTestimonial extends Testimonial {
//   html() {
//     return `<div class="testimonial">
//             <img src="${this.image}" class="profile-testimonial" />
//             <p class="quote">"${this.content}"</p>
//             <p class="author">- ${this.author} Company</p>
//         </div>`;
//   }
// }

// const testimonial1 = new AuthorTestimonial(
//   "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrQj1iwc0nLsOs5rLjtnPorwwNWQP-xhRY4ui5ed1wsVJR-GZw",
//   "Keren kamu bro!",
//   "Jimih Setiawan"
// );

// const testimonial2 = new AuthorTestimonial(
//   "https://cdn-u1-gnfi.imgix.net/post/large-melatih-skill-keramahan-yang-tidak-hanya-sekadar-sifat1694664260.jpg?fit=crop&crop=faces%2Centropy&lossless=true&auto=compress%2Cformat&w=730&h=486",
//   "Keren kamu bro!",
//   "Adika Wahyu Sulaiman"
// );

// const testimonial3 = new CompanyTestimonial(
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-Uy9s-ZHmO-htxFwBe5b7NCSMjvgkA5ossPOHFf_PzMmkPbj",
//   "Apasih bang!",
//   "Almas Fadhillah"
// );

// const testimonials = [testimonial1, testimonial2, testimonial3];

// let testimonialHTML = ``;

// for (let index = 0; index < testimonials.length; index++) {
//   testimonialHTML += testimonials[index].html();
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML;

// <=========================HOF Concept=================================>

const testimonials = [
  {
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrQj1iwc0nLsOs5rLjtnPorwwNWQP-xhRY4ui5ed1wsVJR-GZw",
    content: "Mantap sekali jasanya bro!",
    author: "Sabeni",
    rating: 1,
  },
  {
    image:
      "https://cdn-u1-gnfi.imgix.net/post/large-melatih-skill-keramahan-yang-tidak-hanya-sekadar-sifat1694664260.jpg?fit=crop&crop=faces%2Centropy&lossless=true&auto=compress%2Cformat&w=730&h=486",
    content: "Keren kamu bro!",
    author: "Mulyadi",
    rating: 2,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-Uy9s-ZHmO-htxFwBe5b7NCSMjvgkA5ossPOHFf_PzMmkPbj",
    content: "Keren mantap!",
    author: "Wahyu",
    rating: 2,
  },
  {
    image:
      "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Apasih bang!",
    author: "Almas",
    rating: 3,
  },
];

function allTestimonial() {
  if (!testimonials.length) {
    return (document.getElementById(
      "testimonials"
    ).innerHTML = `<h1>Data not found!</h1>`);
  }

  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
                  <img src="${testimonial.image}" class="profile-testimonial" />
                  <p class="quote">"${testimonial.content}"</p>
                  <p class="author">- ${testimonial.author}</p>
              </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

function filterTestimonial(rating) {
  // 2
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating == rating
  );

  if (!filteredTestimonial.length) {
    return (document.getElementById(
      "testimonials"
    ).innerHTML = `<h1>Data not found!</h1>`);
  }

  const testimonialHTML = filteredTestimonial.map((testimonial) => {
    return `<div class="testimonial">
                      <img src="${testimonial.image}" class="profile-testimonial" />
                      <p class="quote">"${testimonial.content}"</p>
                      <p class="author">- ${testimonial.author}</p>
                  </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

allTestimonial();
