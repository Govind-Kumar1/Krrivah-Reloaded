const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Contact
  await prisma.contact.createMany({
    data: [
      {
        firstName: "Govind",
        lastName: "Kumar",
        phone: "+91 9876543210",
        email: "govind@example.com",
        message: "Interested in your services."
      }
    ]
  });

  // User
  await prisma.user.create({
    data: {
      email: "krrivah@gmail.com",
      password: hashedPassword, // isme tum bcrypt ka hashed password dalna
      role: "Admin"
    }
  });

  // Blogs
  await prisma.blog.createMany({
    data: [
      {
        category: "Real Estate",
        thumbnail: "https://via.placeholder.com/150",
        mainImage: "https://via.placeholder.com/600",
        middleImage: "https://via.placeholder.com/300",
        title: "Welcome to Krrivah",
        short_des: "Krrivah real estate solutions",
        long_des: "This is a long description about Krrivah services.",
        quote: "Building dreams, one brick at a time.",
        slug_keywords: "krrivah, real estate",
        slug_url: "welcome-to-krrivah"
      }
    ]
  });

  // Projects
  const project1 = await prisma.project.create({
    data: {
      category: "Residential",
      thumbnail: "https://via.placeholder.com/150",
      title: "Luxury Apartments",
      location: "Delhi",
      short_des: "Premium living space in Delhi.",
      long_des: "Long description for luxury apartments.",
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/401"
      ],
      Brochure: "https://via.placeholder.com/brochure.pdf",
      Amenities: {
        create: [
          {
            title: "Facilities",
            listings: ["Swimming Pool", "Gym", "Club House"]
          }
        ]
      }
    }
  });

  // HeroBrand
  await prisma.heroBrand.create({
    data: {
      title: "Our Trusted Brand",
      imageUrl: "https://via.placeholder.com/200",
      description: "We deliver excellence in every project.",
      brand: "Krrivah Developers"
    }
  });

  // AchievementStat
  await prisma.achievementStat.createMany({
    data: [
      { unit: "500+", description: "Happy Clients" },
      { unit: "50+", description: "Projects Completed" }
    ]
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
