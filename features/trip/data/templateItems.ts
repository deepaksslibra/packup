import { PackingItem } from '../types'; // Assuming this path is correct for your project

/**
 * Maps template keys to their pre-defined packing items.
 * Used to populate new trips created from templates.
 */
export const templateItems: Record<string, Omit<PackingItem, 'id'>[]> = {
  '2-day-city-break': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Comfortable walking shoes', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'City map or navigation app access', quantity: 1, category: 'Navigation', essential: true, packed: false, icon: 'MapTrifold' },
    { name: 'Phone', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile'},
    { name: 'Phone charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'Plugs' },
    { name: 'Portable charger/Power bank', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'BatteryCharging' },
    { name: 'Day backpack or cross-body bag', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Backpack' },
    { name: 'T-shirts or Tops', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Pants, Jeans, or Skirt', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'Pants' },
    { name: 'Underwear', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' }, // Placeholder icon
    { name: 'Socks', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Light jacket or Sweater', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger' },
    { name: 'Pajamas/Sleepwear', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Toothbrush', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Tooth'},
    { name: 'Toothpaste (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Deodorant', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sparkle'},
    { name: 'Soap or Body wash (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'HandSoap'},
    { name: 'Shampoo (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Reusable water bottle', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Wallet (ID, credit cards, some cash)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet' },
    { name: 'House keys & any necessary travel keys', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Key' },
    { name: 'Prescription medications (if any)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Face mask (optional but good to have)', quantity: 2, category: 'Health', essential: true, packed: false, icon: 'MaskHappy' }, // Essential for some contexts
    { name: 'Pain relievers (e.g., ibuprofen)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'ID Card/Passport (if needed for travel/entry)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'IdentificationCard'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Camera (dedicated)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Sunglasses' },
    { name: 'Small travel umbrella', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'UmbrellaSimple' },
    { name: 'Book or E-reader', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Travel journal & pen', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'BookBookmark' },
    { name: 'Reusable shopping bag', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'ShoppingBagOpen' },
    { name: 'Hand sanitizer', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Headphones/Earbuds', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Headphones' },
    { name: 'Travel adapter (if international)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs' },
    { name: 'Conditioner (travel size)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple'},
    { name: 'Basic makeup items', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'PaintBrushBroad' },
    { name: 'Lip balm', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Small first-aid items (band-aids, antiseptic wipes)', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'Bandaids' },
    { name: 'Scarf or pashmina', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Stool' }, // Placeholder
    { name: 'Portable speaker (mini)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'SpeakerHigh' },
    { name: 'Snacks for travel/day', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cookie' },
    { name: 'Extra pair of comfortable shoes (e.g., flats)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'SneakerMove' },
    { name: 'Small lock for bag', quantity: 1, category: 'Security', essential: false, packed: false, icon: 'LockSimple' },
    { name: 'City guidebook (physical)', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Small binoculars (for sightseeing)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Travel pillow (for journey)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Bed' }, // Placeholder
    { name: 'Eye mask & earplugs (for light sleepers)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'EyeSlash' },
    { name: 'Hat or cap', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'BaseballCap' },
  ],
  '3-day-weekend-road-trip': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Driving license', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'IdentificationCard' },
    { name: 'Vehicle registration', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'FileText' },
    { name: 'Car insurance details', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'ShieldCheck' },
    { name: 'Phone', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Car phone charger or USB cable for car', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'Plugs' }, // Use Plugs or CarSimple
    { name: 'Roadside emergency kit (car provided or personal)', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'FirstAidKit' },
    { name: 'Reusable water bottle (for each person)', quantity: 1, category: 'Food', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Casual outfits (tops, bottoms)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Underwear', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Socks', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Comfortable shoes for driving & walking', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'Pajamas', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Basic toiletries kit (toothbrush, toothpaste, soap, deodorant)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Shampoo & Conditioner (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Sunglasses (for driving)', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sunglasses' },
    { name: 'Wallet (ID, cards, cash)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet' },
    { name: 'House keys', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Key' },
    { name: 'Prescription medications', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Small personal first-aid kit (band-aids, pain relievers)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'FirstAid' },
    { name: 'Jumper cables', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'CarBattery' }, // Often essential
    { name: 'Spare tire (checked and inflated)', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'Tire' },
    { name: 'Snacks for the car', quantity: 1, category: 'Food', essential: true, packed: false, icon: 'Cookie' },
    { name: 'Navigation app or GPS device', quantity: 1, category: 'Navigation', essential: true, packed: false, icon: 'Gps'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Car phone mount', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'DeviceMobile' },
    { name: 'Cooler for drinks and perishable snacks', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cube' },
    { name: 'Pillow and blanket for car comfort', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Bed' },
    { name: 'Music playlist or Audiobooks downloaded', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'MusicNotesSimple' },
    { name: 'Travel games or deck of cards', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Cards' },
    { name: 'Camera', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Neck pillow for passengers', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Bed' }, // Placeholder
    { name: 'Small trash bags for car', quantity: 1, category: 'Essentials', essential: false, packed: false, icon: 'Trash' },
    { name: 'Portable jump starter', quantity: 1, category: 'Emergency', essential: false, packed: false, icon: 'CarBattery' },
    { name: 'Tire pressure gauge', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Gauge' },
    { name: 'Sunshade for car windshield', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'SunDim' },
    { name: 'Wet wipes or hand sanitizer', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Binoculars (for scenic stops)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Hiking shoes (if planning walks)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'Boot' },
    { name: 'Daypack for short hikes/outings', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'Backpack' },
    { name: 'Portable Bluetooth speaker', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'SpeakerHigh' },
    { name: 'Travel mug for coffee/tea', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Coffee' },
    { name: 'Multi-port USB car charger', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs' },
    { name: 'Window cleaning spray/cloth for car', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'SprayBottle' },
    { name: 'Flashlight (aside from phone)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Flashlight' },
    { name: 'Picnic blanket', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'SquaresFour' },
    { name: 'Umbrella', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'UmbrellaSimple' },
    { name: 'Spare car key (kept separate)', quantity: 1, category: 'Emergency', essential: false, packed: false, icon: 'Key' },
  ],
  '7-day-beach-vacation': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Swimwear', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'SwimmingPool' },
    { name: 'Beach towel', quantity: 2, category: 'Beach', essential: true, packed: false, icon: 'Towel' },
    { name: 'Sunscreen (SPF 30+, water-resistant)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sun' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sunglasses' },
    { name: 'Flip flops or Sandals', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'SneakerMove' },
    { name: 'Sun hat or Wide-brimmed cap', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sun' }, // More specific icon
    { name: 'Beach bag or large tote', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'BagSimple' },
    { name: 'After-sun lotion or Aloe Vera gel', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Casual cover-up or Sarong', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'PersonSimple' },
    { name: 'T-shirts or Tank tops', quantity: 5, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Shorts or Skirts (lightweight)', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'Pants' },
    { name: 'Underwear', quantity: 7, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Pajamas or Sleepwear', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Wallet (ID, cards, cash)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet' },
    { name: 'Prescription medications', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Basic toiletries (toothbrush, toothpaste, deodorant, soap)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Shampoo & Conditioner (travel size or decanted)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Reusable water bottle', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Lip balm with SPF', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Passport/ID (if traveling internationally or flying)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'Passport'},
    { name: 'Socks (for travel days/evenings)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Light sweater or cardigan for evenings', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Book or E-reader', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Waterproof phone pouch or case', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'DeviceMobile' }, // Placeholder
    { name: 'Insect repellent (especially for evenings)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'BugBeetle' },
    { name: 'Portable Bluetooth speaker', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'SpeakerHigh' },
    { name: 'Camera (waterproof if possible)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Snorkel gear (mask, snorkel)', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'SwimmingPool' }, // Placeholder
    { name: 'Beach umbrella or small sun shelter', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'UmbrellaSimple' },
    { name: 'Small cooler bag for beach drinks/snacks', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cube' },
    { name: 'Frisbee or beach ball', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'Baseball' }, // Placeholder
    { name: 'Water shoes (for rocky areas)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'Waves' },
    { name: 'Travel-size first-aid kit', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'FirstAid' },
    { name: 'Hair detangler or leave-in conditioner', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'SprayBottle' },
    { name: 'Dry bag (for valuables near water)', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'BagSimple' },
    { name: 'Playing cards or travel games', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Cards' },
    { name: 'Binoculars (for dolphin/boat watching)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Portable fan (battery operated)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Fan' },
    { name: 'Inflatable float or lilo', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'SwimmingPool' }, // Placeholder
    { name: 'Nice outfit for dinners', quantity: 2, category: 'Clothing', essential: false, packed: false, icon: 'PersonSimple'},
    { name: 'Travel adapter (if international)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs'},
    { name: 'Small backpack for excursions', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'Backpack'},
    { name: 'Beach chair (if not provided)', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'Chair'},
    { name: 'Waterproof watch', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Watch'},
    { name: 'Hair ties/clips', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Paperclip'},
  ],
  '3-day-hiking-adventure': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Hiking boots (broken in)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Boot' },
    { name: 'Backpack (appropriate size for trip length)', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Backpack' },
    { name: 'Hydration system (reservoir or multiple water bottles)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Water filter or purification tablets', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple'}, // Specific icon would be better
    { name: 'Trail map (physical copy)', quantity: 1, category: 'Navigation', essential: true, packed: false, icon: 'MapTrifold' },
    { name: 'Compass or GPS device/app', quantity: 1, category: 'Navigation', essential: true, packed: false, icon: 'Compass' },
    { name: 'First-aid kit (hiking specific, comprehensive)', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'FirstAidKit' },
    { name: 'Hiking socks (wool or synthetic, extra pairs)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Moisture-wicking base layer (top & bottom if cold)', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Insulating mid-layer (fleece, down jacket)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger' },
    { name: 'Waterproof and windproof outer shell jacket', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CloudRain' },
    { name: 'Waterproof pants (optional but highly recommended for multi-day)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'Pants'},
    { name: 'Hiking pants or convertible pants (quick-dry)', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Pants' },
    { name: 'Sun hat or cap with wide brim', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sun' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sunglasses' },
    { name: 'Sunscreen (high SPF)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sun' },
    { name: 'Headlamp or flashlight (with extra batteries)', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'Flashlight' },
    { name: 'High-energy snacks (nuts, bars, dried fruit, jerky)', quantity: 1, category: 'Food', essential: true, packed: false, icon: 'Cookie' },
    { name: 'Multi-tool or knife', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'Knife' },
    { name: 'Emergency shelter (bivy sack, space blanket, or tent if overnight)', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'Tent' },
    { name: 'Toilet paper & trowel (for Leave No Trace)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'ToiletPaper' },
    { name: 'Trash bags (pack it in, pack it out)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Trash' },
    { name: 'Phone (fully charged, for emergencies/photos)', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile'},
    { name: 'Portable charger/Power bank for phone', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'BatteryCharging'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Trekking poles', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'PersonSimpleHike' }, // Placeholder
    { name: 'Gaiters (for muddy/snowy/sandy conditions)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'Boot' }, // Placeholder
    { name: 'Camp shoes or sandals (for evenings if camping)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'SneakerMove' },
    { name: 'Sleeping bag (if camping)', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'Bed' },
    { name: 'Sleeping pad (if camping)', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'Bed' },
    { name: 'Cooking system (stove, fuel, pot, utensils if camping/cooking)', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'CookingPot' },
    { name: 'Beanie or warm hat (for cold weather/evenings)', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'Beanie' },
    { name: 'Gloves or mittens (for cold weather)', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'HandGrabbing' },
    { name: 'Insect repellent', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'BugBeetle' },
    { name: 'Lip balm with SPF', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Blister treatment (moleskin, blister pads)', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'Bandaids' },
    { name: 'Small quick-dry towel', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'Towel' },
    { name: 'Camera (dedicated, for better photos)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Binoculars (for wildlife/views)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Notebook and pen (waterproof ideally)', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'NotePencil' },
    { name: 'Book or E-reader (for downtime)', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Whistle (for emergencies)', quantity: 1, category: 'Emergency', essential: false, packed: false, icon: 'SpeakerSimpleHigh' }, // Placeholder
    { name: 'Duct tape (wrapped around water bottle or pole for repairs)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Toolbox' }, // Placeholder
    { name: 'Rope or cord (utility)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Minus' }, // Placeholder
    { name: 'Backpack rain cover', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'UmbrellaSimple' }, // Placeholder
    { name: 'Hand sanitizer', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap'},
    { name: 'Biodegradable soap', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap'},
    { name: 'Repair kit for gear (tent, sleeping pad)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Wrench'},
  ],
  '2-day-business-trip': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Business suits or professional dresses', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'UserTie' },
    { name: 'Dress shirts or blouses', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'UserTie' }, // Or PersonSimple for blouse
    { name: 'Laptop and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'Laptop' },
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Dress shoes', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'UserTie' }, // Placeholder, could be HighHeel for women
    { name: 'Socks or Hosiery', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Underwear', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Belt (if applicable)', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Belt' },
    { name: 'Ties or professional accessories', quantity: 2, category: 'Accessories', essential: true, packed: false, icon: 'UserTie' },
    { name: 'Pajamas/Sleepwear', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Travel-size toiletries (toothbrush, toothpaste, deodorant, soap, shampoo)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Hair styling products (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'SprayBottle' },
    { name: 'Comb or hairbrush', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Toolbox'}, // Placeholder
    { name: 'Wallet (ID, credit cards, business cards, cash)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet' },
    { name: 'Business cards', quantity: 20, category: 'Documents', essential: true, packed: false, icon: 'IdentificationCard' },
    { name: 'Notebook and pen', quantity: 1, category: 'Stationery', essential: true, packed: false, icon: 'NotePencil' },
    { name: 'Any presentation materials or documents (printed/digital)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'PresentationChart' },
    { name: 'Laptop bag or briefcase', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Briefcase' },
    { name: 'Prescription medications', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Pain relievers', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Face masks (for travel/meetings)', quantity: 2, category: 'Health', essential: true, packed: false, icon: 'MaskHappy' },
    { name: 'Itinerary with meeting addresses and times', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'CalendarDots'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Portable charger/Power bank', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'BatteryCharging' },
    { name: 'Headphones (noise-cancelling for travel/focus)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Headphones' },
    { name: 'Travel adapter (if international)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs' },
    { name: 'Casual outfit for evening or travel', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'ShirtFolded' },
    { name: 'Comfortable shoes for travel/evening', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'Sneaker' },
    { name: 'Workout clothes and shoes (if planning to use hotel gym)', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'Barbell' },
    { name: 'Small travel umbrella', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'UmbrellaSimple' },
    { name: 'Book or E-reader for downtime', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Travel pillow (for flight/train)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Bed' }, // Placeholder
    { name: 'Eye mask and earplugs', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'EyeSlash' },
    { name: 'Reusable water bottle', quantity: 1, category: 'Essentials', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Snacks for travel', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cookie' },
    { name: 'Stain remover pen', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'PencilSimpleLine' }, // Placeholder
    { name: 'Lint roller', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Toolbox' }, // Placeholder
    { name: 'Small travel steamer or wrinkle release spray', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'SprayBottle' },
    { name: 'Digital copies of important documents (on cloud/USB)', quantity: 1, category: 'Documents', essential: false, packed: false, icon: 'FloppyDisk' },
    { name: 'Hand sanitizer', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Breath mints or gum', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cookie' }, // Placeholder
    { name: 'Company-branded items (pens, small gifts if appropriate)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Gift' },
    { name: 'USB flash drive with important files', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'FloppyDisk' },
    { name: 'Reading glasses (if needed)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Eyeglasses'},
    { name: 'Small sewing kit for quick repairs', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Needle'},
    { name: 'Currency for taxis/tips if different from home', quantity: 1, category: 'Essentials', essential: false, packed: false, icon: 'Money'},
  ],
  '5-day-cultural-tour': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Guidebook or research notes/app', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'BookOpenText' },
    { name: 'Comfortable walking shoes (well broken-in)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'Day bag or secure cross-body bag', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Backpack' },
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Portable charger/Power bank', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'BatteryCharging' },
    { name: 'Modest clothing for religious/cultural sites (scarf, long sleeves, long pants/skirts)', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'PersonSimple' },
    { name: 'Casual outfits for exploring', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'ShirtFolded' },
    { name: 'Underwear', quantity: 5, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Socks', quantity: 5, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Light rain jacket or compact umbrella', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CloudRain' },
    { name: 'Pajamas/Sleepwear', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Reusable water bottle', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Sun hat or cap', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sun' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sunglasses' },
    { name: 'Sunscreen', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sun' },
    { name: 'Basic toiletries kit', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Wallet (ID, cards, local currency)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet' },
    { name: 'Passport/Visa and copies (if international)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'Passport' },
    { name: 'Prescription medications', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Small first-aid kit (band-aids, pain relievers, antiseptic)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'FirstAidKit' },
    { name: 'Travel adapter (if international)', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'Plugs' },
    { name: 'Hand sanitizer or wet wipes', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'HandSoap' },

    // --- Optional Items (Target: 20+) ---
    { name: 'Camera (dedicated)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Local language phrasebook or translation app', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'Translate' },
    { name: 'Travel journal and pen', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'BookBookmark' },
    { name: 'Binoculars (for architecture/details)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Small gifts for locals (if appropriate)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Gift' },
    { name: 'Reusable shopping bag (for souvenirs)', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'ShoppingBagOpen' },
    { name: 'Neck wallet or money belt for security', quantity: 1, category: 'Security', essential: false, packed: false, icon: 'Wallet' },
    { name: 'Portable fan (if hot climate)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Fan' },
    { name: 'Sleep mask and earplugs (for noisy accommodations/transport)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'EyeSlash' },
    { name: 'Extra memory cards for camera', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'FloppyDisk' },
    { name: 'Light sweater or shawl for evenings/AC', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'CoatHanger' },
    { name: 'Different pair of comfortable shoes (to alternate)', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'SneakerMove' },
    { name: 'Small lock for luggage or lockers', quantity: 1, category: 'Security', essential: false, packed: false, icon: 'LockSimple' },
    { name: 'Motion sickness medication (if prone)', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'Pill' },
    { name: 'Snacks from home (if specific dietary needs/preferences)', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cookie' },
    { name: 'Dry shampoo (for refreshing hair)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'Wind' },
    { name: 'Lip balm', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Small sewing kit for repairs', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Needle' },
    { name: 'Travel-sized laundry detergent', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Portable Wi-Fi hotspot or SIM card', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'WifiHigh' },
    { name: 'Copies of tickets/reservations (digital and printed backup)', quantity: 1, category: 'Documents', essential: false, packed: false, icon: 'Copy'},
    { name: 'Alarm clock (phone can work, but some prefer separate)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Alarm'},
    { name: 'Small musical instrument (e.g. harmonica)', quantity: 1, category: 'Personal', essential: false, packed: false, icon: 'MusicNotesSimple'},
  ],
  '2-day-camping-getaway': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Tent with rainfly and stakes', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'Tent' },
    { name: 'Sleeping bag (appropriate for temperature)', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'Bed' },
    { name: 'Sleeping pad or air mattress', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'Bed' },
    { name: 'Headlamp or Flashlight (with extra batteries)', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'Flashlight' },
    { name: 'Waterproof matches or lighter', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'FireSimple' },
    { name: 'Multi-tool or knife', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'Knife' },
    { name: 'Cooler with food for meals', quantity: 1, category: 'Food', essential: true, packed: false, icon: 'Cube' },
    { name: 'Drinking water (bottles or large container)', quantity: 1, category: 'Food', essential: true, packed: false, icon: 'DropSimple' }, // Sufficient supply
    { name: 'Portable camping stove and fuel', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'CookingPot' },
    { name: 'Cooking pot or pan', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'CookingPot' },
    { name: 'Eating utensils (fork, spoon, knife)', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'ForkKnife' },
    { name: 'Plate or bowl', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'BowlFood' },
    { name: 'Mug for drinks', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'Coffee' },
    { name: 'Camp chairs', quantity: 1, category: 'Camping', essential: true, packed: false, icon: 'Chair' }, // Per person ideally
    { name: 'Warm layers of clothing (fleece, thermal top)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger' },
    { name: 'Rain gear (jacket and pants)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CloudRain' },
    { name: 'Hiking boots or sturdy closed-toe shoes', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Boot' },
    { name: 'Socks (extra pairs, wool or synthetic)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Pajamas or warm sleep clothes', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'First-aid kit (comprehensive)', quantity: 1, category: 'Emergency', essential: true, packed: false, icon: 'FirstAidKit' },
    { name: 'Trash bags (pack it in, pack it out)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Trash' },
    { name: 'Sunscreen', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sun' },
    { name: 'Insect repellent', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'BugBeetle' },
    { name: 'Toilet paper', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'ToiletPaper' },
    { name: 'Basic toiletries (toothbrush, toothpaste, biodegradable soap)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'HandSoap'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Camping pillow', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'Bed' },
    { name: 'Tarp (for under tent or extra shelter)', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'SquaresFour' }, // Placeholder
    { name: 'Axe or hatchet (for firewood, check regulations)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Axe' },
    { name: 'Camp table', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'PicnicTable' },
    { name: 'Lantern (battery or fuel powered)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'LightbulbFilament' },
    { name: 'Hammock', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'Bed' }, // Placeholder
    { name: 'Binoculars', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Camera', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Portable speaker', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'SpeakerHigh' },
    { name: 'Deck of cards or travel games', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Cards' },
    { name: 'Book or E-reader', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Fishing gear (if applicable)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'FishSimple' },
    { name: 'Daypack (for short hikes from camp)', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'Backpack' },
    { name: 'Fire starter (Ferro rod, tinder)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'FireSimple' },
    { name: 'Camp coffee maker (French press, pour-over)', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'Coffee' },
    { name: 'Dish soap (biodegradable) and sponge', quantity: 1, category: 'Camping', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Quick-dry towel', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'Towel' },
    { name: 'Sun hat/Cap', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'BaseballCap' },
    { name: 'Work gloves (for handling firewood/tasks)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'HandGrabbing' },
    { name: 'Rope or cord for clothesline/utility', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Minus' }, // Placeholder
    { name: 'Portable power bank for phone', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'BatteryCharging'},
    { name: 'Small shovel or trowel', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Shovel'},
    { name: 'Extra batteries for all electronics', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'BatteryPlus'},
  ],
  '4-day-wellness-retreat': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Yoga mat', quantity: 1, category: 'Wellness', essential: true, packed: false, icon: 'PersonSimpleTaiChi' },
    { name: 'Comfortable workout clothes (yoga pants, leggings, tops)', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Sports bras', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Barbell'},
    { name: 'Reusable water bottle', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Comfortable casual wear (loungewear, sweaters)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'Couch' },
    { name: 'Slip-on shoes or sandals (for around retreat)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'SneakerMove' },
    { name: 'Walking or light athletic shoes', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'Sleepwear/Pajamas', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Underwear', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Socks (for workouts and casual wear)', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Gentle/Natural toiletries (toothbrush, toothpaste, deodorant)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Shampoo & Conditioner (natural if preferred)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Face wash & Moisturizer', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Journal and pen', quantity: 1, category: 'Personal', essential: true, packed: false, icon: 'BookBookmark' }, // Essential for reflection
    { name: 'Prescription medications', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Light sweater, shawl, or wrap (for meditation/cool evenings)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger' },
    { name: 'Small day bag or tote', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'BagSimple'},
    { name: 'ID and necessary payment methods', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Wallet'},
    { name: 'Any pre-reading or materials for the retreat', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'BookOpenText'},
    { name: 'Swimsuit (if pool/spa/sauna available)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'SwimmingPool' }, // Often essential for wellness

    // --- Optional Items (Target: 20+) ---
    { name: 'Meditation cushion or small pillow', quantity: 1, category: 'Wellness', essential: false, packed: false, icon: 'Brain' },
    { name: 'Book for relaxation or inspiration', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Eye mask (for meditation/sleep)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'EyeSlash' },
    { name: 'Earplugs (if sensitive to noise)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'EarSlash' },
    { name: 'Essential oils or aromatherapy diffuser (travel size)', quantity: 1, category: 'Wellness', essential: false, packed: false, icon: 'DropSimple' }, // Placeholder
    { name: 'Herbal tea bags (personal favorites)', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'TeaBag' },
    { name: 'Comfortable robe', quantity: 1, category: 'Clothing', essential: false, packed: false, icon: 'Bathtub' },
    { name: 'Hair ties or headband', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Paperclip' },
    { name: 'Portable charger/Power bank', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'BatteryCharging' },
    { name: 'Camera (to capture serene moments, if allowed)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Sun hat and sunglasses (if outdoor activities)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Sunglasses' },
    { name: 'Sunscreen (natural/gentle)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'Sun' },
    { name: 'Lip balm', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Small blanket for extra warmth during meditation', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Bed' },
    { name: 'Warm socks or slippers for indoors', quantity: 1, category: 'Footwear', essential: false, packed: false, icon: 'Sock' },
    { name: 'Art supplies (small sketchbook, pencils if inclined)', quantity: 1, category: 'Personal', essential: false, packed: false, icon: 'PaintBrushHousehold' },
    { name: 'Massage ball or small foam roller', quantity: 1, category: 'Wellness', essential: false, packed: false, icon: 'Circle' }, // Placeholder
    { name: 'Personal crystals or spiritual items', quantity: 1, category: 'Personal', essential: false, packed: false, icon: 'Sparkle' },
    { name: 'Healthy snacks (if allowed and specific dietary needs)', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Cookie' },
    { name: 'Gratitude journal', quantity: 1, category: 'Personal', essential: false, packed: false, icon: 'BookBookmark'},
    { name: 'Affirmation cards', quantity: 1, category: 'Personal', essential: false, packed: false, icon: 'Cards'},
    { name: 'Light scarf for covering during Savasana', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Stool'},
    { name: 'Neti pot or saline spray (if prone to sinus issues)', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'SprayBottle'},
  ],
  '7-day-backpacking-expedition': [ // Focus: Hostel/budget travel
    // --- Essential Items (Target: 20+) ---
    { name: 'Backpack (40-55L, carry-on size if possible)', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Backpack' },
    { name: 'Quick-dry travel towel (microfiber)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Towel' },
    { name: 'Padlock or cable lock (for lockers/bag)', quantity: 2, category: 'Security', essential: true, packed: false, icon: 'LockSimple' },
    { name: 'Universal travel adapter', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'Plugs' },
    { name: 'Passport/Visas & multiple photocopies/digital backups', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'Passport' },
    { name: 'Money belt or secure hidden pouch', quantity: 1, category: 'Security', essential: true, packed: false, icon: 'Wallet' }, // Wallet icon ok
    { name: 'Versatile, quick-dry clothing layers (mix of tops, bottoms)', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'ShirtFolded' }, // Aim for 4-5 outfits
    { name: 'Underwear (quick-dry if possible)', quantity: 7, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Socks (quick-dry, wool or synthetic)', quantity: 5, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Waterproof and windproof jacket (lightweight, packable)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CloudRain' },
    { name: 'Comfortable walking shoes (well broken-in)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'Sandals or flip-flops (for showers, casual wear)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'SneakerMove' },
    { name: 'Sleeping bag liner (for hostel beds/hygiene)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'Bed' },
    { name: 'Earplugs and eye mask (for dorms/noisy transport)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'EyeSlash' },
    { name: 'Solid toiletries (shampoo bar, solid soap, solid deodorant)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple' }, // Less risk of spills
    { name: 'Toothbrush and solid toothpaste tabs/powder', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Tooth'},
    { name: 'Portable charger/Power bank', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'BatteryCharging' },
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Reusable water bottle with filter or purification tablets', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'DropSimple' },
    { name: 'Small first-aid kit (band-aids, pain relief, antiseptic, blister care)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'FirstAidKit' },
    { name: 'Prescription medications and copy of prescription', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Debit/Credit cards (notify bank of travel) & some local cash', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'CreditCard'},
    { name: 'Headlamp or small flashlight', quantity: 1, category: 'Tools', essential: true, packed: false, icon: 'Flashlight'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Travel laundry soap (sheets or concentrated liquid)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Sarong or multi-purpose cloth (towel, cover-up, sheet)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Package' },
    { name: 'Small daypack (packable, for daily excursions)', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'Backpack' },
    { name: 'Journal and pen', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'NotePencil' },
    { name: 'Book or E-reader', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Playing cards or small travel game', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Cards' },
    { name: 'Sewing kit (mini, for repairs)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Needle' },
    { name: 'Duct tape (small roll or wrapped around bottle)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Toolbox' }, // Placeholder
    { name: 'Zip ties or carabiners (for attaching things)', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'LinkSimpleHorizontal' },
    { name: 'Silk or cotton sleep sheet (alternative to liner)', quantity: 1, category: 'Essentials', essential: false, packed: false, icon: 'Bed' },
    { name: 'Sun hat or cap', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'BaseballCap' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Sunglasses' },
    { name: 'Sunscreen (small tube)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'Sun' },
    { name: 'Insect repellent', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'BugBeetle' },
    { name: 'Camera (compact)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'SIM card ejector tool', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Key' }, // Placeholder
    { name: 'Small gifts from home (for new friends/hosts)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Gift' },
    { name: 'Travel clothesline & pegs', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'Minus'}, // Placeholder
    { name: 'Spork or travel utensils', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'ForkKnife'},
    { name: 'Waterproof stuff sacks or packing cubes', quantity: 2, category: 'Bags', essential: false, packed: false, icon: 'SquaresFour'},
    { name: 'Student ID or other discount cards', quantity: 1, category: 'Documents', essential: false, packed: false, icon: 'Student'},
    { name: 'Small phrasebook or translation app', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'Translate'},
    { name: 'Portable speaker (mini, be considerate)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'SpeakerHigh'},
  ],
  '7-day-cruise-vacation': [
    // --- Essential Items (Target: 20+) ---
    { name: 'Formal attire (suit/tuxedo or gown/cocktail dress for formal nights)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'UserTie' },
    { name: 'Smart casual outfits for evenings (dresses, skirts, slacks, collared shirts)', quantity: 4, category: 'Clothing', essential: true, packed: false, icon: 'PersonSimple' },
    { name: 'Casual daywear (shorts, t-shirts, sundresses, capris)', quantity: 7, category: 'Clothing', essential: true, packed: false, icon: 'ShirtFolded' },
    { name: 'Swimwear (multiple if swimming often)', quantity: 3, category: 'Clothing', essential: true, packed: false, icon: 'SwimmingPool' },
    { name: 'Swimsuit cover-up', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'PersonSimple' },
    { name: 'Underwear', quantity: 7, category: 'Clothing', essential: true, packed: false, icon: 'TShirt' },
    { name: 'Socks (casual and dress)', quantity: 7, category: 'Clothing', essential: true, packed: false, icon: 'Sock' },
    { name: 'Pajamas/Sleepwear', quantity: 2, category: 'Clothing', essential: true, packed: false, icon: 'Bed' },
    { name: 'Walking shoes (for shore excursions and ship deck)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'Sneaker' },
    { name: 'Sandals or Flip-flops (for pool and casual wear)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'SneakerMove' },
    { name: 'Dress shoes (for formal/smart casual evenings)', quantity: 1, category: 'Footwear', essential: true, packed: false, icon: 'HighHeel' }, // Or UserTie for men
    { name: 'Sun hat or wide-brimmed cap', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sun' },
    { name: 'Sunglasses', quantity: 1, category: 'Accessories', essential: true, packed: false, icon: 'Sunglasses' },
    { name: 'Sunscreen (high SPF, reef-safe if applicable)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Sun' },
    { name: 'Basic toiletries (toothbrush, toothpaste, deodorant, soap, face wash)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'Bathtub' },
    { name: 'Shampoo, Conditioner, Body lotion (travel size or ship may provide)', quantity: 1, category: 'Toiletries', essential: true, packed: false, icon: 'DropSimple'},
    { name: 'Phone and charger', quantity: 1, category: 'Electronics', essential: true, packed: false, icon: 'DeviceMobile' },
    { name: 'Cruise documents (tickets, booking confirmations, itinerary)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'IdentificationCard' },
    { name: 'Passport/Government-issued ID (as required by cruise line/ports)', quantity: 1, category: 'Documents', essential: true, packed: false, icon: 'Passport' },
    { name: 'Credit cards and some cash (for onboard expenses, tips, ports)', quantity: 1, category: 'Essentials', essential: true, packed: false, icon: 'CreditCard' },
    { name: 'Prescription medications (plus extra, with prescription copy)', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Motion sickness medication or bands', quantity: 1, category: 'Health', essential: true, packed: false, icon: 'Pill' },
    { name: 'Small day bag or backpack for shore excursions', quantity: 1, category: 'Bags', essential: true, packed: false, icon: 'Handbag' },
    { name: 'Light jacket, sweater, or pashmina (for cool evenings/AC)', quantity: 1, category: 'Clothing', essential: true, packed: false, icon: 'CoatHanger'},

    // --- Optional Items (Target: 20+) ---
    { name: 'Workout clothes and athletic shoes (if using gym/classes)', quantity: 2, category: 'Clothing', essential: false, packed: false, icon: 'Barbell' },
    { name: 'Lanyard for cruise card/room key', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'IdentificationBadge' },
    { name: 'Reusable water bottle (to fill on ship/shore)', quantity: 1, category: 'Essentials', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Portable charger/Power bank (for excursions)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'BatteryCharging' },
    { name: 'Camera (dedicated, with extra memory/batteries)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Camera' },
    { name: 'Binoculars (for scenery/wildlife from ship)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Binoculars' },
    { name: 'Book or E-reader', quantity: 1, category: 'Books', essential: false, packed: false, icon: 'BookOpenText' },
    { name: 'Waterproof watch', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Watch' },
    { name: 'Small travel alarm clock (if phone not used)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Alarm' },
    { name: 'Magnetic hooks for cabin walls (extra hanging space)', quantity: 4, category: 'Accessories', essential: false, packed: false, icon: 'Magnet' },
    { name: 'Over-the-door shoe organizer (for toiletries/small items)', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'ArchiveBox' }, // Placeholder
    { name: 'Travel-size first-aid kit (for minor issues)', quantity: 1, category: 'Health', essential: false, packed: false, icon: 'FirstAid' },
    { name: 'Aloe vera gel (for sunburns)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Lip balm with SPF', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'DropSimple' },
    { name: 'Travel adapter (if ship has different outlets or for international ports)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs' },
    { name: 'Small amount of laundry detergent (for handwashing delicates)', quantity: 1, category: 'Toiletries', essential: false, packed: false, icon: 'HandSoap' },
    { name: 'Highlighter pen (for daily cruise planner)', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'PencilSimpleLine' },
    { name: 'Playing cards or travel games for sea days', quantity: 1, category: 'Accessories', essential: false, packed: false, icon: 'Cards' },
    { name: 'Snorkel gear (if prefer your own for excursions)', quantity: 1, category: 'Beach', essential: false, packed: false, icon: 'SwimmingPool' },
    { name: 'Waterproof bag or pouch for excursions near water', quantity: 1, category: 'Bags', essential: false, packed: false, icon: 'BagSimple' },
    { name: 'Journal and pen', quantity: 1, category: 'Stationery', essential: false, packed: false, icon: 'NotePencil'},
    { name: 'Wrinkle release spray', quantity: 1, category: 'Tools', essential: false, packed: false, icon: 'SprayBottle'},
    { name: 'Power strip (non-surge protected, check cruise line policy)', quantity: 1, category: 'Electronics', essential: false, packed: false, icon: 'Plugs'},
    { name: 'Refillable coffee mug or tumbler', quantity: 1, category: 'Food', essential: false, packed: false, icon: 'Coffee'},
  ],
};

/**
 * Maps categories to their corresponding icon names.
 * Used for setting default category icons when creating trips.
 * Uses Phosphor icon names.
 */
export const categoryIcons: Record<string, string> = {
  'Clothing': 'TShirt',
  'Electronics': 'DeviceMobile',
  'Toiletries': 'Bathtub',
  'Documents': 'FileText', // Or IdentificationCard
  'Bags': 'SuitcaseSimple', // Or Backpack, BagSimple
  'Footwear': 'Sneaker', // Or Boot
  'Accessories': 'Sunglasses', // Or Watch
  'Emergency': 'FirstAidKit',
  'Food': 'Cookie', // Or ForkKnife
  'Essentials': 'CheckCircle', // Or Package
  'Beach': 'UmbrellaSimple', // Or Sun, Waves
  'Navigation': 'MapTrifold', // Or Compass, Gps
  'Stationery': 'NotePencil', // Or PenNib
  'Books': 'BookOpenText', // Or BookBookmark
  'Camping': 'Tent', // Or Campfire
  'Tools': 'Wrench', // Or Toolbox, Knife
  'Wellness': 'Heartbeat', // Or Brain, PersonSimpleTaiChi
  'Personal': 'User', // Or IdentificationBadge
  'Security': 'LockSimple', // Or ShieldCheck
  'Health': 'FirstAid', // Or Pill
};