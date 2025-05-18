/**
 * Represents a master packing item definition for templates and AI logic.
 * Used for the master list, not for user-specific packing lists.
 * @property {string} name - Name of the item (e.g., "T-shirts").
 * @property {string} icon - Phosphor icon name for the item (e.g., "TShirt").
 * @property {boolean} [essential] - Whether this item is typically essential.
 * @property {number} [defaultQuantity] - Default quantity suggested (optional).
 * @property {string[]} [tags] - Tags for filtering/templates (e.g., ['beach', 'business']).
 * @property {boolean} [toRemove] - Whether this item is marked for removal (optional).
 * @property {number} [estimatedWeight] - Estimated weight of one item in grams (optional).
 */
export type MasterPackingItem = {
  name: string;
  icon: string; // Phosphor Icon Name (PascalCase)
  essential?: boolean;
  defaultQuantity?: number;
  tags?: string[];
  toRemove?: boolean;
  estimatedWeight?: number; // Added estimated weight in grams
};

export type PackingCategory = {
  category: string;
  defaultIcon: string; // Default Phosphor icon for items in this category
  items: MasterPackingItem[];
};

/**
 * The master list of packing categories and items.
 */
export const PACKING_MASTER_LIST: PackingCategory[] = [
  {
    category: 'Clothing',
    defaultIcon: 'CoatHanger',
    items: [
      // Tops
      {
        name: 'T-Shirts',
        icon: 'TShirt',
        essential: true,
        defaultQuantity: 5,
        estimatedWeight: 150,
      }, // [2, 6, 10]
      { name: 'Dress Shirts', icon: 'UserTie', tags: ['business', 'formal'], estimatedWeight: 250 }, // [1]
      {
        name: 'Blouses',
        icon: 'PersonSimple',
        tags: ['business', 'formal', 'women'],
        estimatedWeight: 180,
      },
      { name: 'Casual Shirts', icon: 'ShirtFolded', defaultQuantity: 3, estimatedWeight: 200 },
      {
        name: 'Casual Tops',
        icon: 'TShirt',
        defaultQuantity: 2,
        tags: ['casual', 'women'],
        estimatedWeight: 150,
      },
      {
        name: 'Polo Shirts',
        icon: 'TShirt',
        tags: ['business_casual', 'casual', 'men'],
        estimatedWeight: 220,
      },
      {
        name: 'Tank Tops',
        icon: 'TShirt',
        tags: ['summer', 'gym', 'layering'],
        estimatedWeight: 100,
      }, // [5]
      { name: 'Camisoles', icon: 'TShirt', tags: ['layering', 'women'], estimatedWeight: 80 },
      {
        name: 'Crop Tops',
        icon: 'TShirt',
        tags: ['women', 'casual', 'summer'],
        estimatedWeight: 90,
      },
      {
        name: 'Sweaters',
        icon: 'TShirt',
        tags: ['cold', 'layering', 'winter'],
        estimatedWeight: 350,
      }, // [1]
      { name: 'Hoodies', icon: 'Hoodie', tags: ['casual', 'comfort'], estimatedWeight: 500 }, // [1, 27]
      {
        name: 'Turtleneck Sweater',
        icon: 'TShirt',
        tags: ['winter', 'cold'],
        estimatedWeight: 380,
      },
      { name: 'Cardigan', icon: 'TShirt', tags: ['layering', 'casual'], estimatedWeight: 300 },
      {
        name: 'Fleece Jacket',
        icon: 'CoatHanger',
        tags: ['outdoor', 'warmth', 'layering'],
        estimatedWeight: 400,
      }, // [16]
      { name: 'Jumper', icon: 'TShirt', tags: ['casual', 'warmth'], estimatedWeight: 350 }, // UK term for sweater/pullover [1]
      {
        name: 'Fashion Vests',
        icon: 'CoatHanger',
        tags: ['layering', 'fashion'],
        estimatedWeight: 250,
      },
      {
        name: 'Outerwear Vests',
        icon: 'CoatHanger',
        tags: ['layering', 'outdoor', 'warmth'],
        estimatedWeight: 350,
      },
      { name: 'Tunics', icon: 'PersonSimple', tags: ['women', 'casual'], estimatedWeight: 220 },
      { name: 'Henley Shirts', icon: 'TShirt', tags: ['casual', 'men'], estimatedWeight: 200 },
      // Bottoms
      { name: 'Pants', icon: 'Pants', defaultQuantity: 2, estimatedWeight: 500 }, // [1]
      { name: 'Jeans', icon: 'Pants', essential: true, defaultQuantity: 1, estimatedWeight: 600 }, // [1, 5, 24, 30]
      { name: 'Chinos', icon: 'Pants', tags: ['casual', 'business_casual'], estimatedWeight: 450 }, // [4, 20]
      { name: 'Khakis', icon: 'Pants', tags: ['casual', 'business_casual'], estimatedWeight: 450 },
      { name: 'Dress Pants', icon: 'Pants', tags: ['business', 'formal'], estimatedWeight: 400 },
      { name: 'Shorts', icon: 'Pants', tags: ['summer', 'casual'], estimatedWeight: 250 }, // [1]
      {
        name: 'Skirts',
        icon: 'PersonSimple',
        tags: ['casual', 'formal', 'women'],
        estimatedWeight: 300,
      },
      { name: 'Capri Pants', icon: 'Pants', tags: ['casual', 'women'], estimatedWeight: 300 },
      {
        name: 'Leggings',
        icon: 'Pants',
        tags: ['casual', 'active', 'women', 'comfort'],
        estimatedWeight: 200,
      },
      {
        name: 'Workout Leggings',
        icon: 'Pants',
        tags: ['active', 'sports', 'gym', 'women'],
        estimatedWeight: 220,
      },
      {
        name: 'Workout Shorts',
        icon: 'Pants',
        tags: ['active', 'sports', 'gym'],
        estimatedWeight: 180,
      },
      {
        name: 'Sweatpants',
        icon: 'Pants',
        tags: ['casual', 'comfort', 'active', 'travel'],
        estimatedWeight: 400,
      }, // [11]
      {
        name: 'Joggers',
        icon: 'Pants',
        tags: ['casual', 'comfort', 'active', 'travel'],
        estimatedWeight: 380,
      },
      { name: 'Cargo Pants', icon: 'Pants', tags: ['outdoor', 'utility'], estimatedWeight: 550 },
      // Dresses & Jumpsuits
      {
        name: 'Casual Dresses',
        icon: 'PersonSimple',
        tags: ['women', 'summer', 'daily'],
        estimatedWeight: 350,
      },
      { name: 'Sundresses', icon: 'Sun', tags: ['beach', 'casual', 'women'], estimatedWeight: 250 },
      {
        name: 'Maxi Dresses',
        icon: 'PersonSimple',
        tags: ['beach', 'casual', 'women', 'evening'],
        estimatedWeight: 450,
      }, // [5]
      {
        name: 'Business Dresses',
        icon: 'Briefcase',
        tags: ['business', 'women', 'formal'],
        estimatedWeight: 400,
      },
      {
        name: 'Formal Dresses',
        icon: 'PersonSimple',
        tags: ['event', 'women', 'wedding'],
        estimatedWeight: 600,
      },
      {
        name: 'Gowns',
        icon: 'PersonSimple',
        tags: ['event', 'women', 'black_tie'],
        estimatedWeight: 1000,
      }, // Can be much heavier [29]
      {
        name: 'Rompers',
        icon: 'PersonSimple',
        tags: ['women', 'casual', 'summer'],
        estimatedWeight: 300,
      },
      {
        name: 'Jumpsuits',
        icon: 'PersonSimple',
        tags: ['women', 'casual', 'formal'],
        estimatedWeight: 500,
      },
      // Outerwear
      {
        name: 'Light Jacket',
        icon: 'CoatHanger',
        tags: ['spring', 'fall', 'layering'],
        estimatedWeight: 500,
      }, // [16]
      { name: 'Denim Jacket', icon: 'CoatHanger', tags: ['casual'], estimatedWeight: 700 }, // [3, 13]
      {
        name: 'Leather Jacket',
        icon: 'CoatHanger',
        tags: ['casual', 'fashion'],
        estimatedWeight: 1500,
      }, // [3, 7, 14, 15, 26]
      {
        name: 'Windbreaker',
        icon: 'Wind',
        tags: ['outdoor', 'sports', 'lightweight'],
        estimatedWeight: 250,
      }, // [1, 18, 19]
      { name: 'Heavy Jacket', icon: 'CoatHanger', tags: ['winter', 'cold'], estimatedWeight: 1200 }, // [16]
      { name: 'Winter Coat', icon: 'CoatHanger', tags: ['winter', 'cold'], estimatedWeight: 1500 }, // [5, 8, 17, 22]
      {
        name: 'Rain Jacket',
        icon: 'CloudRain',
        essential: true,
        tags: ['rain', 'outdoor'],
        estimatedWeight: 350,
      }, // [16]
      {
        name: 'Waterproof Trousers',
        icon: 'Pants',
        tags: ['outdoor', 'rain', 'hiking'],
        estimatedWeight: 300,
      },
      {
        name: 'Rain Poncho',
        icon: 'UmbrellaSimple',
        tags: ['outdoor', 'rain', 'festival'],
        estimatedWeight: 200,
      },
      {
        name: 'Packable Down Jacket',
        icon: 'Package',
        tags: ['travel', 'lightweight', 'warmth', 'winter'],
        estimatedWeight: 300,
      },
      {
        name: 'Insulated Jacket',
        icon: 'ThermometerHot',
        tags: ['outdoor', 'winter', 'cold'],
        estimatedWeight: 800,
      },
      {
        name: 'Trench Coat',
        icon: 'CoatHanger',
        tags: ['fashion', 'rain_light', 'business'],
        estimatedWeight: 1000,
      },
      {
        name: 'Overcoat',
        icon: 'CoatHanger',
        tags: ['formal', 'winter', 'business'],
        estimatedWeight: 1300,
      }, // [28]
      // Undergarments & Sleepwear
      {
        name: 'Underwear',
        icon: 'TShirt',
        essential: true,
        defaultQuantity: 7,
        estimatedWeight: 50,
      }, // [1]
      { name: 'Bras', icon: 'TShirt', tags: ['women'], defaultQuantity: 3, estimatedWeight: 100 },
      {
        name: 'Sports Bras',
        icon: 'Barbell',
        defaultQuantity: 2,
        tags: ['active', 'women', 'sports'],
        estimatedWeight: 120,
      },
      { name: 'Socks', icon: 'Sock', essential: true, defaultQuantity: 7, estimatedWeight: 60 }, // (pair)
      {
        name: 'Compression Socks',
        icon: 'ArrowsVertical',
        tags: ['long_flights', 'health', 'travel', 'comfort'],
        estimatedWeight: 80, // (pair)
      },
      {
        name: 'Tights',
        icon: 'PersonSimple',
        tags: ['business', 'formal', 'women', 'cold'],
        estimatedWeight: 70,
      },
      {
        name: 'Stockings',
        icon: 'PersonSimple',
        tags: ['business', 'formal', 'women', 'cold'],
        estimatedWeight: 50,
      }, // (pair)
      {
        name: 'Thermal Underwear', // Assuming set (top & bottom)
        icon: 'ThermometerSimple',
        tags: ['ski', 'snow', 'winter', 'cold', 'outdoor'],
        estimatedWeight: 400,
      },
      {
        name: 'Base Layers', // Assuming set (top & bottom)
        icon: 'ThermometerSimple',
        tags: ['ski', 'snow', 'winter', 'cold', 'outdoor', 'active'],
        estimatedWeight: 350,
      },
      { name: 'Pajamas', icon: 'Bed', defaultQuantity: 2, estimatedWeight: 400 }, // (set)
      { name: 'Sleepwear Set', icon: 'Bed', defaultQuantity: 1, estimatedWeight: 400 },
      { name: 'Robe', icon: 'Bathtub', tags: ['comfort', 'home', 'hotel'], estimatedWeight: 700 },
      {
        name: 'Dressing Gown',
        icon: 'Bathtub',
        tags: ['comfort', 'home', 'hotel'],
        estimatedWeight: 700,
      },
      {
        name: 'Loungewear Set',
        icon: 'Couch',
        tags: ['comfort', 'home', 'travel'],
        estimatedWeight: 500,
      },
      {
        name: 'Slips (Undergarment)',
        icon: 'PersonSimple',
        tags: ['women', 'formal', 'layering'],
        estimatedWeight: 100,
      },
      // Swimwear
      {
        name: 'Swimsuit', // Generic term, can vary widely
        icon: 'SwimmingPool',
        essential: true,
        tags: ['beach', 'pool', 'water_sports'],
        estimatedWeight: 180,
      },
      {
        name: 'Bikini',
        icon: 'SwimmingPool',
        tags: ['beach', 'pool', 'women'],
        estimatedWeight: 150,
      },
      {
        name: 'Tankini',
        icon: 'SwimmingPool',
        tags: ['beach', 'pool', 'women'],
        estimatedWeight: 200,
      },
      {
        name: 'One-Piece Swimsuit',
        icon: 'SwimmingPool',
        tags: ['beach', 'pool', 'women'],
        estimatedWeight: 200,
      },
      {
        name: 'Swim Trunks',
        icon: 'SwimmingPool',
        tags: ['beach', 'pool', 'men'],
        estimatedWeight: 150,
      },
      {
        name: 'Board Shorts',
        icon: 'SwimmingPool',
        tags: ['beach', 'water_sports', 'men', 'unisex'],
        estimatedWeight: 200,
      },
      {
        name: 'Rash Guard',
        icon: 'TShirt',
        tags: ['beach', 'water_sports', 'sun_protection', 'unisex'],
        estimatedWeight: 180,
      },
      {
        name: 'Swim Cover-Up',
        icon: 'PersonSimple',
        tags: ['beach', 'pool', 'women', 'unisex'],
        estimatedWeight: 250,
      },
      {
        name: 'Sarong',
        icon: 'Package',
        tags: ['beach', 'pool', 'multi_purpose', 'unisex'],
        estimatedWeight: 200,
      },
      { name: 'Swim Cap', icon: 'SwimmingPool', tags: ['pool', 'swimming'], estimatedWeight: 50 },
      // Activewear & Sportswear
      {
        name: 'Workout Tops',
        icon: 'TShirt',
        defaultQuantity: 2,
        tags: ['active', 'sports', 'gym'],
        estimatedWeight: 150,
      },
      {
        name: 'Yoga Pants',
        icon: 'PersonSimpleTaiChi',
        tags: ['wellness', 'retreat', 'yoga', 'comfort'],
        estimatedWeight: 250,
      },
      {
        name: 'Sports Skirt',
        icon: 'TennisBall',
        tags: ['active', 'women', 'tennis', 'golf'],
        estimatedWeight: 180,
      },
      {
        name: 'Skort',
        icon: 'TennisBall',
        tags: ['active', 'women', 'tennis', 'golf'],
        estimatedWeight: 200,
      },
      {
        name: 'Cycling Shorts',
        icon: 'Bicycle',
        tags: ['cycling', 'sports'],
        estimatedWeight: 180,
      },
      {
        name: 'Cycling Jersey',
        icon: 'Bicycle',
        tags: ['cycling', 'sports'],
        estimatedWeight: 150,
      },
      {
        name: 'Quick-Dry Hiking Shirt',
        icon: 'PersonSimpleHike',
        tags: ['outdoor', 'hiking', 'active'],
        estimatedWeight: 160,
      },
      {
        name: 'Hiking Shorts',
        icon: 'PersonSimpleHike',
        tags: ['outdoor', 'hiking'],
        estimatedWeight: 220,
      },
      {
        name: 'Hiking Pants',
        icon: 'PersonSimpleHike',
        tags: ['outdoor', 'hiking'],
        estimatedWeight: 400,
      },
      {
        name: 'Climbing Pants',
        icon: 'PersonSimpleHike',
        tags: ['adventure', 'climbing', 'outdoor'],
        estimatedWeight: 420,
      },
      {
        name: 'Fishing Vest',
        icon: 'FishSimple',
        tags: ['outdoor', 'fishing', 'utility'],
        estimatedWeight: 300,
      },
      {
        name: 'Wetsuit',
        icon: 'Waves',
        tags: ['diving', 'surfing', 'water_sports'],
        estimatedWeight: 1500,
      }, // (can vary greatly)
      { name: 'Golf Attire', icon: 'Golf', tags: ['sports', 'golf'], estimatedWeight: 450 }, // (polo + pants/shorts)
      {
        name: 'Tennis Attire',
        icon: 'TennisBall',
        tags: ['sports', 'tennis'],
        estimatedWeight: 300,
      }, // (top + skirt/shorts)
      {
        name: 'Sports Hijab',
        icon: 'PersonSimple',
        tags: ['active', 'women', 'modest', 'sports'],
        estimatedWeight: 100,
      },
      // Formal & Business Wear
      {
        name: 'Suit Jacket',
        icon: 'UserTie',
        tags: ['business', 'formal', 'event'],
        estimatedWeight: 800,
      }, // [1]
      {
        name: 'Blazer',
        icon: 'UserTie',
        tags: ['business', 'formal_casual', 'event'],
        estimatedWeight: 700,
      },
      {
        name: 'Suit Trousers',
        icon: 'UserTie',
        tags: ['business', 'formal', 'event'],
        estimatedWeight: 400,
      },
      {
        name: 'Business Skirt',
        icon: 'UserTie',
        tags: ['business', 'formal', 'event', 'women'],
        estimatedWeight: 300,
      },
      {
        name: 'Full Suit',
        icon: 'UserTie',
        tags: ['business', 'formal', 'event'],
        estimatedWeight: 1200,
      }, // [1]
      {
        name: 'Tuxedo',
        icon: 'UserTie',
        tags: ['formal', 'event', 'wedding', 'black_tie'],
        estimatedWeight: 1300,
      },
      { name: 'Tie', icon: 'UserTie', tags: ['formal', 'business', 'men'], estimatedWeight: 60 },
      {
        name: 'Bowtie',
        icon: 'UserTie',
        tags: ['formal', 'business', 'men', 'event'],
        estimatedWeight: 30,
      },
      {
        name: 'Cufflinks',
        icon: 'Diamond',
        tags: ['business', 'men', 'formal_accessory'],
        estimatedWeight: 20,
      }, // (pair)
      {
        name: 'Pocket Square',
        icon: 'Diamond',
        tags: ['business', 'men', 'formal_accessory'],
        estimatedWeight: 15,
      },
      // Clothing Accessories
      { name: 'Belt', icon: 'Belt', estimatedWeight: 150 },
      {
        name: 'Fashion Hat',
        icon: 'BaseballCap',
        tags: ['casual', 'accessory'],
        estimatedWeight: 120,
      },
      {
        name: 'Baseball Cap',
        icon: 'BaseballCap',
        tags: ['casual', 'accessory', 'sports'],
        estimatedWeight: 100,
      },
      {
        name: 'Wide-Brim Sun Hat',
        icon: 'Sun',
        tags: ['beach', 'sun_protection', 'accessory'],
        estimatedWeight: 150,
      },
      {
        name: 'Beanie',
        icon: 'Beanie',
        tags: ['winter', 'cold', 'accessory'],
        estimatedWeight: 80,
      },
      {
        name: 'Winter Hat',
        icon: 'Beanie',
        tags: ['winter', 'cold', 'accessory'],
        estimatedWeight: 100,
      }, // [1]
      {
        name: 'Fashion Scarf',
        icon: 'Stool',
        tags: ['accessory', 'fashion'],
        estimatedWeight: 150,
      }, // [1]
      {
        name: 'Warm Scarf',
        icon: 'Stool',
        tags: ['winter', 'cold', 'accessory'],
        estimatedWeight: 250,
      }, // [1]
      {
        name: 'Gloves',
        icon: 'HandGrabbing',
        tags: ['winter', 'cold', 'accessory', 'ski'],
        estimatedWeight: 100,
      }, // (pair) [1]
      {
        name: 'Mittens',
        icon: 'HandGrabbing',
        tags: ['winter', 'cold', 'accessory', 'ski'],
        estimatedWeight: 120,
      }, // (pair)
      {
        name: 'Shawl',
        icon: 'Package',
        tags: ['formal', 'cultural', 'accessory', 'layering', 'women'],
        estimatedWeight: 300,
      },
      {
        name: 'Pashmina',
        icon: 'Package',
        tags: ['formal', 'cultural', 'accessory', 'layering', 'women'],
        estimatedWeight: 250,
      },
      {
        name: 'Bandana',
        icon: 'Package',
        tags: ['accessory', 'multi_purpose', 'fashion'],
        estimatedWeight: 40,
      },
      {
        name: 'Headscarf',
        icon: 'Package',
        tags: ['accessory', 'fashion', 'cultural', 'religious'],
        estimatedWeight: 100,
      },
      {
        name: 'Earmuffs',
        icon: 'Ear',
        tags: ['ski', 'snow', 'cold', 'accessory'],
        estimatedWeight: 80,
      },
      {
        name: 'Ear Warmers',
        icon: 'Ear',
        tags: ['ski', 'snow', 'cold', 'accessory'],
        estimatedWeight: 60,
      },
      {
        name: 'Neck Gaiter',
        icon: 'MaskHappy',
        tags: ['ski', 'snow', 'cold', 'outdoor', 'accessory'],
        estimatedWeight: 50,
      },
      {
        name: 'Balaclava',
        icon: 'MaskHappy',
        tags: ['ski', 'snow', 'cold', 'outdoor', 'accessory'],
        estimatedWeight: 70,
      },
      // Cultural & Specific Occasions
      {
        name: 'Abaya',
        icon: 'PersonSimple',
        tags: ['cultural', 'women', 'modest'],
        estimatedWeight: 600,
      },
      {
        name: 'Kaftan',
        icon: 'PersonSimple',
        tags: ['beach', 'cultural', 'women', 'loungewear'],
        estimatedWeight: 400,
      },
      {
        name: 'Cultural Sarong',
        icon: 'Package',
        tags: ['beach', 'cultural', 'men', 'unisex'],
        estimatedWeight: 250,
      },
      { name: 'Lungi', icon: 'Package', tags: ['cultural', 'men', 'unisex'], estimatedWeight: 200 },
      {
        name: 'Kimono',
        icon: 'Package',
        tags: ['loungewear', 'cultural', 'fashion'],
        estimatedWeight: 500,
      }, // (can vary greatly)
      {
        name: 'Sari',
        icon: 'PersonSimple',
        tags: ['cultural', 'formal', 'event', 'women'],
        estimatedWeight: 800,
      }, // (can vary greatly)
      {
        name: 'Kurta',
        icon: 'UserTie',
        tags: ['cultural', 'formal_casual', 'event'],
        estimatedWeight: 300,
      },
      {
        name: 'Sherwani',
        icon: 'UserTie',
        tags: ['cultural', 'formal', 'event', 'wedding'],
        estimatedWeight: 1200,
      },
      {
        name: 'Festival Outfit',
        icon: 'Ghost',
        tags: ['festival', 'event', 'party'],
        estimatedWeight: 500,
      }, // (highly variable)
      {
        name: 'Costume',
        icon: 'Ghost',
        tags: ['event', 'party', 'halloween'],
        estimatedWeight: 600,
      }, // (highly variable)
      {
        name: 'Work Uniform',
        icon: 'HardHat',
        tags: ['work', 'professional'],
        estimatedWeight: 700,
      }, // (highly variable)
      {
        name: 'Academic Gown',
        icon: 'GraduationCap',
        tags: ['event', 'education', 'ceremony'],
        estimatedWeight: 800,
      },
      {
        name: 'Academic Regalia',
        icon: 'GraduationCap',
        tags: ['event', 'education', 'ceremony'],
        estimatedWeight: 1000,
      }, // (gown, hood, cap)
      // Ski & Snow Clothing
      {
        name: 'Ski Jacket',
        icon: 'CoatHanger',
        tags: ['ski', 'snow', 'winter', 'outerwear'],
        estimatedWeight: 1000,
      },
      {
        name: 'Ski Pants',
        icon: 'Pants',
        tags: ['ski', 'snow', 'winter', 'outerwear'],
        estimatedWeight: 800,
      },
      {
        name: 'Ski Socks',
        icon: 'Sock',
        tags: ['ski', 'snow', 'winter', 'warmth'],
        estimatedWeight: 100,
      }, // (pair)
      {
        name: 'Snow Goggles',
        icon: 'Goggles',
        tags: ['ski', 'snow', 'winter', 'eye_protection'],
        estimatedWeight: 180,
      },
      // Maternity Clothing
      {
        name: 'Nursing Bra',
        icon: 'Baby',
        tags: ['maternity', 'women', 'baby_care'],
        estimatedWeight: 120,
      },
      {
        name: 'Maternity Tops',
        icon: 'TShirt',
        tags: ['pregnant', 'women', 'comfort'],
        estimatedWeight: 200,
      },
      {
        name: 'Maternity Bottoms',
        icon: 'Pants',
        tags: ['pregnant', 'women', 'comfort'],
        estimatedWeight: 400,
      },
      {
        name: 'Maternity Dresses',
        icon: 'PersonSimple',
        tags: ['pregnant', 'women', 'comfort'],
        estimatedWeight: 450,
      },
      {
        name: 'Belly Band',
        icon: 'Circle',
        tags: ['maternity', 'support', 'pregnant'],
        estimatedWeight: 100,
      },
      {
        name: 'Maternity Swimsuit',
        icon: 'SwimmingPool',
        tags: ['maternity', 'women', 'beach', 'pool'],
        estimatedWeight: 250,
      },
      {
        name: 'UPF Sun Protective Clothing', // (e.g., shirt)
        icon: 'Sun',
        tags: ['outdoor', 'sun_protection', 'health', 'beach'],
        estimatedWeight: 200,
      },
    ],
  },
  {
    category: 'Footwear',
    defaultIcon: 'Sneaker',
    items: [
      // All footwear weights are per pair
      {
        name: 'Sneakers',
        icon: 'Sneaker',
        essential: true,
        defaultQuantity: 1,
        estimatedWeight: 700,
      },
      {
        name: 'Walking Shoes',
        icon: 'Sneaker',
        essential: true,
        defaultQuantity: 1,
        estimatedWeight: 650,
      },
      {
        name: 'Running Shoes',
        icon: 'PersonSimpleRun',
        tags: ['sports', 'active', 'exercise'],
        estimatedWeight: 550,
      },
      {
        name: 'Trail Running Shoes',
        icon: 'PersonSimpleHike',
        tags: ['sports', 'outdoor', 'hiking', 'trail'],
        estimatedWeight: 700,
      },
      {
        name: 'Hiking Boots',
        icon: 'Boot',
        tags: ['outdoor', 'hiking', 'adventure'],
        estimatedWeight: 1200,
      },
      {
        name: 'Sandals',
        icon: 'SneakerMove',
        tags: ['casual', 'warm_weather', 'beach'],
        estimatedWeight: 400,
      },
      {
        name: 'Flip-Flops',
        icon: 'SneakerMove',
        tags: ['beach', 'pool', 'casual', 'shower'],
        estimatedWeight: 250,
      },
      {
        name: 'Water Shoes',
        icon: 'Waves',
        tags: ['beach', 'water_sports', 'outdoor', 'pool'],
        estimatedWeight: 350,
      },
      {
        name: 'Aqua Socks',
        icon: 'Waves',
        tags: ['beach', 'water_sports', 'pool'],
        estimatedWeight: 300,
      },
      {
        name: 'Dress Shoes',
        icon: 'UserTie',
        tags: ['formal', 'business', 'event'],
        estimatedWeight: 800,
      },
      {
        name: 'Oxfords',
        icon: 'UserTie',
        tags: ['formal', 'business', 'men'],
        estimatedWeight: 850,
      },
      {
        name: 'Loafers',
        icon: 'UserTie',
        tags: ['formal_casual', 'business_casual', 'men'],
        estimatedWeight: 700,
      },
      {
        name: 'Heels',
        icon: 'HighHeel',
        tags: ['formal', 'women', 'event', 'business'],
        estimatedWeight: 600,
      },
      {
        name: 'Ballet Flats',
        icon: 'SneakerMove',
        tags: ['casual', 'formal_casual', 'women', 'comfort'],
        estimatedWeight: 300,
      },
      {
        name: 'Fashion Boots',
        icon: 'Boot',
        tags: ['casual', 'fall', 'fashion'],
        estimatedWeight: 1000,
      },
      {
        name: 'Winter Boots',
        icon: 'Boot',
        tags: ['casual', 'winter', 'cold'],
        estimatedWeight: 1400,
      },
      {
        name: 'Snow Boots',
        icon: 'Snowflake',
        tags: ['ski', 'snow', 'winter', 'cold', 'outdoor'],
        estimatedWeight: 1500,
      },
      {
        name: 'Wading Boots',
        icon: 'FishSimple',
        tags: ['fishing', 'outdoor', 'water'],
        estimatedWeight: 1300,
      },
      {
        name: 'Equestrian Riding Boots',
        icon: 'Horse',
        tags: ['equestrian', 'sports'],
        estimatedWeight: 1800,
      },
      {
        name: 'Climbing Shoes',
        icon: 'PersonSimpleHike',
        tags: ['sports', 'adventure', 'climbing', 'outdoor'],
        estimatedWeight: 500,
      },
      { name: 'Cycling Shoes', icon: 'Bicycle', tags: ['sports', 'cycling'], estimatedWeight: 600 },
      { name: 'Golf Shoes', icon: 'Golf', tags: ['sports', 'golf'], estimatedWeight: 750 },
      {
        name: 'Dance Shoes',
        icon: 'MusicNotesSimple',
        tags: ['sports', 'dance', 'activity'],
        estimatedWeight: 400,
      },
      {
        name: 'Safety Boots',
        icon: 'HardHat',
        tags: ['work', 'safety', 'industrial'],
        estimatedWeight: 1800,
      },
      {
        name: 'Steel-Toe Boots',
        icon: 'HardHat',
        tags: ['work', 'safety', 'industrial'],
        estimatedWeight: 2000,
      },
      {
        name: 'Sports Cleats',
        icon: 'SoccerBall',
        tags: ['sports', 'soccer', 'football', 'baseball'],
        estimatedWeight: 600,
      },
      {
        name: 'Slippers',
        icon: 'HouseSimple',
        tags: ['comfort', 'home', 'hotel'],
        estimatedWeight: 300,
      },
      {
        name: 'House Shoes',
        icon: 'HouseSimple',
        tags: ['comfort', 'home', 'hotel'],
        estimatedWeight: 300,
      },
      {
        name: 'Espadrilles',
        icon: 'SneakerMove',
        tags: ['summer', 'casual', 'vacation'],
        estimatedWeight: 500,
      },
      {
        name: 'Clogs',
        icon: 'SneakerMove',
        tags: ['wellness', 'spa', 'casual', 'work'],
        estimatedWeight: 600,
      },
      {
        name: 'Galoshes',
        icon: 'CloudRain',
        tags: ['rain', 'protection', 'footwear_accessory'],
        estimatedWeight: 700,
      },
      {
        name: 'Overshoes',
        icon: 'CloudRain',
        tags: ['rain', 'protection', 'footwear_accessory'],
        estimatedWeight: 400,
      },
      {
        name: 'Shoe Insoles',
        icon: 'Sneaker',
        tags: ['comfort', 'health', 'footwear_accessory'],
        estimatedWeight: 100,
      }, // (pair)
      {
        name: 'Orthotics',
        icon: 'Sneaker',
        tags: ['health', 'footwear_accessory', 'medical'],
        estimatedWeight: 150,
      }, // (pair)
      {
        name: 'Spare Shoe Laces',
        icon: 'Minus',
        tags: ['accessory', 'footwear_accessory', 'backup'],
        estimatedWeight: 20, // (pair)
      },
      {
        name: 'Shoe Bags',
        icon: 'BagSimple',
        defaultQuantity: 2,
        tags: ['travel_accessory', 'organization'],
        estimatedWeight: 50, // (per bag)
      },
      {
        name: 'Shoe Horn',
        icon: 'Toolbox',
        tags: ['accessory', 'footwear_helper'],
        estimatedWeight: 80,
      },
      {
        name: 'Shoe Polish',
        icon: 'PaintBrushHousehold',
        tags: ['maintenance', 'footwear_care'],
        estimatedWeight: 100,
      }, // (including container)
      {
        name: 'Shoe Cleaning Kit',
        icon: 'PaintBrushHousehold',
        tags: ['maintenance', 'footwear_care'],
        estimatedWeight: 300,
      },
    ],
  },
  {
    category: 'Toiletries',
    defaultIcon: 'DropSimple',
    items: [
      // Personal Care & Hygiene
      { name: 'Toothbrush', icon: 'Tooth', essential: true, estimatedWeight: 20 },
      { name: 'Toothpaste', icon: 'DropSimple', essential: true, estimatedWeight: 100 }, // (travel size ~50-75g, full ~100-150g)
      {
        name: 'Toothbrush Cover',
        icon: 'ArchiveBox',
        tags: ['hygiene', 'travel'],
        estimatedWeight: 10,
      },
      {
        name: 'Toothbrush Travel Case',
        icon: 'ArchiveBox',
        tags: ['hygiene', 'travel'],
        estimatedWeight: 50,
      },
      {
        name: 'Dental Floss',
        icon: 'Minus',
        essential: true,
        tags: ['hygiene', 'dental'],
        estimatedWeight: 25,
      },
      { name: 'Dental Picks', icon: 'Minus', tags: ['hygiene', 'dental'], estimatedWeight: 15 }, // (small pack)
      { name: 'Tongue Scraper', icon: 'Minus', tags: ['hygiene', 'dental'], estimatedWeight: 30 },
      {
        name: 'Mouthwash',
        icon: 'DropSimple',
        tags: ['hygiene', 'dental', 'travel_size'],
        estimatedWeight: 120,
      }, // (travel size ~100ml)
      { name: 'Deodorant', icon: 'Sparkle', essential: true, estimatedWeight: 75 }, // (stick)
      {
        name: 'Deodorant Wipes',
        icon: 'Sparkle',
        tags: ['hygiene', 'travel', 'refresh'],
        estimatedWeight: 50,
      }, // (pack of 10-20)
      {
        name: 'Bar Soap',
        icon: 'HandSoap',
        essential: true,
        tags: ['hygiene'],
        estimatedWeight: 100,
      },
      {
        name: 'Body Wash (Liquid/Gel)',
        icon: 'HandSoap',
        essential: true,
        tags: ['hygiene', 'travel_size'],
        estimatedWeight: 120, // (travel size ~100ml)
      },
      {
        name: 'Solid Body Wash',
        icon: 'HandSoap',
        tags: ['hygiene', 'travel_friendly', 'eco_friendly'],
        estimatedWeight: 80,
      },
      {
        name: 'Travel Soap Container',
        icon: 'ArchiveBox',
        tags: ['hygiene', 'travel', 'accessory'],
        estimatedWeight: 40,
      },
      {
        name: 'Soap Sheets',
        icon: 'FileText',
        tags: ['hygiene', 'travel_friendly', 'lightweight'],
        estimatedWeight: 15, // (small pack)
      },
      {
        name: 'Face Wash',
        icon: 'DropSimple',
        tags: ['skincare', 'hygiene'],
        estimatedWeight: 120,
      }, // (travel size ~100ml)
      {
        name: 'Facial Cleanser',
        icon: 'DropSimple',
        tags: ['skincare', 'hygiene'],
        estimatedWeight: 120,
      }, // (travel size ~100ml)
      {
        name: 'Cotton Swabs (Q-tips)',
        icon: 'DotsThree',
        tags: ['hygiene', 'beauty_tool'],
        estimatedWeight: 20,
      }, // (small travel pack)
      {
        name: 'Cotton Pads',
        icon: 'Circle',
        tags: ['hygiene', 'skincare', 'makeup_tool'],
        estimatedWeight: 30,
      }, // (small travel pack)
      {
        name: 'Feminine Hygiene Products', // (e.g., pack of tampons/pads)
        icon: 'DropSimple',
        tags: ['women', 'essential', 'hygiene'],
        essential: true,
        estimatedWeight: 100,
      },
      // Skincare
      {
        name: 'Face Moisturizer',
        icon: 'DropSimple',
        essential: true,
        tags: ['skincare'],
        estimatedWeight: 75,
      }, // (travel size ~50ml)
      {
        name: 'Body Lotion',
        icon: 'DropSimple',
        essential: true,
        tags: ['skincare'],
        estimatedWeight: 120,
      }, // (travel size ~100ml)
      { name: 'Toner', icon: 'SprayBottle', tags: ['skincare', 'refresh'], estimatedWeight: 120 }, // (travel size ~100ml)
      {
        name: 'Facial Mist',
        icon: 'SprayBottle',
        tags: ['skincare', 'refresh', 'hydration'],
        estimatedWeight: 80,
      }, // (travel size ~50ml)
      {
        name: 'Face Serum',
        icon: 'DropSimple',
        tags: ['skincare', 'treatment'],
        estimatedWeight: 50,
      }, // (travel size ~30ml)
      { name: 'Eye Cream', icon: 'Eye', tags: ['skincare', 'treatment'], estimatedWeight: 30 }, // (travel size ~15ml)
      {
        name: 'Lip Balm',
        icon: 'DropSimple',
        essential: true,
        tags: ['skincare'],
        estimatedWeight: 15,
      },
      {
        name: 'SPF Lip Balm',
        icon: 'Sun',
        essential: true,
        tags: ['skincare', 'sun_protection'],
        estimatedWeight: 15,
      },
      { name: 'Hand Cream', icon: 'HandPalm', tags: ['skincare', 'hygiene'], estimatedWeight: 50 }, // (travel size ~30-50ml)
      {
        name: 'Foot Cream',
        icon: 'DropSimple',
        tags: ['skincare', 'comfort', 'pedicure'],
        estimatedWeight: 75,
      }, // (travel size)
      {
        name: 'Foot Balm',
        icon: 'DropSimple',
        tags: ['skincare', 'comfort', 'pedicure'],
        estimatedWeight: 50,
      }, // (stick)
      {
        name: 'Face Masks (Sheet/Cream)', // (1 sheet mask or travel size cream)
        icon: 'MaskHappy',
        tags: ['skincare', 'spa', 'wellness', 'treatment'],
        estimatedWeight: 30,
      },
      {
        name: 'Body Scrub',
        icon: 'DropSimple',
        tags: ['skincare', 'spa', 'exfoliate'],
        estimatedWeight: 100,
      }, // (travel size)
      {
        name: 'Anti-Chafing Powder',
        icon: 'DropSimple',
        tags: ['health', 'comfort', 'hygiene', 'active'],
        estimatedWeight: 70, // (travel size)
      },
      {
        name: 'Foot Powder',
        icon: 'DropSimple',
        tags: ['health', 'comfort', 'hygiene'],
        estimatedWeight: 70,
      }, // (travel size)
      // Hair Care
      {
        name: 'Shampoo',
        icon: 'DropSimple',
        essential: true,
        tags: ['hair_care', 'travel_size'],
        estimatedWeight: 120,
      }, // (travel size ~100ml)
      {
        name: 'Solid Shampoo Bar',
        icon: 'DropSimple',
        tags: ['hair_care', 'travel_friendly', 'eco_friendly'],
        estimatedWeight: 80,
      },
      {
        name: 'Conditioner',
        icon: 'DropSimple',
        essential: true,
        tags: ['hair_care', 'travel_size'],
        estimatedWeight: 120, // (travel size ~100ml)
      },
      {
        name: 'Solid Conditioner Bar',
        icon: 'DropSimple',
        tags: ['hair_care', 'travel_friendly', 'eco_friendly'],
        estimatedWeight: 60,
      },
      {
        name: 'Leave-In Conditioner',
        icon: 'SprayBottle',
        tags: ['hair_care'],
        estimatedWeight: 100,
      }, // (travel size)
      { name: 'Detangler Spray', icon: 'SprayBottle', tags: ['hair_care'], estimatedWeight: 100 }, // (travel size)
      {
        name: 'Dry Shampoo',
        icon: 'Wind',
        tags: ['hair_care', 'travel_hack'],
        estimatedWeight: 80,
      }, // (travel size aerosol)
      { name: 'Hairbrush', icon: 'Toolbox', tags: ['hair_care', 'grooming'], estimatedWeight: 80 }, // (travel size)
      { name: 'Comb', icon: 'Toolbox', tags: ['hair_care', 'grooming'], estimatedWeight: 20 },
      {
        name: 'Hair Ties',
        icon: 'Paperclip',
        tags: ['hair_care', 'accessory'],
        estimatedWeight: 5,
      }, // (few)
      {
        name: 'Hair Clips',
        icon: 'Paperclip',
        tags: ['hair_care', 'accessory'],
        estimatedWeight: 10,
      }, // (few)
      {
        name: 'Hair Pins',
        icon: 'Paperclip',
        tags: ['hair_care', 'accessory'],
        estimatedWeight: 5,
      }, // (few bobby pins)
      {
        name: 'Hair Gel',
        icon: 'SprayBottle',
        tags: ['hair_care', 'styling'],
        estimatedWeight: 100,
      }, // (travel size tube)
      {
        name: 'Hair Spray',
        icon: 'SprayBottle',
        tags: ['hair_care', 'styling'],
        estimatedWeight: 80,
      }, // (travel size aerosol)
      {
        name: 'Hair Mousse',
        icon: 'SprayBottle',
        tags: ['hair_care', 'styling'],
        estimatedWeight: 70,
      }, // (travel size aerosol)
      { name: 'Hair Wax', icon: 'DropSimple', tags: ['hair_care', 'styling'], estimatedWeight: 50 }, // (small tin)
      {
        name: 'Hair Serum',
        icon: 'DropSimple',
        tags: ['hair_care', 'styling', 'treatment'],
        estimatedWeight: 40,
      }, // (travel size bottle)
      {
        name: 'Hair Oil',
        icon: 'DropSimple',
        tags: ['hair_care', 'styling', 'treatment'],
        estimatedWeight: 40,
      }, // (travel size bottle)
      {
        name: 'Heat Protectant Spray',
        icon: 'FireSimple',
        tags: ['hair_care', 'styling_tool_accessory'],
        estimatedWeight: 80, // (travel size)
      },
      {
        name: 'Travel Hair Dryer',
        icon: 'HairDryer',
        tags: ['styling_tool', 'travel_size'],
        estimatedWeight: 350,
      },
      {
        name: 'Travel Hair Straightener',
        icon: 'Toolbox',
        tags: ['hair_care', 'styling_tool', 'travel_size'],
        estimatedWeight: 300,
      },
      {
        name: 'Travel Hair Curler',
        icon: 'Toolbox',
        tags: ['hair_care', 'styling_tool', 'travel_size'],
        estimatedWeight: 250,
      },
      // Shaving & Grooming
      { name: 'Razor', icon: 'Toolbox', tags: ['grooming'], estimatedWeight: 40 }, // (disposable or handle + 1 cartridge)
      { name: 'Shaving Cream', icon: 'DropSimple', tags: ['grooming'], estimatedWeight: 80 }, // (travel size can/tube)
      { name: 'Shaving Gel', icon: 'DropSimple', tags: ['grooming'], estimatedWeight: 80 }, // (travel size can/tube)
      {
        name: 'Aftershave',
        icon: 'DropSimple',
        tags: ['skincare', 'grooming'],
        estimatedWeight: 70,
      }, // (travel size bottle)
      {
        name: 'Aftershave Balm',
        icon: 'DropSimple',
        tags: ['skincare', 'grooming'],
        estimatedWeight: 50,
      }, // (travel size tube)
      {
        name: 'Beard Oil',
        icon: 'User',
        tags: ['men', 'grooming', 'beard_care'],
        estimatedWeight: 40,
      }, // (small bottle)
      {
        name: 'Beard Balm',
        icon: 'User',
        tags: ['men', 'grooming', 'beard_care'],
        estimatedWeight: 50,
      }, // (small tin)
      {
        name: 'Beard Comb',
        icon: 'Toolbox',
        tags: ['men', 'grooming', 'beard_care'],
        estimatedWeight: 15,
      },
      {
        name: 'Beard Brush',
        icon: 'Toolbox',
        tags: ['men', 'grooming', 'beard_care'],
        estimatedWeight: 50,
      },
      {
        name: 'Electric Shaver',
        icon: 'Plugs',
        tags: ['grooming', 'electric_tool'],
        estimatedWeight: 200,
      }, // (travel size)
      {
        name: 'Electric Shaver Charger',
        icon: 'Plugs',
        tags: ['grooming', 'electric_tool'],
        estimatedWeight: 100,
      },
      // Makeup & Beauty
      {
        name: 'Foundation',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_base'],
        estimatedWeight: 50,
      }, // (bottle/tube)
      {
        name: 'Concealer',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_base'],
        estimatedWeight: 20,
      }, // (tube/stick)
      {
        name: 'Eyeshadow Palette',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 80, // (small/travel)
      },
      {
        name: 'Mascara',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 25,
      },
      {
        name: 'Eyeliner',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 10,
      }, // (pencil/liquid)
      {
        name: 'Lipstick',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 20,
      },
      {
        name: 'Lip Gloss',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 20,
      },
      {
        name: 'Blush',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 30,
      }, // (compact)
      {
        name: 'Bronzer',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 40,
      }, // (compact)
      {
        name: 'Highlighter',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
        estimatedWeight: 30,
      }, // (compact/stick)
      {
        name: 'Makeup Primer',
        icon: 'PaintBrushBroad',
        tags: ['makeup', 'women', 'beauty_prep'],
        estimatedWeight: 40,
      }, // (travel size tube)
      {
        name: 'Makeup Remover (Liquid/Oil)',
        icon: 'Eraser',
        tags: ['makeup', 'skincare', 'hygiene'],
        estimatedWeight: 100, // (travel size bottle)
      },
      {
        name: 'Makeup Wipes',
        icon: 'Eraser',
        tags: ['makeup', 'skincare', 'hygiene', 'travel_friendly'],
        estimatedWeight: 80, // (small pack)
      },
      {
        name: 'Makeup Setting Spray',
        icon: 'SprayBottle',
        tags: ['makeup', 'women', 'beauty_finish'],
        estimatedWeight: 50, // (travel size bottle)
      },
      {
        name: 'Makeup Brushes',
        icon: 'PaintBrushBroad',
        tags: ['makeup', 'beauty_tool'],
        estimatedWeight: 100,
      }, // (small travel set)
      {
        name: 'Makeup Sponges',
        icon: 'PaintBrushBroad',
        tags: ['makeup', 'beauty_tool'],
        estimatedWeight: 10,
      }, // (one sponge)
      {
        name: 'Blotting Papers',
        icon: 'FileText',
        tags: ['makeup', 'oil_control', 'beauty_tool'],
        estimatedWeight: 10,
      }, // (pack)
      {
        name: 'Hair Removal Cream',
        icon: 'DropSimple',
        tags: ['women', 'grooming', 'beauty_treatment'],
        estimatedWeight: 70, // (travel size tube)
      },
      {
        name: 'Wax Strips',
        icon: 'DropSimple',
        tags: ['women', 'grooming', 'beauty_treatment'],
        estimatedWeight: 50,
      }, // (small box for face/body)
      {
        name: 'Nail Polish',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'manicure'],
        estimatedWeight: 50,
      }, // (one bottle)
      {
        name: 'Nail Polish Remover',
        icon: 'Eraser',
        tags: ['women', 'beauty', 'manicure'],
        estimatedWeight: 80,
      }, // (travel size bottle or pads)
      {
        name: 'Perfume',
        icon: 'DropSimple',
        tags: ['beauty', 'fragrance', 'travel_size'],
        estimatedWeight: 50,
      }, // (travel spray/rollerball ~10-30ml)
      {
        name: 'Cologne',
        icon: 'DropSimple',
        tags: ['beauty', 'fragrance', 'travel_size'],
        estimatedWeight: 50,
      }, // (travel spray ~10-30ml)
      {
        name: 'Solid Perfume',
        icon: 'DropSimple',
        tags: ['beauty', 'fragrance', 'travel_friendly'],
        estimatedWeight: 30, // (tin)
      },
      {
        name: 'Body Glitter',
        icon: 'Sparkle',
        tags: ['festival', 'party', 'beauty_enhancement'],
        estimatedWeight: 30,
      }, // (small pot/tube)
      {
        name: 'Face Gems',
        icon: 'Sparkle',
        tags: ['festival', 'party', 'beauty_enhancement'],
        estimatedWeight: 10,
      }, // (sheet)
      {
        name: 'Compact Mirror',
        icon: 'Circle',
        tags: ['beauty_tool', 'travel_accessory'],
        estimatedWeight: 50,
      },
      // Manicure & Pedicure
      {
        name: 'Nail Clippers',
        icon: 'Scissors',
        tags: ['grooming', 'manicure', 'pedicure'],
        estimatedWeight: 30,
      },
      {
        name: 'Nail File',
        icon: 'Toolbox',
        tags: ['grooming', 'manicure', 'pedicure'],
        estimatedWeight: 10,
      },
      {
        name: 'Tweezers',
        icon: 'Toolbox',
        tags: ['grooming', 'beauty_tool', 'first_aid'],
        estimatedWeight: 15,
      },
      {
        name: 'Cuticle Oil',
        icon: 'DropSimple',
        tags: ['nails', 'manicure', 'skincare'],
        estimatedWeight: 20,
      }, // (small bottle/pen)
      {
        name: 'Cuticle Cream',
        icon: 'DropSimple',
        tags: ['nails', 'manicure', 'skincare'],
        estimatedWeight: 25,
      }, // (small tube/pot)
      // Sun & Bug Protection
      {
        name: 'Face Sunscreen',
        icon: 'Sun',
        essential: true,
        tags: ['sun_protection', 'skincare'],
        estimatedWeight: 80, // (travel size ~50-75ml)
      },
      {
        name: 'Body Sunscreen',
        icon: 'Sun',
        essential: true,
        tags: ['sun_protection', 'skincare'],
        estimatedWeight: 120, // (travel size ~100ml)
      },
      {
        name: 'Sunscreen Stick',
        icon: 'Sun',
        tags: ['sun_protection', 'easy_apply', 'travel_friendly'],
        estimatedWeight: 50,
      },
      {
        name: 'Aloe Vera Gel',
        icon: 'DropSimple',
        tags: ['sun_care', 'skincare', 'soothing'],
        estimatedWeight: 100,
      }, // (travel size)
      {
        name: 'After-Sun Lotion',
        icon: 'DropSimple',
        tags: ['sun_care', 'skincare', 'soothing'],
        estimatedWeight: 100,
      }, // (travel size)
      {
        name: 'Insect Repellent Spray',
        icon: 'BugBeetle',
        essential: true,
        tags: ['health', 'outdoor', 'tropical'],
        estimatedWeight: 100, // (travel size can/bottle)
      },
      {
        name: 'Insect Repellent Lotion',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
        estimatedWeight: 80, // (travel size tube)
      },
      {
        name: 'Insect Repellent Wipes',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical', 'travel_friendly'],
        estimatedWeight: 60, // (pack of 10-20)
      },
      {
        name: 'Mosquito Repellent Bracelet',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
        estimatedWeight: 15,
      },
      {
        name: 'Mosquito Repellent Patches',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
        estimatedWeight: 10, // (sheet)
      },
      // Other Toiletries
      {
        name: 'Travel Towel (Quick-Dry)',
        icon: 'Towel',
        tags: ['hygiene', 'travel_accessory', 'sports', 'beach'],
        estimatedWeight: 150, // (medium size)
      },
      {
        name: 'Contact Lenses',
        icon: 'Eye',
        tags: ['vision', 'health'],
        essential: true,
        estimatedWeight: 10,
      }, // (pair in solution or few disposables)
      {
        name: 'Contact Lens Solution',
        icon: 'DropSimple',
        tags: ['vision', 'health'],
        essential: true,
        estimatedWeight: 150, // (travel size bottle ~120ml)
      },
      {
        name: 'Contact Lens Case',
        icon: 'Eye',
        tags: ['vision', 'health', 'hygiene'],
        essential: true,
        estimatedWeight: 15,
      },
      {
        name: 'Prescription Glasses',
        icon: 'Eyeglasses',
        tags: ['vision', 'health'],
        essential: true,
        estimatedWeight: 30, // (without case)
      },
      {
        name: 'Glasses Case',
        icon: 'Eyeglasses',
        tags: ['vision', 'accessory'],
        estimatedWeight: 100,
      },
      {
        name: 'Lens Cleaning Cloth',
        icon: 'Eyeglasses',
        tags: ['vision', 'accessory', 'electronics_care'],
        estimatedWeight: 5,
      },
      {
        name: 'Bath Salts',
        icon: 'Bathtub',
        tags: ['relaxation', 'spa', 'bath'],
        estimatedWeight: 100,
      }, // (single use pouch)
      {
        name: 'Bath Bombs',
        icon: 'Bathtub',
        tags: ['relaxation', 'spa', 'bath'],
        estimatedWeight: 150,
      }, // (one bomb)
      {
        name: 'Essential Oil Roll-On',
        icon: 'DropSimple',
        tags: ['wellness', 'relaxation', 'aromatherapy'],
        estimatedWeight: 30, // (10ml roller)
      },
      {
        name: 'Portable Bidet',
        icon: 'DropSimple',
        tags: ['hygiene', 'travel_accessory'],
        estimatedWeight: 100,
      }, // (empty)
    ],
  },
  {
    category: 'Electronics',
    defaultIcon: 'DeviceMobile',
    items: [
      { name: 'Phone', icon: 'DeviceMobile', essential: true, estimatedWeight: 180 },
      { name: 'Phone Charger', icon: 'Plugs', essential: true, estimatedWeight: 60 }, // (adapter + cable)
      {
        name: 'Car Phone Charger',
        icon: 'CarSimple',
        tags: ['roadtrip', 'tech_accessory'],
        estimatedWeight: 50,
      },
      {
        name: 'Wireless Charger Pad',
        icon: 'Plugs',
        tags: ['phone_accessory', 'tech'],
        estimatedWeight: 100,
      },
      { name: 'Laptop', icon: 'Laptop', tags: ['work', 'entertainment'], estimatedWeight: 1500 }, // (13-15 inch ultrabook)
      {
        name: 'Laptop Charger',
        icon: 'Plugs',
        tags: ['work', 'tech_accessory'],
        estimatedWeight: 300,
      },
      {
        name: 'Tablet',
        icon: 'DeviceTablet',
        tags: ['entertainment', 'reading'],
        estimatedWeight: 450,
      }, // (e.g. iPad Air)
      { name: 'Tablet Charger', icon: 'Plugs', tags: ['tech_accessory'], estimatedWeight: 80 },
      { name: 'Headphones', icon: 'Headphones', essential: true, estimatedWeight: 250 }, // (over-ear)
      { name: 'Earbuds', icon: 'Headphones', essential: true, estimatedWeight: 50 }, // (wired or wireless with case)
      {
        name: 'Noise-Cancelling Headphones',
        icon: 'Headphones',
        tags: ['travel', 'comfort', 'audio'],
        estimatedWeight: 280,
      },
      {
        name: 'Headphone Splitter',
        icon: 'ArrowsSplit',
        tags: ['audio', 'sharing', 'travel_accessory'],
        estimatedWeight: 20,
      },
      {
        name: 'Power Bank',
        icon: 'BatteryCharging',
        essential: true,
        tags: ['portable_charger'],
        estimatedWeight: 250,
      }, // (10000mAh)
      {
        name: 'Solar Power Bank',
        icon: 'Sun',
        tags: ['outdoor', 'emergency', 'tech'],
        estimatedWeight: 350,
      }, // (10000mAh with panel)
      {
        name: 'Universal Travel Adapter',
        icon: 'Plug',
        essential: true,
        tags: ['international_travel'],
        estimatedWeight: 150,
      },
      {
        name: 'Voltage Converter',
        icon: 'Lightning',
        tags: ['international_travel', 'electronics_safety'],
        estimatedWeight: 500, // (can vary greatly)
      },
      {
        name: 'Multi-Port USB Wall Charger',
        icon: 'Plugs',
        tags: ['charging_station', 'tech_accessory'],
        estimatedWeight: 120,
      },
      { name: 'Camera', icon: 'Camera', tags: ['photography', 'travel'], estimatedWeight: 500 }, // (mirrorless or DSLR body)
      {
        name: 'Camera Lenses',
        icon: 'Camera',
        tags: ['photography_accessory'],
        estimatedWeight: 400,
      }, // (average zoom lens)
      {
        name: 'Camera Charger',
        icon: 'Plugs',
        tags: ['photography_accessory'],
        estimatedWeight: 100,
      },
      {
        name: 'Camera Batteries (Spare)',
        icon: 'BatteryFull',
        tags: ['photography_accessory'],
        estimatedWeight: 80,
      }, // (per battery)
      {
        name: 'Memory Cards',
        icon: 'FloppyDisk',
        tags: ['photography_accessory', 'storage'],
        estimatedWeight: 5,
      }, // (per card)
      {
        name: 'Memory Card Reader',
        icon: 'FloppyDiskBack',
        tags: ['tech_accessory', 'storage'],
        estimatedWeight: 30,
      },
      {
        name: 'Action Camera (GoPro)',
        icon: 'VideoCamera',
        tags: ['photography', 'video', 'adventure'],
        estimatedWeight: 150, // (with case)
      },
      {
        name: 'Action Camera Mounts',
        icon: 'Toolbox',
        tags: ['action_camera_accessory'],
        estimatedWeight: 100,
      }, // (assortment)
      {
        name: 'Action Camera Batteries',
        icon: 'BatteryFull',
        tags: ['action_camera_accessory'],
        estimatedWeight: 30,
      }, // (per battery)
      {
        name: 'Drone',
        icon: 'Drone',
        tags: ['photography', 'video', 'hobby'],
        estimatedWeight: 800,
      }, // (e.g. DJI Mavic series)
      {
        name: 'Drone Controller',
        icon: 'GameController',
        tags: ['drone_accessory'],
        estimatedWeight: 300,
      },
      {
        name: 'Drone Batteries',
        icon: 'BatteryFull',
        tags: ['drone_accessory'],
        estimatedWeight: 250,
      }, // (per battery)
      { name: 'Drone Charger', icon: 'Plugs', tags: ['drone_accessory'], estimatedWeight: 150 },
      {
        name: 'Tripod',
        icon: 'CameraRotate',
        tags: ['photography_accessory', 'video_accessory'],
        estimatedWeight: 1200,
      }, // (travel tripod)
      {
        name: 'Selfie Stick',
        icon: 'DeviceMobileCamera',
        tags: ['photography_accessory', 'phone_accessory'],
        estimatedWeight: 150,
      },
      {
        name: 'Gimbal',
        icon: 'CameraRotate',
        tags: ['video_accessory', 'stabilizer'],
        estimatedWeight: 400,
      }, // (phone gimbal)
      {
        name: 'External Microphone',
        icon: 'Microphone',
        tags: ['video', 'audio', 'content_creation'],
        estimatedWeight: 100, // (shotgun or lav mic)
      },
      {
        name: 'E-Reader (Kindle)',
        icon: 'BookOpenText',
        tags: ['reading', 'entertainment'],
        estimatedWeight: 200,
      },
      { name: 'E-Reader Charger', icon: 'Plugs', tags: ['tech_accessory'], estimatedWeight: 40 }, // (cable)
      {
        name: 'Smartwatch',
        icon: 'Watch',
        tags: ['wearable_tech', 'fitness'],
        estimatedWeight: 50,
      },
      {
        name: 'Fitness Tracker',
        icon: 'Watch',
        tags: ['wearable_tech', 'health'],
        estimatedWeight: 30,
      },
      {
        name: 'Smartwatch/Fitness Tracker Charger',
        icon: 'Plugs',
        tags: ['tech_accessory'],
        estimatedWeight: 20,
      },
      {
        name: 'USB-C Cable',
        icon: 'Usb',
        tags: ['charging_cable', 'data_transfer'],
        estimatedWeight: 30,
      },
      {
        name: 'Lightning Cable',
        icon: 'Usb',
        tags: ['charging_cable', 'data_transfer', 'apple_device'],
        estimatedWeight: 30,
      },
      {
        name: 'Micro USB Cable',
        icon: 'Usb',
        tags: ['charging_cable', 'data_transfer'],
        estimatedWeight: 30,
      },
      {
        name: 'Portable WiFi Hotspot (MiFi)',
        icon: 'WifiHigh',
        tags: ['internet', 'travel_tech'],
        estimatedWeight: 150,
      },
      {
        name: 'International SIM Card',
        icon: 'SimCard',
        tags: ['communication', 'international_travel'],
        estimatedWeight: 2,
      },
      {
        name: 'Local SIM Card',
        icon: 'SimCard',
        tags: ['communication', 'travel_tech'],
        estimatedWeight: 2,
      },
      {
        name: 'SIM Eject Tool',
        icon: 'Key',
        tags: ['phone_accessory', 'travel_tool'],
        estimatedWeight: 1,
      },
      {
        name: 'Handheld GPS Device',
        icon: 'Gps',
        tags: ['navigation', 'outdoor', 'hiking'],
        estimatedWeight: 200,
      },
      {
        name: 'Car GPS Navigator',
        icon: 'CarSimple',
        tags: ['navigation', 'roadtrip'],
        estimatedWeight: 250,
      },
      {
        name: 'Portable Bluetooth Speaker',
        icon: 'SpeakerHigh',
        tags: ['audio', 'entertainment'],
        estimatedWeight: 300,
      }, // (small/medium)
      {
        name: 'Travel Extension Cord',
        icon: 'Plugs',
        tags: ['power_access', 'tech_accessory'],
        estimatedWeight: 200,
      },
      {
        name: 'Travel Power Strip',
        icon: 'Plugs',
        tags: ['power_access', 'tech_accessory'],
        estimatedWeight: 250,
      },
      {
        name: 'USB Flash Drive',
        icon: 'FloppyDisk',
        tags: ['storage', 'data_transfer'],
        estimatedWeight: 10,
      },
      {
        name: 'Portable SSD',
        icon: 'HardDrive',
        tags: ['storage', 'data_transfer', 'backup'],
        estimatedWeight: 100,
      }, // (e.g. Samsung T7)
      {
        name: 'External Hard Drive',
        icon: 'HardDrives',
        tags: ['storage', 'backup'],
        estimatedWeight: 250,
      }, // (2.5 inch portable)
      {
        name: 'Stylus Pen (for Tablet/Phone)',
        icon: 'PencilSimpleLine',
        tags: ['tech_accessory', 'productivity', 'creative_tool'],
        estimatedWeight: 20,
      },
      {
        name: 'Portable Monitor',
        icon: 'Monitor',
        tags: ['work_travel', 'tech_accessory', 'productivity'],
        estimatedWeight: 700, // (15 inch)
      },
      {
        name: 'Digital Voice Recorder',
        icon: 'MicrophoneStage',
        tags: ['work', 'audio_recording', 'study'],
        estimatedWeight: 80,
      },
      {
        name: 'Handheld Gaming Console',
        icon: 'GameController',
        tags: ['entertainment', 'gaming', 'travel'],
        estimatedWeight: 300, // (e.g. Nintendo Switch Lite)
      },
      {
        name: 'Gaming Console Charger',
        icon: 'Plugs',
        tags: ['tech_accessory', 'gaming'],
        estimatedWeight: 100,
      },
      {
        name: 'Digital Luggage Scale',
        icon: 'Scales',
        tags: ['travel_tool', 'luggage_check'],
        estimatedWeight: 150,
      },
    ],
  },
  {
    category: 'Documents & Money',
    defaultIcon: 'IdentificationCard',
    items: [
      // Weights are generally low and for the physical item itself
      { name: 'Passport', icon: 'Passport', essential: true, estimatedWeight: 30 },
      {
        name: 'National ID Card',
        icon: 'IdentificationCard',
        essential: true,
        tags: ['identification'],
        estimatedWeight: 5,
      },
      {
        name: 'Visas (if required)', // Paper document or sticker in passport
        icon: 'Ticket',
        essential: true,
        tags: ['international_travel', 'entry_permit'],
        estimatedWeight: 2,
      },
      {
        name: 'Travel Tickets (Flight, Train, Bus)',
        icon: 'AirplaneTicket',
        essential: true,
        estimatedWeight: 5,
      }, // (per printed ticket)
      {
        name: 'Boarding Passes (Digital/Printed)',
        icon: 'Ticket',
        essential: true,
        estimatedWeight: 5,
      }, // (per printed pass)
      {
        name: 'Travel Insurance Details', // Printed papers
        icon: 'ShieldCheck',
        essential: true,
        tags: ['emergency', 'health', 'safety'],
        estimatedWeight: 10,
      },
      {
        name: 'Credit Cards',
        icon: 'CreditCard',
        essential: true,
        tags: ['payment', 'finance'],
        estimatedWeight: 5,
      }, // (per card)
      {
        name: 'Debit Cards',
        icon: 'CreditCard',
        essential: true,
        tags: ['payment', 'finance'],
        estimatedWeight: 5,
      }, // (per card)
      {
        name: 'Local Currency Cash',
        icon: 'Money',
        essential: true,
        tags: ['payment', 'finance'],
        estimatedWeight: 20,
      }, // (small bundle of notes)
      {
        name: 'Home Currency Cash (Small Amount)',
        icon: 'Money',
        tags: ['payment', 'emergency_fund'],
        estimatedWeight: 10, // (few notes)
      },
      {
        name: 'Emergency Contact List', // Printed paper
        icon: 'AddressBook',
        essential: true,
        tags: ['safety', 'important_info'],
        estimatedWeight: 5,
      },
      {
        name: 'Important Addresses List',
        icon: 'MapPin',
        tags: ['navigation', 'important_info'],
        estimatedWeight: 5,
      }, // Printed paper
      {
        name: 'Travel Itinerary',
        icon: 'CalendarDots',
        tags: ['planning', 'organization'],
        estimatedWeight: 10,
      }, // Printed papers
      {
        name: 'Booking Confirmations (Hotel, Tours)', // Printed papers
        icon: 'ClipboardText',
        tags: ['reservations', 'planning'],
        estimatedWeight: 10,
      },
      {
        name: 'Copies of Passport', // Paper copies
        icon: 'Copy',
        essential: true,
        tags: ['backup', 'identification'],
        estimatedWeight: 5, // (per copy)
      },
      {
        name: 'Copies of Visas',
        icon: 'Copy',
        essential: true,
        tags: ['backup', 'entry_permit'],
        estimatedWeight: 5,
      }, // (per copy)
      {
        name: 'Copies of Other Important Documents',
        icon: 'Copy',
        tags: ['backup', 'safety'],
        estimatedWeight: 5,
      }, // (per copy)
      {
        name: 'Extra Passport Photos', // Few photos
        icon: 'UserCircle',
        tags: ['visa_application', 'identification'],
        estimatedWeight: 5,
      },
      {
        name: 'Vaccination Certificate', // Paper document
        icon: 'FirstAid',
        tags: ['health', 'travel_requirement', 'international_travel'],
        estimatedWeight: 10,
      },
      {
        name: 'Health Records Summary', // Printed papers
        icon: 'Heartbeat',
        tags: ['health', 'medical_info', 'emergency'],
        estimatedWeight: 10,
      },
      {
        name: 'International Driving Permit', // Booklet
        icon: 'CarSimple',
        tags: ['driving_license', 'international_travel'],
        estimatedWeight: 25,
      },
      {
        name: 'Home Driving License', // Card
        icon: 'IdentificationCard',
        tags: ['driving_license', 'identification'],
        estimatedWeight: 5,
      },
      {
        name: 'Student ID Card',
        icon: 'Student',
        tags: ['identification', 'discounts'],
        estimatedWeight: 5,
      },
      {
        name: 'ISIC Card',
        icon: 'Student',
        tags: ['identification', 'discounts', 'international_student'],
        estimatedWeight: 5,
      },
      {
        name: 'Senior Discount Card',
        icon: 'User',
        tags: ['identification', 'discounts'],
        estimatedWeight: 5,
      },
      {
        name: 'Frequent Flyer Cards',
        icon: 'Airplane',
        tags: ['loyalty_program', 'travel_perks'],
        estimatedWeight: 5,
      }, // (per card)
      {
        name: 'Hotel Loyalty Cards',
        icon: 'Bed',
        tags: ['loyalty_program', 'travel_perks'],
        estimatedWeight: 5,
      }, // (per card)
      {
        name: 'Business Cards',
        icon: 'AddressBook',
        tags: ['work_travel', 'networking'],
        estimatedWeight: 1,
      }, // (per card)
      {
        name: 'Membership Cards (Museums, etc.)',
        icon: 'Ticket',
        tags: ['leisure', 'discounts'],
        estimatedWeight: 5,
      }, // (per card)
      { name: 'Gift Cards', icon: 'Gift', tags: ['payment', 'spending'], estimatedWeight: 5 }, // (per card)
      {
        name: 'Vouchers',
        icon: 'Ticket',
        tags: ['payment', 'discounts', 'spending'],
        estimatedWeight: 2,
      }, // (paper voucher)
      {
        name: "Doctor's Letter (for Medications)", // Paper document
        icon: 'Stethoscope',
        tags: ['health', 'prescription_meds', 'travel_requirement'],
        estimatedWeight: 5,
      },
      {
        name: 'Printed Address List (Postcards)', // Few sheets of paper
        icon: 'EnvelopeSimple',
        tags: ['communication', 'personal'],
        estimatedWeight: 10,
      },
      {
        name: 'Language Phrasebook', // Small book
        icon: 'Translate',
        tags: ['communication', 'language_learning'],
        estimatedWeight: 150,
      },
      {
        name: 'Pocket Dictionary', // Small book
        icon: 'BookOpenText',
        tags: ['communication', 'language_learning'],
        estimatedWeight: 120,
      },
      {
        name: 'Rental Car Documents', // Printed papers
        icon: 'CarSimple',
        tags: ['roadtrip', 'transport', 'vehicle_rental'],
        estimatedWeight: 20,
      },
      {
        name: 'Event Tickets (Concerts, Sports)', // Printed tickets
        icon: 'Ticket',
        tags: ['entertainment', 'leisure'],
        estimatedWeight: 5, // (per ticket)
      },
      {
        name: 'Emergency Wallet Card', // Card with info
        icon: 'Wallet',
        essential: true,
        tags: ['safety', 'medical_info', 'contacts'],
        estimatedWeight: 5,
      },
      {
        name: 'Money Belt',
        icon: 'Wallet',
        tags: ['security', 'travel_accessory', 'finance'],
        estimatedWeight: 80,
      }, // (empty)
      {
        name: 'Travel Wallet/Passport Holder',
        icon: 'Wallet',
        tags: ['organization', 'security', 'travel_accessory'],
        estimatedWeight: 150, // (empty)
      },
    ],
  },
  {
    category: 'Health & Safety',
    defaultIcon: 'FirstAidKit',
    items: [
      // Weights include typical packaging for travel
      { name: 'Prescription Medications', icon: 'Pill', essential: true, estimatedWeight: 50 }, // (small bottle/blister pack)
      {
        name: 'Copy of Prescriptions', // Paper
        icon: 'FileText',
        essential: true,
        tags: ['medical_info', 'legal_requirement'],
        estimatedWeight: 5,
      },
      {
        name: 'Pain Relievers (Ibuprofen/Paracetamol)',
        icon: 'Pill',
        essential: true,
        estimatedWeight: 30,
      }, // (blister pack/small bottle)
      {
        name: 'Fever Reducers',
        icon: 'ThermometerSimple',
        tags: ['medical', 'cold_flu'],
        estimatedWeight: 30,
      }, // (same as pain relievers)
      {
        name: 'Allergy Medication (Antihistamines)',
        icon: 'Pill',
        tags: ['health', 'allergy_relief'],
        estimatedWeight: 20, // (blister pack)
      },
      {
        name: 'Antacids',
        icon: 'Pill',
        tags: ['digestive_health', 'stomach_relief'],
        estimatedWeight: 40,
      }, // (roll of tablets/small bottle)
      {
        name: 'Indigestion Relief Tablets',
        icon: 'Pill',
        tags: ['digestive_health', 'stomach_relief'],
        estimatedWeight: 40,
      },
      {
        name: 'Anti-Diarrheal Medication',
        icon: 'Pill',
        tags: ['digestive_health', 'travel_illness'],
        estimatedWeight: 20, // (blister pack)
      },
      {
        name: 'Laxative Medication',
        icon: 'Pill',
        tags: ['digestive_health'],
        estimatedWeight: 20,
      }, // (blister pack)
      {
        name: 'Cold and Flu Medicine',
        icon: 'Pill',
        tags: ['illness_relief', 'cold_flu'],
        estimatedWeight: 30,
      }, // (blister pack/sachets)
      {
        name: 'Throat Lozenges',
        icon: 'Pill',
        tags: ['sore_throat_relief', 'cold_flu'],
        estimatedWeight: 50,
      }, // (pack/small bag)
      {
        name: 'Motion Sickness Pills',
        icon: 'Pill',
        essential: true,
        tags: ['travel_comfort', 'nausea_relief'],
        estimatedWeight: 15, // (blister pack)
      },
      {
        name: 'Motion Sickness Bands (Sea Bands)', // Pair
        icon: 'Watch',
        tags: ['travel_comfort', 'nausea_relief', 'alternative_remedy'],
        estimatedWeight: 20,
      },
      {
        name: 'Small First Aid Kit', // Pre-made travel kit
        icon: 'FirstAidKit',
        essential: true,
        tags: ['emergency', 'medical_supplies'],
        estimatedWeight: 200,
      },
      {
        name: 'Bandages (Various Sizes)',
        icon: 'Bandaids',
        tags: ['first_aid', 'wound_care'],
        estimatedWeight: 30,
      }, // (box of assorted)
      {
        name: 'Antiseptic Wipes', // Pack of 10-20
        icon: 'DropSimple',
        tags: ['first_aid', 'hygiene', 'wound_care'],
        estimatedWeight: 40,
      },
      {
        name: 'Gauze Pads',
        icon: 'Bandaids',
        tags: ['first_aid', 'wound_care'],
        estimatedWeight: 20,
      }, // (few sterile pads)
      {
        name: 'Medical Tape',
        icon: 'Bandaids',
        tags: ['first_aid', 'wound_care'],
        estimatedWeight: 25,
      }, // (small roll)
      {
        name: 'Antiseptic Cream', // Small tube
        icon: 'DropSimple',
        tags: ['first_aid', 'wound_care', 'infection_prevention'],
        estimatedWeight: 30,
      },
      {
        name: 'Antiseptic Spray', // Small bottle
        icon: 'SprayBottle',
        tags: ['first_aid', 'wound_care', 'infection_prevention'],
        estimatedWeight: 50,
      },
      {
        name: 'Hydrocortisone Cream', // Small tube
        icon: 'DropSimple',
        tags: ['first_aid', 'itch_relief', 'skin_irritation'],
        estimatedWeight: 25,
      },
      {
        name: 'Itch Relief Cream', // Small tube
        icon: 'DropSimple',
        tags: ['first_aid', 'bug_bites', 'skin_irritation'],
        estimatedWeight: 25,
      },
      {
        name: 'Burn Relief Gel', // Small tube/sachets
        icon: 'FireSimple',
        tags: ['first_aid', 'burn_care', 'sunburn_relief'],
        estimatedWeight: 30,
      },
      {
        name: 'Burn Relief Spray', // Small bottle
        icon: 'FireSimple',
        tags: ['first_aid', 'burn_care', 'sunburn_relief'],
        estimatedWeight: 50,
      },
      {
        name: 'Blister Plasters', // Pack of 5-10
        icon: 'Bandaids',
        tags: ['first_aid', 'foot_care', 'hiking_comfort'],
        estimatedWeight: 20,
      },
      {
        name: 'Moleskin', // Small sheet/roll
        icon: 'Bandaids',
        tags: ['first_aid', 'foot_care', 'hiking_comfort', 'blister_prevention'],
        estimatedWeight: 15,
      },
      {
        name: 'Lubricating Eye Drops',
        icon: 'Eye',
        tags: ['eye_care', 'dry_eyes', 'comfort'],
        estimatedWeight: 20,
      }, // (small bottle/vials)
      {
        name: 'Antihistamine Eye Drops',
        icon: 'Eye',
        tags: ['eye_care', 'allergy_relief'],
        estimatedWeight: 20,
      }, // (small bottle)
      {
        name: 'Saline Nasal Spray', // Small bottle
        icon: 'SprayBottle',
        tags: ['health', 'sinus_relief', 'dry_air_comfort'],
        estimatedWeight: 50,
      },
      {
        name: 'Decongestant Nasal Spray', // Small bottle
        icon: 'SprayBottle',
        tags: ['health', 'cold_relief', 'sinus_congestion'],
        estimatedWeight: 40,
      },
      {
        name: 'Hand Sanitizer', // Travel size bottle ~50-60ml
        icon: 'HandSoap',
        essential: true,
        tags: ['hygiene', 'health_protection'],
        estimatedWeight: 70,
      },
      {
        name: 'Disinfectant Wipes', // Travel pack
        icon: 'HandSoap',
        tags: ['hygiene', 'surface_cleaning', 'health_protection'],
        estimatedWeight: 80,
      },
      {
        name: 'Face Masks (N95/Surgical)', // Few masks
        icon: 'MaskHappy',
        tags: ['health_protection', 'travel_safety', 'airborne_illness'],
        estimatedWeight: 20,
      },
      {
        name: 'Water Purification Tablets', // Pack of 20-50
        icon: 'DropSimple',
        tags: ['outdoor', 'adventure', 'health_safety', 'drinking_water'],
        estimatedWeight: 30,
      },
      {
        name: 'Water Filter Bottle', // Empty
        icon: 'DropSimple',
        tags: ['outdoor', 'adventure', 'health_safety', 'drinking_water'],
        estimatedWeight: 150,
      },
      {
        name: 'Digital Thermometer',
        icon: 'ThermometerSimple',
        tags: ['health_monitoring', 'medical_tool'],
        estimatedWeight: 25, // (with case)
      },
      {
        name: 'Small Sterile Scissors (TSA-Compliant)',
        icon: 'Scissors',
        tags: ['first_aid_tool', 'utility'],
        estimatedWeight: 30,
      },
      {
        name: 'Safety Pins', // Few assorted
        icon: 'PushPinSimple',
        tags: ['first_aid_tool', 'utility', 'clothing_repair'],
        estimatedWeight: 5,
      },
      {
        name: 'Emergency Whistle',
        icon: 'SpeakerSimpleHigh',
        tags: ['safety_tool', 'outdoor', 'emergency_signal'],
        estimatedWeight: 10,
      },
      {
        name: 'Personal Safety Alarm',
        icon: 'Siren',
        tags: ['safety_tool', 'security', 'emergency_signal'],
        estimatedWeight: 40,
      },
      {
        name: 'Medical Alert Bracelet/Necklace',
        icon: 'IdentificationBadge',
        tags: ['health_info', 'medical_condition', 'emergency'],
        estimatedWeight: 25,
      },
      {
        name: 'Vitamins',
        icon: 'Pill',
        tags: ['health_supplement', 'daily_routine'],
        estimatedWeight: 50,
      }, // (small travel bottle)
      {
        name: 'Supplements',
        icon: 'Pill',
        tags: ['health_supplement', 'daily_routine'],
        estimatedWeight: 50,
      }, // (small travel bottle)
      {
        name: 'Sleep Aid (Melatonin/Herbal Tea)', // Melatonin pills or few tea bags
        icon: 'Bed',
        tags: ['health', 'travel_comfort', 'jet_lag'],
        estimatedWeight: 20,
      },
      {
        name: 'Instant Cold Pack', // Single use small pack
        icon: 'Snowflake',
        tags: ['first_aid', 'injury_treatment', 'pain_relief'],
        estimatedWeight: 100,
      },
      {
        name: 'Instant Hot Pack', // Single use small pack
        icon: 'FireSimple',
        tags: ['first_aid', 'pain_relief', 'muscle_soreness'],
        estimatedWeight: 100,
      },
      {
        name: 'CPR Mask (Pocket Size)',
        icon: 'Heartbeat',
        tags: ['first_aid_tool', 'emergency_preparedness', 'cpr_safety'],
        estimatedWeight: 30,
      },
      {
        name: 'Electrolyte Tablets', // Tube of 10-12
        icon: 'Pill',
        tags: ['health', 'sports', 'hydration', 'outdoor'],
        estimatedWeight: 30,
      },
      {
        name: 'Electrolyte Powder', // Few single serving packets
        icon: 'DropSimple',
        tags: ['health', 'sports', 'hydration', 'outdoor'],
        estimatedWeight: 40,
      },
      {
        name: 'Alcohol Swabs', // Box of 20-50
        icon: 'DropSimple',
        tags: ['first_aid', 'hygiene', 'sterilization'],
        estimatedWeight: 30,
      },
      {
        name: 'Pulse Oximeter (Compact)',
        icon: 'Heartbeat',
        tags: ['health_monitoring', 'medical_tool'],
        estimatedWeight: 50,
      },
      {
        name: 'Wilderness First Aid Kit', // More comprehensive kit
        icon: 'FirstAidKit',
        tags: ['outdoor', 'adventure', 'comprehensive_medical', 'safety'],
        estimatedWeight: 500,
      },
    ],
  },
  {
    category: 'Accessories (Non-Clothing/Non-Electronic)',
    defaultIcon: 'Sparkle',
    items: [
      { name: 'Sunglasses', icon: 'Sunglasses', essential: true, estimatedWeight: 30 },
      {
        name: 'Sunglasses Case',
        icon: 'ArchiveBox',
        tags: ['accessory_protection'],
        estimatedWeight: 100,
      }, // (hard case)
      {
        name: 'Watch',
        icon: 'Watch',
        tags: ['timekeeping', 'fashion_accessory'],
        estimatedWeight: 80,
      }, // (standard, non-smart)
      {
        name: 'Jewelry',
        icon: 'Diamond',
        tags: ['fashion_accessory', 'personal_items'],
        estimatedWeight: 50,
      }, // (a few small pieces)
      {
        name: 'Jewelry Roll',
        icon: 'Package',
        tags: ['travel_organization', 'accessory_storage'],
        estimatedWeight: 150,
      }, // (empty)
      {
        name: 'Jewelry Case', // Small travel case
        icon: 'ArchiveBox',
        tags: ['travel_organization', 'accessory_storage'],
        estimatedWeight: 200, // (empty)
      },
      {
        name: 'Travel Pillow (Inflatable/Memory Foam)',
        icon: 'Bed',
        tags: ['travel_comfort', 'long_haul'],
        estimatedWeight: 300, // (memory foam U-shaped)
      },
      {
        name: 'Eye Mask',
        icon: 'EyeSlash',
        essential: true,
        tags: ['sleep_aid', 'travel_comfort', 'light_block'],
        estimatedWeight: 20,
      },
      {
        name: 'Earplugs', // Pair with case
        icon: 'EarSlash',
        essential: true,
        tags: ['sleep_aid', 'travel_comfort', 'noise_reduction'],
        estimatedWeight: 10,
      },
      {
        name: 'Reusable Water Bottle', // Empty, 500-750ml
        icon: 'DropSimple',
        essential: true,
        tags: ['hydration', 'eco_friendly', 'travel_essential'],
        estimatedWeight: 150, // (plastic/light metal)
      },
      {
        name: 'Collapsible Water Bottle', // Empty
        icon: 'DropSimple',
        tags: ['hydration', 'eco_friendly', 'space_saving', 'travel_hack'],
        estimatedWeight: 100,
      },
      {
        name: 'Insulated Water Bottle', // Empty, 500ml
        icon: 'ThermometerSimple',
        tags: ['hydration', 'temperature_control', 'outdoor'],
        estimatedWeight: 300,
      },
      {
        name: 'Collapsible Cup',
        icon: 'DropSimple',
        tags: ['travel_hack', 'eco_friendly', 'space_saving', 'hygiene'],
        estimatedWeight: 50,
      },
      {
        name: 'Collapsible Mug',
        icon: 'Coffee',
        tags: ['travel_hack', 'eco_friendly', 'space_saving', 'drinks'],
        estimatedWeight: 80,
      },
      {
        name: 'Travel Mug', // Empty, with lid
        icon: 'Coffee',
        tags: ['drinks', 'eco_friendly', 'commute', 'travel_comfort'],
        estimatedWeight: 250,
      },
      {
        name: 'Thermos Flask', // Empty, small ~350-500ml
        icon: 'Coffee',
        tags: ['drinks', 'temperature_control', 'outdoor', 'picnic'],
        estimatedWeight: 350,
      },
      {
        name: 'Snacks for Travel Day', // e.g. a couple of granola bars
        icon: 'Cookie',
        essential: true,
        tags: ['food', 'travel_comfort', 'energy'],
        estimatedWeight: 100,
      },
      {
        name: 'Book',
        icon: 'BookOpenText',
        tags: ['entertainment', 'relaxation', 'reading'],
        estimatedWeight: 300,
      }, // (paperback)
      {
        name: 'Magazine',
        icon: 'Article',
        tags: ['entertainment', 'relaxation', 'reading'],
        estimatedWeight: 150,
      },
      {
        name: 'TSA-Approved Luggage Lock',
        icon: 'Lock',
        tags: ['security', 'luggage_safety', 'travel_accessory'],
        estimatedWeight: 50,
      },
      {
        name: 'Luggage Tags',
        icon: 'TagSimple',
        essential: true,
        defaultQuantity: 2,
        tags: ['identification', 'luggage_safety'],
        estimatedWeight: 15, // (per tag)
      },
      {
        name: 'Luggage Straps',
        icon: 'Minus',
        tags: ['luggage_security', 'identification', 'travel_accessory'],
        estimatedWeight: 100,
      },
      {
        name: 'Packing Cubes', // Set of 3, empty
        icon: 'SquaresFour',
        tags: ['organization', 'luggage_packing', 'travel_hack'],
        estimatedWeight: 200,
      },
      {
        name: 'Compression Bags (for Clothes)', // Medium size, empty
        icon: 'ArchiveBox',
        tags: ['organization', 'space_saving', 'luggage_packing'],
        estimatedWeight: 50,
      },
      {
        name: 'Travel Laundry Detergent', // Small bottle or few pods
        icon: 'DropSimple',
        tags: ['hygiene', 'laundry', 'extended_travel'],
        estimatedWeight: 100,
      },
      {
        name: 'Laundry Detergent Sheets', // Pack of 20-30
        icon: 'FileText',
        tags: ['hygiene', 'laundry', 'travel_friendly', 'eco_friendly'],
        estimatedWeight: 50,
      },
      {
        name: 'Stain Remover Pen',
        icon: 'PencilSimpleLine',
        tags: ['clothing_care', 'emergency_cleaning', 'travel_hack'],
        estimatedWeight: 25,
      },
      {
        name: 'Stain Remover Wipes', // Individually wrapped, few
        icon: 'Eraser',
        tags: ['clothing_care', 'emergency_cleaning', 'travel_hack'],
        estimatedWeight: 30,
      },
      {
        name: 'Travel Clothesline',
        icon: 'Minus',
        tags: ['laundry', 'travel_hack', 'extended_travel'],
        estimatedWeight: 50,
      },
      {
        name: 'Travel Clothes Pegs',
        icon: 'PushPinSimple',
        tags: ['laundry', 'travel_hack'],
        estimatedWeight: 30,
      }, // (set of few)
      {
        name: 'Compact Umbrella',
        icon: 'UmbrellaSimple',
        tags: ['rain_protection', 'all_weather', 'travel_accessory'],
        estimatedWeight: 250,
      },
      {
        name: 'Carabiner Clips', // Few small ones
        icon: 'LinkSimpleHorizontal',
        tags: ['utility', 'attachment', 'outdoor_accessory', 'travel_hack'],
        estimatedWeight: 40,
      },
      {
        name: 'Duct Tape (Mini Roll)',
        icon: 'Toolbox',
        tags: ['repairs', 'utility', 'emergency_fix', 'travel_hack'],
        estimatedWeight: 50,
      },
      {
        name: 'Mini Sewing Kit',
        icon: 'Needle',
        tags: ['clothing_repair', 'emergency_fix', 'travel_hack'],
        estimatedWeight: 30,
      },
      {
        name: 'Notepad',
        icon: 'NoteBlank',
        tags: ['writing', 'notes', 'journaling', 'planning'],
        estimatedWeight: 100,
      }, // (small)
      {
        name: 'Journal', // A6 or similar travel size
        icon: 'BookBookmark',
        tags: ['writing', 'personal_reflection', 'travel_diary'],
        estimatedWeight: 150,
      },
      {
        name: 'Pen',
        icon: 'PencilSimpleLine',
        essential: true,
        tags: ['writing', 'document_filling'],
        estimatedWeight: 10,
      },
      {
        name: 'Playing Cards', // Deck in box
        icon: 'Cards',
        tags: ['entertainment', 'social_games', 'travel_fun'],
        estimatedWeight: 100,
      },
      {
        name: 'Travel Games', // Small magnetic or card game
        icon: 'GameController',
        tags: ['entertainment', 'family_fun', 'travel_with_kids'],
        estimatedWeight: 150,
      },
      {
        name: 'Compact Binoculars',
        icon: 'Binoculars',
        tags: ['outdoor_activity', 'sightseeing', 'nature_watching'],
        estimatedWeight: 300,
      },
      {
        name: 'Travel Guidebook', // Pocket size
        icon: 'BookOpenText',
        tags: ['travel_info', 'planning', 'local_guidance'],
        estimatedWeight: 200,
      },
      {
        name: 'Physical Map', // Folded
        icon: 'MapTrifold',
        tags: ['navigation', 'backup_navigation', 'offline_access'],
        estimatedWeight: 50,
      },
      {
        name: 'Waterproof Phone Pouch',
        icon: 'DeviceMobile',
        tags: ['water_protection', 'beach_accessory', 'boating'],
        estimatedWeight: 40,
      },
      {
        name: 'Waterproof Phone Case', // Ruggedized case
        icon: 'DeviceMobile',
        tags: ['water_protection', 'outdoor_activity', 'durable_case'],
        estimatedWeight: 80,
      },
      {
        name: 'Beach Bag', // Empty, foldable tote style
        icon: 'BagSimple',
        tags: ['beach_trip', 'pool_accessory', 'large_tote'],
        estimatedWeight: 300,
      },
      {
        name: 'Dry Bag', // Small, 5-10L, empty
        icon: 'BagSimple',
        tags: ['water_sports', 'outdoor_adventure', 'gear_protection'],
        estimatedWeight: 150,
      },
      {
        name: 'Fanny Pack', // Empty
        icon: 'BagSimple',
        tags: ['travel_security', 'hands_free', 'festival_accessory', 'waist_bag'],
        estimatedWeight: 150,
      },
      {
        name: 'Travel Steamer (Mini)',
        icon: 'Toolbox',
        tags: ['clothing_care', 'wrinkle_removal', 'business_travel'],
        estimatedWeight: 400,
      },
      {
        name: 'Picnic Blanket', // Compact, foldable
        icon: 'SquaresFour',
        tags: ['outdoor_activity', 'leisure', 'park_visit', 'beach_trip'],
        estimatedWeight: 500,
      },
      {
        name: 'Yoga Mat (Travel)', // Thin, foldable
        icon: 'PersonSimpleTaiChi',
        tags: ['wellness', 'fitness', 'exercise', 'retreat'],
        estimatedWeight: 1000,
      },
      {
        name: 'Travel Fan (Mini)', // Handheld, battery operated
        icon: 'Fan',
        tags: ['hot_climates', 'cooling', 'personal_comfort'],
        estimatedWeight: 100,
      },
      {
        name: 'Cooling Towel',
        icon: 'Towel',
        tags: ['hot_climates', 'sports', 'cooling_relief', 'outdoor_activity'],
        estimatedWeight: 50,
      },
      {
        name: 'Reusable Shopping Bag', // Foldable nylon type
        icon: 'ShoppingBagOpen',
        tags: ['eco_friendly', 'shopping', 'utility_bag'],
        estimatedWeight: 40,
      },
      {
        name: 'Foldable Tote Bag',
        icon: 'ShoppingBagOpen',
        tags: ['eco_friendly', 'shopping', 'extra_bag', 'travel_hack'],
        estimatedWeight: 100,
      },
      {
        name: 'Luggage Scale', // Manual or digital
        icon: 'Scales',
        tags: ['travel_tool', 'luggage_check', 'avoid_fees'],
        estimatedWeight: 150,
      },
      // { name: 'Sleep Mask', icon: 'EyeSlash', tags: ['sleep_aid', 'travel_comfort'], estimatedWeight: 20 }, // Duplicate, already Eye Mask
    ],
  },
  {
    category: 'Miscellaneous',
    defaultIcon: 'Toolbox',
    items: [
      {
        name: 'Lightweight Daypack', // Empty, packable type
        icon: 'Backpack',
        tags: ['daily_excursions', 'carry_on', 'hiking'],
        estimatedWeight: 250,
      },
      {
        name: 'Backpack',
        icon: 'Backpack',
        tags: ['main_luggage', 'carry_on', 'travel_gear'],
        estimatedWeight: 800,
      }, // Empty, standard 20-30L
      {
        name: 'Laundry Bag', // Nylon or cotton
        icon: 'BagSimple',
        tags: ['organization', 'hygiene', 'dirty_clothes'],
        estimatedWeight: 80,
      },
      {
        name: 'Ziplock Bags (Various Sizes)', // Assortment of 5-10 bags
        icon: 'ArchiveBox',
        tags: ['organization', 'liquids_carry_on', 'storage_utility'],
        estimatedWeight: 50,
      },
      {
        name: 'Wet Bag', // Small, for swimwear
        icon: 'BagSimple',
        tags: ['swimwear_storage', 'dirty_items', 'waterproof_pouch'],
        estimatedWeight: 70,
      },
      {
        name: 'Multi-Tool', // e.g. Leatherman style
        icon: 'Toolbox',
        tags: ['utility', 'repairs', 'outdoor_gear', 'camping'],
        estimatedWeight: 200,
      },
      {
        name: 'Swiss Army Knife', // Medium size
        icon: 'Toolbox',
        tags: ['utility', 'multiple_tools', 'travel_gadget'],
        estimatedWeight: 80,
      },
      {
        name: 'Lighter',
        icon: 'FireSimple',
        tags: ['utility', 'camping', 'emergency_kit'],
        estimatedWeight: 20,
      }, // Standard Bic style
      {
        name: 'Waterproof Matches', // Box/container
        icon: 'FireSimple',
        tags: ['utility', 'camping', 'emergency_kit', 'outdoor'],
        estimatedWeight: 30,
      },
      {
        name: 'Mini Flashlight', // Small LED
        icon: 'Flashlight',
        tags: ['emergency_lighting', 'night_safety', 'travel_tool'],
        estimatedWeight: 50, // (without batteries, or with small ones)
      },
      {
        name: 'Headlamp',
        icon: 'Flashlight',
        tags: ['hands_free_lighting', 'outdoor', 'camping', 'reading'],
        estimatedWeight: 80, // (with batteries)
      },
      {
        name: 'Spare Batteries (for Devices)', // e.g. pack of 4 AA
        icon: 'BatteryPlus',
        tags: ['electronics_power', 'backup_energy'],
        estimatedWeight: 100,
      },
      {
        name: 'Travel Alarm Clock',
        icon: 'Alarm',
        tags: ['timekeeping', 'wake_up_call'],
        estimatedWeight: 70,
      }, // Small digital
      {
        name: 'Small Gifts (for Hosts/Locals)', // Highly variable, e.g. keychain or small souvenir
        icon: 'Gift',
        tags: ['cultural_exchange', 'courtesy', 'souvenirs'],
        estimatedWeight: 50,
      },
      {
        name: 'Empty Plastic Bags', // Few folded grocery bags
        icon: 'BagSimple',
        tags: ['waste_disposal', 'storage', 'utility'],
        estimatedWeight: 20,
      },
      {
        name: 'Door Stop Alarm',
        icon: 'DoorOpen',
        tags: ['security', 'hotel_safety', 'travel_gadget'],
        estimatedWeight: 60,
      },
    ],
  },
  {
    category: 'Baby & Kids',
    defaultIcon: 'Baby',
    items: [
      // Weights are for single items or typical small packs
      {
        name: 'Diapers',
        icon: 'Baby',
        essential: true,
        tags: ['baby_care', 'hygiene'],
        estimatedWeight: 40,
      }, // (per diaper)
      {
        name: 'Baby Wipes', // Travel pack ~50-80 wipes
        icon: 'HandSoap',
        essential: true,
        tags: ['baby_care', 'hygiene', 'cleaning'],
        estimatedWeight: 250,
      },
      {
        name: 'Baby Food Pouches',
        icon: 'Cookie',
        tags: ['baby_feeding', 'toddler_snacks'],
        estimatedWeight: 100,
      }, // (per pouch)
      { name: 'Baby Food Jars', icon: 'Cookie', tags: ['baby_feeding'], estimatedWeight: 150 }, // (per small jar, including contents)
      {
        name: 'Baby Formula',
        icon: 'DropSimple',
        tags: ['baby_feeding', 'infant_nutrition'],
        estimatedWeight: 400,
      }, // (small can/pouch of powder)
      {
        name: 'Baby Bottles',
        icon: 'DropSimple',
        tags: ['baby_feeding', 'infant_care'],
        estimatedWeight: 80,
      }, // (empty, standard size)
      {
        name: 'Sippy Cups',
        icon: 'DropSimple',
        tags: ['toddler_feeding', 'kids_drinks'],
        estimatedWeight: 100,
      }, // (empty)
      {
        name: 'Travel Stroller', // Lightweight, foldable
        icon: 'BabyCarriage',
        tags: ['baby_transport', 'toddler_gear', 'family_travel'],
        estimatedWeight: 6000,
      },
      {
        name: 'Portable Car Seat', // Lightweight travel version
        icon: 'CarSimple',
        tags: ['child_safety', 'vehicle_travel', 'family_travel'],
        estimatedWeight: 5000,
      },
      {
        name: 'Favorite Toys', // Assortment of small toys
        icon: 'GameController',
        tags: ['kids_entertainment', 'comfort_item', 'travel_with_kids'],
        estimatedWeight: 300,
      },
      {
        name: 'Comfort Blanket', // Small baby/toddler size
        icon: 'Bed',
        tags: ['baby_comfort', 'toddler_sleep_aid', 'security_item'],
        estimatedWeight: 200,
      },
      {
        name: 'Comfort Item (Stuffed Animal)', // Medium size
        icon: 'Ghost',
        tags: ['baby_comfort', 'toddler_security_item'],
        estimatedWeight: 150,
      },
      {
        name: 'Baby Carrier', // Soft structured carrier or wrap
        icon: 'Backpack',
        tags: ['baby_transport', 'hands_free_parenting', 'hiking_with_baby'],
        estimatedWeight: 600,
      },
      {
        name: 'Baby Sling',
        icon: 'Backpack',
        tags: ['baby_transport', 'newborn_care', 'bonding'],
        estimatedWeight: 400,
      },
      {
        name: 'Pacifiers',
        icon: 'Baby',
        tags: ['baby_soothing', 'infant_comfort'],
        estimatedWeight: 10,
      }, // (per pacifier)
      {
        name: 'Teethers',
        icon: 'Baby',
        tags: ['baby_comfort', 'teething_relief'],
        estimatedWeight: 50,
      }, // (one teether)
      {
        name: 'Baby Blanket', // Receiving blanket size
        icon: 'Bed',
        tags: ['baby_warmth', 'comfort_item', 'travel_bedding'],
        estimatedWeight: 250,
      },
      {
        name: 'Portable Changing Pad', // Foldable
        icon: 'Package',
        tags: ['baby_hygiene', 'diaper_change_station', 'on_the_go'],
        estimatedWeight: 200,
      },
      {
        name: 'Bibs', // Cloth bib
        icon: 'TShirt',
        tags: ['baby_feeding', 'mess_prevention', 'toddler_mealtimes'],
        estimatedWeight: 30,
      },
      {
        name: 'Baby Sunscreen', // Travel size tube/bottle
        icon: 'Sun',
        tags: ['baby_skincare', 'sun_protection', 'child_health'],
        estimatedWeight: 100,
      },
      {
        name: 'Baby Sun Hat',
        icon: 'BaseballCap',
        tags: ['baby_sun_protection', 'outdoor_gear_kids'],
        estimatedWeight: 50,
      },
      {
        name: 'Child ID Bracelet',
        icon: 'IdentificationBadge',
        tags: ['child_safety', 'emergency_contact', 'travel_security'],
        estimatedWeight: 10,
      },
      {
        name: 'Swim Diapers', // Per diaper
        icon: 'SwimmingPool',
        tags: ['beach_with_baby', 'pool_with_baby', 'baby_swimwear'],
        estimatedWeight: 30,
      },
      {
        name: 'Child Arm Floaties', // Pair, deflated
        icon: 'SwimmingPool',
        tags: ['kids_swim_safety', 'pool_toy', 'beach_gear'],
        estimatedWeight: 150,
      },
      {
        name: 'Child Life Vest', // Small size
        icon: 'Lifebuoy',
        tags: ['kids_water_safety', 'boating_with_kids', 'swim_aid'],
        estimatedWeight: 300,
      },
      {
        name: 'Baby Carrier Backpack (for Hiking)', // Framed carrier
        icon: 'PersonSimpleHike',
        tags: ['hiking_with_baby', 'outdoor_family_gear', 'baby_transport'],
        estimatedWeight: 2500,
      },
      {
        name: 'Portable High Chair', // Fabric/foldable type
        icon: 'Chair',
        tags: ['family_travel_gear', 'toddler_feeding_solution', 'restaurant_with_kids'],
        estimatedWeight: 500,
      },
      {
        name: 'White Noise Machine (Travel Size)',
        icon: 'SpeakerSimpleLow',
        tags: ['baby_sleep_aid', 'toddler_sleep', 'travel_comfort_kids'],
        estimatedWeight: 150,
      },
      {
        name: 'Travel Potty Seat', // Foldable plastic
        icon: 'ToiletPaper',
        tags: ['toddler_potty_training', 'family_travel_hygiene', 'kids_restroom_solution'],
        estimatedWeight: 200,
      },
      {
        name: 'Child Safety Harness',
        icon: 'LinkSimpleHorizontal',
        tags: ['toddler_safety', 'crowded_places_kids', 'travel_security_child'],
        estimatedWeight: 100,
      },
      {
        name: 'Child Leash Backpack', // Small backpack with leash
        icon: 'Backpack',
        tags: ['toddler_safety', 'crowded_places_kids', 'travel_gear_kids'],
        estimatedWeight: 200,
      },
      {
        name: 'Baby Monitor (Travel)', // Audio or basic video
        icon: 'SpeakerSimpleHigh',
        tags: ['baby_safety', 'hotel_room_kids', 'family_travel_tech'],
        estimatedWeight: 300, // (receiver + transmitter)
      },
      {
        name: 'Kids Headphones', // Volume-limited
        icon: 'Headphones',
        tags: ['kids_entertainment', 'travel_with_kids', 'volume_limited_audio'],
        estimatedWeight: 150,
      },
      {
        name: 'Coloring Books', // Small/medium size
        icon: 'PaintBrushHousehold',
        tags: ['kids_entertainment', 'travel_activities_kids', 'creative_play'],
        estimatedWeight: 100,
      },
      {
        name: 'Crayons', // Small pack
        icon: 'PaintBrushHousehold',
        tags: ['kids_art_supplies', 'travel_activities_kids', 'creative_play'],
        estimatedWeight: 80,
      },
      {
        name: 'Sticker Books', // Small book
        icon: 'Sticker',
        tags: ['kids_entertainment', 'travel_activities_kids', 'quiet_time_play'],
        estimatedWeight: 70,
      },
      {
        name: 'Small Story Books', // Paperback children's book
        icon: 'BookOpenText',
        tags: ['kids_reading', 'bedtime_stories_travel', 'early_literacy'],
        estimatedWeight: 120,
      },
      {
        name: 'Kids Travel Games', // Card game or small magnetic game
        icon: 'GameController',
        tags: ['family_entertainment', 'roadtrip_games', 'plane_activities_kids'],
        estimatedWeight: 150,
      },
      {
        name: 'Kids Snacks', // Few individual packs
        icon: 'Cookie',
        tags: ['toddler_food', 'kids_travel_food', 'healthy_snacks_kids'],
        estimatedWeight: 150,
      },
      {
        name: 'Kids Reusable Water Bottle', // Empty, small size
        icon: 'DropSimple',
        tags: ['kids_hydration', 'family_travel_eco', 'school_gear'],
        estimatedWeight: 100,
      },
      {
        name: 'Baby Nail Clippers',
        icon: 'Scissors',
        tags: ['baby_grooming', 'infant_care'],
        estimatedWeight: 20,
      },
      {
        name: 'Nasal Aspirator', // Bulb or manual suction type
        icon: 'DropSimple',
        tags: ['baby_health', 'infant_cold_relief', 'congestion_aid'],
        estimatedWeight: 40,
      },
      {
        name: 'Kids Toothbrush',
        icon: 'Tooth',
        tags: ['kids_dental_hygiene', 'toddler_oral_care'],
        estimatedWeight: 15,
      },
      {
        name: 'Kids Toothpaste', // Travel size tube
        icon: 'DropSimple',
        tags: ['kids_dental_hygiene', 'toddler_oral_care'],
        estimatedWeight: 50,
      },
      {
        name: 'Burp Cloths', // Per cloth
        icon: 'Towel',
        tags: ['baby_feeding', 'newborn_care', 'mess_control'],
        estimatedWeight: 40,
      },
      {
        name: 'Nursing Cover',
        icon: 'PersonSimple',
        tags: ['breastfeeding_privacy', 'baby_feeding_on_the_go', 'maternity_accessory'],
        estimatedWeight: 150,
      },
    ],
  },
  {
    category: 'Outdoor & Adventure',
    defaultIcon: 'Mountains',
    items: [
      {
        name: 'Trekking Poles', // Pair, lightweight aluminum/carbon fiber
        icon: 'PersonSimpleHike',
        tags: ['hiking_gear', 'trekking_support', 'mountain_adventure'],
        estimatedWeight: 500,
      },
      {
        name: 'Walking Stick', // Single wooden or aluminum stick
        icon: 'PersonSimpleHike',
        tags: ['hiking_support', 'nature_walk', 'outdoor_stability'],
        estimatedWeight: 300,
      },
      {
        name: 'Tent',
        icon: 'Tent',
        tags: ['camping_gear', 'shelter', 'outdoor_sleeping'],
        estimatedWeight: 2000,
      }, // (2-person backpacking tent)
      {
        name: 'Sleeping Bag',
        icon: 'Bed',
        tags: ['camping_gear', 'outdoor_sleeping', 'warmth'],
        estimatedWeight: 1200,
      }, // (3-season synthetic/down)
      {
        name: 'Sleeping Pad', // Inflatable or foam
        icon: 'Bed',
        tags: ['camping_comfort', 'insulation', 'outdoor_sleeping'],
        estimatedWeight: 600,
      },
      {
        name: 'Camping Pillow (Inflatable)',
        icon: 'Bed',
        tags: ['camping_comfort', 'lightweight_pillow', 'outdoor_sleeping'],
        estimatedWeight: 100,
      },
      {
        name: 'Compass',
        icon: 'Compass',
        tags: ['navigation_tool', 'outdoor_orientation', 'map_reading'],
        estimatedWeight: 50,
      },
      {
        name: 'Bear Spray', // Can with holster
        icon: 'SprayBottle',
        tags: ['wildlife_safety', 'bear_country', 'outdoor_defense'],
        estimatedWeight: 300,
      },
      {
        name: 'Bear Canister', // Empty, medium size
        icon: 'ArchiveBox',
        tags: ['food_storage_wildlife', 'camping_safety', 'bear_country'],
        estimatedWeight: 1200,
      },
      {
        name: 'Utility Rope', // ~50ft, general purpose
        icon: 'Minus',
        tags: ['camping_utility', 'gear_securing', 'outdoor_tool'],
        estimatedWeight: 200,
      },
      {
        name: 'Paracord', // ~100ft
        icon: 'Minus',
        tags: ['survival_gear', 'multi_purpose_rope', 'outdoor_utility'],
        estimatedWeight: 150,
      },
      {
        name: 'Emergency Blanket', // Mylar type
        icon: 'Package',
        tags: ['survival_gear', 'hypothermia_protection', 'emergency_shelter'],
        estimatedWeight: 60,
      },
      {
        name: 'Gaiters', // Pair, hiking gaiters
        icon: 'Boot',
        tags: ['hiking_protection', 'legwear_outdoor', 'snow_mud_debris'],
        estimatedWeight: 200,
      },
      {
        name: 'Climbing Harness',
        icon: 'PersonSimpleHike',
        tags: ['climbing_gear', 'safety_equipment', 'adventure_sports'],
        estimatedWeight: 400,
      },
      {
        name: 'Climbing Helmet',
        icon: 'HardHat',
        tags: ['climbing_gear', 'safety_equipment', 'head_protection'],
        estimatedWeight: 350,
      },
      {
        name: 'Chalk Bag (Climbing)', // With chalk ball
        icon: 'BagSimple',
        tags: ['climbing_gear', 'grip_enhancement'],
        estimatedWeight: 100,
      },
      {
        name: 'Belay Device',
        icon: 'Toolbox',
        tags: ['climbing_gear', 'safety_equipment'],
        estimatedWeight: 80,
      }, // (e.g. ATC)
      {
        name: 'Carabiners (Climbing Grade)', // Per carabiner
        icon: 'LinkSimpleHorizontal',
        tags: ['climbing_gear', 'safety_equipment', 'utility_clips'],
        estimatedWeight: 60,
      },
      {
        name: 'Life Jacket', // Adult PFD
        icon: 'Lifebuoy',
        tags: ['water_safety', 'boating_gear', 'kayaking_canoeing'],
        estimatedWeight: 700,
      },
      {
        name: 'Travel Fishing Rod', // Telescopic or multi-piece
        icon: 'FishSimple',
        tags: ['fishing_gear', 'portable_rod', 'recreational_fishing'],
        estimatedWeight: 300, // (rod only)
      },
      {
        name: 'Basic Fishing Tackle', // Small box with lures, hooks, weights
        icon: 'FishSimple',
        tags: ['fishing_gear', 'hooks_lures_line', 'angling_supplies'],
        estimatedWeight: 250,
      },
      {
        name: 'Camping Stove', // Small backpacking stove (e.g. MSR PocketRocket)
        icon: 'CookingPot',
        tags: ['outdoor_cooking', 'camping_kitchen', 'backpacking_food'],
        estimatedWeight: 100, // (stove only)
      },
      {
        name: 'Camping Fuel Canister', // Small isobutane canister (e.g. 100g fuel)
        icon: 'GasCan',
        tags: ['outdoor_cooking', 'stove_fuel', 'camping_supplies'],
        estimatedWeight: 200, // (canister + fuel)
      },
      {
        name: 'Camping Cookware (Pots, Pans)', // Small solo cook set
        icon: 'CookingPot',
        tags: ['outdoor_cooking', 'camping_kitchen', 'backpacking_meals'],
        estimatedWeight: 400,
      },
      {
        name: 'Camping Utensils (Spork, Knife)', // Set or spork
        icon: 'ForkKnife',
        tags: ['outdoor_eating', 'camping_kitchen', 'backpacking_cutlery'],
        estimatedWeight: 50,
      },
      {
        name: 'Hammock (Lightweight Travel)', // With suspension straps
        icon: 'Bed',
        tags: ['camping_relaxation', 'outdoor_lounging', 'backpacking_gear'],
        estimatedWeight: 700,
      },
      {
        name: 'Trekking Sandals', // Pair
        icon: 'SneakerMove',
        tags: ['outdoor_footwear', 'hiking_warm_weather', 'water_crossings'],
        estimatedWeight: 600,
      },
      {
        name: 'Insect Head Net',
        icon: 'BugBeetle',
        tags: ['tropical_protection', 'bug_defense', 'outdoor_comfort'],
        estimatedWeight: 30,
      },
      {
        name: 'Satellite Phone',
        icon: 'Phone',
        tags: ['remote_communication', 'emergency_device', 'off_grid_travel'],
        estimatedWeight: 250,
      },
      {
        name: 'Personal Locator Beacon (PLB)',
        icon: 'GpsFix',
        tags: ['emergency_signal_device', 'remote_safety', 'sos_beacon'],
        estimatedWeight: 150,
      },
      {
        name: 'Emergency Beacon', // Often same as PLB or similar device
        icon: 'GpsFix',
        tags: ['emergency_signal_device', 'remote_safety', 'distress_signal'],
        estimatedWeight: 150,
      },
      {
        name: 'Avalanche Transceiver',
        icon: 'WifiHigh',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'backcountry_skiing'],
        estimatedWeight: 200,
      },
      {
        name: 'Snow Shovel (Collapsible)', // Lightweight aluminum
        icon: 'Shovel',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'winter_camping'],
        estimatedWeight: 600,
      },
      {
        name: 'Snow Probe', // Collapsible aluminum
        icon: 'Minus',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'avalanche_rescue'],
        estimatedWeight: 300,
      },
      {
        name: 'Ice Axe', // General mountaineering axe
        icon: 'Axe',
        tags: ['mountaineering_gear', 'snow_climbing', 'glacier_travel'],
        estimatedWeight: 500,
      },
      {
        name: 'Crampons', // Pair, general mountaineering
        icon: 'Snowflake',
        tags: ['mountaineering_gear', 'ice_climbing', 'glacier_travel_traction'],
        estimatedWeight: 900,
      },
      {
        name: 'Ski Skins (for Touring)', // Pair
        icon: 'Ski',
        tags: ['backcountry_skiing', 'ski_touring_gear', 'uphill_traction'],
        estimatedWeight: 600,
      },
      {
        name: 'Bike Helmet',
        icon: 'Bicycle',
        tags: ['cycling_safety', 'head_protection'],
        estimatedWeight: 300,
      },
      {
        name: 'Bike Repair Kit (Mini)', // Basic multi-tool, tire levers, patches
        icon: 'Wrench',
        tags: ['cycling_maintenance', 'roadside_repair'],
        estimatedWeight: 200,
      },
      {
        name: 'Bike Lock',
        icon: 'Lock',
        tags: ['cycling_security', 'bike_theft_prevention'],
        estimatedWeight: 800,
      }, // (U-lock or heavy chain)
      {
        name: 'Snorkel Mask',
        icon: 'SwimmingPool',
        tags: ['water_sports', 'beach_activity', 'underwater_viewing'],
        estimatedWeight: 400, // (mask and snorkel tube)
      },
      {
        name: 'Fins (Snorkeling/Diving)', // Pair, travel size for snorkeling
        icon: 'SwimmingPool',
        tags: ['water_sports', 'underwater_propulsion', 'diving_gear'],
        estimatedWeight: 1000,
      },
      {
        name: 'Dive Computer', // Wristwatch style
        icon: 'Watch',
        tags: ['scuba_diving_gear', 'safety_device', 'underwater_monitoring'],
        estimatedWeight: 150,
      },
      {
        name: 'Surfboard Wax',
        icon: 'DropSimple',
        tags: ['surfing_gear', 'board_grip'],
        estimatedWeight: 80,
      }, // (one bar)
      {
        name: 'Kayak/Canoe Dry Bag', // 10-20L, empty
        icon: 'BagSimple',
        tags: ['paddling_gear', 'waterproof_storage', 'boating_accessory'],
        estimatedWeight: 250,
      },
      {
        name: 'Golf Clubs (Travel Set)',
        icon: 'Golf',
        tags: ['sports_equipment', 'golf_travel'],
        estimatedWeight: 4000,
      }, // (Half set in light bag)
      {
        name: 'Tennis Racquet',
        icon: 'TennisBall',
        tags: ['sports_equipment', 'tennis_gear'],
        estimatedWeight: 300,
      }, // (unstrung, without bag)
    ],
  },
];

// Helper to remove items marked for removal (e.g., true duplicates after consolidation)
// This step would typically be done programmatically after the list definition.
PACKING_MASTER_LIST.forEach((category) => {
  category.items = category.items.filter((item) => !item.toRemove);
});
