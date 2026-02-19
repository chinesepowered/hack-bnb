import { ethers } from "hardhat";

async function main() {
  console.log("🏠 Deploying HackBnB...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "BNB\n");

  const HackBnB = await ethers.getContractFactory("HackBnB");
  const hackbnb = await HackBnB.deploy();
  await hackbnb.waitForDeployment();

  const address = await hackbnb.getAddress();
  console.log("✅ HackBnB deployed to:", address);

  // Seed some sample properties for demo
  console.log("\n📝 Seeding sample properties...\n");

  const properties = [
    {
      name: "Luxury Beachfront Villa",
      location: "Bali, Indonesia",
      description: "Stunning 4-bedroom villa with private pool, direct beach access, and panoramic ocean views. Perfect for families and groups seeking a tropical paradise escape.",
      imageURI: "bali-villa",
      pricePerNight: ethers.parseEther("0.005"),
    },
    {
      name: "Modern Tokyo Apartment",
      location: "Shibuya, Tokyo, Japan",
      description: "Sleek and modern apartment in the heart of Shibuya. Walking distance to major attractions, excellent public transit access, and fully equipped kitchen.",
      imageURI: "tokyo-apt",
      pricePerNight: ethers.parseEther("0.003"),
    },
    {
      name: "Alpine Swiss Chalet",
      location: "Zermatt, Switzerland",
      description: "Cozy wooden chalet with breathtaking Matterhorn views. Features fireplace, hot tub, ski-in/ski-out access, and traditional Swiss charm.",
      imageURI: "swiss-chalet",
      pricePerNight: ethers.parseEther("0.008"),
    },
    {
      name: "SoHo Designer Loft",
      location: "New York City, USA",
      description: "Industrial-chic loft in SoHo with exposed brick, high ceilings, and curated art collection. Steps from galleries, restaurants, and nightlife.",
      imageURI: "nyc-loft",
      pricePerNight: ethers.parseEther("0.006"),
    },
    {
      name: "Santorini Cave House",
      location: "Oia, Santorini, Greece",
      description: "Iconic cave house carved into the caldera cliff with infinity pool, sunset views, and traditional Cycladic architecture. A once-in-a-lifetime stay.",
      imageURI: "santorini-cave",
      pricePerNight: ethers.parseEther("0.007"),
    },
    {
      name: "Treehouse Retreat",
      location: "Monteverde, Costa Rica",
      description: "Eco-luxury treehouse nestled in the cloud forest canopy. Wake up to howler monkeys, enjoy outdoor rain shower, and explore nature trails.",
      imageURI: "costa-rica-tree",
      pricePerNight: ethers.parseEther("0.004"),
    },
  ];

  for (const prop of properties) {
    const tx = await hackbnb.listProperty(
      prop.name,
      prop.location,
      prop.description,
      prop.imageURI,
      prop.pricePerNight
    );
    await tx.wait();
    console.log(`  Listed: ${prop.name} (${ethers.formatEther(prop.pricePerNight)} BNB/night)`);
  }

  console.log(`\n🎉 Deployment complete!`);
  console.log(`   Contract: ${address}`);
  console.log(`   Properties: ${properties.length} listed`);
  console.log(`\n📋 Add this to your .env.local:`);
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
