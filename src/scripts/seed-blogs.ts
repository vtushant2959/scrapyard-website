/**
 * Run once to seed all SEO blog posts into MongoDB:
 * npx tsx src/scripts/seed-blogs.ts
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BlogSchema = new mongoose.Schema({
  title: String, slug: String, excerpt: String, content: String,
  category: String, author: String, coverImage: String,
  status: { type: String, default: "published" },
  metaTitle: String, metaDescription: String, views: { type: Number, default: 0 },
}, { timestamps: true });

const Blog = mongoose.models.Blog ?? mongoose.model("Blog", BlogSchema);

const blogs = [
  {
    title: "Iron Scrap Price Today in Delhi - Live Rates & Selling Tips",
    slug: "iron-scrap-price-today-delhi",
    category: "Metal Prices",
    author: "SCRAPYARD Team",
    excerpt: "Check today's iron scrap price in Delhi. Get live iron rates, expert tips to get maximum value, and book a free pickup with SCRAPYARD.",
    metaTitle: "Iron Scrap Price Today in Delhi 2024 | SCRAPYARD",
    metaDescription: "Today's iron scrap price in Delhi is ₹28–35/kg. Get live iron scrap rates, selling tips, and book free doorstep pickup with SCRAPYARD.",
    content: `# Iron Scrap Price Today in Delhi

Iron scrap is one of the most commonly sold materials in Delhi NCR. Whether you have old iron furniture, steel bars, MS pipes, or machinery scrap - SCRAPYARD offers the **best iron scrap rate in Delhi** with free doorstep pickup.

## Today's Iron Scrap Rate in Delhi

| Material | Rate (₹/kg) |
|----------|-------------|
| MS Scrap (Heavy) | ₹32–35 |
| MS Scrap (Light) | ₹28–31 |
| Cast Iron | ₹22–26 |
| Steel (HMS) | ₹30–34 |
| Iron Rods/Bars | ₹29–33 |

*Rates updated daily. Actual rate depends on quality and quantity.*

## Why Iron Scrap Prices Change Daily

Iron scrap prices in Delhi fluctuate based on:
- **Global steel demand** - when steel plants need raw material, rates go up
- **Import/export policies** - government policy changes affect rates
- **Seasonal demand** - construction season drives higher rates
- **Scrap quality** - heavy melting scrap (HMS) always commands better rates than light scrap

## How to Get the Best Iron Scrap Rate in Delhi

1. **Separate your scrap** - keep heavy iron separate from light iron. Mixed scrap gets lower rates.
2. **Remove attachments** - plastic, rubber, or wood attached to iron reduces the rate.
3. **Quantity matters** - larger quantities (500kg+) get better rates.
4. **Sell to the right buyer** - SCRAPYARD connects you directly with buyers who compete for your scrap.
5. **Time it right** - check our live rate page daily. Sell when rates are at a monthly high.

## Book Free Iron Scrap Pickup in Delhi

SCRAPYARD offers **free doorstep pickup** across all Delhi areas including:
- South Delhi (Saket, Lajpat Nagar, Hauz Khas)
- North Delhi (Rohini, Pitampura, Model Town)
- West Delhi (Dwarka, Janakpuri, Palam)
- East Delhi (Preet Vihar, Laxmi Nagar, Mayur Vihar)
- Central Delhi (Connaught Place, Karol Bagh, Paharganj)

Call **+91 8505863220** or book online at scrapyard.co.in. Our agent arrives within 24 hours, weighs your scrap with a certified digital scale, and pays you **instantly via Cash or UPI**.

## Frequently Asked Questions

**Q: What is the minimum quantity for iron scrap pickup?**
A: We pick up from as little as 10kg. No minimum order.

**Q: Do you buy old iron doors and windows?**
A: Yes! We buy all iron/steel items including doors, windows, grills, almirahs, and furniture.

**Q: How is payment made?**
A: Instant payment via Cash, UPI (GPay, PhonePe, Paytm), or bank transfer - your choice.

Check our [live scrap rates page](/scrap-rates) for today's exact rates or call us for a custom quote.`,
  },
  {
    title: "How to Sell Scrap Online in India - Complete Guide 2024",
    slug: "how-to-sell-scrap-online-india",
    category: "Recycling",
    author: "SCRAPYARD Team",
    excerpt: "Step-by-step guide to selling scrap online in India. Get the best rates, find reliable buyers, and get paid instantly from the comfort of your home.",
    metaTitle: "How to Sell Scrap Online in India 2024 | SCRAPYARD Guide",
    metaDescription: "Complete guide to selling scrap online in India. Find best scrap buyers, get live rates, and book free doorstep pickup with instant payment.",
    content: `# How to Sell Scrap Online in India - Complete Guide 2024

Selling scrap in India has changed dramatically. Gone are the days of waiting for the local kabadiwala to come, getting cheated on weight, and receiving below-market rates. Today, platforms like **SCRAPYARD** make it possible to sell scrap online with complete transparency and instant payment.

## Why Sell Scrap Online?

Traditional scrap selling problems:
- ❌ Kabadiwala arrives at inconvenient times
- ❌ Inaccurate weighing (you always get less)
- ❌ Below-market rates - no price transparency
- ❌ Delayed or cash-only payments
- ❌ No receipt or documentation

Selling scrap online with SCRAPYARD:
- ✅ Book pickup at your convenient time
- ✅ Certified digital weighing - accurate to 10 grams
- ✅ Live market rates - exactly what the market pays
- ✅ Instant payment - Cash, UPI, or bank transfer
- ✅ Receipt and documentation provided

## Step-by-Step: How to Sell Scrap Online

### Step 1: Know What You Have
Identify your scrap type:
- **Metal scrap** - iron, copper, aluminium, brass, steel
- **Plastic scrap** - PET bottles, HDPE drums, PVC pipes
- **Paper scrap** - newspapers, cardboard, office paper
- **E-Waste** - old phones, laptops, TVs, wires
- **Appliances** - old fridge, AC, washing machine

### Step 2: Check Live Rates
Visit **scrapyard.co.in/scrap-rates** to see today's rates for your material. This gives you a fair expectation of what you'll receive.

### Step 3: Book Online
- Visit **scrapyard.co.in/contact**
- Fill in your name, phone, city, and type of scrap
- Choose your preferred pickup time
- Or simply call/WhatsApp **+91 8505863220**

### Step 4: Agent Visits
Our trained agent arrives at your location with:
- Certified digital weighing scale
- Proper ID and SCRAPYARD uniform
- Mobile payment system

### Step 5: Get Paid Instantly
After weighing, you receive payment **immediately** via your preferred method.

## Best Scrap Materials to Sell in India (by value)

| Material | Approx Rate | Why It's Valuable |
|----------|-------------|-------------------|
| Copper | ₹480–520/kg | Highest value metal |
| Brass | ₹280–320/kg | Industrial demand |
| Aluminium | ₹100–120/kg | Lightweight, recyclable |
| Steel/Iron | ₹28–35/kg | High volume |
| E-Waste | ₹30–80/kg | Precious metals inside |

## Tips to Maximize Your Scrap Value

1. **Sort before selling** - don't mix metals. Sorted scrap gets 15-20% better rates.
2. **Clean the scrap** - remove dirt, oil, and attachments.
3. **Sell in bulk** - accumulate scrap and sell in larger quantities for better rates.
4. **Time the market** - check rates weekly and sell when prices are high.
5. **Get documentation** - always ask for a receipt. SCRAPYARD provides itemized receipts.

Start selling smarter. [Book your free pickup today](/contact).`,
  },
  {
    title: "Copper Scrap Rate Today - Live Prices Across India",
    slug: "copper-scrap-rate-today-india",
    category: "Metal Prices",
    author: "SCRAPYARD Team",
    excerpt: "Check today's copper scrap rate in India. Live copper prices updated daily. Find the best copper scrap buyer near you and get instant payment.",
    metaTitle: "Copper Scrap Rate Today in India | Live Copper Prices | SCRAPYARD",
    metaDescription: "Today's copper scrap rate in India: ₹480–520/kg. Check live copper prices city-wise, selling tips, and book free pickup with SCRAPYARD.",
    content: `# Copper Scrap Rate Today - Live Prices Across India

Copper is the **most valuable common scrap metal** in India. Whether you have old copper wires, pipes, motors, transformers, or utensils - SCRAPYARD offers the best copper scrap rate with free doorstep pickup and instant payment.

## Today's Copper Scrap Rate in India

| Copper Type | Rate (₹/kg) |
|-------------|-------------|
| Bare Bright Copper Wire | ₹510–530 |
| Copper #1 (Thick wire, pipes) | ₹490–510 |
| Copper #2 (Mixed wire) | ₹470–490 |
| Brass (Copper alloy) | ₹280–320 |
| Copper Motor Winding | ₹420–450 |
| Copper Transformer | ₹380–420 |

*Rates are updated daily. Call +91 8505863220 for today's exact rate.*

## Why Copper Rates Fluctuate

Copper is a globally traded commodity. Indian copper scrap rates are influenced by:
- **LME (London Metal Exchange)** prices
- **USD/INR exchange rate** - copper is traded in dollars
- **Domestic demand** from electrical and construction sectors
- **Seasonal factors** - demand peaks before summer (AC installations)

## Types of Copper Scrap We Buy

SCRAPYARD buys all types of copper scrap including:

### Electrical Copper
- Old electrical wires and cables
- Motor windings
- Transformer copper
- Bus bars
- Switch gear

### Plumbing Copper
- Old copper pipes
- Fittings and valves
- Water heater coils

### Industrial Copper
- Copper rods and sheets
- Radiators (automotive)
- Heat exchangers

### Household Copper
- Old copper utensils (lotas, kadhai)
- Copper vessels
- Decorative items

## How to Get Maximum Copper Scrap Rate

1. **Remove insulation** from wires - bare copper gets 15-20% more than insulated wire
2. **Separate copper grades** - don't mix thick wire with thin wire
3. **Clean the copper** - remove solder, paint, and attachments
4. **Know the weight** - use a home scale to estimate before the agent arrives
5. **Compare rates** - SCRAPYARD guarantees market-rate pricing

## Copper Scrap Rate by City

| City | Copper Rate (approx) |
|------|---------------------|
| Delhi | ₹500–520/kg |
| Mumbai | ₹495–515/kg |
| Bangalore | ₹490–510/kg |
| Hyderabad | ₹488–508/kg |
| Chennai | ₹485–505/kg |
| Noida | ₹498–518/kg |

*Rates vary by quality. Get exact quote: +91 8505863220*

[Check all live scrap rates →](/scrap-rates) | [Book free pickup →](/contact)`,
  },
  {
    title: "Kabadiwala vs SCRAPYARD - Which Gets You a Better Deal?",
    slug: "kabadiwala-vs-scrapyard-comparison",
    category: "Recycling",
    author: "SCRAPYARD Team",
    excerpt: "Kabadiwala vs SCRAPYARD - an honest comparison. Who gives better rates, more convenience, and fairer service? The answer might surprise you.",
    metaTitle: "Kabadiwala vs SCRAPYARD - Which is Better? | Honest Comparison",
    metaDescription: "Kabadiwala vs SCRAPYARD comparison: rates, weighing accuracy, payment, convenience. Find out why thousands switch to SCRAPYARD for scrap selling.",
    content: `# Kabadiwala vs SCRAPYARD - Which Gets You a Better Deal?

Most Indians have relied on the local kabadiwala for decades. He comes when he wants, quotes a rate you can't verify, uses a scale you can't trust, and pays whatever he feels like. Sound familiar?

SCRAPYARD was built to fix exactly this. Here's an honest, detailed comparison.

## The Complete Comparison

| Factor | Local Kabadiwala | SCRAPYARD |
|--------|-----------------|-----------|
| **Rates** | 20-40% below market | Live market rates |
| **Weighing** | Manual/spring scale (inaccurate) | Certified digital scale |
| **Payment** | Cash only, sometimes delayed | Instant - Cash/UPI/Bank |
| **Timing** | Comes when he wants | You choose the time |
| **Documentation** | None | Itemized receipt |
| **Booking** | Wait and shout from balcony | App/website/phone |
| **Transparency** | Zero | 100% |
| **Service Area** | Your street only | 30+ cities |
| **Materials** | Limited | All types |
| **GST Receipt** | Never | Available |

## The Rate Difference - Real Example

Let's say you have 100kg of iron scrap:

**Kabadiwala:**
- Quotes ₹22/kg (tells you market is low)
- Weighs 95kg on his spring scale (5kg "disappeared")
- Pays: ₹22 × 95 = **₹2,090**

**SCRAPYARD:**
- Live market rate: ₹32/kg
- Digital scale: 100kg accurate
- Pays: ₹32 × 100 = **₹3,200**

**You earn ₹1,110 MORE with SCRAPYARD** - that's 53% extra for the same scrap.

## The Weighing Problem

This is the biggest fraud in the traditional scrap industry. Spring scales and old weighing machines are notoriously inaccurate - and always in the kabadiwala's favour.

SCRAPYARD agents carry **government-certified digital weighing scales** calibrated regularly. Every gram is counted. You can verify the weight yourself on our scale.

## When is Kabadiwala Still OK?

To be fair, the local kabadiwala makes sense for:
- Very small quantities (2-3kg) that aren't worth booking
- Immediate same-day pickup when you're in a hurry
- Paper/cardboard where the rate difference is small

For everything else - metals, e-waste, appliances, large quantities - SCRAPYARD gives you significantly better value.

## What Our Customers Say

*"I used to sell copper wire to the kabadiwala for ₹380/kg. SCRAPYARD paid me ₹505/kg for the same wire. I made ₹15,000 more on one sale."* - Rakesh M., Noida

*"The digital scale is the biggest difference. The kabadiwala always 'lost' 10% of my weight. SCRAPYARD weighed my scrap right in front of me."* - Suresh P., Delhi

## Try SCRAPYARD Once - We'll Prove the Difference

Book your first free pickup at **scrapyard.co.in/contact** or call **+91 8505863220**. Compare what we pay vs your kabadiwala's last quote. We're confident you'll never go back.`,
  },
  {
    title: "E-Waste Disposal in India - Complete Legal Guide 2024",
    slug: "e-waste-disposal-guide-india-2024",
    category: "E-Waste",
    author: "SCRAPYARD Team",
    excerpt: "Complete guide to e-waste disposal in India. CPCB rules, what you can sell, what to do with old phones/laptops, and how to get paid for it.",
    metaTitle: "E-Waste Disposal India 2024 - Complete Legal Guide | SCRAPYARD",
    metaDescription: "How to dispose e-waste legally in India. CPCB rules, EPR compliance, what old electronics are worth, and free e-waste pickup with SCRAPYARD.",
    content: `# E-Waste Disposal in India - Complete Legal Guide 2024

India generates over **3.2 million tonnes of e-waste annually** - making it the 3rd largest e-waste generator in the world. Yet less than 20% is recycled properly. Improper e-waste disposal is not just harmful - it's illegal.

Here's everything you need to know about disposing of e-waste legally and profitably in India.

## What is E-Waste?

E-waste (electronic waste) includes any discarded electrical or electronic device:
- Old mobile phones and smartphones
- Laptops, desktops, tablets
- Televisions, monitors
- Printers, scanners, photocopiers
- Refrigerators, washing machines, ACs
- Wires, cables, chargers
- Circuit boards and components
- Batteries (lithium, lead-acid)

## India's E-Waste Laws (What You Must Know)

### E-Waste Management Rules 2022
India's e-waste is governed by the **E-Waste (Management) Rules, 2022** under the Environment Protection Act.

**Key points:**
- Producers must meet **Extended Producer Responsibility (EPR)** targets
- Businesses cannot dispose of e-waste in regular trash - it's illegal
- Only **CPCB-authorized recyclers** can process e-waste
- Penalties for illegal disposal: up to ₹1 lakh fine + imprisonment

### Who Does This Apply To?
- **Businesses**: Any company generating e-waste must use authorized recyclers
- **Manufacturers**: Must register with CPCB and meet EPR targets
- **Individuals**: Encouraged to use proper channels (SCRAPYARD makes this easy)

## What Your Old Electronics Are Worth

| Device | Scrap Value |
|--------|-------------|
| Old smartphone | ₹100–500 |
| Laptop (working) | ₹2,000–8,000 |
| Laptop (dead) | ₹500–1,500 |
| Desktop PC | ₹800–2,500 |
| LCD/LED TV (working) | ₹1,500–5,000 |
| Old CRT TV | ₹200–500 |
| Old refrigerator | ₹1,500–4,000 |
| Old AC (split) | ₹2,000–6,000 |
| Copper wire (1kg) | ₹490–520 |
| Old printer | ₹200–800 |

## How SCRAPYARD Handles E-Waste

SCRAPYARD works with **CPCB-authorized e-waste recyclers**:
1. We collect your e-waste with free doorstep pickup
2. Items are sorted and data-destroyed (for devices with storage)
3. Sent to certified facilities for proper dismantling
4. Precious metals (gold, silver, copper, palladium) are recovered
5. Hazardous materials (mercury, lead, cadmium) are safely disposed

You get **paid for your e-waste + a certificate of proper disposal** for business compliance.

## Data Security for Businesses

Worried about data on old laptops and hard drives? SCRAPYARD provides:
- **Certificate of Destruction** for all storage devices
- Data wiping using DoD 5220.22-M standard
- Physical destruction of HDDs/SSDs on request

## Book E-Waste Pickup

Call **+91 8505863220** or visit [scrapyard.co.in/contact](/contact).

We serve Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Noida, Gurgaon, Faridabad, and 20+ more cities.`,
  },
  {
    title: "Scrap Price List India 2024 - All Materials & Live Rates",
    slug: "scrap-price-list-india-2024",
    category: "Metal Prices",
    author: "SCRAPYARD Team",
    excerpt: "Complete scrap price list for India 2024. Live rates for iron, copper, aluminium, brass, plastic, paper, e-waste and all materials. Updated daily.",
    metaTitle: "Scrap Price List India 2024 - All Materials | SCRAPYARD Live Rates",
    metaDescription: "Complete scrap price list India 2024. Iron ₹28-35/kg, Copper ₹480-520/kg, Aluminium ₹100-120/kg. Live rates updated daily. Free pickup.",
    content: `# Scrap Price List India 2024 - All Materials & Live Rates

This is India's most comprehensive scrap price list, updated daily by SCRAPYARD's market team. Use these rates as a reference - actual rates may vary by city, quality, and quantity.

## Metal Scrap Rates

### Iron & Steel
| Material | Rate (₹/kg) |
|----------|-------------|
| MS Heavy Scrap | ₹32–35 |
| MS Light Scrap | ₹28–31 |
| Cast Iron | ₹22–26 |
| Stainless Steel | ₹55–75 |
| HMS 1&2 | ₹30–34 |

### Copper
| Material | Rate (₹/kg) |
|----------|-------------|
| Bare Bright Copper | ₹510–530 |
| Copper #1 | ₹490–510 |
| Copper #2 | ₹470–490 |
| Copper Winding Wire | ₹420–450 |

### Aluminium
| Material | Rate (₹/kg) |
|----------|-------------|
| Aluminium Utensils | ₹110–125 |
| Aluminium Extrusion | ₹100–115 |
| Aluminium Cans | ₹85–95 |
| Aluminium Foil | ₹70–85 |
| Cast Aluminium | ₹90–105 |

### Brass & Others
| Material | Rate (₹/kg) |
|----------|-------------|
| Yellow Brass | ₹290–320 |
| Red Brass | ₹310–335 |
| Lead | ₹95–110 |
| Zinc | ₹130–150 |

## Plastic Scrap Rates
| Material | Rate (₹/kg) |
|----------|-------------|
| PET Bottles (clear) | ₹18–22 |
| HDPE (coloured) | ₹12–16 |
| PVC Pipes | ₹10–14 |
| PP (Polypropylene) | ₹14–18 |
| Mixed Plastic | ₹8–12 |

## Paper & Cardboard Rates
| Material | Rate (₹/kg) |
|----------|-------------|
| Newspaper | ₹14–18 |
| Cardboard/Boxes | ₹12–16 |
| White Office Paper | ₹16–20 |
| Books | ₹10–14 |

## E-Waste & Electronics
| Material | Rate |
|----------|------|
| Old Smartphone | ₹100–500/pc |
| Laptop (dead) | ₹500–1,500/pc |
| Desktop PC | ₹800–2,500/pc |
| Old TV (LCD) | ₹1,500–5,000/pc |
| Old AC (split) | ₹2,000–6,000/pc |
| Old Fridge | ₹1,500–4,000/pc |
| Copper Wire (insulated) | ₹250–350/kg |

## Appliance Scrap
| Appliance | Rate |
|-----------|------|
| Old Washing Machine | ₹800–2,500/pc |
| Microwave | ₹400–800/pc |
| Geyser | ₹300–600/pc |
| Electric Fan | ₹200–450/pc |
| Old Inverter/UPS | ₹500–1,500/pc |

## How Rates Are Determined

Scrap rates in India change daily based on:
1. **International metal prices** (LME, SHFE)
2. **USD/INR exchange rate**
3. **Domestic demand** from factories and recyclers
4. **Quality of scrap** - clean, sorted scrap always gets better rates
5. **Quantity** - bulk sellers get premium rates

## Get Today's Exact Rate

Rates above are indicative. For **today's exact rate** in your city:
- Visit: [scrapyard.co.in/scrap-rates](/scrap-rates)
- Call: **+91 8505863220**
- WhatsApp: **+91 8505863220**

[Book Free Pickup →](/contact)`,
  },
  {
    title: "How to Get the Best Price for Old AC, Fridge & Appliances",
    slug: "best-price-old-ac-fridge-appliances-scrap",
    category: "Recycling",
    author: "SCRAPYARD Team",
    excerpt: "Selling old AC, fridge, or washing machine? Get maximum scrap value with these insider tips. Free pickup, instant payment across India.",
    metaTitle: "Best Price for Old AC Fridge Appliances - Sell Scrap | SCRAPYARD",
    metaDescription: "Get best price for old AC, fridge, washing machine scrap. Tips to maximize value, current appliance scrap rates, and free pickup with SCRAPYARD.",
    content: `# How to Get the Best Price for Old AC, Fridge & Washing Machine

Every year, millions of old appliances are replaced across India. Most people either throw them away or sell to the local kabadiwala for a fraction of what they're worth. Here's how to extract maximum value from your old appliances.

## Current Appliance Scrap Rates

| Appliance | Age/Condition | Rate |
|-----------|---------------|------|
| Split AC (1.5 ton) | Working | ₹4,000–6,500 |
| Split AC (1.5 ton) | Dead/Old | ₹2,000–3,500 |
| Window AC | Working | ₹3,000–5,000 |
| Window AC | Dead/Old | ₹1,500–2,500 |
| Refrigerator (double door) | Working | ₹3,500–6,000 |
| Refrigerator (single door) | Any | ₹1,500–3,500 |
| Washing Machine (auto) | Any | ₹1,500–3,500 |
| Semi-automatic WM | Any | ₹800–2,000 |
| Microwave | Any | ₹400–900 |
| Geyser | Any | ₹300–700 |

*Rates vary by brand, age, working condition, and current market.*

## Why Appliances Have Good Scrap Value

Old appliances contain valuable raw materials:

**Split AC contains:**
- Copper (condenser coils, wiring) - ₹490/kg
- Aluminium (fins) - ₹100/kg
- Steel (body) - ₹32/kg
- Compressor motor (copper winding)
- Refrigerant gas (R22/R32)

**Refrigerator contains:**
- Copper (compressor, coils)
- Steel (body, shelves)
- Plastic (interior)
- Compressor motor

**This is why a dead AC is still worth ₹2,000+** - the copper and aluminium inside have real value.

## Tips to Get Maximum Value

### 1. Don't Dismantle Yourself
Many people try to remove the copper from ACs themselves. **Don't do this.** You'll:
- Get less copper than you think
- Damage components that have value as-is
- Risk injury from refrigerant gas

Let SCRAPYARD's trained team do this properly.

### 2. Know Your Appliance's Model
Older, larger appliances have more copper and aluminium. A 5-year-old 2-ton AC has significantly more copper than a new 1-ton inverter AC. Knowing your model helps our agent give an accurate quote.

### 3. Don't Mix with Other Scrap
Appliances should be sold separately from general metal scrap. They contain multiple valuable materials that need to be assessed individually.

### 4. Working vs Non-Working
- **Working appliances** get 40-60% more than dead ones
- If your AC/fridge still works, consider selling to second-hand buyers first
- SCRAPYARD can advise on the best option

### 5. Bulk = Better Rate
Replacing multiple appliances? Sell them together. Bulk sales get better per-unit rates.

## How SCRAPYARD Handles Appliance Scrap

1. Our agent arrives at your home
2. Assesses each appliance (model, condition, weight)
3. Gives you a price for each item
4. Safely removes, dismantles, and takes away
5. You receive instant payment

**No mess left behind. We clean up after ourselves.**

## Areas We Serve

We pick up old appliances across Delhi, Noida, Gurgaon, Faridabad, Ghaziabad, Mumbai, Bangalore, Hyderabad, Chennai, Pune, and 25+ more cities.

[Book Free Appliance Pickup →](/contact) | Call: **+91 8505863220**`,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error("❌ MONGODB_URI not set"); process.exit(1); }

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  let created = 0;
  for (const blog of blogs) {
    const exists = await Blog.findOne({ slug: blog.slug });
    if (exists) { console.log(`⏭  Skipped (exists): ${blog.slug}`); continue; }
    await Blog.create({ ...blog, status: "published" });
    console.log(`✅ Created: ${blog.title}`);
    created++;
  }

  console.log(`\n🎉 Done! ${created} blog posts created.`);
  await mongoose.disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
