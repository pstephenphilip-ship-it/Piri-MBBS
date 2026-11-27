// Fitness & programme design — Level 3 Diploma syllabus (Units 1, 3 & 4), in our own words.
import { table, callout, quiz, ex, kb } from './_helpers.js';

export const TRAINING = [
  {
    id: 'components-of-fitness', group: 'Fitness concepts', title: 'Components of fitness',
    summary: 'Total fitness, health-related and skill-related components',
    body: `
<p>Fitness can be defined as the ability to meet the demands of your daily life and chosen activities without undue fatigue. What "fit" means depends on the person: a marathon for one client, carrying shopping up the stairs for another.</p>

<h3>Total fitness</h3>
<p>Physical fitness is one part of overall wellbeing. The wider model includes <strong>physical</strong>, <strong>mental/emotional</strong>, <strong>medical</strong> (free from illness), <strong>nutritional</strong> and <strong>social</strong> fitness. A personal trainer mainly influences physical and skill-related fitness, and supports the rest within their scope.</p>

<h3>Health-related (physical) components</h3>
${table(['Component', 'Definition', 'How to develop it'], [
  ['<strong>Cardiovascular fitness</strong> (aerobic endurance)', 'Ability of the heart, lungs and blood vessels to take in, transport and use oxygen', 'Continuous or interval aerobic exercise: walking, running, cycling, rowing, swimming'],
  ['<strong>Muscular strength</strong>', 'Maximum force a muscle or group can produce in one effort', 'Heavy resistance training (low reps)'],
  ['<strong>Muscular endurance</strong>', 'Ability of a muscle to contract repeatedly, or hold a contraction, without tiring', 'Lighter loads, higher reps, circuits'],
  ['<strong>Flexibility</strong>', 'The range of movement available at a joint (mobility is how freely and well the joint moves through it)', 'Stretching and full-range strength training'],
  ['<strong>Body composition</strong>', 'The proportion of fat mass to lean mass (muscle, bone, organs, water)', 'Exercise plus nutrition'],
])}
<p>Typical healthy body-fat ranges are roughly 10–20% for men and 20–30% for women (athletes are often lower). Essential fat is around 3% for men and 12% for women; going below this is unhealthy.</p>

<h3>Skill-related components</h3>
${table(['Component', 'Definition', 'Example'], [
  ['<strong>Speed</strong>', 'Moving the body or a body part quickly', 'Sprinting'],
  ['<strong>Power</strong>', 'Strength produced quickly (force × velocity)', 'Jumping, throwing, Olympic lifts'],
  ['<strong>Agility</strong>', 'Changing direction quickly while keeping control', 'Dodging in rugby'],
  ['<strong>Balance</strong>', 'Keeping the centre of mass over the base of support (static or dynamic)', 'Single-leg stance; walking on uneven ground'],
  ['<strong>Coordination</strong>', 'Moving several body parts smoothly and accurately together', 'Skipping, racket sports'],
  ['<strong>Reaction time</strong>', 'Time between a stimulus and the start of a response', 'Sprint start, catching'],
  ['<strong>Proprioception</strong> (kinaesthetic awareness)', 'Sensing where the body is in space without looking', 'Holding a neutral spine; landing safely'],
])}

${quiz([
  ['Name the five health-related components of fitness.', 'Cardiovascular fitness, muscular strength, muscular endurance, flexibility and body composition.'],
  ['What is the difference between strength and power?', 'Strength is maximal force; power is force produced quickly.'],
  ['Which skill-related component matters most for preventing falls in older adults?', 'Balance (with proprioception and reaction time).'],
  ['Define body composition.', 'The proportion of fat mass to lean mass in the body.'],
])}`,
  },
  {
    id: 'factors-fitness', group: 'Fitness concepts', title: 'Factors affecting fitness & somatotypes',
    summary: 'Age, sex, body type, lifestyle and other influences on results',
    body: `
<p>Two people on the same programme will get different results. Recognising why helps you set realistic goals.</p>
${table(['Factor', 'Influence'], [
  ['<strong>Age</strong>', 'Fitness potential peaks in the 20s to early 30s. With age come loss of muscle (sarcopenia) and bone, stiffer joints and slower recovery, although training slows all of these dramatically'],
  ['<strong>Sex</strong>', 'Men on average have more testosterone, muscle mass and absolute strength; women on average have more body fat and are more flexible. Both respond well to training'],
  ['<strong>Genetics and body type</strong>', 'Fibre-type mix, limb lengths and somatotype affect what a person is naturally suited to'],
  ['<strong>Nutrition</strong>', 'Adaptation needs enough energy, protein, carbohydrate, vitamins, minerals and fluid'],
  ['<strong>Lifestyle and activity</strong>', 'Activity outside sessions matters: a few hours\' training can\'t undo being sedentary for the remaining 165 hours a week'],
  ['<strong>Sleep and recovery</strong>', 'Adaptation happens during recovery; poor sleep limits progress'],
  ['<strong>Stress</strong>', 'Raises cortisol, impairs recovery, can raise blood pressure and trigger comfort eating'],
  ['<strong>Illness, injury and disability</strong>', 'May limit some activities, but most people can train with suitable adaptations'],
  ['<strong>Drugs and medication</strong>', 'Some medicines affect heart rate, BP, balance or energy (e.g. beta blockers). Alcohol, smoking and recreational drugs harm fitness and health'],
  ['<strong>Environment</strong>', 'Heat, cold, humidity, altitude and air pollution affect performance and safety'],
])}

<h3>Somatotypes (body types)</h3>
${table(['Type', 'Characteristics', 'Naturally suited to'], [
  ['<strong>Ectomorph</strong>', 'Lean, light frame, narrow shoulders and hips; finds it hard to gain weight', 'Endurance sports, high jump'],
  ['<strong>Mesomorph</strong>', 'Naturally muscular, broad shoulders, narrow waist; gains muscle easily', 'Power and strength sports, sprinting'],
  ['<strong>Endomorph</strong>', 'Rounder, wider hips, stores fat easily; often strong', 'Heavy throwing, weightlifting, front-row rugby'],
])}
<p>Most people are a mixture. Somatotype is useful for setting realistic expectations, not a limit on what clients can achieve.</p>

${quiz([
  ['Name four factors that affect a client\'s response to training.', 'For example: age, sex, genetics/somatotype, nutrition, sleep, stress, lifestyle, illness, medication, environment.'],
  ['Describe a mesomorph.', 'Naturally muscular and athletic, with broad shoulders and a narrow waist.'],
  ['Why should a trainer ask about medication?', 'Some medicines affect heart rate, blood pressure, balance or energy, changing how exercise should be monitored and planned.'],
])}`,
  },
  {
    id: 'activity-guidelines', group: 'Fitness concepts', title: 'Health benefits & activity guidelines',
    summary: 'UK Chief Medical Officers\' guidelines and benefits of activity',
    body: `
<h3>UK Chief Medical Officers' physical activity guidelines (2019)</h3>
${table(['Group', 'Guideline'], [
  ['<strong>Adults (19–64)</strong>', 'At least <strong>150 minutes of moderate</strong> or <strong>75 minutes of vigorous</strong> activity a week (or a mix), spread across the week. <strong>Muscle-strengthening</strong> activity on at least <strong>2 days</strong> a week. Minimise long periods of sitting'],
  ['<strong>Older adults (65+)</strong>', 'As adults, plus activities to improve <strong>balance, strength and flexibility</strong> at least 2 days a week to reduce falls. Some activity is better than none'],
  ['<strong>Children and young people (5–18)</strong>', 'An <strong>average of 60 minutes</strong> of moderate-to-vigorous activity a day across the week, including activities that strengthen muscles and bones'],
  ['<strong>Under-5s</strong>', 'At least 180 minutes of activity a day (with more energetic play for 3–4-year-olds)'],
  ['<strong>Pregnancy</strong>', '150 minutes of moderate activity a week plus muscle strengthening twice a week, if well'],
])}
<p>Moderate activity raises breathing and heart rate, but you can still talk. Vigorous activity makes it hard to say more than a few words.</p>

<h3>Benefits of regular physical activity</h3>
<ul>
  <li>Lower risk of early death, coronary heart disease, stroke, type 2 diabetes, high blood pressure and some cancers (including colon and breast).</li>
  <li>Stronger bones and muscles; fewer falls and fractures in older adults; less pain and disability from osteoarthritis.</li>
  <li>Helps prevent and manage obesity.</li>
  <li>Better mental health: reduced depression, anxiety and stress; better sleep, self-esteem and cognitive function.</li>
  <li>Better quality of life and independence in later life.</li>
</ul>
<p>Physical inactivity is one of the leading causes of preventable disease. The biggest health gains come from getting inactive people doing some activity.</p>

${quiz([
  ['What is the weekly aerobic activity guideline for adults?', '150 minutes of moderate or 75 minutes of vigorous activity, or a mix.'],
  ['How often should adults do muscle-strengthening activities?', 'At least 2 days a week.'],
  ['What extra recommendation applies to older adults?', 'Activities to improve balance, strength and flexibility at least twice a week.'],
  ['How much activity should children aged 5–18 do?', 'An average of 60 minutes of moderate-to-vigorous activity a day.'],
])}`,
  },
  {
    id: 'fitt', group: 'Programme design', title: 'Training principles & FITT',
    summary: 'Specificity, overload, progression, reversibility, recovery, individuality',
    body: `
<h3>Principles of training</h3>
${table(['Principle', 'Meaning', 'Example'], [
  ['<strong>Specificity</strong> (SAID: Specific Adaptations to Imposed Demands)', 'The body adapts specifically to the type of training done', 'To run further, run; to get stronger, lift heavier'],
  ['<strong>Progressive overload</strong>', 'Gradually increase the demand so the body keeps adapting', 'Add reps, sets or load; run further or faster'],
  ['<strong>Reversibility</strong> ("use it or lose it")', 'Fitness is lost when training stops', 'Aerobic fitness falls noticeably within a few weeks of stopping'],
  ['<strong>Recovery / adaptation</strong>', 'Improvements happen during rest, not during the session', 'Plan rest days and sleep; avoid overtraining'],
  ['<strong>Individuality</strong>', 'People respond differently, so programmes should suit the individual', 'Different exercise choice for a client with knee pain'],
  ['<strong>Variation</strong>', 'Changing the stimulus prevents plateaus and boredom', 'New exercises or rep ranges every 4–6 weeks'],
])}

<h3>FITT: the variables you can change</h3>
<ul>
  <li><strong>F</strong>requency: how often (sessions per week, or per muscle group).</li>
  <li><strong>I</strong>ntensity: how hard (load, %1RM, RPE, heart rate, speed).</li>
  <li><strong>T</strong>ime: how long (session duration, rest periods, time under tension).</li>
  <li><strong>T</strong>ype: which activity or exercise.</li>
</ul>
<p>Progress one variable at a time and by small amounts.</p>

<h3>Guidelines by goal (resistance training)</h3>
${table(['Goal', 'Intensity', 'Reps', 'Sets', 'Rest', 'Frequency per muscle'], [
  ['<strong>Strength</strong>', 'High: ≥85% 1RM', '1–6', '2–6', '2–5 min', '2–3 × week'],
  ['<strong>Hypertrophy</strong>', 'Moderate: about 67–85% 1RM', '6–12', '3–6', '30–90 s (up to 2 min)', '2 × week'],
  ['<strong>Muscular endurance</strong>', 'Low: ≤67% 1RM', '12–20+', '2–3', '30 s or less', '2–3 × week'],
  ['<strong>Power</strong>', '30–60% 1RM moved fast, or 75–90% for low-rep explosive lifts', '1–5', '3–5', '2–5 min', '2–3 × week'],
])}
<p>These are guides. Current research shows hypertrophy can happen across a wide range of loads when sets are taken close to failure.</p>

<h3>Guidelines for cardiovascular training</h3>
${table(['', 'Health', 'Improving fitness'], [
  ['Frequency', 'Most days (150 min/week)', '3–5 sessions a week'],
  ['Intensity', 'Moderate (RPE about 12–13 on 6–20; 3–6 METs)', 'Moderate to vigorous (about 60–90% max heart rate)'],
  ['Time', '10+ minute bouts, building to 30 min', '20–60 minutes'],
  ['Type', 'Rhythmic, large-muscle activity', 'Continuous, interval or fartlek'],
])}

${quiz([
  ['What does SAID stand for?', 'Specific Adaptations to Imposed Demands.'],
  ['What does FITT stand for?', 'Frequency, intensity, time, type.'],
  ['Give the typical rep range and rest for strength training.', '1–6 reps with 2–5 minutes\' rest, at 85% 1RM or more.'],
  ['What is reversibility?', 'The loss of fitness when training stops.'],
  ['When do training adaptations actually happen?', 'During recovery between sessions.'],
])}`,
  },
  {
    id: 'resistance-training', group: 'Programme design', title: 'Resistance training: terms & methods',
    summary: 'Reps, sets, RM, volume, compound vs isolation, advanced systems',
    body: `
<h3>Key terms</h3>
${table(['Term', 'Meaning'], [
  ['<strong>Repetition (rep)</strong>', 'One complete movement (lifting and lowering)'],
  ['<strong>Set</strong>', 'A group of reps done without rest'],
  ['<strong>Repetition maximum (RM)</strong>', 'The most weight that can be lifted for a given number of reps. 1RM = the heaviest single lift; 10RM = the most you can lift 10 times'],
  ['<strong>Intensity</strong>', 'How heavy the load is relative to maximum (%1RM), or how hard the effort feels (RPE or reps in reserve)'],
  ['<strong>Volume</strong>', 'Total work: sets × reps (× load)'],
  ['<strong>Tempo</strong>', 'Speed of each phase, e.g. 3-1-1 = 3 s lowering, 1 s pause, 1 s lifting'],
  ['<strong>Compound exercise</strong>', 'Movement at two or more joints, e.g. squat, deadlift, press-up, row, lunge'],
  ['<strong>Isolation exercise</strong>', 'Movement at one joint, e.g. biceps curl, leg extension, lateral raise'],
  ['<strong>Hypertrophy</strong>', 'Increase in muscle size'],
  ['<strong>Anabolism / catabolism</strong>', 'Building up / breaking down of tissue'],
])}

<h3>Types of resistance</h3>
<p>Free weights (barbells, dumbbells, kettlebells), fixed-path machines, cables, body weight, resistance bands, medicine balls, manual (partner) resistance, water.</p>
${table(['', 'Free weights', 'Machines'], [
  ['Advantages', 'Train stabilisers and coordination; functional; versatile; cheap', 'Easy to learn; safer for beginners; isolate muscles; quick to adjust'],
  ['Disadvantages', 'Need more skill and supervision; may need a spotter', 'Fixed path may not fit everyone; less stabiliser work; expensive'],
])}

<h3>Exercise order</h3>
<ul>
  <li>Large muscle groups before small; compound before isolation.</li>
  <li>Most technical or explosive exercises first, when fresh.</li>
  <li>Alternate upper and lower body, or push and pull, in circuits.</li>
  <li>Core and stabiliser-heavy work usually last, so stabilisers aren't pre-fatigued.</li>
</ul>

<h3>Programme structures</h3>
<ul>
  <li><strong>Whole body</strong>: all major muscles each session, 2–3 times a week. Best for beginners and general fitness.</li>
  <li><strong>Split routines</strong>: different body parts on different days (upper/lower, push/pull/legs). More volume per muscle; suits intermediate and advanced clients.</li>
</ul>

<h3>Advanced training systems</h3>
${table(['System', 'How it works'], [
  ['<strong>Pyramid</strong>', 'Load increases (and reps decrease) each set, or the reverse'],
  ['<strong>Superset (agonist)</strong>', 'Two exercises for the same muscle back to back, e.g. bench press then press-up'],
  ['<strong>Antagonist superset</strong>', 'Exercises for opposing muscles back to back, e.g. biceps curl then triceps pushdown. Saves time'],
  ['<strong>Pre-exhaust</strong>', 'An isolation exercise before a compound one for the same muscle, e.g. leg extension then squat'],
  ['<strong>Tri-set / giant set</strong>', 'Three / four or more exercises back to back'],
  ['<strong>Drop set</strong>', 'Continue a set after failure by reducing the load'],
  ['<strong>Forced reps</strong>', 'A spotter helps complete extra reps after failure'],
  ['<strong>Negatives (eccentric training)</strong>', 'Emphasise or overload the lowering phase, often with help on the lifting phase. Causes more soreness'],
  ['<strong>Circuit training</strong>', 'A series of exercises with minimal rest, often alternating body parts'],
])}
<p>Advanced systems increase fatigue and soreness. Use them with intermediate and advanced clients who have solid technique.</p>

${callout('pt', 'Spotting', `<p>Spot exercises with a risk of being trapped under the bar (bench press, ${ex('back-squat', 'squat')}). Agree the signal and number of reps beforehand, keep close with hands ready, assist only as much as needed, and never spot a load you can't manage. Spot dumbbell presses at the wrists or elbows, not the elbows alone.</p>`)}

${quiz([
  ['What is a 1RM?', 'The heaviest load that can be lifted for one repetition with good technique.'],
  ['Is a lunge compound or isolation?', 'Compound: it moves the hip, knee and ankle.'],
  ['What is an antagonist superset? Give an example.', 'Two exercises for opposing muscles back to back, e.g. a chest press then a seated row.'],
  ['What is the pre-exhaust system?', 'Doing an isolation exercise before a compound exercise for the same muscle.'],
  ['Which programme structure suits beginners best?', 'A whole-body routine 2–3 times a week.'],
])}`,
  },
  {
    id: 'cv-training', group: 'Programme design', title: 'Cardiovascular training & intensity',
    summary: 'Continuous, interval and fartlek; heart rate zones, RPE, talk test',
    body: `
<h3>Training methods</h3>
${table(['Method', 'Description', 'Best for'], [
  ['<strong>Continuous / steady state</strong> (long slow distance)', 'Same moderate intensity for 20+ minutes', 'Beginners; building an aerobic base; endurance'],
  ['<strong>Interval training</strong>', 'Alternating work and recovery periods. Work:rest ratios: about 1:3 or more for anaerobic intervals, 1:1 to 1:2 for aerobic intervals. Includes HIIT', 'Improving VO₂ max and lactate threshold; time-efficient'],
  ['<strong>Fartlek</strong> ("speed play")', 'Continuous exercise with unstructured changes of pace and terrain', 'Variety; field and team sports'],
  ['<strong>Circuit / cross training</strong>', 'Rotating between different machines or activities', 'Variety; reduces repetitive strain'],
])}

<h3>Monitoring intensity</h3>
<p><strong>Heart rate</strong></p>
<ul>
  <li>Estimated maximum heart rate (MHR) = <strong>220 − age</strong>. This can be wrong by 10–12 bpm either way; <strong>208 − (0.7 × age)</strong> (Tanaka) is more accurate in older adults.</li>
  <li><strong>Karvonen formula</strong> (heart rate reserve): target HR = ((MHR − resting HR) × % intensity) + resting HR. More individual because it accounts for fitness.</li>
</ul>
${table(['Zone', '% MHR', 'Feels like'], [
  ['Recovery / light', '50–60%', 'Easy, can chat freely'],
  ['Moderate (aerobic base)', '60–70%', 'Comfortable; can talk in sentences'],
  ['Aerobic / tempo', '70–80%', 'Breathing harder; short sentences'],
  ['Threshold', '80–90%', 'Hard; a few words only'],
  ['Maximal', '90–100%', 'Very hard; short intervals only'],
])}
<p>Example: a 40-year-old with a resting HR of 70 working at 70%: MHR 180; Karvonen = ((180 − 70) × 0.7) + 70 = <strong>147 bpm</strong>.</p>

<p><strong>Rating of perceived exertion (RPE)</strong></p>
<ul>
  <li><strong>Borg 6–20 scale</strong>: 6 = no exertion, 20 = maximal. Roughly, RPE × 10 ≈ heart rate in young adults. Moderate is about 12–14.</li>
  <li><strong>CR10 scale (0–10)</strong>: simpler for clients. Moderate about 4–6, vigorous 7–8.</li>
  <li>RPE is essential for clients on medication that affects heart rate (e.g. beta blockers) and for pregnant clients.</li>
</ul>

<p><strong>Talk test</strong></p>
${table(['Intensity', 'Response'], [
  ['Light', 'Can sing or chat easily'],
  ['Moderate', 'Can talk comfortably in sentences, but not sing'],
  ['Vigorous', 'Can only say a few words before needing a breath'],
])}

${callout('key', 'The "fat-burning zone" myth', '<p>Low-intensity exercise uses a higher <em>percentage</em> of fat, but higher-intensity exercise burns more total calories (and often more total fat) in the same time. For fat loss, total energy expenditure and diet matter most. The best intensity is the one the client can sustain and enjoy.</p>')}

${quiz([
  ['Estimate the maximum heart rate of a 50-year-old.', '170 bpm (220 − 50).'],
  ['Calculate a 60% Karvonen target for MHR 190 and resting HR 60.', '((190 − 60) × 0.6) + 60 = 138 bpm.'],
  ['What is fartlek training?', 'Continuous exercise with unstructured changes in pace, often over varied terrain.'],
  ['What does a moderate intensity feel like on the talk test?', 'You can talk in sentences but not sing.'],
  ['Why use RPE instead of heart rate for a client on beta blockers?', 'Beta blockers lower heart rate, so heart-rate targets would be misleading.'],
])}`,
  },
  {
    id: 'warmup', group: 'Programme design', title: 'Warm-ups & cool-downs',
    summary: 'Components and benefits; passive, general and specific warm-ups',
    body: `
<h3>Warm-up</h3>
<p>Prepares the body and mind for the main session and gradually raises intensity. Typical components:</p>
<ol>
  <li><strong>Pulse raiser</strong>: gradually increasing aerobic activity (e.g. 5–10 minutes on a bike or rower, or marching), raising heart rate and body temperature.</li>
  <li><strong>Mobility</strong>: moving the major joints through their range (shoulder circles, hip circles, spinal rotations).</li>
  <li><strong>Dynamic stretching / activation</strong>: controlled movements that stretch and switch on the muscles to be used (leg swings, walking lunges, band pull-aparts).</li>
  <li><strong>Specific preparation</strong>: rehearsing the main exercises with lighter loads (e.g. a warm-up set of squats).</li>
</ol>
<p>This is often summarised as <strong>RAMP</strong>: Raise, Activate and Mobilise, Potentiate.</p>

<h3>Benefits</h3>
<ul>
  <li>Higher muscle and core temperature: muscles contract and relax faster and more forcefully; reduced muscle viscosity.</li>
  <li>Vasodilation: more oxygen delivered to working muscles; smaller oxygen deficit.</li>
  <li>More synovial fluid and better joint range of movement.</li>
  <li>Faster nerve impulses: improved coordination and reaction time.</li>
  <li>Gradual rise in heart rate and blood pressure (safer for the heart).</li>
  <li>Mental preparation and rehearsal of skills.</li>
  <li>Probably a reduced risk of injury.</li>
</ul>

<h3>Types of warm-up</h3>
${table(['Type', 'Description'], [
  ['<strong>Passive</strong>', 'Raising temperature by external means (sauna, hot shower, heat pack, extra clothing). Limited value on its own'],
  ['<strong>General (active)</strong>', 'Whole-body activity such as jogging or light calisthenics'],
  ['<strong>Specific (active)</strong>', 'Movements matching the session at lower intensity, e.g. progressively heavier sets of the main lift'],
])}
<p>Warm up for longer in cold weather, for older or deconditioned clients, early in the morning, and before high-intensity or skill-heavy sessions.</p>

<h3>Cool-down</h3>
<ol>
  <li><strong>Pulse lowerer</strong>: gradually decreasing aerobic activity (5–10 minutes) so heart rate and breathing return towards resting.</li>
  <li><strong>Stretching</strong>: static stretches for the muscles used, held to maintain or develop flexibility.</li>
</ol>
<p>Benefits: prevents blood pooling and dizziness, helps clear metabolites, gradually lowers heart rate and temperature, and is a good time to improve flexibility and to review the session.</p>

${quiz([
  ['Name the components of a warm-up.', 'Pulse raiser, mobility, dynamic stretching/activation and specific preparation.'],
  ['Give three benefits of warming up.', 'For example: higher muscle temperature, more synovial fluid and range of movement, faster nerve impulses, better oxygen delivery, mental preparation.'],
  ['What is the main purpose of a pulse lowerer?', 'To gradually return heart rate towards resting and prevent blood pooling.'],
  ['What is a specific warm-up?', 'Performing the movements of the main session at lower intensity.'],
])}`,
  },
  {
    id: 'flexibility', group: 'Programme design', title: 'Flexibility & stretching',
    summary: 'Factors affecting flexibility, types of stretching, when to use them',
    body: `
<p><strong>Flexibility</strong> is the range of movement (ROM) at a joint. It depends on joint structure, the length and extensibility of muscles and connective tissue, and the nervous system's tolerance of stretch.</p>

<h3>Factors affecting flexibility</h3>
<ul>
  <li><strong>Joint structure</strong>: bone shape and ligaments (e.g. a "bony block").</li>
  <li><strong>Age</strong>: flexibility decreases as tissues stiffen.</li>
  <li><strong>Sex</strong>: women are generally more flexible.</li>
  <li><strong>Temperature</strong>: warm tissues stretch more easily.</li>
  <li><strong>Activity history</strong>: repetitive limited-range activities (running, cycling, long periods of sitting) can lead to <strong>adaptive shortening</strong>; full-range training maintains or improves ROM.</li>
  <li><strong>Genetics</strong>: some people are naturally hypermobile.</li>
  <li><strong>Pregnancy</strong>: relaxin increases laxity.</li>
  <li><strong>Body mass, injury, scar tissue and clothing</strong> (e.g. high heels).</li>
</ul>

<h3>Types of stretching</h3>
${table(['Type', 'Description', 'When to use'], [
  ['<strong>Static: maintenance</strong>', 'Move to the point of mild tension and hold about 10–15 seconds', 'Cool-down for muscles already at a good length'],
  ['<strong>Static: developmental</strong>', 'Hold about 10 s, then ease further as tension fades; total 30 s or more, repeated', 'Cool-down or separate sessions, to improve ROM in tight muscles'],
  ['<strong>Dynamic</strong>', 'Controlled movement through the full range without holding, e.g. leg swings, walking lunges', 'Warm-ups; preparing for sport'],
  ['<strong>Ballistic</strong>', 'Bouncing or swinging beyond the normal range using momentum', 'Generally not recommended; only for specific sports, with experience. Triggers the stretch reflex and risks injury'],
  ['<strong>Active</strong>', 'The person holds the stretch using their own muscles (often the antagonist)', 'Any time; builds control'],
  ['<strong>Passive</strong>', 'An external force (partner, strap, gravity, machine) holds the stretch', 'Developmental work; relaxed cool-downs. Partners must apply force slowly and communicate'],
  ['<strong>PNF</strong> (proprioceptive neuromuscular facilitation)', 'Stretch, then contract the stretched muscle isometrically for about 6–10 s, relax, then stretch further (contract-relax)', 'Fastest ROM gains; trained clients, with a competent partner'],
])}
<p>Long static stretches (over about 60 s) just before power or strength work can slightly reduce performance, so use dynamic stretches in warm-ups. Short static stretches to correct a specific restriction (e.g. tight calves before squats) are fine.</p>

<h3>Benefits of stretching</h3>
<p>Improved or maintained ROM; easier daily movement and exercise technique; relaxation; may reduce some postural strain. Evidence that stretching prevents injuries or DOMS is weak.</p>

${callout('warn', 'When not to stretch (or take care)', `<ul>
<li>Over a recent fracture or acutely inflamed, infected or injured tissue.</li>
<li>When a bony block limits movement, or the joint is hypermobile: focus on strength and control instead.</li>
<li>Pregnancy and the postnatal period: avoid developmental and ballistic stretches; stay in comfortable ranges.</li>
<li>Stop if there is sharp pain, cramp, or numbness/tingling.</li>
<li>Osteoporosis: avoid forced end-range spinal flexion and rotation.</li>
</ul>`)}

${quiz([
  ['What is adaptive shortening?', 'Muscles adapting to a shortened length through repetitive limited-range activity or prolonged positions.'],
  ['How long is a maintenance stretch held?', 'About 10–15 seconds.'],
  ['Which type of stretching suits a warm-up best?', 'Dynamic stretching.'],
  ['Why is ballistic stretching generally not recommended?', 'It uses momentum past the normal range, triggering the stretch reflex and increasing injury risk.'],
  ['Briefly describe PNF stretching.', 'Stretch the muscle, contract it isometrically against resistance, relax, then stretch it further.'],
])}`,
  },
  {
    id: 'periodisation', group: 'Programme design', title: 'Progression & periodisation',
    summary: 'Training status, periodisation cycles, plateaus and overtraining',
    body: `
<h3>Progression by training status</h3>
${table(['Status', 'Typical experience', 'Programme approach'], [
  ['<strong>Beginner</strong>', 'Under about 6 months of regular training', 'Learn technique; whole-body sessions 2–3 times a week; 1–3 sets; machines and simple free-weight moves; progress quickly but conservatively'],
  ['<strong>Intermediate</strong>', 'About 6 months to 2 years', 'More sets and variety; split routines possible; introduce some advanced systems'],
  ['<strong>Advanced</strong>', '2+ years of consistent training', 'Higher volume and intensity; planned periodisation; advanced systems; progress is slower'],
])}
<p>Beginners improve from almost any sensible programme. Gains slow as clients approach their potential, so planning becomes more important.</p>

<h3>Periodisation</h3>
<p>Planning training in phases so the client keeps progressing, peaks at the right time and recovers adequately.</p>
${table(['Cycle', 'Length', 'Example'], [
  ['<strong>Macrocycle</strong>', 'Usually a year (or the time to a major goal)', 'Preparing for a marathon or wedding'],
  ['<strong>Mesocycle</strong>', 'About 4–6 weeks (sometimes up to 12)', 'A hypertrophy phase, then a strength phase'],
  ['<strong>Microcycle</strong>', 'Usually 1 week', 'The weekly training plan'],
])}
<ul>
  <li><strong>Linear periodisation</strong>: gradually moving from higher volume and lower intensity towards lower volume and higher intensity.</li>
  <li><strong>Undulating periodisation</strong>: varying volume and intensity within the week (e.g. heavy, moderate and light days).</li>
  <li><strong>Deload</strong>: a lighter week every 3–6 weeks to recover.</li>
</ul>

<h3>Overtraining</h3>
<p>Doing too much, too often, without enough recovery (made worse by poor sleep, diet and life stress).</p>
<ul>
  <li><strong>Signs</strong>: falling performance, persistent fatigue and soreness, raised resting heart rate, poor sleep, irritability or low mood, loss of appetite, frequent colds, more injuries.</li>
  <li><strong>Response</strong>: reduce volume and intensity, prioritise sleep and nutrition, and review the plan.</li>
</ul>

${quiz([
  ['What is a mesocycle?', 'A training block of about 4–6 weeks with a specific focus.'],
  ['What is the purpose of periodisation?', 'To plan progressive phases that avoid plateaus and overtraining and help peak at the right time.'],
  ['List three signs of overtraining.', 'For example: falling performance, persistent fatigue, raised resting heart rate, poor sleep, low mood, frequent illness.'],
  ['What is a deload?', 'A planned lighter week to allow recovery.'],
])}`,
  },
  {
    id: 'programme-design', group: 'Programme design', title: 'Designing a programme',
    summary: 'Step-by-step process and example weekly plans',
    body: `
<h3>The process</h3>
<ol>
  <li><strong>Screen</strong>: PAR-Q, health questions, consent. Refer if needed (see ${kb('assessment', 'parq', 'screening')}).</li>
  <li><strong>Gather information</strong>: goals, lifestyle, exercise history, likes and dislikes, time available, barriers.</li>
  <li><strong>Assess</strong>: measurements and fitness tests suited to the client and their goals.</li>
  <li><strong>Set SMART goals</strong> together (see ${kb('coaching', 'smart', 'goal setting')}).</li>
  <li><strong>Design</strong>: choose methods and exercises, apply FITT and the principles of training, plan warm-up and cool-down.</li>
  <li><strong>Deliver, monitor and review</strong>: record each session, re-test every 4–8 weeks, and adjust.</li>
</ol>

<h3>Example weekly plans</h3>
${table(['Day', 'Sedentary beginner', 'Intermediate'], [
  ['Mon', 'Whole-body resistance + 15 min easy cardio', 'Upper body resistance'],
  ['Tue', 'Rest or 20–30 min walk', 'Interval cardio (20–25 min)'],
  ['Wed', 'Whole-body resistance', 'Lower body resistance'],
  ['Thu', 'Rest or walk', 'Rest or mobility'],
  ['Fri', 'Cardio 20–30 min + stretching', 'Upper body resistance'],
  ['Sat', 'Active leisure (swim, walk)', 'Lower body + 30 min steady cardio'],
  ['Sun', 'Rest', 'Rest'],
])}

<h3>Recording a programme</h3>
<p>For each exercise, record: name, sets, reps, load, rest, tempo and teaching points. Include the warm-up, cool-down, intensity targets, and how and when the programme will progress. Note the muscles worked, joint actions and whether each exercise is compound or isolation.</p>

<h3>Group and circuit training</h3>
<ul>
  <li><strong>Advantages</strong>: social and motivating, cost-effective, easy to adapt by changing the work and rest.</li>
  <li><strong>Formats</strong>: timed circuits (e.g. 30 s work, 30 s rest), rep-based circuits, cardio circuits, floor-based or sports-skill circuits.</li>
  <li><strong>Planning</strong>: alternate muscle groups (upper, lower, core, cardio); give easier and harder options at each station; clear layout and space; demonstrate first; monitor everyone.</li>
</ul>

${quiz([
  ['List the main steps of programme design.', 'Screen, gather information, assess, set goals, design, then deliver, monitor and review.'],
  ['How often should a programme be reviewed?', 'Continually, with formal re-tests about every 4–8 weeks.'],
  ['Give two ways to make a circuit station harder.', 'For example: longer work periods, shorter rests, heavier load, more complex exercise.'],
])}`,
  },
  {
    id: 'posture', group: 'Programme design', title: 'Exercise & posture',
    summary: 'Common postural patterns and how to programme for them',
    body: `
<p>Posture is how the body is aligned and held. Long periods of sitting, repetitive work or sport, and unbalanced training can all shape habitual posture.</p>
${table(['Common pattern', 'Often associated with', 'Programme ideas'], [
  ['<strong>Rounded shoulders, forward head, increased thoracic kyphosis</strong>', 'Desk work, phone use, pressing-heavy programmes', 'Strengthen upper back (rows, face pulls, reverse flys), lower trapezius and deep neck flexors; stretch chest and front of shoulders; thoracic mobility'],
  ['<strong>Increased lumbar lordosis with anterior pelvic tilt</strong>', 'Prolonged sitting, pregnancy', 'Strengthen glutes and abdominals; stretch hip flexors'],
  ['<strong>Flat back / posterior pelvic tilt</strong>', 'Slumped sitting', 'Strengthen back extensors and hip flexors; hamstring mobility'],
])}
<p>Good programme habits for posture:</p>
<ul>
  <li>Balance pushing and pulling, and front and back.</li>
  <li>Use full ranges of movement and standing, compound, free-weight exercises where suitable.</li>
  <li>Include mobility for the thoracic spine and hips.</li>
  <li>Encourage regular breaks from sitting.</li>
</ul>
<p>Remember that posture is only weakly linked to pain. Present it as something to improve for comfort and performance, not as something "wrong" with the client.</p>
${quiz([
  ['Which muscles would you typically strengthen for rounded shoulders?', 'Upper back muscles: rhomboids, middle and lower trapezius, rear deltoids, plus deep neck flexors.'],
  ['What is a simple programme rule to support good posture?', 'At least as much pulling as pushing (balance front and back).'],
])}`,
  },
];
