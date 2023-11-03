'use strict';

const {Campaign} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Campaign.bulkCreate([
      {
        userId: 1,
        title: 'Amazing Art Exhibition',
        description: 'Join our art exhibition showcasing stunning masterpieces.',
        fundingGoal: 5000.00,
        currentFunding: 2000.00,
        numBackers: 50,
        startDate: new Date('2023-03-01'),
        endDate: new Date('2023-03-31'),
        story: `
          Discover the world of art through the eyes of talented artists. Our art exhibition is a unique opportunity to immerse yourself in the beauty and creativity of various art forms. From captivating paintings to mesmerizing sculptures, our showcase features a diverse range of artworks that will leave you in awe.

          The artists behind these masterpieces are driven by passion and dedication. Your support helps them continue their artistic journey and share their creativity with the world. Be a part of this artistic movement and experience the power of imagination and expression.

          Join us in celebrating art, culture, and human expression. Your contribution makes a difference in the lives of artists and the world of art. Let's make this exhibition a memorable experience for everyone.
        `,
        imgUrl: 'art-exhibition.jpg',
        categories: 'Art',
      },
      {
        userId: 2,
        title: 'Tech Gadgets Innovation',
        description: 'Support our tech innovation project to revolutionize gadgets.',
        fundingGoal: 10000.00,
        currentFunding: 7500.00,
        numBackers: 80,
        startDate: new Date('2023-04-01'),
        endDate: new Date('2023-04-30'),
        story: `
          We are on a mission to push the boundaries of technology and create groundbreaking gadgets that enhance your daily life. Our team of innovators is dedicated to designing products that combine cutting-edge technology with user-friendly features.

          With your support, we can bring these innovations to the market faster and more efficiently. Our vision is to make technology accessible to everyone and simplify the way we interact with our devices.

          Be a part of the tech revolution and help us shape the future of gadgets. Your contribution fuels our passion for innovation, and together, we can create products that change the way we live and work.
        `,
        imgUrl: 'tech-innovation.jpg',
        categories: 'Technology',
      },
      {
        userId: 3,
        title: 'Eco-Friendly Fashion Line',
        description: 'Help us launch a sustainable and stylish fashion collection.',
        fundingGoal: 8000.00,
        currentFunding: 3500.00,
        numBackers: 40,
        startDate: new Date('2023-05-01'),
        endDate: new Date('2023-05-31'),
        story: `
          Experience fashion that not only enhances your style but also takes care of our planet. Our eco-friendly fashion line is a commitment to sustainability and a statement of elegance. We believe that fashion can coexist with nature, and we're here to prove it.

          Our collection is made from ethically sourced materials and is designed to minimize environmental impact. We aim to redefine fashion by setting a new standard of responsible and conscious clothing.

          Join us in the journey towards a more sustainable and stylish future. Your support is not just for fashion; it's for a greener world where style meets sustainability.
        `,
        imgUrl: 'eco-fashion.jpg',
        categories: 'Fashion',
      },
      {
        userId: 3,
        title: 'Tech for Good Hackathon',
        description: 'Join us in a hackathon to build tech solutions for social impact.',
        fundingGoal: 2500.00,
        currentFunding: 1500.00,
        numBackers: 20,
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        story: `
          Technology can be a powerful force for good. Our hackathon brings together tech enthusiasts to develop innovative solutions that address social challenges. By participating, you contribute to making the world a better place through technology.
        `,
        imgUrl: 'tech-hackathon.jpg',
        categories: 'Technology',
      },
      {
        userId: 1,
        title: 'Healthy Cooking Classes',
        description: 'Learn to cook delicious and healthy meals with our expert chefs.',
        fundingGoal: 1500.00,
        currentFunding: 800.00,
        numBackers: 15,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-30'),
        story: `
          Good health starts with good food. Our cooking classes focus on teaching you how to prepare nutritious and tasty meals. Join us in this culinary journey to improve your cooking skills and overall well-being.
        `,
        imgUrl: 'cooking-classes.jpg',
        categories: 'Food, Health',
      },
      {
        userId: 2,
        title: 'Music Festival Extravaganza',
        description: 'Experience the magic of music with a diverse lineup of artists.',
        fundingGoal: 3500.00,
        currentFunding: 2000.00,
        numBackers: 25,
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-31'),
        story: `
          Music has the power to unite people and evoke emotions. Our music festival features an incredible lineup of artists from various genres. Immerse yourself in a world of melodies and rhythms, and celebrate the universal language of music.
        `,
        imgUrl: 'music-festival.jpg',
        categories: 'Entertainment, Music',
      },
      {
        userId: 3,
        title: 'Environmental Conservation Project',
        description: 'Contribute to the protection of our planet and its ecosystems.',
        fundingGoal: 5000.00,
        currentFunding: 2500.00,
        numBackers: 30,
        startDate: new Date('2023-11-01'),
        endDate: new Date('2023-11-30'),
        story: `
          Our planet is a precious gift, and it's our responsibility to protect it. Join our conservation project to preserve nature and biodiversity. Your support makes a lasting impact on the environment.
        `,
        imgUrl: 'conservation-project.jpg',
        categories: 'Environment, Sustainability',
      },
      {
        userId: 1,
        title: 'Mobile App Development Course',
        description: 'Learn to build mobile apps with expert instructors.',
        fundingGoal: 2000.00,
        currentFunding: 1000.00,
        numBackers: 20,
        startDate: new Date('2023-12-01'),
        endDate: new Date('2023-12-31'),
        story: `
          Mobile apps are shaping the digital landscape. Our course equips you with the skills to create your own mobile applications. Join us in this educational journey to become a proficient app developer.
        `,
        imgUrl: 'app-development-course.jpg',
        categories: 'Technology, Education',
      },
      {
        userId: 2,
        title: 'Animal Rescue Mission',
        description: 'Help rescue and care for animals in need of a loving home.',
        fundingGoal: 3000.00,
        currentFunding: 1800.00,
        numBackers: 35,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        story: `
          Every life deserves love and care, including the lives of our furry friends. Join our mission to rescue and provide shelter to animals in need. Your support ensures that they receive the care they deserve.
        `,
        imgUrl: 'animal-rescue.jpg',
        categories: 'Animals, Charity',
      },
      {
        userId: 3,
        title: 'Outdoor Adventure Club',
        description: 'Embark on thrilling outdoor adventures with a community of explorers.',
        fundingGoal: 1800.00,
        currentFunding: 1000.00,
        numBackers: 15,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-28'),
        story: `
          Nature is calling, and we're answering. Our outdoor adventure club brings together outdoor enthusiasts for exciting hikes, camping, and exploration. Connect with like-minded adventurers and create memories in the great outdoors.
        `,
        imgUrl: 'outdoor-adventures.jpg',
        categories: 'Travel, Sports',
      },
      {
        userId: 1,
        title: 'Science Education for Kids',
        description: 'Make learning fun and engaging for children with hands-on science activities.',
        fundingGoal: 2500.00,
        currentFunding: 1200.00,
        numBackers: 25,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31'),
        story: `
          Curiosity is a child's greatest asset. Our program introduces children to the wonders of science through interactive and educational activities. Spark a lifelong love for learning with engaging science experiences.
        `,
        imgUrl: 'science-education.jpg',
        categories: 'Education',
      },
      {
        userId: 2,
        title: 'Community Art Project',
        description: 'Collaborate on a community art project that celebrates diversity and unity.',
        fundingGoal: 2200.00,
        currentFunding: 1100.00,
        numBackers: 20,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
        story: `
          Art has the power to transcend boundaries and bring communities together. Our project aims to create a vibrant and inclusive art installation that reflects the diversity and unity of our community. Join us in this creative journey.
        `,
        imgUrl: 'community-art.jpg',
        categories: 'Art, Community',
      },
      {
        userId: 3,
        title: 'Renewable Energy Initiative',
        description: 'Support the transition to clean and sustainable energy sources.',
        fundingGoal: 4000.00,
        currentFunding: 2200.00,
        numBackers: 30,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-05-31'),
        story: `
          The future is green, and we're committed to making it happen. Our initiative promotes renewable energy solutions and sustainability. By contributing, you play a vital role in reducing our environmental footprint.
        `,
        imgUrl: 'renewable-energy.jpg',
        categories: 'Environment, Sustainability',
      },
      {
        userId: 1,
        title: 'Local Food Festival',
        description: 'Celebrate local cuisine and support small food producers.',
        fundingGoal: 2800.00,
        currentFunding: 1500.00,
        numBackers: 25,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-30'),
        story: `
          Our food festival is a celebration of local flavors and culinary traditions. Join us for a gastronomic adventure featuring delicious dishes from talented local chefs. Your support encourages small food producers and promotes local cuisine.
        `,
        imgUrl: 'food-festival.jpg',
        categories: 'Food, Community',
      },
      {
        userId: 2,
        title: 'Mental Health Awareness Campaign',
        description: 'Raise awareness and support for mental health initiatives.',
        fundingGoal: 3000.00,
        currentFunding: 1900.00,
        numBackers: 30,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-31'),
        story: `
          Mental health matters. Our campaign aims to create awareness, reduce stigma, and support mental health initiatives. Join us in this crucial effort to make mental well-being a priority.
        `,
        imgUrl: 'mental-health.jpg',
        categories: 'Health, Community',
      },
      {
        userId: 3,
        title: 'Space Exploration Project',
        description: 'Support scientific research and exploration beyond our planet.',
        fundingGoal: 5000.00,
        currentFunding: 2800.00,
        numBackers: 35,
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-31'),
        story: `
          The universe is our final frontier. Our project is dedicated to advancing scientific research and exploration in space. By contributing, you become a part of humanity's quest to understand the cosmos.
        `,
        imgUrl: 'space-exploration.jpg',
        categories: 'Technology',
      },
      {
        userId: 1,
        title: 'Literacy Program for Children',
        description: 'Help children develop a love for reading and improve their literacy skills.',
        fundingGoal: 1500.00,
        currentFunding: 800.00,
        numBackers: 20,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-30'),
        story: `
          Reading opens doors to new worlds. Our literacy program is designed to make reading fun and accessible for children. Your support empowers young readers and nurtures a lifelong love for books.
        `,
        imgUrl: 'literacy-program.jpg',
        categories: 'Education',
      },
      {
        userId: 2,
        title: 'Local Music Talent Showcase',
        description: 'Discover and support local music talent in your community.',
        fundingGoal: 2000.00,
        currentFunding: 1200.00,
        numBackers: 25,
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-31'),
        story: `
          Hidden musical gems await your discovery. Our talent showcase features the best local musicians and bands. Be a part of the music scene in your community and help these talented artists shine.
        `,
        imgUrl: 'music-talent-showcase.jpg',
        categories: 'Music, Community',
      },
      {
        userId: 3,
        title: 'Clean Water Initiative',
        description: 'Provide clean and safe drinking water to underserved communities.',
        fundingGoal: 3000.00,
        currentFunding: 1700.00,
        numBackers: 30,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-30'),
        story: `
          Clean water is a basic human right. Our initiative aims to bring clean and safe drinking water to communities in need. Your support transforms lives and ensures access to this essential resource.
        `,
        imgUrl: 'clean-water-initiative.jpg',
        categories: 'Charity, Community',
      },
      {
        userId: 1,
        title: 'Youth Sports Development',
        description: 'Empower young athletes and promote sports in the community.',
        fundingGoal: 2500.00,
        currentFunding: 1300.00,
        numBackers: 20,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-31'),
        story: `
          Sports build character and teamwork. Our program supports youth athletes and encourages sports participation in the community. Your support helps young talents grow and achieve their sporting dreams.
        `,
        imgUrl: 'youth-sports.jpg',
        categories: 'Sports, Community',
      },
      {
        userId: 2,
        title: 'Culinary Entrepreneurship Program',
        description: 'Nurture culinary talents and inspire aspiring chefs.',
        fundingGoal: 1800.00,
        currentFunding: 1000.00,
        numBackers: 15,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        story: `
          Cooking is an art, and we're here to support budding chefs. Our culinary entrepreneurship program provides the tools and guidance for aspiring cooks to start their culinary journeys. Join us in shaping the future of food.
        `,
        imgUrl: 'culinary-program.jpg',
        categories: 'Food, Entrepreneurship',
      },
      {
        userId: 3,
        title: 'Local Arts and Crafts Fair',
        description: 'Celebrate local creativity and craftsmanship at our art fair.',
        fundingGoal: 2200.00,
        currentFunding: 1200.00,
        numBackers: 20,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-28'),
        story: `
          Local artisans and creators come together in a celebration of art and craftsmanship. Our art fair is a showcase of the talents in our community. Support local artists and find unique, handmade treasures.
        `,
        imgUrl: 'arts-crafts-fair.jpg',
        categories: 'Art, Community',
      },
      {
        userId: 1,
        title: 'Wildlife Conservation Expedition',
        description: 'Participate in a life-changing journey to protect endangered wildlife.',
        fundingGoal: 5000.00,
        currentFunding: 2700.00,
        numBackers: 25,
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-03-31'),
        story: `
          The natural world is a marvel. Our expedition brings you close to the wonders of wildlife and conservation efforts. Join us on a transformative adventure to protect endangered species and their habitats.
        `,
        imgUrl: 'wildlife-expedition.jpg',
        categories: 'Animals, Environment',
      },
      {
        userId: 3,
        title: 'Adventure Travel Experience',
        description: 'Embark on thrilling adventures with our guided travel experiences.',
        fundingGoal: 6000.00,
        currentFunding: 2500.00,
        numBackers: 35,
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        story: `
          Unleash your adventurous spirit and explore the world with us. Our guided travel experiences are designed to provide thrill-seekers with unforgettable journeys. From trekking through the wilderness to diving into the deep blue, we offer an array of exciting adventures.
        `,
        imgUrl: 'adventure-travel.jpg',
        categories: 'Travel, Adventure',
      },
      {
        userId: 1,
        title: 'Healthy Living Community',
        description: 'Join our community and make a positive change in your lifestyle.',
        fundingGoal: 1500.00,
        currentFunding: 600.00,
        numBackers: 20,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-30'),
        story: `
          Health is wealth, and we're on a mission to help you achieve your health and wellness goals. Join our community where you'll find support, guidance, and resources to make positive changes in your lifestyle. Together, we can live healthier and happier lives.
        `,
        imgUrl: 'healthy-living.jpg',
        categories: 'Health, Lifestyle',
      },
      {
        userId: 2,
        title: 'Historical Documentary Project',
        description: 'Preserve the past by supporting our historical documentary project.',
        fundingGoal: 3500.00,
        currentFunding: 1600.00,
        numBackers: 22,
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-31'),
        story: `
          History holds the key to understanding our world. Join us in preserving the past through an engaging historical documentary project. We aim to document significant events and stories that shaped our history for generations to come.
        `,
        imgUrl: 'historical-documentary.jpg',
        categories: 'History, Documentary',
      },
      {
        userId: 3,
        title: 'Culinary Exploration Tour',
        description: 'Savor the flavors of the world through our culinary exploration tour.',
        fundingGoal: 2800.00,
        currentFunding: 1100.00,
        numBackers: 18,
        startDate: new Date('2023-11-01'),
        endDate: new Date('2023-11-30'),
        story: `
          Food is a universal language, and we're here to take you on a culinary journey. Our exploration tour will introduce you to diverse cuisines from around the globe. Taste, learn, and immerse yourself in the art of cooking and eating.
        `,
        imgUrl: 'culinary-exploration.jpg',
        categories: 'Travel, Food',
      },
      {
        userId: 2,
        title: 'Innovative Startup Support',
        description: 'Empower startups with the resources they need to succeed.',
        fundingGoal: 5000.00,
        currentFunding: 2200.00,
        numBackers: 28,
        startDate: new Date('2023-12-01'),
        endDate: new Date('2023-12-31'),
        story: `
          Startups are the future of innovation, and we're dedicated to supporting them. Your contribution helps startups access the resources, mentorship, and funding they need to thrive in a competitive business landscape.
        `,
        imgUrl: 'startup-support.jpg',
        categories: 'Technology, Business',
      },
      {
        userId: 3,
        title: 'Environmental Conservation',
        description: 'Protect our planet by supporting environmental conservation efforts.',
        fundingGoal: 4000.00,
        currentFunding: 1900.00,
        numBackers: 26,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        story: `
          Our planet is in need of guardians, and we're here to make a difference. Join us in conserving our environment through various initiatives, from reforestation to wildlife protection. Together, we can ensure a greener and cleaner world.
        `,
        imgUrl: 'environment-conservation.jpg',
        categories: 'Environment, Sustainability',
      },

      // Add more campaign data as needed
    ], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
