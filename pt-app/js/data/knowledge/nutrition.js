// Nutrition — Unit 2 of the Level 3 Diploma syllabus, in our own words.
import { table, callout, quiz, kb } from './_helpers.js';

export const NUTRITION = [
  {
    id: 'scope', group: 'Foundations', title: 'Scope of practice for nutrition',
    summary: 'What a personal trainer can and can\'t advise; nutritionists vs dietitians',
    body: `
${table(['Role', 'Can do'], [
  ['<strong>Personal trainer</strong>', 'Give general healthy-eating advice based on national guidelines (e.g. the Eatwell Guide), support behaviour change, discuss hydration and fuelling for exercise for healthy adults'],
  ['<strong>Registered nutritionist</strong>', 'Evidence-based nutrition advice to individuals and groups. "Nutritionist" alone isn\'t a protected title; look for registration (e.g. AfN in the UK)'],
  ['<strong>Registered dietitian</strong>', 'A protected title regulated by the HCPC. Can assess, diagnose and treat diet-related medical conditions (e.g. diabetes, kidney disease, allergies, eating disorders)'],
])}
${callout('warn', 'Refer on when', '<ul><li>A client has a medical condition that diet affects (diabetes, heart, kidney or gut disease, food allergies), or is pregnant and wants specific dietary changes.</li><li>You suspect disordered eating.</li><li>A client wants a specific meal plan or very low-calorie diet.</li><li>Supplements are being taken alongside medication.</li></ul>')}
${quiz([
  ['Which title is protected by law: nutritionist or dietitian?', 'Dietitian (registered with the HCPC).'],
  ['Can a PT write a meal plan for a client with type 1 diabetes?', 'No. Refer to their diabetes team or a registered dietitian; give only general guidance.'],
])}`,
  },
  {
    id: 'healthy-eating', group: 'Foundations', title: 'Nutrient groups & healthy eating guidelines',
    summary: 'Macro- and micronutrients, the Eatwell Guide, national guidelines',
    body: `
<h3>The nutrient groups</h3>
${table(['Group', 'Nutrients', 'Main roles'], [
  ['<strong>Macronutrients</strong> (needed in large amounts; provide energy)', 'Carbohydrate (4 kcal/g), protein (4 kcal/g), fat (9 kcal/g). Alcohol also provides 7 kcal/g but isn\'t a nutrient', 'Energy, growth, repair'],
  ['<strong>Micronutrients</strong> (needed in small amounts)', 'Vitamins and minerals', 'Regulate body processes, bone health, immunity'],
  ['<strong>Water</strong>', '', 'Transport, temperature control, every chemical reaction'],
  ['<strong>Fibre</strong>', '', 'Digestive health, fullness, blood sugar and cholesterol control'],
])}

<h3>The Eatwell Guide (UK)</h3>
${table(['Food group', 'Share of diet', 'Advice'], [
  ['<strong>Fruit and vegetables</strong>', 'Just over a third', 'At least 5 portions (80 g each) a day, of a variety'],
  ['<strong>Potatoes, bread, rice, pasta and other starchy carbohydrates</strong>', 'Just over a third', 'Choose wholegrain or higher-fibre versions'],
  ['<strong>Beans, pulses, fish, eggs, meat and other proteins</strong>', 'About 12%', '2 portions of fish a week, 1 oily; eat less red and processed meat'],
  ['<strong>Dairy and alternatives</strong>', 'About 8%', 'Choose lower-fat and lower-sugar options'],
  ['<strong>Oils and spreads</strong>', 'About 1%', 'Unsaturated oils, in small amounts'],
  ['Foods high in fat, salt and sugar', 'Outside the main guide', 'Eat less often and in small amounts'],
])}
<p>Also: drink 6–8 glasses of fluid a day; adults should have no more than 6 g of salt a day; check food labels.</p>

<h3>Key UK daily reference values</h3>
${table(['Nutrient', 'Guideline'], [
  ['Energy', 'About 2,000 kcal (women) and 2,500 kcal (men): average values only'],
  ['Free sugars', 'No more than 5% of energy (about 30 g a day for adults)'],
  ['Saturated fat', 'No more than about 20 g (women) / 30 g (men)'],
  ['Fibre', '30 g a day for adults (most people eat about 20 g)'],
  ['Salt', 'No more than 6 g a day'],
  ['Alcohol', 'No more than 14 units a week, spread over 3 or more days, with some alcohol-free days'],
])}

<h3>Food quality</h3>
<p>Guidelines focus on food groups rather than food quality. Encourage minimally processed foods: whole grains, fresh produce, quality protein sources, and cooking from scratch where possible.</p>

${quiz([
  ['How many calories per gram do carbohydrate, protein and fat provide?', 'Carbohydrate 4, protein 4, fat 9 (alcohol 7).'],
  ['What two groups make up the largest parts of the Eatwell Guide?', 'Fruit and vegetables, and starchy carbohydrates (each just over a third).'],
  ['What is the UK fibre recommendation for adults?', '30 g a day.'],
  ['What is the maximum recommended salt intake for adults?', '6 g a day.'],
])}`,
  },
  {
    id: 'macros', group: 'Macronutrients', title: 'Protein',
    summary: 'Amino acids, complete proteins, functions and requirements',
    body: `
<p>Proteins are made of <strong>amino acids</strong> joined in chains (two = dipeptide, several = peptide, many = polypeptide/protein). There are 20 amino acids used by the body:</p>
<ul>
  <li><strong>Essential (indispensable) amino acids</strong>: 9 that the body can't make, so they must come from food (including leucine, isoleucine and valine, the branched-chain amino acids).</li>
  <li><strong>Non-essential</strong>: the body can make them.</li>
</ul>
<h3>Complete and incomplete proteins</h3>
<ul>
  <li><strong>Complete</strong> proteins contain all essential amino acids in good amounts: meat, fish, eggs, dairy, soy, quinoa, buckwheat.</li>
  <li><strong>Incomplete</strong> proteins lack enough of one or more: most beans, lentils, grains, nuts and seeds.</li>
  <li><strong>Complementary proteins</strong>: combining plant sources over the day covers all essential amino acids (e.g. beans on toast, rice and lentils).</li>
</ul>
<h3>Functions</h3>
<p>Growth and repair of muscle and all tissues; enzymes; hormones (e.g. insulin); antibodies; transport (haemoglobin); fluid balance; an energy source when carbohydrate is low (it is not the body's preferred fuel).</p>
<h3>Requirements</h3>
${table(['Population', 'Protein (g per kg body weight per day)'], [
  ['Sedentary adult (UK reference)', '0.75–0.8'],
  ['Recreational exerciser', '0.8–1.5'],
  ['Endurance athlete', '1.2–1.6'],
  ['Strength or muscle-gain focus', '1.6–2.2'],
  ['Older adults', 'About 1.0–1.2 (to limit muscle loss)'],
])}
<p>Spreading protein across 3–5 meals, each with about 20–40 g (roughly 0.3–0.4 g/kg), supports muscle repair. Higher intakes also help fullness during fat loss. Very high intakes give no extra muscle benefit; for healthy people they are not shown to harm the kidneys, but clients with kidney disease must follow medical advice.</p>
${quiz([
  ['What are essential amino acids?', 'The 9 amino acids the body can\'t make, which must come from food.'],
  ['Give two examples of complete protein sources.', 'For example: eggs, meat, fish, dairy, soy, quinoa.'],
  ['How much protein should a 70 kg recreational exerciser aim for?', 'Roughly 56–105 g a day (0.8–1.5 g/kg).'],
  ['What are complementary proteins?', 'Plant proteins combined so that together they provide all essential amino acids.'],
])}`,
  },
  {
    id: 'carbohydrates', group: 'Macronutrients', title: 'Carbohydrates & fibre',
    summary: 'Simple vs complex, refined vs unrefined, glycaemic index, fibre',
    body: `
<h3>Types of carbohydrate</h3>
${table(['Type', 'Examples', 'Notes'], [
  ['<strong>Monosaccharides</strong> (single sugars)', 'Glucose, fructose (fruit), galactose', 'Absorbed directly'],
  ['<strong>Disaccharides</strong> (two sugars)', 'Sucrose (table sugar = glucose + fructose), lactose (milk), maltose', 'Simple sugars'],
  ['<strong>Polysaccharides</strong> (complex)', 'Starch (grains, potatoes, pulses), glycogen (animal storage), fibre', 'Many glucose units'],
])}
<p><strong>Unrefined</strong> carbohydrates (wholegrains, oats, fruit, vegetables, pulses) keep their fibre, vitamins and minerals. <strong>Refined</strong> carbohydrates (white bread, white rice, sugary foods) have had much of this removed: high energy, low nutrients.</p>

<h3>What happens to carbohydrate</h3>
<ol>
  <li>Digested to glucose and absorbed into the blood.</li>
  <li>The pancreas releases <strong>insulin</strong>, moving glucose into cells.</li>
  <li>Glucose is used for energy, stored as <strong>glycogen</strong> in muscles (about 400–500 g) and the liver (about 100 g), or converted to fat if stores are full and energy intake is in surplus.</li>
</ol>
<p>Carbohydrate is the main fuel for moderate to high-intensity exercise and the brain's preferred fuel.</p>

<h3>Glycaemic index (GI)</h3>
<p>Ranks carbohydrate foods by how quickly they raise blood glucose compared with pure glucose (100).</p>
${table(['GI', 'Score', 'Examples'], [
  ['High', '70+', 'White bread, sports drinks, watermelon, cornflakes'],
  ['Medium', '56–69', 'Basmati rice, wholemeal bread, bananas'],
  ['Low', '55 or less', 'Oats, pulses, most fruit, dairy, pasta'],
])}
<p>Low-GI foods release energy more steadily and keep you fuller. GI changes with ripeness, cooking and what the food is eaten with (protein, fat and fibre lower it). <strong>Glycaemic load</strong> also accounts for portion size.</p>

<h3>Fibre</h3>
<ul>
  <li><strong>Soluble fibre</strong> (oats, beans, lentils, fruit flesh): forms a gel; slows digestion; helps lower cholesterol and steady blood sugar.</li>
  <li><strong>Insoluble fibre</strong> (wholegrains, bran, skins of fruit and vegetables): adds bulk and speeds transit, preventing constipation.</li>
  <li>Benefits: digestive health, fullness (helps weight control), lower risk of heart disease, type 2 diabetes and bowel cancer.</li>
  <li>Aim for <strong>30 g a day</strong>. Increase gradually and drink plenty of fluid to avoid bloating.</li>
</ul>

${quiz([
  ['Where is glycogen stored?', 'In the muscles and liver.'],
  ['What does the glycaemic index measure?', 'How quickly a carbohydrate food raises blood glucose compared with pure glucose.'],
  ['Give one benefit each of soluble and insoluble fibre.', 'Soluble: lowers cholesterol and steadies blood sugar. Insoluble: adds bulk and prevents constipation.'],
  ['What is the difference between refined and unrefined carbohydrate?', 'Refined carbohydrates have had fibre and nutrients removed in processing.'],
])}`,
  },
  {
    id: 'fats', group: 'Macronutrients', title: 'Fats & cholesterol',
    summary: 'Saturated, unsaturated and trans fats; omega-3; HDL and LDL',
    body: `
<h3>Functions of fat</h3>
<p>Concentrated energy store (9 kcal/g); insulation and protection of organs; part of every cell membrane; needed to absorb fat-soluble vitamins (A, D, E, K); hormone production; essential fatty acids for brain and heart health.</p>
<p>Most dietary and body fat is in the form of <strong>triglycerides</strong>: three fatty acids attached to glycerol.</p>

<h3>Types of fat</h3>
${table(['Type', 'Sources', 'Health effect'], [
  ['<strong>Saturated</strong> (solid at room temperature)', 'Fatty meat, butter, cheese, cream, coconut and palm oil, cakes and pastries', 'Raises LDL cholesterol; limit to under 10% of energy'],
  ['<strong>Monounsaturated</strong>', 'Olive and rapeseed oil, avocados, most nuts', 'Helps lower LDL; heart-healthy'],
  ['<strong>Polyunsaturated: omega-6</strong>', 'Sunflower and corn oil, seeds, nuts', 'Essential; lowers LDL'],
  ['<strong>Polyunsaturated: omega-3</strong>', 'Oily fish (salmon, mackerel, sardines), walnuts, flax and chia seeds', 'Essential; anti-inflammatory; protects the heart'],
  ['<strong>Trans fats</strong> (from industrial hydrogenation)', 'Some fried and processed foods, older margarines, biscuits and pastries', 'Raise LDL and lower HDL: the most harmful. Now largely removed from UK foods'],
])}

<h3>Cholesterol</h3>
<p>A waxy substance made mainly by the liver, needed for cell membranes, vitamin D, hormones and bile. It travels in the blood in lipoproteins:</p>
<ul>
  <li><strong>LDL</strong> (low-density lipoprotein, "bad"): carries cholesterol to the tissues; high levels contribute to plaque in arteries.</li>
  <li><strong>HDL</strong> (high-density lipoprotein, "good"): carries excess cholesterol back to the liver.</li>
</ul>
<p>A total cholesterol of 5 mmol/L or less is generally regarded as healthy for adults in the UK. Regular exercise raises HDL; replacing saturated fat with unsaturated fat, and eating more fibre, lowers LDL. Smoking and inactivity worsen the profile.</p>

${quiz([
  ['How many calories per gram does fat provide?', '9 kcal.'],
  ['Which type of fat is most harmful to heart health?', 'Trans fats.'],
  ['Name a source of omega-3 fat.', 'Oily fish (also walnuts, flax or chia seeds).'],
  ['What is the difference between LDL and HDL?', 'LDL carries cholesterol to tissues and can contribute to plaque; HDL carries excess cholesterol back to the liver.'],
  ['How does exercise affect cholesterol?', 'It raises HDL and can lower triglycerides.'],
])}`,
  },
  {
    id: 'micronutrients', group: 'Micronutrients', title: 'Vitamins & minerals',
    summary: 'Water- and fat-soluble vitamins, key minerals, antioxidants, supplements',
    body: `
<h3>Vitamins</h3>
${table(['Vitamin', 'Main roles', 'Good sources'], [
  ['<strong>A</strong> (fat-soluble)', 'Vision, skin, immunity', 'Liver, eggs, dairy, orange and green vegetables'],
  ['<strong>D</strong> (fat-soluble)', 'Calcium absorption, bone and muscle health, immunity', 'Sunlight on skin, oily fish, eggs, fortified foods. UK adults are advised to consider a 10 µg supplement in autumn and winter'],
  ['<strong>E</strong> (fat-soluble)', 'Antioxidant, protects cell membranes', 'Plant oils, nuts, seeds'],
  ['<strong>K</strong> (fat-soluble)', 'Blood clotting, bone health', 'Green leafy vegetables'],
  ['<strong>B group</strong> (water-soluble: B1, B2, B3, B6, B12, folate)', 'Releasing energy from food; nerves; red blood cells (B12, folate)', 'Wholegrains, meat, eggs, dairy, pulses, leafy greens. Vegans need a B12 source'],
  ['<strong>C</strong> (water-soluble)', 'Antioxidant; collagen for skin, tendons and blood vessels; iron absorption; immunity', 'Citrus fruit, berries, peppers, broccoli'],
])}
<p><strong>Fat-soluble</strong> vitamins (A, D, E, K) are stored in the body, so excessive supplementation can be toxic. <strong>Water-soluble</strong> vitamins (B and C) aren't stored much and are needed regularly; they are easily lost in cooking water.</p>

<h3>Minerals</h3>
${table(['Mineral', 'Main roles', 'Sources'], [
  ['<strong>Calcium</strong>', 'Bones and teeth; muscle contraction; nerve signals; clotting', 'Dairy, fortified plant milks, tinned fish with bones, green vegetables'],
  ['<strong>Iron</strong>', 'Haemoglobin (oxygen transport). Deficiency causes anaemia, common in menstruating women and endurance athletes', 'Red meat, pulses, dark green vegetables, fortified cereals (vitamin C improves absorption)'],
  ['<strong>Sodium</strong>', 'Fluid balance, nerve impulses. Too much raises blood pressure', 'Salt, processed foods'],
  ['<strong>Potassium</strong>', 'Fluid balance, muscle and heart function', 'Fruit (bananas), vegetables, potatoes'],
  ['<strong>Magnesium</strong>', 'Energy release, muscle and nerve function, bone', 'Nuts, seeds, wholegrains, green vegetables'],
  ['<strong>Zinc</strong>', 'Immunity, wound healing, growth', 'Meat, shellfish, seeds, dairy'],
  ['<strong>Phosphorus</strong>', 'Bones, ATP', 'Meat, dairy, wholegrains'],
])}
<p>Trace minerals needed in tiny amounts include selenium, iodine, copper, chromium and manganese.</p>

<h3>Antioxidants and phytochemicals</h3>
<p>Normal metabolism and exercise produce <strong>free radicals</strong>, unstable molecules that can damage cells. Antioxidants (vitamins C and E, selenium, and plant compounds called phytochemicals such as flavonoids and carotenoids) neutralise them. A colourful diet rich in fruit and vegetables is the best source. High-dose antioxidant supplements are not recommended and may blunt training adaptations.</p>

<h3>Supplements</h3>
<p>A varied diet provides most people with enough micronutrients. Exceptions with UK guidance: vitamin D (autumn and winter, or all year for those with little sun exposure), folic acid (before and during early pregnancy), B12 for vegans. Refer clients who think they need other supplements to their GP or a dietitian.</p>

${quiz([
  ['Which vitamins are fat-soluble?', 'A, D, E and K.'],
  ['Which mineral is needed for haemoglobin, and what happens if it\'s low?', 'Iron. Deficiency causes anaemia (tiredness, poor exercise tolerance).'],
  ['What does vitamin D do for the skeleton?', 'Helps the body absorb calcium.'],
  ['What is a free radical?', 'An unstable molecule that can damage cells; neutralised by antioxidants.'],
])}`,
  },
  {
    id: 'hydration', group: 'Micronutrients', title: 'Water & hydration',
    summary: 'Roles of water, daily needs, dehydration, sports drinks',
    body: `
<p>Water makes up about 50–60% of adult body weight (more in muscle, less in fat). It transports nutrients and waste, regulates temperature through sweating, lubricates joints and is needed for every chemical reaction.</p>
<h3>How much?</h3>
<ul>
  <li>UK guidance: 6–8 glasses (about 1.5–2 litres) of fluid a day, plus water from food. Needs rise with exercise, heat and body size.</li>
  <li>Around exercise: drink 5–7 ml/kg about 4 hours before; drink during exercise to limit body weight loss to under 2%; afterwards, drink about 1.5 litres for every kilogram lost.</li>
</ul>
<h3>Signs of dehydration</h3>
<p>Thirst (a late sign), dark yellow urine, less urine, headache, tiredness, dizziness, reduced performance. A loss of just 2% of body weight in fluid impairs endurance and concentration. Pale straw-coloured urine is a simple target.</p>
<p>Drinking excessive amounts of plain water during very long events can dilute blood sodium (<strong>hyponatraemia</strong>), which is dangerous.</p>
<h3>Sports drinks</h3>
${table(['Type', 'Carbohydrate', 'Use'], [
  ['<strong>Hypotonic</strong>', 'Less than 4%', 'Fast rehydration; little energy'],
  ['<strong>Isotonic</strong>', '4–8%', 'Fluid and energy during exercise lasting over about an hour'],
  ['<strong>Hypertonic</strong>', 'More than 8%', 'Energy top-up / recovery; slower to absorb'],
])}
<p>For most gym sessions under an hour, water is enough.</p>
${quiz([
  ['How much fluid does UK guidance recommend daily?', '6–8 glasses (about 1.5–2 litres).'],
  ['What is a simple way to check hydration?', 'Urine colour: aim for pale straw.'],
  ['What is an isotonic drink and when is it useful?', 'A drink with about 4–8% carbohydrate; useful during exercise lasting over an hour.'],
])}`,
  },
  {
    id: 'digestion', group: 'Micronutrients', title: 'Digestion',
    summary: 'The digestive tract, enzymes and absorption',
    body: `
<p>Digestion breaks food into small molecules that can be absorbed into the blood.</p>
${table(['Stage', 'What happens'], [
  ['<strong>Mouth</strong>', 'Chewing; saliva contains amylase, which starts breaking down starch'],
  ['<strong>Oesophagus</strong>', 'Food is pushed down by waves of muscle contraction (peristalsis)'],
  ['<strong>Stomach</strong>', 'Acid and pepsin start protein digestion; food is churned into chyme'],
  ['<strong>Small intestine</strong> (duodenum, jejunum, ileum)', 'Most digestion and absorption. Enzymes from the pancreas (amylase, protease, lipase) and bile from the liver (stored in the gallbladder, emulsifies fat). Villi give a huge absorptive surface'],
  ['<strong>Large intestine</strong> (colon)', 'Water and some minerals absorbed; gut bacteria ferment fibre; waste formed'],
  ['<strong>Rectum and anus</strong>', 'Waste stored and expelled'],
])}
${table(['Macronutrient', 'Main enzyme', 'End product'], [
  ['Carbohydrate', 'Amylase', 'Glucose (and other simple sugars)'],
  ['Protein', 'Pepsin, then proteases (e.g. trypsin)', 'Amino acids'],
  ['Fat', 'Lipase (after bile emulsifies it)', 'Fatty acids and glycerol'],
])}
<p>Supporting digestive health: plenty of fibre and fluid, regular meals, varied plant foods, regular activity. Avoid hard exercise straight after a large meal, as blood is diverted to the gut.</p>
${quiz([
  ['What are the end products of carbohydrate, protein and fat digestion?', 'Glucose, amino acids, and fatty acids plus glycerol.'],
  ['Where does most absorption happen?', 'The small intestine.'],
  ['What does bile do?', 'Emulsifies fat so lipase can digest it.'],
])}`,
  },
  {
    id: 'food-labels', group: 'Applied nutrition', title: 'Food labels & marketing terms',
    summary: 'Reading nutrition labels and traffic lights, marketing claims, additives',
    body: `
<h3>Reading labels</h3>
<ul>
  <li><strong>Ingredients</strong> are listed in order of weight, largest first.</li>
  <li>The nutrition panel shows values <strong>per 100 g</strong> (to compare products) and usually <strong>per portion</strong> (check the portion size is realistic).</li>
  <li><strong>Reference intakes (RI)</strong> show the percentage of an average adult's daily needs.</li>
</ul>
<h3>UK front-of-pack traffic lights (per 100 g)</h3>
${table(['Nutrient', 'Low (green)', 'High (red)'], [
  ['Fat', '3 g or less', 'More than 17.5 g'],
  ['Saturated fat', '1.5 g or less', 'More than 5 g'],
  ['Sugars', '5 g or less', 'More than 22.5 g'],
  ['Salt', '0.3 g or less', 'More than 1.5 g'],
])}
<h3>Marketing terms</h3>
${table(['Claim', 'What it actually means'], [
  ['<strong>Low fat</strong>', '3 g of fat or less per 100 g (1.5 g per 100 ml for drinks). May be higher in sugar'],
  ['<strong>Reduced fat / lower sugar</strong>', 'At least 30% less than the standard version: it can still be high'],
  ['<strong>Light / lite</strong>', 'Must meet "reduced" criteria, but can describe texture or colour'],
  ['<strong>No added sugar</strong>', 'No sugar added, but may contain natural sugars (e.g. fruit juice)'],
  ['<strong>Natural</strong>', 'Made of natural ingredients; not a health claim'],
  ['<strong>Source of / high in fibre</strong>', 'At least 3 g / 6 g per 100 g'],
  ['<strong>Organic</strong>', 'Produced to organic standards (limits on pesticides and additives); not necessarily lower in calories'],
])}
<h3>Hidden sugars and additives</h3>
<p>Sugar appears under many names: glucose syrup, dextrose, sucrose, fructose, maltose, invert sugar syrup, honey, agave, concentrated fruit juice. Additives (with E numbers) include preservatives, colours, sweeteners, emulsifiers and flavour enhancers. Approved additives are tested for safety, but a diet based on minimally processed foods naturally contains fewer.</p>
${quiz([
  ['How are ingredients ordered on a label?', 'By weight, largest first.'],
  ['What does "reduced fat" mean?', 'At least 30% less fat than the standard product.'],
  ['What is "high" sugar on a traffic-light label?', 'More than 22.5 g per 100 g.'],
])}`,
  },
  {
    id: 'exercise-nutrition', group: 'Applied nutrition', title: 'Nutrition for exercise',
    summary: 'Fuelling before, during and after exercise; protein shakes',
    body: `
${table(['Timing', 'Guidance'], [
  ['<strong>Daily carbohydrate</strong>', 'Light activity about 3–5 g/kg; moderate training (about 1 hour a day) 5–7 g/kg; endurance athletes 6–10 g/kg'],
  ['<strong>Before (2–4 hours)</strong>', 'A meal with carbohydrate, some protein, lower fat and fibre, e.g. porridge with fruit, or chicken and rice'],
  ['<strong>Before (30–60 minutes)</strong>', 'Optional small, easily digested snack, e.g. banana'],
  ['<strong>During</strong>', 'Under about 60 minutes: water is usually enough. Over 60–90 minutes: 30–60 g carbohydrate per hour (sports drink, gels, banana)'],
  ['<strong>After</strong>', 'Carbohydrate to refill glycogen (especially if training again within 24 hours) plus about 20–40 g protein for repair, within a couple of hours. Rehydrate'],
])}
<h3>Protein supplements</h3>
<ul>
  <li>Convenient, not essential: whole food can meet needs.</li>
  <li><strong>Whey</strong> (from milk): fast-digesting, rich in leucine. Concentrate (cheaper, some lactose and fat), isolate (purer, less lactose), hydrolysate (pre-digested, fastest, most expensive).</li>
  <li><strong>Casein</strong>: slow-digesting milk protein. Plant blends (pea, rice, soy) for vegans.</li>
  <li>Supplements can be contaminated with banned substances: athletes should use batch-tested products (e.g. Informed Sport).</li>
</ul>
<h3>Other common supplements</h3>
<p><strong>Creatine monohydrate</strong> (about 3–5 g a day) has strong evidence for improving strength and high-intensity performance. <strong>Caffeine</strong> (about 3 mg/kg, an hour before) improves performance for many people. Most "fat burners" are ineffective or unsafe.</p>
${quiz([
  ['What should a post-workout meal contain?', 'Carbohydrate to refuel, protein (about 20–40 g) for repair, and fluid.'],
  ['When is carbohydrate during exercise useful?', 'In sessions lasting over about 60–90 minutes.'],
  ['What is the difference between whey concentrate and isolate?', 'Isolate is more refined, with more protein and less lactose and fat.'],
])}`,
  },
  {
    id: 'weight-management', group: 'Applied nutrition', title: 'Energy balance & weight management',
    summary: 'BMR, TDEE, energy deficit, diet approaches compared',
    body: `
<h3>Energy balance</h3>
<ul>
  <li><strong>Energy in</strong> (food and drink) vs <strong>energy out</strong>.</li>
  <li>Total daily energy expenditure (TDEE) = <strong>basal metabolic rate (BMR)</strong> (about 60–70%) + <strong>thermic effect of food</strong> (about 10%; highest for protein) + <strong>activity</strong>: exercise plus non-exercise activity (NEAT: walking, fidgeting, chores), which varies hugely between people.</li>
  <li>An energy deficit leads to weight loss; a surplus, weight gain.</li>
  <li>A deficit of about 500 kcal a day typically gives roughly 0.5 kg loss a week. A safe, sustainable rate is about 0.5–1 kg a week.</li>
</ul>
<h3>Body fat</h3>
<ul>
  <li>Adipose tissue stores energy and releases hormones.</li>
  <li><strong>Distribution matters</strong>: fat stored around the abdomen and organs ("apple shape", visceral fat) carries higher risk of heart disease and type 2 diabetes than fat on the hips and thighs ("pear shape"). Waist measurement is a useful indicator.</li>
</ul>
<h3>Metabolic adaptation</h3>
<p>Long or severe dieting reduces energy expenditure (lower NEAT, lower BMR from lost tissue, hormonal changes that increase hunger). Very low-calorie diets also lose muscle. Moderate deficits, high protein, resistance training and diet breaks help.</p>

<h3>Diet approaches compared</h3>
${table(['Approach', 'Pros', 'Cons'], [
  ['<strong>Calorie counting</strong>', 'Precise; flexible food choice', 'Time-consuming; can become obsessive; ignores food quality'],
  ['<strong>Very low-calorie diets</strong> (under 800 kcal)', 'Rapid loss; used under medical supervision for obesity and type 2 diabetes', 'Hunger, fatigue, muscle loss, nutrient gaps, gallstones; must be supervised'],
  ['<strong>Meal replacements</strong>', 'Simple portion control', 'Doesn\'t teach new habits; regain is common'],
  ['<strong>Low-carbohydrate / ketogenic</strong>', 'Can reduce appetite; useful for some people with type 2 diabetes', 'Restrictive; low fibre; hard to sustain; may impair high-intensity exercise'],
  ['<strong>Intermittent fasting</strong> (e.g. 16:8, 5:2)', 'Simple structure; works for some', 'Not superior to other methods for weight loss; unsuitable for some (diabetes medication, history of disordered eating)'],
  ['<strong>Whole-food / Mediterranean-style</strong>', 'Nutritious; sustainable; good health evidence', 'Requires cooking and planning'],
])}
<p>The best approach is one the client can stick to that creates a moderate deficit while meeting nutrient needs.</p>

<h3>Practical guidance</h3>
<ul>
  <li>Base meals on vegetables, protein and high-fibre carbohydrate; limit sugary drinks, alcohol and ultra-processed snacks.</li>
  <li>Combine resistance training (keeps muscle), cardiovascular exercise and more daily movement.</li>
  <li>Focus on habits and behaviour change rather than quick fixes; track measurements and how clothes fit, not just weight.</li>
</ul>
${quiz([
  ['What are the three components of total daily energy expenditure?', 'Basal metabolic rate, thermic effect of food and physical activity (exercise plus NEAT).'],
  ['What weekly weight loss is generally considered safe?', 'About 0.5–1 kg.'],
  ['Why is abdominal (visceral) fat a concern?', 'It carries a higher risk of heart disease and type 2 diabetes.'],
  ['Why include resistance training when dieting?', 'To preserve muscle mass during an energy deficit.'],
])}`,
  },
  {
    id: 'disordered-eating', group: 'Applied nutrition', title: 'Disordered eating',
    summary: 'Recognising anorexia, bulimia and binge eating, and how to respond',
    body: `
${table(['Condition', 'Key features'], [
  ['<strong>Anorexia nervosa</strong>', 'Restricting food to keep weight very low, intense fear of gaining weight, distorted body image; may over-exercise. Signs: very low weight, tiredness, dizziness, feeling cold, hair thinning, missed periods'],
  ['<strong>Bulimia nervosa</strong>', 'Cycles of bingeing then compensating (vomiting, laxatives, fasting or excessive exercise). Weight often normal. Signs: swollen salivary glands, sore throat, tooth erosion, frequent trips to the toilet after meals, weight changes'],
  ['<strong>Binge eating disorder</strong>', 'Regular episodes of eating large amounts while feeling out of control, without compensating; feelings of guilt and shame'],
  ['<strong>Muscle dysmorphia</strong> ("bigorexia")', 'Preoccupation with not being muscular enough; compulsive training, rigid eating, possible steroid use'],
])}
<p>Eating disorders have serious health consequences, including heart rhythm problems, bone loss and, in severe cases, death. They affect all genders, ages and body sizes.</p>
${callout('warn', 'How to respond', '<ul><li>Don\'t diagnose, and don\'t comment on weight or shape.</li><li>Raise concerns privately and sensitively, focusing on wellbeing: "I\'ve noticed you seem very tired lately. How are you doing?"</li><li>Encourage them to see their GP; share support options (in the UK, the charity Beat).</li><li>Don\'t prescribe weight-loss programmes, calorie targets or extra exercise. Follow your workplace safeguarding policy and record your concerns.</li></ul>')}
${quiz([
  ['Name two physical signs of bulimia.', 'For example: swollen salivary glands, tooth erosion, sore throat, frequent weight changes.'],
  ['What should a trainer do if they suspect a client has an eating disorder?', 'Raise it privately and sensitively, avoid comments on weight, encourage a GP visit and follow safeguarding procedures.'],
])}`,
  },
  {
    id: 'nutrition-consultation', group: 'Applied nutrition', title: 'Collecting nutrition information',
    summary: 'Consultation setting, questionnaires, food diaries and analysis',
    body: `
<h3>The consultation</h3>
<ul>
  <li>A private, comfortable, quiet room; sit at an angle rather than across a desk.</li>
  <li>Build rapport; explain why you're asking; keep information confidential (GDPR).</li>
  <li>Use open questions and active listening; avoid judgement.</li>
</ul>
<h3>Tools</h3>
<ul>
  <li><strong>Questionnaires</strong>: eating habits, meal timing, food preferences, allergies or intolerances, alcohol, fluid intake, supplements, previous diets.</li>
  <li><strong>Food diaries</strong>: usually 3–7 days including at least one weekend day. Record everything eaten and drunk, amounts, brands, times, how it was cooked, and ideally mood or hunger. Encourage honesty: the aim is information, not judgement.</li>
</ul>
<h3>What to look for in a food diary</h3>
<ul>
  <li>Meal pattern: skipped breakfast? Long gaps? Late-night snacking?</li>
  <li>Fruit and vegetable portions and variety.</li>
  <li>Amount, quality and spread of protein.</li>
  <li>Carbohydrate type (refined vs wholegrain) and fibre.</li>
  <li>Fat sources (saturated vs unsaturated) and processed foods.</li>
  <li>Fluid intake, sugary drinks and alcohol.</li>
  <li>Compare with the Eatwell Guide and agree one or two small, specific changes at a time.</li>
</ul>
${quiz([
  ['How many days should a food diary usually cover?', '3–7 days, including at least one weekend day.'],
  ['What details should a food diary include?', 'Food and drink, amounts, brands, timing, cooking method (and ideally mood or hunger).'],
  ['How many changes should you suggest at once?', 'One or two small, specific changes.'],
])}`,
  },
];
