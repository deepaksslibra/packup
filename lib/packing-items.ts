/**
 * Master packing list for AI-Powered Packing Checklist
 * Organized by category, with type safety for easy extension and customization.
 */

/**
 * Represents a master packing item definition for templates and AI logic.
 * Used for the master list, not for user-specific packing lists.
 * @property {string} name - Name of the item (e.g., "T-shirts").
 * @property {string} icon - Phosphor icon name for the item (e.g., "TShirt").
 * @property {boolean} [essential] - Whether this item is typically essential.
 * @property {number} [defaultQuantity] - Default quantity suggested (optional).
 * @property {string[]} [tags] - Tags for filtering/templates (e.g., ['beach', 'business']).
 * @property {boolean} [toRemove] - Whether this item is marked for removal (optional).
 */
export type MasterPackingItem = {
  name: string;
  icon: string; // Phosphor Icon Name (PascalCase)
  essential?: boolean;
  defaultQuantity?: number;
  tags?: string[];
  toRemove?: boolean; // Add this property to the type
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
      { name: 'T-Shirts', icon: 'TShirt', essential: true, defaultQuantity: 5 },
      { name: 'Dress Shirts', icon: 'UserTie', tags: ['business', 'formal'] },
      { name: 'Blouses', icon: 'PersonSimple', tags: ['business', 'formal', 'women'] },
      { name: 'Casual Shirts', icon: 'ShirtFolded', defaultQuantity: 3 },
      { name: 'Casual Tops', icon: 'TShirt', defaultQuantity: 2, tags: ['casual', 'women'] },
      { name: 'Polo Shirts', icon: 'TShirt', tags: ['business_casual', 'casual', 'men'] },
      { name: 'Tank Tops', icon: 'TShirt', tags: ['summer', 'gym', 'layering'] },
      { name: 'Camisoles', icon: 'TShirt', tags: ['layering', 'women'] },
      { name: 'Crop Tops', icon: 'TShirt', tags: ['women', 'casual', 'summer'] },
      { name: 'Sweaters', icon: 'TShirt', tags: ['cold', 'layering', 'winter'] },
      { name: 'Hoodies', icon: 'Hoodie', tags: ['casual', 'comfort'] },
      { name: 'Turtleneck Sweater', icon: 'TShirt', tags: ['winter', 'cold'] },
      { name: 'Cardigan', icon: 'TShirt', tags: ['layering', 'casual'] },
      { name: 'Fleece Jacket', icon: 'CoatHanger', tags: ['outdoor', 'warmth', 'layering'] },
      { name: 'Jumper', icon: 'TShirt', tags: ['casual', 'warmth'] }, // UK term for sweater/pullover
      { name: 'Fashion Vests', icon: 'CoatHanger', tags: ['layering', 'fashion'] },
      { name: 'Outerwear Vests', icon: 'CoatHanger', tags: ['layering', 'outdoor', 'warmth'] },
      { name: 'Tunics', icon: 'PersonSimple', tags: ['women', 'casual'] },
      { name: 'Henley Shirts', icon: 'TShirt', tags: ['casual', 'men'] },
      // Bottoms
      { name: 'Pants', icon: 'Pants', defaultQuantity: 2 },
      { name: 'Jeans', icon: 'Pants', essential: true, defaultQuantity: 1 },
      { name: 'Chinos', icon: 'Pants', tags: ['casual', 'business_casual'] },
      { name: 'Khakis', icon: 'Pants', tags: ['casual', 'business_casual'] },
      { name: 'Dress Pants', icon: 'Pants', tags: ['business', 'formal'] },
      { name: 'Shorts', icon: 'Pants', tags: ['summer', 'casual'] },
      { name: 'Skirts', icon: 'PersonSimple', tags: ['casual', 'formal', 'women'] },
      { name: 'Capri Pants', icon: 'Pants', tags: ['casual', 'women'] },
      { name: 'Leggings', icon: 'Pants', tags: ['casual', 'active', 'women', 'comfort'] },
      { name: 'Workout Leggings', icon: 'Pants', tags: ['active', 'sports', 'gym', 'women'] },
      { name: 'Workout Shorts', icon: 'Pants', tags: ['active', 'sports', 'gym'] },
      { name: 'Sweatpants', icon: 'Pants', tags: ['casual', 'comfort', 'active', 'travel'] },
      { name: 'Joggers', icon: 'Pants', tags: ['casual', 'comfort', 'active', 'travel'] },
      { name: 'Cargo Pants', icon: 'Pants', tags: ['outdoor', 'utility'] },
      // Dresses & Jumpsuits
      { name: 'Casual Dresses', icon: 'PersonSimple', tags: ['women', 'summer', 'daily'] },
      { name: 'Sundresses', icon: 'Sun', tags: ['beach', 'casual', 'women'] },
      { name: 'Maxi Dresses', icon: 'PersonSimple', tags: ['beach', 'casual', 'women', 'evening'] },
      { name: 'Business Dresses', icon: 'Briefcase', tags: ['business', 'women', 'formal'] },
      { name: 'Formal Dresses', icon: 'PersonSimple', tags: ['event', 'women', 'wedding'] },
      { name: 'Gowns', icon: 'PersonSimple', tags: ['event', 'women', 'black_tie'] },
      { name: 'Rompers', icon: 'PersonSimple', tags: ['women', 'casual', 'summer'] },
      { name: 'Jumpsuits', icon: 'PersonSimple', tags: ['women', 'casual', 'formal'] },
      // Outerwear
      { name: 'Light Jacket', icon: 'CoatHanger', tags: ['spring', 'fall', 'layering'] },
      { name: 'Denim Jacket', icon: 'CoatHanger', tags: ['casual'] },
      { name: 'Leather Jacket', icon: 'CoatHanger', tags: ['casual', 'fashion'] },
      { name: 'Windbreaker', icon: 'Wind', tags: ['outdoor', 'sports', 'lightweight'] },
      { name: 'Heavy Jacket', icon: 'CoatHanger', tags: ['winter', 'cold'] },
      { name: 'Winter Coat', icon: 'CoatHanger', tags: ['winter', 'cold'] },
      { name: 'Rain Jacket', icon: 'CloudRain', essential: true, tags: ['rain', 'outdoor'] },
      { name: 'Waterproof Trousers', icon: 'Pants', tags: ['outdoor', 'rain', 'hiking'] },
      { name: 'Rain Poncho', icon: 'UmbrellaSimple', tags: ['outdoor', 'rain', 'festival'] },
      {
        name: 'Packable Down Jacket',
        icon: 'Package',
        tags: ['travel', 'lightweight', 'warmth', 'winter'],
      },
      { name: 'Insulated Jacket', icon: 'ThermometerHot', tags: ['outdoor', 'winter', 'cold'] },
      { name: 'Trench Coat', icon: 'CoatHanger', tags: ['fashion', 'rain_light', 'business'] },
      { name: 'Overcoat', icon: 'CoatHanger', tags: ['formal', 'winter', 'business'] },
      // Undergarments & Sleepwear
      { name: 'Underwear', icon: 'TShirt', essential: true, defaultQuantity: 7 },
      { name: 'Bras', icon: 'TShirt', tags: ['women'], defaultQuantity: 3 },
      {
        name: 'Sports Bras',
        icon: 'Barbell',
        defaultQuantity: 2,
        tags: ['active', 'women', 'sports'],
      },
      { name: 'Socks', icon: 'Sock', essential: true, defaultQuantity: 7 },
      {
        name: 'Compression Socks',
        icon: 'ArrowsVertical',
        tags: ['long_flights', 'health', 'travel', 'comfort'],
      },
      { name: 'Tights', icon: 'PersonSimple', tags: ['business', 'formal', 'women', 'cold'] },
      { name: 'Stockings', icon: 'PersonSimple', tags: ['business', 'formal', 'women', 'cold'] },
      {
        name: 'Thermal Underwear',
        icon: 'ThermometerSimple',
        tags: ['ski', 'snow', 'winter', 'cold', 'outdoor'],
      },
      {
        name: 'Base Layers',
        icon: 'ThermometerSimple',
        tags: ['ski', 'snow', 'winter', 'cold', 'outdoor', 'active'],
      },
      { name: 'Pajamas', icon: 'Bed', defaultQuantity: 2 },
      { name: 'Sleepwear Set', icon: 'Bed', defaultQuantity: 1 },
      { name: 'Robe', icon: 'Bathtub', tags: ['comfort', 'home', 'hotel'] },
      { name: 'Dressing Gown', icon: 'Bathtub', tags: ['comfort', 'home', 'hotel'] },
      { name: 'Loungewear Set', icon: 'Couch', tags: ['comfort', 'home', 'travel'] },
      { name: 'Slips (Undergarment)', icon: 'PersonSimple', tags: ['women', 'formal', 'layering'] },
      // Swimwear
      {
        name: 'Swimsuit',
        icon: 'SwimmingPool',
        essential: true,
        tags: ['beach', 'pool', 'water_sports'],
      },
      { name: 'Bikini', icon: 'SwimmingPool', tags: ['beach', 'pool', 'women'] },
      { name: 'Tankini', icon: 'SwimmingPool', tags: ['beach', 'pool', 'women'] },
      { name: 'One-Piece Swimsuit', icon: 'SwimmingPool', tags: ['beach', 'pool', 'women'] },
      { name: 'Swim Trunks', icon: 'SwimmingPool', tags: ['beach', 'pool', 'men'] },
      {
        name: 'Board Shorts',
        icon: 'SwimmingPool',
        tags: ['beach', 'water_sports', 'men', 'unisex'],
      },
      {
        name: 'Rash Guard',
        icon: 'TShirt',
        tags: ['beach', 'water_sports', 'sun_protection', 'unisex'],
      },
      { name: 'Swim Cover-Up', icon: 'PersonSimple', tags: ['beach', 'pool', 'women', 'unisex'] },
      { name: 'Sarong', icon: 'Package', tags: ['beach', 'pool', 'multi_purpose', 'unisex'] },
      { name: 'Swim Cap', icon: 'SwimmingPool', tags: ['pool', 'swimming'] },
      // Activewear & Sportswear
      {
        name: 'Workout Tops',
        icon: 'TShirt',
        defaultQuantity: 2,
        tags: ['active', 'sports', 'gym'],
      },
      // Workout Shorts/Leggings already listed under Bottoms
      {
        name: 'Yoga Pants',
        icon: 'PersonSimpleTaiChi',
        tags: ['wellness', 'retreat', 'yoga', 'comfort'],
      },
      { name: 'Sports Skirt', icon: 'TennisBall', tags: ['active', 'women', 'tennis', 'golf'] },
      { name: 'Skort', icon: 'TennisBall', tags: ['active', 'women', 'tennis', 'golf'] },
      { name: 'Cycling Shorts', icon: 'Bicycle', tags: ['cycling', 'sports'] },
      { name: 'Cycling Jersey', icon: 'Bicycle', tags: ['cycling', 'sports'] },
      {
        name: 'Quick-Dry Hiking Shirt',
        icon: 'PersonSimpleHike',
        tags: ['outdoor', 'hiking', 'active'],
      },
      { name: 'Hiking Shorts', icon: 'PersonSimpleHike', tags: ['outdoor', 'hiking'] },
      { name: 'Hiking Pants', icon: 'PersonSimpleHike', tags: ['outdoor', 'hiking'] },
      {
        name: 'Climbing Pants',
        icon: 'PersonSimpleHike',
        tags: ['adventure', 'climbing', 'outdoor'],
      },
      { name: 'Fishing Vest', icon: 'FishSimple', tags: ['outdoor', 'fishing', 'utility'] },
      { name: 'Wetsuit', icon: 'Waves', tags: ['diving', 'surfing', 'water_sports'] },
      { name: 'Golf Attire', icon: 'Golf', tags: ['sports', 'golf'] },
      { name: 'Tennis Attire', icon: 'TennisBall', tags: ['sports', 'tennis'] },
      { name: 'Sports Hijab', icon: 'PersonSimple', tags: ['active', 'women', 'modest', 'sports'] },
      // Formal & Business Wear
      { name: 'Suit Jacket', icon: 'UserTie', tags: ['business', 'formal', 'event'] },
      { name: 'Blazer', icon: 'UserTie', tags: ['business', 'formal_casual', 'event'] },
      { name: 'Suit Trousers', icon: 'UserTie', tags: ['business', 'formal', 'event'] },
      { name: 'Business Skirt', icon: 'UserTie', tags: ['business', 'formal', 'event', 'women'] },
      { name: 'Full Suit', icon: 'UserTie', tags: ['business', 'formal', 'event'] },
      { name: 'Tuxedo', icon: 'UserTie', tags: ['formal', 'event', 'wedding', 'black_tie'] },
      // Formal Dresses/Gowns already listed
      { name: 'Tie', icon: 'UserTie', tags: ['formal', 'business', 'men'] },
      { name: 'Bowtie', icon: 'UserTie', tags: ['formal', 'business', 'men', 'event'] },
      { name: 'Cufflinks', icon: 'Diamond', tags: ['business', 'men', 'formal_accessory'] },
      { name: 'Pocket Square', icon: 'Diamond', tags: ['business', 'men', 'formal_accessory'] },
      // Clothing Accessories
      { name: 'Belt', icon: 'Belt' },
      { name: 'Fashion Hat', icon: 'BaseballCap', tags: ['casual', 'accessory'] },
      { name: 'Baseball Cap', icon: 'BaseballCap', tags: ['casual', 'accessory', 'sports'] },
      { name: 'Wide-Brim Sun Hat', icon: 'Sun', tags: ['beach', 'sun_protection', 'accessory'] },
      { name: 'Beanie', icon: 'Beanie', tags: ['winter', 'cold', 'accessory'] },
      { name: 'Winter Hat', icon: 'Beanie', tags: ['winter', 'cold', 'accessory'] },
      { name: 'Fashion Scarf', icon: 'Stool', tags: ['accessory', 'fashion'] }, // Stool as placeholder
      { name: 'Warm Scarf', icon: 'Stool', tags: ['winter', 'cold', 'accessory'] }, // Stool as placeholder
      { name: 'Gloves', icon: 'HandGrabbing', tags: ['winter', 'cold', 'accessory', 'ski'] },
      { name: 'Mittens', icon: 'HandGrabbing', tags: ['winter', 'cold', 'accessory', 'ski'] },
      {
        name: 'Shawl',
        icon: 'Package',
        tags: ['formal', 'cultural', 'accessory', 'layering', 'women'],
      },
      {
        name: 'Pashmina',
        icon: 'Package',
        tags: ['formal', 'cultural', 'accessory', 'layering', 'women'],
      },
      { name: 'Bandana', icon: 'Package', tags: ['accessory', 'multi_purpose', 'fashion'] },
      {
        name: 'Headscarf',
        icon: 'Package',
        tags: ['accessory', 'fashion', 'cultural', 'religious'],
      },
      { name: 'Earmuffs', icon: 'Ear', tags: ['ski', 'snow', 'cold', 'accessory'] },
      { name: 'Ear Warmers', icon: 'Ear', tags: ['ski', 'snow', 'cold', 'accessory'] },
      {
        name: 'Neck Gaiter',
        icon: 'MaskHappy',
        tags: ['ski', 'snow', 'cold', 'outdoor', 'accessory'],
      },
      {
        name: 'Balaclava',
        icon: 'MaskHappy',
        tags: ['ski', 'snow', 'cold', 'outdoor', 'accessory'],
      },
      // Cultural & Specific Occasions
      { name: 'Abaya', icon: 'PersonSimple', tags: ['cultural', 'women', 'modest'] },
      { name: 'Kaftan', icon: 'PersonSimple', tags: ['beach', 'cultural', 'women', 'loungewear'] },
      { name: 'Cultural Sarong', icon: 'Package', tags: ['beach', 'cultural', 'men', 'unisex'] },
      { name: 'Lungi', icon: 'Package', tags: ['cultural', 'men', 'unisex'] },
      { name: 'Kimono', icon: 'Package', tags: ['loungewear', 'cultural', 'fashion'] },
      { name: 'Sari', icon: 'PersonSimple', tags: ['cultural', 'formal', 'event', 'women'] },
      { name: 'Kurta', icon: 'UserTie', tags: ['cultural', 'formal_casual', 'event'] },
      { name: 'Sherwani', icon: 'UserTie', tags: ['cultural', 'formal', 'event', 'wedding'] },
      { name: 'Festival Outfit', icon: 'Ghost', tags: ['festival', 'event', 'party'] },
      { name: 'Costume', icon: 'Ghost', tags: ['event', 'party', 'halloween'] },
      { name: 'Work Uniform', icon: 'HardHat', tags: ['work', 'professional'] },
      { name: 'Academic Gown', icon: 'GraduationCap', tags: ['event', 'education', 'ceremony'] },
      { name: 'Academic Regalia', icon: 'GraduationCap', tags: ['event', 'education', 'ceremony'] },
      // Ski & Snow Clothing
      { name: 'Ski Jacket', icon: 'CoatHanger', tags: ['ski', 'snow', 'winter', 'outerwear'] },
      { name: 'Ski Pants', icon: 'Pants', tags: ['ski', 'snow', 'winter', 'outerwear'] },
      { name: 'Ski Socks', icon: 'Sock', tags: ['ski', 'snow', 'winter', 'warmth'] },
      { name: 'Snow Goggles', icon: 'Goggles', tags: ['ski', 'snow', 'winter', 'eye_protection'] },
      // Maternity Clothing
      { name: 'Nursing Bra', icon: 'Baby', tags: ['maternity', 'women', 'baby_care'] },
      { name: 'Maternity Tops', icon: 'TShirt', tags: ['pregnant', 'women', 'comfort'] },
      { name: 'Maternity Bottoms', icon: 'Pants', tags: ['pregnant', 'women', 'comfort'] },
      { name: 'Maternity Dresses', icon: 'PersonSimple', tags: ['pregnant', 'women', 'comfort'] },
      { name: 'Belly Band', icon: 'Circle', tags: ['maternity', 'support', 'pregnant'] },
      {
        name: 'Maternity Swimsuit',
        icon: 'SwimmingPool',
        tags: ['maternity', 'women', 'beach', 'pool'],
      },
      {
        name: 'UPF Sun Protective Clothing',
        icon: 'Sun',
        tags: ['outdoor', 'sun_protection', 'health', 'beach'],
      },
    ],
  },
  {
    category: 'Footwear',
    defaultIcon: 'Sneaker',
    items: [
      { name: 'Sneakers', icon: 'Sneaker', essential: true, defaultQuantity: 1 },
      { name: 'Walking Shoes', icon: 'Sneaker', essential: true, defaultQuantity: 1 },
      { name: 'Running Shoes', icon: 'PersonSimpleRun', tags: ['sports', 'active', 'exercise'] },
      {
        name: 'Trail Running Shoes',
        icon: 'PersonSimpleHike',
        tags: ['sports', 'outdoor', 'hiking', 'trail'],
      },
      { name: 'Hiking Boots', icon: 'Boot', tags: ['outdoor', 'hiking', 'adventure'] },
      { name: 'Sandals', icon: 'SneakerMove', tags: ['casual', 'warm_weather', 'beach'] },
      { name: 'Flip-Flops', icon: 'SneakerMove', tags: ['beach', 'pool', 'casual', 'shower'] },
      { name: 'Water Shoes', icon: 'Waves', tags: ['beach', 'water_sports', 'outdoor', 'pool'] },
      { name: 'Aqua Socks', icon: 'Waves', tags: ['beach', 'water_sports', 'pool'] },
      { name: 'Dress Shoes', icon: 'UserTie', tags: ['formal', 'business', 'event'] },
      { name: 'Oxfords', icon: 'UserTie', tags: ['formal', 'business', 'men'] },
      { name: 'Loafers', icon: 'UserTie', tags: ['formal_casual', 'business_casual', 'men'] },
      { name: 'Heels', icon: 'HighHeel', tags: ['formal', 'women', 'event', 'business'] },
      {
        name: 'Ballet Flats',
        icon: 'SneakerMove',
        tags: ['casual', 'formal_casual', 'women', 'comfort'],
      },
      { name: 'Fashion Boots', icon: 'Boot', tags: ['casual', 'fall', 'fashion'] },
      { name: 'Winter Boots', icon: 'Boot', tags: ['casual', 'winter', 'cold'] },
      { name: 'Snow Boots', icon: 'Snowflake', tags: ['ski', 'snow', 'winter', 'cold', 'outdoor'] },
      { name: 'Wading Boots', icon: 'FishSimple', tags: ['fishing', 'outdoor', 'water'] },
      { name: 'Equestrian Riding Boots', icon: 'Horse', tags: ['equestrian', 'sports'] },
      {
        name: 'Climbing Shoes',
        icon: 'PersonSimpleHike',
        tags: ['sports', 'adventure', 'climbing', 'outdoor'],
      },
      { name: 'Cycling Shoes', icon: 'Bicycle', tags: ['sports', 'cycling'] },
      { name: 'Golf Shoes', icon: 'Golf', tags: ['sports', 'golf'] },
      { name: 'Dance Shoes', icon: 'MusicNotesSimple', tags: ['sports', 'dance', 'activity'] },
      { name: 'Safety Boots', icon: 'HardHat', tags: ['work', 'safety', 'industrial'] },
      { name: 'Steel-Toe Boots', icon: 'HardHat', tags: ['work', 'safety', 'industrial'] },
      {
        name: 'Sports Cleats',
        icon: 'SoccerBall',
        tags: ['sports', 'soccer', 'football', 'baseball'],
      },
      { name: 'Slippers', icon: 'HouseSimple', tags: ['comfort', 'home', 'hotel'] },
      { name: 'House Shoes', icon: 'HouseSimple', tags: ['comfort', 'home', 'hotel'] },
      { name: 'Espadrilles', icon: 'SneakerMove', tags: ['summer', 'casual', 'vacation'] },
      { name: 'Clogs', icon: 'SneakerMove', tags: ['wellness', 'spa', 'casual', 'work'] },
      { name: 'Galoshes', icon: 'CloudRain', tags: ['rain', 'protection', 'footwear_accessory'] },
      { name: 'Overshoes', icon: 'CloudRain', tags: ['rain', 'protection', 'footwear_accessory'] },
      { name: 'Shoe Insoles', icon: 'Sneaker', tags: ['comfort', 'health', 'footwear_accessory'] },
      { name: 'Orthotics', icon: 'Sneaker', tags: ['health', 'footwear_accessory', 'medical'] },
      {
        name: 'Spare Shoe Laces',
        icon: 'Minus',
        tags: ['accessory', 'footwear_accessory', 'backup'],
      },
      {
        name: 'Shoe Bags',
        icon: 'BagSimple',
        defaultQuantity: 2,
        tags: ['travel_accessory', 'organization'],
      },
      { name: 'Shoe Horn', icon: 'Toolbox', tags: ['accessory', 'footwear_helper'] },
      { name: 'Shoe Polish', icon: 'PaintBrushHousehold', tags: ['maintenance', 'footwear_care'] },
      {
        name: 'Shoe Cleaning Kit',
        icon: 'PaintBrushHousehold',
        tags: ['maintenance', 'footwear_care'],
      },
    ],
  },
  {
    category: 'Toiletries',
    defaultIcon: 'DropSimple',
    items: [
      // Personal Care & Hygiene
      { name: 'Toothbrush', icon: 'Tooth', essential: true },
      { name: 'Toothpaste', icon: 'DropSimple', essential: true },
      { name: 'Toothbrush Cover', icon: 'ArchiveBox', tags: ['hygiene', 'travel'] },
      { name: 'Toothbrush Travel Case', icon: 'ArchiveBox', tags: ['hygiene', 'travel'] },
      { name: 'Dental Floss', icon: 'Minus', essential: true, tags: ['hygiene', 'dental'] },
      { name: 'Dental Picks', icon: 'Minus', tags: ['hygiene', 'dental'] },
      { name: 'Tongue Scraper', icon: 'Minus', tags: ['hygiene', 'dental'] },
      { name: 'Mouthwash', icon: 'DropSimple', tags: ['hygiene', 'dental', 'travel_size'] },
      { name: 'Deodorant', icon: 'Sparkle', essential: true },
      { name: 'Deodorant Wipes', icon: 'Sparkle', tags: ['hygiene', 'travel', 'refresh'] },
      { name: 'Bar Soap', icon: 'HandSoap', essential: true, tags: ['hygiene'] },
      {
        name: 'Body Wash (Liquid/Gel)',
        icon: 'HandSoap',
        essential: true,
        tags: ['hygiene', 'travel_size'],
      },
      {
        name: 'Solid Body Wash',
        icon: 'HandSoap',
        tags: ['hygiene', 'travel_friendly', 'eco_friendly'],
      },
      {
        name: 'Travel Soap Container',
        icon: 'ArchiveBox',
        tags: ['hygiene', 'travel', 'accessory'],
      },
      {
        name: 'Soap Sheets',
        icon: 'FileText',
        tags: ['hygiene', 'travel_friendly', 'lightweight'],
      },
      { name: 'Face Wash', icon: 'DropSimple', tags: ['skincare', 'hygiene'] },
      { name: 'Facial Cleanser', icon: 'DropSimple', tags: ['skincare', 'hygiene'] },
      { name: 'Cotton Swabs (Q-tips)', icon: 'DotsThree', tags: ['hygiene', 'beauty_tool'] },
      { name: 'Cotton Pads', icon: 'Circle', tags: ['hygiene', 'skincare', 'makeup_tool'] },
      {
        name: 'Feminine Hygiene Products',
        icon: 'DropSimple',
        tags: ['women', 'essential', 'hygiene'],
        essential: true,
      },
      // Skincare
      { name: 'Face Moisturizer', icon: 'DropSimple', essential: true, tags: ['skincare'] },
      { name: 'Body Lotion', icon: 'DropSimple', essential: true, tags: ['skincare'] },
      { name: 'Toner', icon: 'SprayBottle', tags: ['skincare', 'refresh'] },
      { name: 'Facial Mist', icon: 'SprayBottle', tags: ['skincare', 'refresh', 'hydration'] },
      { name: 'Face Serum', icon: 'DropSimple', tags: ['skincare', 'treatment'] },
      { name: 'Eye Cream', icon: 'Eye', tags: ['skincare', 'treatment'] },
      { name: 'Lip Balm', icon: 'DropSimple', essential: true, tags: ['skincare'] },
      { name: 'SPF Lip Balm', icon: 'Sun', essential: true, tags: ['skincare', 'sun_protection'] },
      { name: 'Hand Cream', icon: 'HandPalm', tags: ['skincare', 'hygiene'] },
      { name: 'Foot Cream', icon: 'DropSimple', tags: ['skincare', 'comfort', 'pedicure'] },
      { name: 'Foot Balm', icon: 'DropSimple', tags: ['skincare', 'comfort', 'pedicure'] },
      {
        name: 'Face Masks (Sheet/Cream)',
        icon: 'MaskHappy',
        tags: ['skincare', 'spa', 'wellness', 'treatment'],
      },
      { name: 'Body Scrub', icon: 'DropSimple', tags: ['skincare', 'spa', 'exfoliate'] },
      {
        name: 'Anti-Chafing Powder',
        icon: 'DropSimple',
        tags: ['health', 'comfort', 'hygiene', 'active'],
      },
      { name: 'Foot Powder', icon: 'DropSimple', tags: ['health', 'comfort', 'hygiene'] },
      // Hair Care
      { name: 'Shampoo', icon: 'DropSimple', essential: true, tags: ['hair_care', 'travel_size'] },
      {
        name: 'Solid Shampoo Bar',
        icon: 'DropSimple',
        tags: ['hair_care', 'travel_friendly', 'eco_friendly'],
      },
      {
        name: 'Conditioner',
        icon: 'DropSimple',
        essential: true,
        tags: ['hair_care', 'travel_size'],
      },
      {
        name: 'Solid Conditioner Bar',
        icon: 'DropSimple',
        tags: ['hair_care', 'travel_friendly', 'eco_friendly'],
      },
      { name: 'Leave-In Conditioner', icon: 'SprayBottle', tags: ['hair_care'] },
      { name: 'Detangler Spray', icon: 'SprayBottle', tags: ['hair_care'] },
      { name: 'Dry Shampoo', icon: 'Wind', tags: ['hair_care', 'travel_hack'] },
      { name: 'Hairbrush', icon: 'Toolbox', tags: ['hair_care', 'grooming'] },
      { name: 'Comb', icon: 'Toolbox', tags: ['hair_care', 'grooming'] },
      { name: 'Hair Ties', icon: 'Paperclip', tags: ['hair_care', 'accessory'] },
      { name: 'Hair Clips', icon: 'Paperclip', tags: ['hair_care', 'accessory'] },
      { name: 'Hair Pins', icon: 'Paperclip', tags: ['hair_care', 'accessory'] },
      { name: 'Hair Gel', icon: 'SprayBottle', tags: ['hair_care', 'styling'] },
      { name: 'Hair Spray', icon: 'SprayBottle', tags: ['hair_care', 'styling'] },
      { name: 'Hair Mousse', icon: 'SprayBottle', tags: ['hair_care', 'styling'] },
      { name: 'Hair Wax', icon: 'DropSimple', tags: ['hair_care', 'styling'] }, // Using DropSimple as placeholder
      { name: 'Hair Serum', icon: 'DropSimple', tags: ['hair_care', 'styling', 'treatment'] },
      { name: 'Hair Oil', icon: 'DropSimple', tags: ['hair_care', 'styling', 'treatment'] },
      {
        name: 'Heat Protectant Spray',
        icon: 'FireSimple',
        tags: ['hair_care', 'styling_tool_accessory'],
      },
      { name: 'Travel Hair Dryer', icon: 'HairDryer', tags: ['styling_tool', 'travel_size'] },
      {
        name: 'Travel Hair Straightener',
        icon: 'Toolbox',
        tags: ['hair_care', 'styling_tool', 'travel_size'],
      },
      {
        name: 'Travel Hair Curler',
        icon: 'Toolbox',
        tags: ['hair_care', 'styling_tool', 'travel_size'],
      },
      // Shaving & Grooming
      { name: 'Razor', icon: 'Toolbox', tags: ['grooming'] },
      { name: 'Shaving Cream', icon: 'DropSimple', tags: ['grooming'] },
      { name: 'Shaving Gel', icon: 'DropSimple', tags: ['grooming'] },
      { name: 'Aftershave', icon: 'DropSimple', tags: ['skincare', 'grooming'] },
      { name: 'Aftershave Balm', icon: 'DropSimple', tags: ['skincare', 'grooming'] },
      { name: 'Beard Oil', icon: 'User', tags: ['men', 'grooming', 'beard_care'] },
      { name: 'Beard Balm', icon: 'User', tags: ['men', 'grooming', 'beard_care'] },
      { name: 'Beard Comb', icon: 'Toolbox', tags: ['men', 'grooming', 'beard_care'] },
      { name: 'Beard Brush', icon: 'Toolbox', tags: ['men', 'grooming', 'beard_care'] },
      { name: 'Electric Shaver', icon: 'Plugs', tags: ['grooming', 'electric_tool'] },
      { name: 'Electric Shaver Charger', icon: 'Plugs', tags: ['grooming', 'electric_tool'] },
      // Makeup & Beauty
      { name: 'Foundation', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_base'] },
      { name: 'Concealer', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_base'] },
      {
        name: 'Eyeshadow Palette',
        icon: 'PaintBrushBroad',
        tags: ['women', 'beauty', 'makeup_color'],
      },
      { name: 'Mascara', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Eyeliner', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Lipstick', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Lip Gloss', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Blush', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Bronzer', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Highlighter', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'makeup_color'] },
      { name: 'Makeup Primer', icon: 'PaintBrushBroad', tags: ['makeup', 'women', 'beauty_prep'] },
      {
        name: 'Makeup Remover (Liquid/Oil)',
        icon: 'Eraser',
        tags: ['makeup', 'skincare', 'hygiene'],
      },
      {
        name: 'Makeup Wipes',
        icon: 'Eraser',
        tags: ['makeup', 'skincare', 'hygiene', 'travel_friendly'],
      },
      {
        name: 'Makeup Setting Spray',
        icon: 'SprayBottle',
        tags: ['makeup', 'women', 'beauty_finish'],
      },
      { name: 'Makeup Brushes', icon: 'PaintBrushBroad', tags: ['makeup', 'beauty_tool'] },
      { name: 'Makeup Sponges', icon: 'PaintBrushBroad', tags: ['makeup', 'beauty_tool'] }, // Using PaintBrushBroad as placeholder
      { name: 'Blotting Papers', icon: 'FileText', tags: ['makeup', 'oil_control', 'beauty_tool'] },
      {
        name: 'Hair Removal Cream',
        icon: 'DropSimple',
        tags: ['women', 'grooming', 'beauty_treatment'],
      },
      { name: 'Wax Strips', icon: 'DropSimple', tags: ['women', 'grooming', 'beauty_treatment'] }, // Using DropSimple as placeholder
      { name: 'Nail Polish', icon: 'PaintBrushBroad', tags: ['women', 'beauty', 'manicure'] },
      { name: 'Nail Polish Remover', icon: 'Eraser', tags: ['women', 'beauty', 'manicure'] },
      { name: 'Perfume', icon: 'DropSimple', tags: ['beauty', 'fragrance', 'travel_size'] },
      { name: 'Cologne', icon: 'DropSimple', tags: ['beauty', 'fragrance', 'travel_size'] },
      {
        name: 'Solid Perfume',
        icon: 'DropSimple',
        tags: ['beauty', 'fragrance', 'travel_friendly'],
      },
      { name: 'Body Glitter', icon: 'Sparkle', tags: ['festival', 'party', 'beauty_enhancement'] },
      { name: 'Face Gems', icon: 'Sparkle', tags: ['festival', 'party', 'beauty_enhancement'] },
      { name: 'Compact Mirror', icon: 'Circle', tags: ['beauty_tool', 'travel_accessory'] },
      // Manicure & Pedicure
      { name: 'Nail Clippers', icon: 'Scissors', tags: ['grooming', 'manicure', 'pedicure'] },
      { name: 'Nail File', icon: 'Toolbox', tags: ['grooming', 'manicure', 'pedicure'] }, // Toolbox as placeholder
      { name: 'Tweezers', icon: 'Toolbox', tags: ['grooming', 'beauty_tool', 'first_aid'] },
      { name: 'Cuticle Oil', icon: 'DropSimple', tags: ['nails', 'manicure', 'skincare'] },
      { name: 'Cuticle Cream', icon: 'DropSimple', tags: ['nails', 'manicure', 'skincare'] },
      // Sun & Bug Protection
      {
        name: 'Face Sunscreen',
        icon: 'Sun',
        essential: true,
        tags: ['sun_protection', 'skincare'],
      },
      {
        name: 'Body Sunscreen',
        icon: 'Sun',
        essential: true,
        tags: ['sun_protection', 'skincare'],
      },
      {
        name: 'Sunscreen Stick',
        icon: 'Sun',
        tags: ['sun_protection', 'easy_apply', 'travel_friendly'],
      },
      { name: 'Aloe Vera Gel', icon: 'DropSimple', tags: ['sun_care', 'skincare', 'soothing'] },
      { name: 'After-Sun Lotion', icon: 'DropSimple', tags: ['sun_care', 'skincare', 'soothing'] },
      {
        name: 'Insect Repellent Spray',
        icon: 'BugBeetle',
        essential: true,
        tags: ['health', 'outdoor', 'tropical'],
      },
      {
        name: 'Insect Repellent Lotion',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
      },
      {
        name: 'Insect Repellent Wipes',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical', 'travel_friendly'],
      },
      {
        name: 'Mosquito Repellent Bracelet',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
      },
      {
        name: 'Mosquito Repellent Patches',
        icon: 'BugBeetle',
        tags: ['health', 'outdoor', 'tropical'],
      },
      // Other Toiletries
      {
        name: 'Travel Towel (Quick-Dry)',
        icon: 'Towel',
        tags: ['hygiene', 'travel_accessory', 'sports', 'beach'],
      },
      { name: 'Contact Lenses', icon: 'Eye', tags: ['vision', 'health'], essential: true },
      {
        name: 'Contact Lens Solution',
        icon: 'DropSimple',
        tags: ['vision', 'health'],
        essential: true,
      },
      {
        name: 'Contact Lens Case',
        icon: 'Eye',
        tags: ['vision', 'health', 'hygiene'],
        essential: true,
      },
      {
        name: 'Prescription Glasses',
        icon: 'Eyeglasses',
        tags: ['vision', 'health'],
        essential: true,
      },
      { name: 'Glasses Case', icon: 'Eyeglasses', tags: ['vision', 'accessory'] },
      {
        name: 'Lens Cleaning Cloth',
        icon: 'Eyeglasses',
        tags: ['vision', 'accessory', 'electronics_care'],
      },
      { name: 'Bath Salts', icon: 'Bathtub', tags: ['relaxation', 'spa', 'bath'] },
      { name: 'Bath Bombs', icon: 'Bathtub', tags: ['relaxation', 'spa', 'bath'] },
      {
        name: 'Essential Oil Roll-On',
        icon: 'DropSimple',
        tags: ['wellness', 'relaxation', 'aromatherapy'],
      },
      { name: 'Portable Bidet', icon: 'DropSimple', tags: ['hygiene', 'travel_accessory'] },
    ],
  },
  {
    category: 'Electronics',
    defaultIcon: 'DeviceMobile',
    items: [
      { name: 'Phone', icon: 'DeviceMobile', essential: true },
      { name: 'Phone Charger', icon: 'Plugs', essential: true },
      { name: 'Car Phone Charger', icon: 'CarSimple', tags: ['roadtrip', 'tech_accessory'] },
      { name: 'Wireless Charger Pad', icon: 'Plugs', tags: ['phone_accessory', 'tech'] },
      { name: 'Laptop', icon: 'Laptop', tags: ['work', 'entertainment'] },
      { name: 'Laptop Charger', icon: 'Plugs', tags: ['work', 'tech_accessory'] },
      { name: 'Tablet', icon: 'DeviceTablet', tags: ['entertainment', 'reading'] },
      { name: 'Tablet Charger', icon: 'Plugs', tags: ['tech_accessory'] },
      { name: 'Headphones', icon: 'Headphones', essential: true },
      { name: 'Earbuds', icon: 'Headphones', essential: true }, // Often interchangeable with headphones
      {
        name: 'Noise-Cancelling Headphones',
        icon: 'Headphones',
        tags: ['travel', 'comfort', 'audio'],
      },
      {
        name: 'Headphone Splitter',
        icon: 'ArrowsSplit',
        tags: ['audio', 'sharing', 'travel_accessory'],
      },
      { name: 'Power Bank', icon: 'BatteryCharging', essential: true, tags: ['portable_charger'] },
      { name: 'Solar Power Bank', icon: 'Sun', tags: ['outdoor', 'emergency', 'tech'] },
      {
        name: 'Universal Travel Adapter',
        icon: 'Plug',
        essential: true,
        tags: ['international_travel'],
      },
      {
        name: 'Voltage Converter',
        icon: 'Lightning',
        tags: ['international_travel', 'electronics_safety'],
      },
      {
        name: 'Multi-Port USB Wall Charger',
        icon: 'Plugs',
        tags: ['charging_station', 'tech_accessory'],
      },
      { name: 'Camera', icon: 'Camera', tags: ['photography', 'travel'] },
      { name: 'Camera Lenses', icon: 'Camera', tags: ['photography_accessory'] },
      { name: 'Camera Charger', icon: 'Plugs', tags: ['photography_accessory'] },
      { name: 'Camera Batteries (Spare)', icon: 'BatteryFull', tags: ['photography_accessory'] },
      { name: 'Memory Cards', icon: 'FloppyDisk', tags: ['photography_accessory', 'storage'] },
      { name: 'Memory Card Reader', icon: 'FloppyDiskBack', tags: ['tech_accessory', 'storage'] },
      {
        name: 'Action Camera (GoPro)',
        icon: 'VideoCamera',
        tags: ['photography', 'video', 'adventure'],
      },
      { name: 'Action Camera Mounts', icon: 'Toolbox', tags: ['action_camera_accessory'] },
      { name: 'Action Camera Batteries', icon: 'BatteryFull', tags: ['action_camera_accessory'] },
      { name: 'Drone', icon: 'Drone', tags: ['photography', 'video', 'hobby'] },
      { name: 'Drone Controller', icon: 'GameController', tags: ['drone_accessory'] },
      { name: 'Drone Batteries', icon: 'BatteryFull', tags: ['drone_accessory'] },
      { name: 'Drone Charger', icon: 'Plugs', tags: ['drone_accessory'] },
      { name: 'Tripod', icon: 'CameraRotate', tags: ['photography_accessory', 'video_accessory'] },
      {
        name: 'Selfie Stick',
        icon: 'DeviceMobileCamera',
        tags: ['photography_accessory', 'phone_accessory'],
      },
      { name: 'Gimbal', icon: 'CameraRotate', tags: ['video_accessory', 'stabilizer'] },
      {
        name: 'External Microphone',
        icon: 'Microphone',
        tags: ['video', 'audio', 'content_creation'],
      },
      { name: 'E-Reader (Kindle)', icon: 'BookOpenText', tags: ['reading', 'entertainment'] },
      { name: 'E-Reader Charger', icon: 'Plugs', tags: ['tech_accessory'] },
      { name: 'Smartwatch', icon: 'Watch', tags: ['wearable_tech', 'fitness'] },
      { name: 'Fitness Tracker', icon: 'Watch', tags: ['wearable_tech', 'health'] },
      { name: 'Smartwatch/Fitness Tracker Charger', icon: 'Plugs', tags: ['tech_accessory'] },
      { name: 'USB-C Cable', icon: 'Usb', tags: ['charging_cable', 'data_transfer'] },
      {
        name: 'Lightning Cable',
        icon: 'Usb',
        tags: ['charging_cable', 'data_transfer', 'apple_device'],
      },
      { name: 'Micro USB Cable', icon: 'Usb', tags: ['charging_cable', 'data_transfer'] },
      { name: 'Portable WiFi Hotspot (MiFi)', icon: 'WifiHigh', tags: ['internet', 'travel_tech'] },
      {
        name: 'International SIM Card',
        icon: 'SimCard',
        tags: ['communication', 'international_travel'],
      },
      { name: 'Local SIM Card', icon: 'SimCard', tags: ['communication', 'travel_tech'] },
      { name: 'SIM Eject Tool', icon: 'Key', tags: ['phone_accessory', 'travel_tool'] },
      { name: 'Handheld GPS Device', icon: 'Gps', tags: ['navigation', 'outdoor', 'hiking'] },
      { name: 'Car GPS Navigator', icon: 'CarSimple', tags: ['navigation', 'roadtrip'] },
      { name: 'Portable Bluetooth Speaker', icon: 'SpeakerHigh', tags: ['audio', 'entertainment'] },
      { name: 'Travel Extension Cord', icon: 'Plugs', tags: ['power_access', 'tech_accessory'] },
      { name: 'Travel Power Strip', icon: 'Plugs', tags: ['power_access', 'tech_accessory'] },
      { name: 'USB Flash Drive', icon: 'FloppyDisk', tags: ['storage', 'data_transfer'] },
      { name: 'Portable SSD', icon: 'HardDrive', tags: ['storage', 'data_transfer', 'backup'] },
      { name: 'External Hard Drive', icon: 'HardDrives', tags: ['storage', 'backup'] },
      {
        name: 'Stylus Pen (for Tablet/Phone)',
        icon: 'PencilSimpleLine',
        tags: ['tech_accessory', 'productivity', 'creative_tool'],
      },
      {
        name: 'Portable Monitor',
        icon: 'Monitor',
        tags: ['work_travel', 'tech_accessory', 'productivity'],
      },
      {
        name: 'Digital Voice Recorder',
        icon: 'MicrophoneStage',
        tags: ['work', 'audio_recording', 'study'],
      },
      {
        name: 'Handheld Gaming Console',
        icon: 'GameController',
        tags: ['entertainment', 'gaming', 'travel'],
      },
      { name: 'Gaming Console Charger', icon: 'Plugs', tags: ['tech_accessory', 'gaming'] },
      { name: 'Digital Luggage Scale', icon: 'Scales', tags: ['travel_tool', 'luggage_check'] },
    ],
  },
  {
    category: 'Documents & Money',
    defaultIcon: 'IdentificationCard',
    items: [
      { name: 'Passport', icon: 'Passport', essential: true },
      {
        name: 'National ID Card',
        icon: 'IdentificationCard',
        essential: true,
        tags: ['identification'],
      },
      {
        name: 'Visas (if required)',
        icon: 'Ticket',
        essential: true,
        tags: ['international_travel', 'entry_permit'],
      },
      { name: 'Travel Tickets (Flight, Train, Bus)', icon: 'AirplaneTicket', essential: true }, // AirplaneTicket may not exist, using Ticket
      { name: 'Boarding Passes (Digital/Printed)', icon: 'Ticket', essential: true },
      {
        name: 'Travel Insurance Details',
        icon: 'ShieldCheck',
        essential: true,
        tags: ['emergency', 'health', 'safety'],
      },
      { name: 'Credit Cards', icon: 'CreditCard', essential: true, tags: ['payment', 'finance'] },
      { name: 'Debit Cards', icon: 'CreditCard', essential: true, tags: ['payment', 'finance'] },
      { name: 'Local Currency Cash', icon: 'Money', essential: true, tags: ['payment', 'finance'] },
      {
        name: 'Home Currency Cash (Small Amount)',
        icon: 'Money',
        tags: ['payment', 'emergency_fund'],
      },
      {
        name: 'Emergency Contact List',
        icon: 'AddressBook',
        essential: true,
        tags: ['safety', 'important_info'],
      },
      { name: 'Important Addresses List', icon: 'MapPin', tags: ['navigation', 'important_info'] },
      { name: 'Travel Itinerary', icon: 'CalendarDots', tags: ['planning', 'organization'] },
      {
        name: 'Booking Confirmations (Hotel, Tours)',
        icon: 'ClipboardText',
        tags: ['reservations', 'planning'],
      },
      {
        name: 'Copies of Passport',
        icon: 'Copy',
        essential: true,
        tags: ['backup', 'identification'],
      },
      { name: 'Copies of Visas', icon: 'Copy', essential: true, tags: ['backup', 'entry_permit'] },
      { name: 'Copies of Other Important Documents', icon: 'Copy', tags: ['backup', 'safety'] },
      {
        name: 'Extra Passport Photos',
        icon: 'UserCircle',
        tags: ['visa_application', 'identification'],
      },
      {
        name: 'Vaccination Certificate',
        icon: 'FirstAid',
        tags: ['health', 'travel_requirement', 'international_travel'],
      },
      {
        name: 'Health Records Summary',
        icon: 'Heartbeat',
        tags: ['health', 'medical_info', 'emergency'],
      },
      {
        name: 'International Driving Permit',
        icon: 'CarSimple',
        tags: ['driving_license', 'international_travel'],
      },
      {
        name: 'Home Driving License',
        icon: 'IdentificationCard',
        tags: ['driving_license', 'identification'],
      },
      { name: 'Student ID Card', icon: 'Student', tags: ['identification', 'discounts'] },
      {
        name: 'ISIC Card',
        icon: 'Student',
        tags: ['identification', 'discounts', 'international_student'],
      },
      { name: 'Senior Discount Card', icon: 'User', tags: ['identification', 'discounts'] },
      { name: 'Frequent Flyer Cards', icon: 'Airplane', tags: ['loyalty_program', 'travel_perks'] },
      { name: 'Hotel Loyalty Cards', icon: 'Bed', tags: ['loyalty_program', 'travel_perks'] },
      { name: 'Business Cards', icon: 'AddressBook', tags: ['work_travel', 'networking'] },
      { name: 'Membership Cards (Museums, etc.)', icon: 'Ticket', tags: ['leisure', 'discounts'] },
      { name: 'Gift Cards', icon: 'Gift', tags: ['payment', 'spending'] },
      { name: 'Vouchers', icon: 'Ticket', tags: ['payment', 'discounts', 'spending'] },
      {
        name: "Doctor's Letter (for Medications)",
        icon: 'Stethoscope',
        tags: ['health', 'prescription_meds', 'travel_requirement'],
      },
      {
        name: 'Printed Address List (Postcards)',
        icon: 'EnvelopeSimple',
        tags: ['communication', 'personal'],
      },
      {
        name: 'Language Phrasebook',
        icon: 'Translate',
        tags: ['communication', 'language_learning'],
      },
      {
        name: 'Pocket Dictionary',
        icon: 'BookOpenText',
        tags: ['communication', 'language_learning'],
      },
      {
        name: 'Rental Car Documents',
        icon: 'CarSimple',
        tags: ['roadtrip', 'transport', 'vehicle_rental'],
      },
      {
        name: 'Event Tickets (Concerts, Sports)',
        icon: 'Ticket',
        tags: ['entertainment', 'leisure'],
      },
      {
        name: 'Emergency Wallet Card',
        icon: 'Wallet',
        essential: true,
        tags: ['safety', 'medical_info', 'contacts'],
      },
      { name: 'Money Belt', icon: 'Wallet', tags: ['security', 'travel_accessory', 'finance'] },
      {
        name: 'Travel Wallet/Passport Holder',
        icon: 'Wallet',
        tags: ['organization', 'security', 'travel_accessory'],
      },
    ],
  },
  {
    category: 'Health & Safety',
    defaultIcon: 'FirstAidKit',
    items: [
      { name: 'Prescription Medications', icon: 'Pill', essential: true },
      {
        name: 'Copy of Prescriptions',
        icon: 'FileText',
        essential: true,
        tags: ['medical_info', 'legal_requirement'],
      },
      { name: 'Pain Relievers (Ibuprofen/Paracetamol)', icon: 'Pill', essential: true },
      { name: 'Fever Reducers', icon: 'ThermometerSimple', tags: ['medical', 'cold_flu'] },
      {
        name: 'Allergy Medication (Antihistamines)',
        icon: 'Pill',
        tags: ['health', 'allergy_relief'],
      },
      { name: 'Antacids', icon: 'Pill', tags: ['digestive_health', 'stomach_relief'] },
      {
        name: 'Indigestion Relief Tablets',
        icon: 'Pill',
        tags: ['digestive_health', 'stomach_relief'],
      },
      {
        name: 'Anti-Diarrheal Medication',
        icon: 'Pill',
        tags: ['digestive_health', 'travel_illness'],
      },
      { name: 'Laxative Medication', icon: 'Pill', tags: ['digestive_health'] },
      { name: 'Cold and Flu Medicine', icon: 'Pill', tags: ['illness_relief', 'cold_flu'] },
      { name: 'Throat Lozenges', icon: 'Pill', tags: ['sore_throat_relief', 'cold_flu'] },
      {
        name: 'Motion Sickness Pills',
        icon: 'Pill',
        essential: true,
        tags: ['travel_comfort', 'nausea_relief'],
      },
      {
        name: 'Motion Sickness Bands (Sea Bands)',
        icon: 'Watch',
        tags: ['travel_comfort', 'nausea_relief', 'alternative_remedy'],
      },
      {
        name: 'Small First Aid Kit',
        icon: 'FirstAidKit',
        essential: true,
        tags: ['emergency', 'medical_supplies'],
      },
      { name: 'Bandages (Various Sizes)', icon: 'Bandaids', tags: ['first_aid', 'wound_care'] },
      {
        name: 'Antiseptic Wipes',
        icon: 'DropSimple',
        tags: ['first_aid', 'hygiene', 'wound_care'],
      }, // Re-using DropSimple
      { name: 'Gauze Pads', icon: 'Bandaids', tags: ['first_aid', 'wound_care'] }, // Re-using Bandaids
      { name: 'Medical Tape', icon: 'Bandaids', tags: ['first_aid', 'wound_care'] }, // Re-using Bandaids
      {
        name: 'Antiseptic Cream',
        icon: 'DropSimple',
        tags: ['first_aid', 'wound_care', 'infection_prevention'],
      },
      {
        name: 'Antiseptic Spray',
        icon: 'SprayBottle',
        tags: ['first_aid', 'wound_care', 'infection_prevention'],
      },
      {
        name: 'Hydrocortisone Cream',
        icon: 'DropSimple',
        tags: ['first_aid', 'itch_relief', 'skin_irritation'],
      },
      {
        name: 'Itch Relief Cream',
        icon: 'DropSimple',
        tags: ['first_aid', 'bug_bites', 'skin_irritation'],
      },
      {
        name: 'Burn Relief Gel',
        icon: 'FireSimple',
        tags: ['first_aid', 'burn_care', 'sunburn_relief'],
      },
      {
        name: 'Burn Relief Spray',
        icon: 'FireSimple',
        tags: ['first_aid', 'burn_care', 'sunburn_relief'],
      },
      {
        name: 'Blister Plasters',
        icon: 'Bandaids',
        tags: ['first_aid', 'foot_care', 'hiking_comfort'],
      },
      {
        name: 'Moleskin',
        icon: 'Bandaids',
        tags: ['first_aid', 'foot_care', 'hiking_comfort', 'blister_prevention'],
      },
      { name: 'Lubricating Eye Drops', icon: 'Eye', tags: ['eye_care', 'dry_eyes', 'comfort'] },
      { name: 'Antihistamine Eye Drops', icon: 'Eye', tags: ['eye_care', 'allergy_relief'] },
      {
        name: 'Saline Nasal Spray',
        icon: 'SprayBottle',
        tags: ['health', 'sinus_relief', 'dry_air_comfort'],
      },
      {
        name: 'Decongestant Nasal Spray',
        icon: 'SprayBottle',
        tags: ['health', 'cold_relief', 'sinus_congestion'],
      },
      {
        name: 'Hand Sanitizer',
        icon: 'HandSoap',
        essential: true,
        tags: ['hygiene', 'health_protection'],
      },
      {
        name: 'Disinfectant Wipes',
        icon: 'HandSoap',
        tags: ['hygiene', 'surface_cleaning', 'health_protection'],
      },
      {
        name: 'Face Masks (N95/Surgical)',
        icon: 'MaskHappy',
        tags: ['health_protection', 'travel_safety', 'airborne_illness'],
      },
      // Insect Repellent listed in Toiletries
      // Sunscreen listed in Toiletries
      {
        name: 'Water Purification Tablets',
        icon: 'DropSimple',
        tags: ['outdoor', 'adventure', 'health_safety', 'drinking_water'],
      },
      {
        name: 'Water Filter Bottle',
        icon: 'DropSimple',
        tags: ['outdoor', 'adventure', 'health_safety', 'drinking_water'],
      },
      {
        name: 'Digital Thermometer',
        icon: 'ThermometerSimple',
        tags: ['health_monitoring', 'medical_tool'],
      },
      {
        name: 'Small Sterile Scissors (TSA-Compliant)',
        icon: 'Scissors',
        tags: ['first_aid_tool', 'utility'],
      },
      // Tweezers listed in Toiletries
      {
        name: 'Safety Pins',
        icon: 'PushPinSimple',
        tags: ['first_aid_tool', 'utility', 'clothing_repair'],
      }, // PushPinSimple as placeholder
      {
        name: 'Emergency Whistle',
        icon: 'SpeakerSimpleHigh',
        tags: ['safety_tool', 'outdoor', 'emergency_signal'],
      }, // SpeakerSimpleHigh as placeholder
      {
        name: 'Personal Safety Alarm',
        icon: 'Siren',
        tags: ['safety_tool', 'security', 'emergency_signal'],
      },
      {
        name: 'Medical Alert Bracelet/Necklace',
        icon: 'IdentificationBadge',
        tags: ['health_info', 'medical_condition', 'emergency'],
      },
      { name: 'Vitamins', icon: 'Pill', tags: ['health_supplement', 'daily_routine'] },
      { name: 'Supplements', icon: 'Pill', tags: ['health_supplement', 'daily_routine'] },
      {
        name: 'Sleep Aid (Melatonin/Herbal Tea)',
        icon: 'Bed',
        tags: ['health', 'travel_comfort', 'jet_lag'],
      },
      {
        name: 'Instant Cold Pack',
        icon: 'Snowflake',
        tags: ['first_aid', 'injury_treatment', 'pain_relief'],
      },
      {
        name: 'Instant Hot Pack',
        icon: 'FireSimple',
        tags: ['first_aid', 'pain_relief', 'muscle_soreness'],
      },
      {
        name: 'CPR Mask (Pocket Size)',
        icon: 'Heartbeat',
        tags: ['first_aid_tool', 'emergency_preparedness', 'cpr_safety'],
      },
      {
        name: 'Electrolyte Tablets',
        icon: 'Pill',
        tags: ['health', 'sports', 'hydration', 'outdoor'],
      },
      {
        name: 'Electrolyte Powder',
        icon: 'DropSimple',
        tags: ['health', 'sports', 'hydration', 'outdoor'],
      },
      {
        name: 'Alcohol Swabs',
        icon: 'DropSimple',
        tags: ['first_aid', 'hygiene', 'sterilization'],
      },
      {
        name: 'Pulse Oximeter (Compact)',
        icon: 'Heartbeat',
        tags: ['health_monitoring', 'medical_tool'],
      },
      {
        name: 'Wilderness First Aid Kit',
        icon: 'FirstAidKit',
        tags: ['outdoor', 'adventure', 'comprehensive_medical', 'safety'],
      },
    ],
  },
  {
    category: 'Accessories (Non-Clothing/Non-Electronic)',
    defaultIcon: 'Sparkle', // General accessory icon
    items: [
      { name: 'Sunglasses', icon: 'Sunglasses', essential: true },
      { name: 'Sunglasses Case', icon: 'ArchiveBox', tags: ['accessory_protection'] },
      { name: 'Watch', icon: 'Watch', tags: ['timekeeping', 'fashion_accessory'] }, // Smartwatch in electronics
      { name: 'Jewelry', icon: 'Diamond', tags: ['fashion_accessory', 'personal_items'] },
      { name: 'Jewelry Roll', icon: 'Package', tags: ['travel_organization', 'accessory_storage'] },
      {
        name: 'Jewelry Case',
        icon: 'ArchiveBox',
        tags: ['travel_organization', 'accessory_storage'],
      },
      {
        name: 'Travel Pillow (Inflatable/Memory Foam)',
        icon: 'Bed',
        tags: ['travel_comfort', 'long_haul'],
      }, // Bed as placeholder
      {
        name: 'Eye Mask',
        icon: 'EyeSlash',
        essential: true,
        tags: ['sleep_aid', 'travel_comfort', 'light_block'],
      },
      {
        name: 'Earplugs',
        icon: 'EarSlash',
        essential: true,
        tags: ['sleep_aid', 'travel_comfort', 'noise_reduction'],
      },
      {
        name: 'Reusable Water Bottle',
        icon: 'DropSimple',
        essential: true,
        tags: ['hydration', 'eco_friendly', 'travel_essential'],
      },
      {
        name: 'Collapsible Water Bottle',
        icon: 'DropSimple',
        tags: ['hydration', 'eco_friendly', 'space_saving', 'travel_hack'],
      },
      {
        name: 'Insulated Water Bottle',
        icon: 'ThermometerSimple',
        tags: ['hydration', 'temperature_control', 'outdoor'],
      },
      {
        name: 'Collapsible Cup',
        icon: 'DropSimple',
        tags: ['travel_hack', 'eco_friendly', 'space_saving', 'hygiene'],
      },
      {
        name: 'Collapsible Mug',
        icon: 'Coffee',
        tags: ['travel_hack', 'eco_friendly', 'space_saving', 'drinks'],
      },
      {
        name: 'Travel Mug',
        icon: 'Coffee',
        tags: ['drinks', 'eco_friendly', 'commute', 'travel_comfort'],
      },
      {
        name: 'Thermos Flask',
        icon: 'Coffee',
        tags: ['drinks', 'temperature_control', 'outdoor', 'picnic'],
      },
      {
        name: 'Snacks for Travel Day',
        icon: 'Cookie',
        essential: true,
        tags: ['food', 'travel_comfort', 'energy'],
      },
      { name: 'Book', icon: 'BookOpenText', tags: ['entertainment', 'relaxation', 'reading'] },
      { name: 'Magazine', icon: 'Article', tags: ['entertainment', 'relaxation', 'reading'] },
      // E-Reader in Electronics
      {
        name: 'TSA-Approved Luggage Lock',
        icon: 'Lock',
        tags: ['security', 'luggage_safety', 'travel_accessory'],
      },
      {
        name: 'Luggage Tags',
        icon: 'TagSimple',
        essential: true,
        defaultQuantity: 2,
        tags: ['identification', 'luggage_safety'],
      },
      {
        name: 'Luggage Straps',
        icon: 'Minus',
        tags: ['luggage_security', 'identification', 'travel_accessory'],
      }, // Minus as placeholder
      {
        name: 'Packing Cubes',
        icon: 'SquaresFour',
        tags: ['organization', 'luggage_packing', 'travel_hack'],
      },
      {
        name: 'Compression Bags (for Clothes)',
        icon: 'ArchiveBox',
        tags: ['organization', 'space_saving', 'luggage_packing'],
      },
      {
        name: 'Travel Laundry Detergent',
        icon: 'DropSimple',
        tags: ['hygiene', 'laundry', 'extended_travel'],
      },
      {
        name: 'Laundry Detergent Sheets',
        icon: 'FileText',
        tags: ['hygiene', 'laundry', 'travel_friendly', 'eco_friendly'],
      },
      {
        name: 'Stain Remover Pen',
        icon: 'PencilSimpleLine',
        tags: ['clothing_care', 'emergency_cleaning', 'travel_hack'],
      },
      {
        name: 'Stain Remover Wipes',
        icon: 'Eraser',
        tags: ['clothing_care', 'emergency_cleaning', 'travel_hack'],
      },
      {
        name: 'Travel Clothesline',
        icon: 'Minus',
        tags: ['laundry', 'travel_hack', 'extended_travel'],
      }, // Minus as placeholder
      { name: 'Travel Clothes Pegs', icon: 'PushPinSimple', tags: ['laundry', 'travel_hack'] },
      {
        name: 'Compact Umbrella',
        icon: 'UmbrellaSimple',
        tags: ['rain_protection', 'all_weather', 'travel_accessory'],
      },
      {
        name: 'Carabiner Clips',
        icon: 'LinkSimpleHorizontal',
        tags: ['utility', 'attachment', 'outdoor_accessory', 'travel_hack'],
      },
      {
        name: 'Duct Tape (Mini Roll)',
        icon: 'Toolbox',
        tags: ['repairs', 'utility', 'emergency_fix', 'travel_hack'],
      }, // Toolbox as placeholder
      {
        name: 'Mini Sewing Kit',
        icon: 'Needle',
        tags: ['clothing_repair', 'emergency_fix', 'travel_hack'],
      },
      { name: 'Notepad', icon: 'NoteBlank', tags: ['writing', 'notes', 'journaling', 'planning'] },
      {
        name: 'Journal',
        icon: 'BookBookmark',
        tags: ['writing', 'personal_reflection', 'travel_diary'],
      },
      {
        name: 'Pen',
        icon: 'PencilSimpleLine',
        essential: true,
        tags: ['writing', 'document_filling'],
      },
      {
        name: 'Playing Cards',
        icon: 'Cards',
        tags: ['entertainment', 'social_games', 'travel_fun'],
      },
      {
        name: 'Travel Games',
        icon: 'GameController',
        tags: ['entertainment', 'family_fun', 'travel_with_kids'],
      },
      {
        name: 'Compact Binoculars',
        icon: 'Binoculars',
        tags: ['outdoor_activity', 'sightseeing', 'nature_watching'],
      },
      {
        name: 'Travel Guidebook',
        icon: 'BookOpenText',
        tags: ['travel_info', 'planning', 'local_guidance'],
      },
      {
        name: 'Physical Map',
        icon: 'MapTrifold',
        tags: ['navigation', 'backup_navigation', 'offline_access'],
      },
      {
        name: 'Waterproof Phone Pouch',
        icon: 'DeviceMobile',
        tags: ['water_protection', 'beach_accessory', 'boating'],
      }, // DeviceMobile as placeholder
      {
        name: 'Waterproof Phone Case',
        icon: 'DeviceMobile',
        tags: ['water_protection', 'outdoor_activity', 'durable_case'],
      },
      {
        name: 'Beach Bag',
        icon: 'BagSimple',
        tags: ['beach_trip', 'pool_accessory', 'large_tote'],
      },
      {
        name: 'Dry Bag',
        icon: 'BagSimple',
        tags: ['water_sports', 'outdoor_adventure', 'gear_protection'],
      },
      {
        name: 'Fanny Pack',
        icon: 'BagSimple',
        tags: ['travel_security', 'hands_free', 'festival_accessory', 'waist_bag'],
      },
      {
        name: 'Travel Steamer (Mini)',
        icon: 'Toolbox',
        tags: ['clothing_care', 'wrinkle_removal', 'business_travel'],
      }, // Toolbox as placeholder
      {
        name: 'Picnic Blanket',
        icon: 'SquaresFour',
        tags: ['outdoor_activity', 'leisure', 'park_visit', 'beach_trip'],
      }, // SquaresFour as placeholder
      {
        name: 'Yoga Mat (Travel)',
        icon: 'PersonSimpleTaiChi',
        tags: ['wellness', 'fitness', 'exercise', 'retreat'],
      },
      {
        name: 'Travel Fan (Mini)',
        icon: 'Fan',
        tags: ['hot_climates', 'cooling', 'personal_comfort'],
      },
      {
        name: 'Cooling Towel',
        icon: 'Towel',
        tags: ['hot_climates', 'sports', 'cooling_relief', 'outdoor_activity'],
      },
      {
        name: 'Reusable Shopping Bag',
        icon: 'ShoppingBagOpen',
        tags: ['eco_friendly', 'shopping', 'utility_bag'],
      },
      {
        name: 'Foldable Tote Bag',
        icon: 'ShoppingBagOpen',
        tags: ['eco_friendly', 'shopping', 'extra_bag', 'travel_hack'],
      },
      {
        name: 'Luggage Scale',
        icon: 'Scales',
        tags: ['travel_tool', 'luggage_check', 'avoid_fees'],
      }, // Duplicate of digital luggage scale in electronics, this could be manual
      { name: 'Sleep Mask', icon: 'EyeSlash', tags: ['sleep_aid', 'travel_comfort'] }, // Synonym for Eye Mask, keep one
    ],
  },
  {
    category: 'Miscellaneous',
    defaultIcon: 'Toolbox',
    items: [
      {
        name: 'Lightweight Daypack',
        icon: 'Backpack',
        tags: ['daily_excursions', 'carry_on', 'hiking'],
      },
      { name: 'Backpack', icon: 'Backpack', tags: ['main_luggage', 'carry_on', 'travel_gear'] }, // Can be main or secondary
      {
        name: 'Laundry Bag',
        icon: 'BagSimple',
        tags: ['organization', 'hygiene', 'dirty_clothes'],
      },
      {
        name: 'Ziplock Bags (Various Sizes)',
        icon: 'ArchiveBox',
        tags: ['organization', 'liquids_carry_on', 'storage_utility'],
      }, // ArchiveBox as placeholder
      {
        name: 'Wet Bag',
        icon: 'BagSimple',
        tags: ['swimwear_storage', 'dirty_items', 'waterproof_pouch'],
      },
      {
        name: 'Multi-Tool',
        icon: 'Toolbox',
        tags: ['utility', 'repairs', 'outdoor_gear', 'camping'],
      },
      {
        name: 'Swiss Army Knife',
        icon: 'Toolbox',
        tags: ['utility', 'multiple_tools', 'travel_gadget'],
      }, // Check TSA rules
      { name: 'Lighter', icon: 'FireSimple', tags: ['utility', 'camping', 'emergency_kit'] }, // Check restrictions
      {
        name: 'Waterproof Matches',
        icon: 'FireSimple',
        tags: ['utility', 'camping', 'emergency_kit', 'outdoor'],
      },
      {
        name: 'Mini Flashlight',
        icon: 'Flashlight',
        tags: ['emergency_lighting', 'night_safety', 'travel_tool'],
      },
      {
        name: 'Headlamp',
        icon: 'Flashlight',
        tags: ['hands_free_lighting', 'outdoor', 'camping', 'reading'],
      },
      {
        name: 'Spare Batteries (for Devices)',
        icon: 'BatteryPlus',
        tags: ['electronics_power', 'backup_energy'],
      },
      { name: 'Travel Alarm Clock', icon: 'Alarm', tags: ['timekeeping', 'wake_up_call'] }, // Can be phone, but some prefer separate
      {
        name: 'Extra Passport Photos (Already in Documents)',
        icon: 'UserCircle',
        tags: ['visa_application', 'identification', 'backup'],
        toRemove: true,
      }, // Mark for removal if truly duplicate
      {
        name: 'Travel Journal (Already in Accessories)',
        icon: 'BookBookmark',
        tags: ['writing', 'personal_reflection', 'travel_diary'],
        toRemove: true,
      },
      {
        name: 'Small Gifts (for Hosts/Locals)',
        icon: 'Gift',
        tags: ['cultural_exchange', 'courtesy', 'souvenirs'],
      },
      {
        name: 'Empty Plastic Bags',
        icon: 'BagSimple',
        tags: ['waste_disposal', 'storage', 'utility'],
      },
      {
        name: 'Door Stop Alarm',
        icon: 'DoorOpen',
        tags: ['security', 'hotel_safety', 'travel_gadget'],
      },
      {
        name: 'Whistle (Already in Health & Safety)',
        icon: 'SpeakerSimpleHigh',
        tags: ['safety_tool', 'emergency_signal'],
        toRemove: true,
      },
    ],
  },
  {
    category: 'Baby & Kids',
    defaultIcon: 'Baby',
    items: [
      { name: 'Diapers', icon: 'Baby', essential: true, tags: ['baby_care', 'hygiene'] },
      {
        name: 'Baby Wipes',
        icon: 'HandSoap',
        essential: true,
        tags: ['baby_care', 'hygiene', 'cleaning'],
      }, // HandSoap as placeholder
      { name: 'Baby Food Pouches', icon: 'Cookie', tags: ['baby_feeding', 'toddler_snacks'] }, // Cookie as placeholder
      { name: 'Baby Food Jars', icon: 'Cookie', tags: ['baby_feeding'] },
      { name: 'Baby Formula', icon: 'DropSimple', tags: ['baby_feeding', 'infant_nutrition'] }, // DropSimple as placeholder
      { name: 'Baby Bottles', icon: 'DropSimple', tags: ['baby_feeding', 'infant_care'] },
      { name: 'Sippy Cups', icon: 'DropSimple', tags: ['toddler_feeding', 'kids_drinks'] },
      {
        name: 'Travel Stroller',
        icon: 'BabyCarriage',
        tags: ['baby_transport', 'toddler_gear', 'family_travel'],
      },
      {
        name: 'Portable Car Seat',
        icon: 'CarSimple',
        tags: ['child_safety', 'vehicle_travel', 'family_travel'],
      },
      {
        name: 'Favorite Toys',
        icon: 'GameController',
        tags: ['kids_entertainment', 'comfort_item', 'travel_with_kids'],
      },
      {
        name: 'Comfort Blanket',
        icon: 'Bed',
        tags: ['baby_comfort', 'toddler_sleep_aid', 'security_item'],
      },
      {
        name: 'Comfort Item (Stuffed Animal)',
        icon: 'Ghost',
        tags: ['baby_comfort', 'toddler_security_item'],
      }, // Ghost as placeholder
      {
        name: 'Baby Carrier',
        icon: 'Backpack',
        tags: ['baby_transport', 'hands_free_parenting', 'hiking_with_baby'],
      }, // Backpack as placeholder
      { name: 'Baby Sling', icon: 'Backpack', tags: ['baby_transport', 'newborn_care', 'bonding'] },
      { name: 'Pacifiers', icon: 'Baby', tags: ['baby_soothing', 'infant_comfort'] },
      { name: 'Teethers', icon: 'Baby', tags: ['baby_comfort', 'teething_relief'] },
      {
        name: 'Baby Blanket',
        icon: 'Bed',
        tags: ['baby_warmth', 'comfort_item', 'travel_bedding'],
      },
      {
        name: 'Portable Changing Pad',
        icon: 'Package',
        tags: ['baby_hygiene', 'diaper_change_station', 'on_the_go'],
      }, // Package as placeholder
      {
        name: 'Bibs',
        icon: 'TShirt',
        tags: ['baby_feeding', 'mess_prevention', 'toddler_mealtimes'],
      }, // TShirt as placeholder
      {
        name: 'Baby Sunscreen',
        icon: 'Sun',
        tags: ['baby_skincare', 'sun_protection', 'child_health'],
      },
      {
        name: 'Baby Sun Hat',
        icon: 'BaseballCap',
        tags: ['baby_sun_protection', 'outdoor_gear_kids'],
      },
      {
        name: 'Child ID Bracelet',
        icon: 'IdentificationBadge',
        tags: ['child_safety', 'emergency_contact', 'travel_security'],
      },
      {
        name: 'Swim Diapers',
        icon: 'SwimmingPool',
        tags: ['beach_with_baby', 'pool_with_baby', 'baby_swimwear'],
      },
      {
        name: 'Child Arm Floaties',
        icon: 'SwimmingPool',
        tags: ['kids_swim_safety', 'pool_toy', 'beach_gear'],
      },
      {
        name: 'Child Life Vest',
        icon: 'Lifebuoy',
        tags: ['kids_water_safety', 'boating_with_kids', 'swim_aid'],
      },
      {
        name: 'Baby Carrier Backpack (for Hiking)',
        icon: 'PersonSimpleHike',
        tags: ['hiking_with_baby', 'outdoor_family_gear', 'baby_transport'],
      },
      {
        name: 'Portable High Chair',
        icon: 'Chair',
        tags: ['family_travel_gear', 'toddler_feeding_solution', 'restaurant_with_kids'],
      },
      {
        name: 'White Noise Machine (Travel Size)',
        icon: 'SpeakerSimpleLow',
        tags: ['baby_sleep_aid', 'toddler_sleep', 'travel_comfort_kids'],
      },
      {
        name: 'Travel Potty Seat',
        icon: 'ToiletPaper',
        tags: ['toddler_potty_training', 'family_travel_hygiene', 'kids_restroom_solution'],
      }, // ToiletPaper as placeholder
      {
        name: 'Child Safety Harness',
        icon: 'LinkSimpleHorizontal',
        tags: ['toddler_safety', 'crowded_places_kids', 'travel_security_child'],
      }, // LinkSimpleHorizontal as placeholder
      {
        name: 'Child Leash Backpack',
        icon: 'Backpack',
        tags: ['toddler_safety', 'crowded_places_kids', 'travel_gear_kids'],
      },
      {
        name: 'Baby Monitor (Travel)',
        icon: 'SpeakerSimpleHigh',
        tags: ['baby_safety', 'hotel_room_kids', 'family_travel_tech'],
      },
      {
        name: 'Kids Headphones',
        icon: 'Headphones',
        tags: ['kids_entertainment', 'travel_with_kids', 'volume_limited_audio'],
      },
      {
        name: 'Coloring Books',
        icon: 'PaintBrushHousehold',
        tags: ['kids_entertainment', 'travel_activities_kids', 'creative_play'],
      }, // PaintBrushHousehold as placeholder
      {
        name: 'Crayons',
        icon: 'PaintBrushHousehold',
        tags: ['kids_art_supplies', 'travel_activities_kids', 'creative_play'],
      },
      {
        name: 'Sticker Books',
        icon: 'Sticker',
        tags: ['kids_entertainment', 'travel_activities_kids', 'quiet_time_play'],
      },
      {
        name: 'Small Story Books',
        icon: 'BookOpenText',
        tags: ['kids_reading', 'bedtime_stories_travel', 'early_literacy'],
      },
      {
        name: 'Kids Travel Games',
        icon: 'GameController',
        tags: ['family_entertainment', 'roadtrip_games', 'plane_activities_kids'],
      },
      {
        name: 'Kids Snacks',
        icon: 'Cookie',
        tags: ['toddler_food', 'kids_travel_food', 'healthy_snacks_kids'],
      },
      {
        name: 'Kids Reusable Water Bottle',
        icon: 'DropSimple',
        tags: ['kids_hydration', 'family_travel_eco', 'school_gear'],
      },
      { name: 'Baby Nail Clippers', icon: 'Scissors', tags: ['baby_grooming', 'infant_care'] },
      {
        name: 'Nasal Aspirator',
        icon: 'DropSimple',
        tags: ['baby_health', 'infant_cold_relief', 'congestion_aid'],
      }, // DropSimple as placeholder
      {
        name: 'Kids Toothbrush',
        icon: 'Tooth',
        tags: ['kids_dental_hygiene', 'toddler_oral_care'],
      },
      {
        name: 'Kids Toothpaste',
        icon: 'DropSimple',
        tags: ['kids_dental_hygiene', 'toddler_oral_care'],
      },
      {
        name: 'Burp Cloths',
        icon: 'Towel',
        tags: ['baby_feeding', 'newborn_care', 'mess_control'],
      },
      {
        name: 'Nursing Cover',
        icon: 'PersonSimple',
        tags: ['breastfeeding_privacy', 'baby_feeding_on_the_go', 'maternity_accessory'],
      },
    ],
  },
  {
    category: 'Outdoor & Adventure',
    defaultIcon: 'Mountains',
    items: [
      // Hiking Boots, Trail Running Shoes already in Footwear
      // Rain Jacket, Waterproof Trousers, Rain Poncho already in Clothing
      // Water Shoes already in Footwear
      {
        name: 'Trekking Poles',
        icon: 'PersonSimpleHike',
        tags: ['hiking_gear', 'trekking_support', 'mountain_adventure'],
      },
      {
        name: 'Walking Stick',
        icon: 'PersonSimpleHike',
        tags: ['hiking_support', 'nature_walk', 'outdoor_stability'],
      },
      { name: 'Tent', icon: 'Tent', tags: ['camping_gear', 'shelter', 'outdoor_sleeping'] },
      { name: 'Sleeping Bag', icon: 'Bed', tags: ['camping_gear', 'outdoor_sleeping', 'warmth'] }, // Bed as placeholder
      {
        name: 'Sleeping Pad',
        icon: 'Bed',
        tags: ['camping_comfort', 'insulation', 'outdoor_sleeping'],
      },
      {
        name: 'Camping Pillow (Inflatable)',
        icon: 'Bed',
        tags: ['camping_comfort', 'lightweight_pillow', 'outdoor_sleeping'],
      },
      // Flashlight, Headlamp already in Miscellaneous
      {
        name: 'Compass',
        icon: 'Compass',
        tags: ['navigation_tool', 'outdoor_orientation', 'map_reading'],
      },
      // Handheld GPS Device already in Electronics
      // Water Filter, Water Purification Tablets already in Health & Safety
      {
        name: 'Bear Spray',
        icon: 'SprayBottle',
        tags: ['wildlife_safety', 'bear_country', 'outdoor_defense'],
      }, // SprayBottle as placeholder
      {
        name: 'Bear Canister',
        icon: 'ArchiveBox',
        tags: ['food_storage_wildlife', 'camping_safety', 'bear_country'],
      }, // ArchiveBox as placeholder
      {
        name: 'Utility Rope',
        icon: 'Minus',
        tags: ['camping_utility', 'gear_securing', 'outdoor_tool'],
      }, // Minus as placeholder
      {
        name: 'Paracord',
        icon: 'Minus',
        tags: ['survival_gear', 'multi_purpose_rope', 'outdoor_utility'],
      },
      // Fire Starter, Waterproof Matches already in Miscellaneous
      {
        name: 'Emergency Blanket',
        icon: 'Package',
        tags: ['survival_gear', 'hypothermia_protection', 'emergency_shelter'],
      }, // Package as placeholder
      // Dry Bags already in Accessories
      {
        name: 'Gaiters',
        icon: 'Boot',
        tags: ['hiking_protection', 'legwear_outdoor', 'snow_mud_debris'],
      }, // Boot as placeholder
      {
        name: 'Climbing Harness',
        icon: 'PersonSimpleHike',
        tags: ['climbing_gear', 'safety_equipment', 'adventure_sports'],
      }, // PersonSimpleHike as placeholder
      {
        name: 'Climbing Helmet',
        icon: 'HardHat',
        tags: ['climbing_gear', 'safety_equipment', 'head_protection'],
      },
      {
        name: 'Chalk Bag (Climbing)',
        icon: 'BagSimple',
        tags: ['climbing_gear', 'grip_enhancement'],
      },
      { name: 'Belay Device', icon: 'Toolbox', tags: ['climbing_gear', 'safety_equipment'] }, // Toolbox as placeholder
      {
        name: 'Carabiners (Climbing Grade)',
        icon: 'LinkSimpleHorizontal',
        tags: ['climbing_gear', 'safety_equipment', 'utility_clips'],
      },
      {
        name: 'Life Jacket',
        icon: 'Lifebuoy',
        tags: ['water_safety', 'boating_gear', 'kayaking_canoeing'],
      },
      // Fishing Rod, Tackle already below
      {
        name: 'Travel Fishing Rod',
        icon: 'FishSimple',
        tags: ['fishing_gear', 'portable_rod', 'recreational_fishing'],
      },
      {
        name: 'Basic Fishing Tackle',
        icon: 'FishSimple',
        tags: ['fishing_gear', 'hooks_lures_line', 'angling_supplies'],
      },
      {
        name: 'Camping Stove',
        icon: 'CookingPot',
        tags: ['outdoor_cooking', 'camping_kitchen', 'backpacking_food'],
      },
      {
        name: 'Camping Fuel Canister',
        icon: 'GasCan',
        tags: ['outdoor_cooking', 'stove_fuel', 'camping_supplies'],
      },
      {
        name: 'Camping Cookware (Pots, Pans)',
        icon: 'CookingPot',
        tags: ['outdoor_cooking', 'camping_kitchen', 'backpacking_meals'],
      },
      {
        name: 'Camping Utensils (Spork, Knife)',
        icon: 'ForkKnife',
        tags: ['outdoor_eating', 'camping_kitchen', 'backpacking_cutlery'],
      },
      {
        name: 'Hammock (Lightweight Travel)',
        icon: 'Bed',
        tags: ['camping_relaxation', 'outdoor_lounging', 'backpacking_gear'],
      }, // Bed as placeholder
      {
        name: 'Trekking Sandals',
        icon: 'SneakerMove',
        tags: ['outdoor_footwear', 'hiking_warm_weather', 'water_crossings'],
      },
      {
        name: 'Insect Head Net',
        icon: 'BugBeetle',
        tags: ['tropical_protection', 'bug_defense', 'outdoor_comfort'],
      },
      {
        name: 'Satellite Phone',
        icon: 'Phone',
        tags: ['remote_communication', 'emergency_device', 'off_grid_travel'],
      },
      {
        name: 'Personal Locator Beacon (PLB)',
        icon: 'GpsFix',
        tags: ['emergency_signal_device', 'remote_safety', 'sos_beacon'],
      },
      {
        name: 'Emergency Beacon',
        icon: 'GpsFix',
        tags: ['emergency_signal_device', 'remote_safety', 'distress_signal'],
      },
      {
        name: 'Avalanche Transceiver',
        icon: 'WifiHigh',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'backcountry_skiing'],
      }, // WifiHigh as placeholder for signal
      {
        name: 'Snow Shovel (Collapsible)',
        icon: 'Shovel',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'winter_camping'],
      },
      {
        name: 'Snow Probe',
        icon: 'Minus',
        tags: ['ski_mountaineering_safety', 'snow_safety_gear', 'avalanche_rescue'],
      }, // Minus as placeholder
      {
        name: 'Ice Axe',
        icon: 'Axe',
        tags: ['mountaineering_gear', 'snow_climbing', 'glacier_travel'],
      },
      {
        name: 'Crampons',
        icon: 'Snowflake',
        tags: ['mountaineering_gear', 'ice_climbing', 'glacier_travel_traction'],
      }, // Snowflake as placeholder
      {
        name: 'Ski Skins (for Touring)',
        icon: 'Ski',
        tags: ['backcountry_skiing', 'ski_touring_gear', 'uphill_traction'],
      }, // Ski icon might not exist, using default
      { name: 'Bike Helmet', icon: 'Bicycle', tags: ['cycling_safety', 'head_protection'] },
      {
        name: 'Bike Repair Kit (Mini)',
        icon: 'Wrench',
        tags: ['cycling_maintenance', 'roadside_repair'],
      },
      { name: 'Bike Lock', icon: 'Lock', tags: ['cycling_security', 'bike_theft_prevention'] },
      {
        name: 'Snorkel Mask',
        icon: 'SwimmingPool',
        tags: ['water_sports', 'beach_activity', 'underwater_viewing'],
      }, // SwimmingPool as placeholder
      {
        name: 'Fins (Snorkeling/Diving)',
        icon: 'SwimmingPool',
        tags: ['water_sports', 'underwater_propulsion', 'diving_gear'],
      },
      {
        name: 'Dive Computer',
        icon: 'Watch',
        tags: ['scuba_diving_gear', 'safety_device', 'underwater_monitoring'],
      },
      { name: 'Surfboard Wax', icon: 'DropSimple', tags: ['surfing_gear', 'board_grip'] }, // DropSimple as placeholder
      {
        name: 'Kayak/Canoe Dry Bag',
        icon: 'BagSimple',
        tags: ['paddling_gear', 'waterproof_storage', 'boating_accessory'],
      },
      { name: 'Golf Clubs (Travel Set)', icon: 'Golf', tags: ['sports_equipment', 'golf_travel'] },
      { name: 'Tennis Racquet', icon: 'TennisBall', tags: ['sports_equipment', 'tennis_gear'] },
    ],
  },
];

// Helper to remove items marked for removal (e.g., true duplicates after consolidation)
// This step would typically be done programmatically after the list definition.
PACKING_MASTER_LIST.forEach((category) => {
  category.items = category.items.filter((item) => !item.toRemove);
});
