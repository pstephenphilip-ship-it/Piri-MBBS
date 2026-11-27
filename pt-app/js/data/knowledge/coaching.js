// Consultation & coaching, and screening & assessment — Level 3 Diploma syllabus, in our own words.
import { table, callout, quiz, kb } from './_helpers.js';

export const COACHING = [
  {
    id: 'communication', group: 'Consultation', title: 'Communication & building relationships',
    summary: 'Rapport, active listening, questioning, professional boundaries',
    body: `
<h3>First impressions and rapport</h3>
<ul>
  <li>Be punctual, professionally dressed and prepared; greet the client by name.</li>
  <li>Find common ground and show genuine interest; match the client's pace and tone.</li>
  <li>Explain what will happen and why, especially in the first session.</li>
</ul>
<h3>Communication skills</h3>
${table(['Skill', 'What it looks like'], [
  ['<strong>Active listening</strong>', 'Full attention, eye contact, nodding, not interrupting, reflecting back what you heard'],
  ['<strong>Open questions</strong>', '"What would you like to achieve?" "How did that feel?" Encourage detail'],
  ['<strong>Closed questions</strong>', '"Do you have any injuries?" For quick facts or confirmation'],
  ['<strong>Paraphrasing and summarising</strong>', '"So what you\'re saying is…" Shows understanding and checks accuracy'],
  ['<strong>Body language</strong>', 'Open posture, appropriate distance, sitting at an angle rather than face-on across a desk'],
  ['<strong>Empathy</strong>', 'Acknowledge feelings without judgement'],
  ['<strong>Clear language</strong>', 'Avoid jargon; adapt to the client\'s understanding'],
])}
<h3>Barriers to communication</h3>
<p>Noise and distractions, jargon, hearing or sight impairment, language differences, anxiety, assumptions, poor timing (e.g. mid-set).</p>
<h3>Professional boundaries and ethics</h3>
<ul>
  <li>Work within your qualifications: don't diagnose, treat injuries or prescribe diets for medical conditions. Refer to GPs, physiotherapists or dietitians.</li>
  <li>Touch only when justified (e.g. spotting, correcting technique), always ask permission first and explain why.</li>
  <li>Keep information confidential and stored securely (UK GDPR).</li>
  <li>Keep the relationship professional; follow your governing body's code of conduct (e.g. CIMSPA).</li>
  <li>Treat all clients fairly and inclusively, without discrimination.</li>
</ul>
${quiz([
  ['Give an example of an open question.', 'For example: "What does a typical day look like for you?"'],
  ['What is active listening?', 'Giving full attention, showing you are listening and reflecting back what was said.'],
  ['When is it appropriate to touch a client?', 'When justified (e.g. spotting or technique correction), after asking permission and explaining why.'],
])}`,
  },
  {
    id: 'stages-change', group: 'Behaviour change', title: 'Stages of change & motivation',
    summary: 'Transtheoretical model, intrinsic and extrinsic motivation',
    body: `
<h3>The stages of change (transtheoretical model)</h3>
${table(['Stage', 'Client is…', 'How to help'], [
  ['<strong>Pre-contemplation</strong>', 'Not thinking about changing in the next 6 months', 'Raise awareness of benefits gently; don\'t push'],
  ['<strong>Contemplation</strong>', 'Thinking about changing, but undecided', 'Discuss pros and cons; address barriers; build confidence'],
  ['<strong>Preparation</strong>', 'Planning to start soon; may have taken small steps', 'Help set goals and make a realistic plan'],
  ['<strong>Action</strong>', 'Actively exercising (under 6 months)', 'Support, feedback, problem-solving; prevent drop-out'],
  ['<strong>Maintenance</strong>', 'Exercising regularly for 6+ months', 'Variety, new goals, independence'],
  ['<strong>Relapse</strong>', 'Has slipped back', 'Normalise it; identify triggers; restart with small steps'],
])}
<h3>Motivation</h3>
<ul>
  <li><strong>Intrinsic</strong>: doing it for its own sake: enjoyment, satisfaction, feeling good. Lasts longest.</li>
  <li><strong>Extrinsic</strong>: external rewards: appearance, praise, prizes, medical advice. Useful to start but less durable.</li>
</ul>
<p>Common reasons people exercise: health, appearance, weight management, stress relief, social contact, sport performance, medical referral, job requirements.</p>
<h3>Decision balance</h3>
<p>A simple exercise: list the benefits and drawbacks of becoming active. Helping clients see benefits that matter to them personally (sleeping better, keeping up with children) tips the balance.</p>
${quiz([
  ['A client says they know they should exercise but "aren\'t sure it\'s for them". Which stage are they in?', 'Contemplation.'],
  ['How should you respond to a client who has relapsed?', 'Normalise it, explore what caused it, and restart with small achievable steps.'],
  ['What is the difference between intrinsic and extrinsic motivation?', 'Intrinsic comes from within (enjoyment); extrinsic comes from external rewards.'],
])}`,
  },
  {
    id: 'smart', group: 'Behaviour change', title: 'Goal setting',
    summary: 'SMART(ER) goals, short, medium and long term, reviewing goals',
    body: `
<h3>SMART goals</h3>
${table(['Letter', 'Meaning', 'Example question'], [
  ['<strong>S</strong>pecific', 'Clear and precise', 'What exactly do you want to achieve?'],
  ['<strong>M</strong>easurable', 'Progress can be tracked', 'How will we know you\'ve achieved it?'],
  ['<strong>A</strong>greed / Achievable', 'Agreed between client and trainer, and attainable', 'Are we both happy with this target?'],
  ['<strong>R</strong>ealistic / Relevant', 'Fits their life, ability and what matters to them', 'Is this possible with your time and commitments?'],
  ['<strong>T</strong>ime-bound', 'Has a deadline', 'By when?'],
])}
<p>Some versions add <strong>E</strong>xciting / Evaluated and <strong>R</strong>ecorded / Reviewed (SMARTER).</p>
<p>Example: "Walk 5 km without stopping by 30 June, training 3 times a week" rather than "get fitter".</p>

<h3>Types of goal</h3>
${table(['Type', 'Timeframe', 'Example'], [
  ['<strong>Short term</strong>', 'Up to about 1 month', 'Attend 3 sessions a week for 4 weeks'],
  ['<strong>Medium term</strong>', 'About 1–6 months', 'Lose 5 cm from waist in 3 months'],
  ['<strong>Long term</strong>', '6 months or more', 'Complete a half marathon next spring'],
])}
<ul>
  <li><strong>Outcome goals</strong>: the end result (lose 6 kg).</li>
  <li><strong>Process / behaviour goals</strong>: the actions that lead there (eat vegetables with two meals a day). These are within the client's control and are especially useful for beginners.</li>
  <li><strong>Performance goals</strong>: improving personal measures (deadlift 100 kg).</li>
</ul>
<h3>Reviewing goals</h3>
<p>Review progress regularly (e.g. every 4–8 weeks). Celebrate achievements, adjust goals that prove too easy or too hard, and set new ones to keep motivation.</p>
${quiz([
  ['What does SMART stand for?', 'Specific, measurable, agreed/achievable, realistic/relevant, time-bound.'],
  ['Rewrite "I want to get stronger" as a SMART goal.', 'For example: "Increase my goblet squat from 12 kg to 20 kg for 8 reps by the end of March, training twice a week."'],
  ['Why are process goals useful?', 'They focus on actions within the client\'s control, building habits.'],
])}`,
  },
  {
    id: 'barriers-adherence', group: 'Behaviour change', title: 'Barriers & exercise adherence',
    summary: 'Common barriers and strategies to keep clients exercising',
    body: `
<p>Around half of people who start an exercise programme drop out within about 6 months, so adherence is a core part of a trainer's job.</p>
${table(['Barrier', 'Strategies'], [
  ['<strong>Lack of time</strong>', 'Short, efficient sessions; home workouts; active commuting; schedule sessions like appointments'],
  ['<strong>Cost</strong>', 'Home or outdoor options, small-group sessions, free community activities'],
  ['<strong>Low confidence / self-consciousness</strong>', 'Quiet times or private spaces; simple exercises with quick success; lots of positive feedback'],
  ['<strong>Lack of motivation or enjoyment</strong>', 'Choose activities they like; variety; set meaningful goals; track progress visibly'],
  ['<strong>Tiredness, illness, injury</strong>', 'Adapt rather than cancel; lower intensity; refer if needed'],
  ['<strong>Family and work commitments</strong>', 'Involve family; flexible times; plan around shifts'],
  ['<strong>Access and transport</strong>', 'Exercise close to home or work; online sessions'],
  ['<strong>Previous bad experiences</strong>', 'Listen, start gently, explain why each exercise is included'],
])}
<h3>Other adherence strategies</h3>
<ul>
  <li>Rewards and incentives tied to process goals (new trainers after 12 weeks of consistent attendance).</li>
  <li>Social support: exercise buddies, groups, community.</li>
  <li>Self-monitoring: diaries, apps, wearables.</li>
  <li>Regular reviews and re-tests to show progress.</li>
  <li>Plan for setbacks ("if I miss Monday, I'll go Tuesday").</li>
  <li>Make sessions enjoyable, and avoid excessive soreness early on.</li>
</ul>
${quiz([
  ['Name three common barriers to exercise.', 'For example: time, cost, low confidence, lack of motivation, family commitments, access.'],
  ['How could you help a client who says they have no time?', 'Short efficient sessions, home workouts, active commuting, scheduling sessions in advance.'],
])}`,
  },
  {
    id: 'customer-care', group: 'Consultation', title: 'Customer care & complaints',
    summary: 'Service, positive relationships and handling complaints',
    body: `
<ul>
  <li>Customers include members, clients, visitors and colleagues (internal customers).</li>
  <li>Good service: be approachable, responsive and consistent; know your facility; follow up on promises.</li>
  <li>A customer-friendly attitude: <strong>consideration</strong>, <strong>active listening</strong>, <strong>responsiveness</strong> and <strong>empathy</strong>.</li>
</ul>
<h3>Handling complaints</h3>
<ol>
  <li>Listen without interrupting; stay calm.</li>
  <li>Acknowledge the problem and thank them for raising it.</li>
  <li>Use assertive, not aggressive, language: calm, clear, respectful.</li>
  <li>Find out what they would like to happen; agree a solution or explain what you'll do.</li>
  <li>Act, follow up and record it according to policy; pass on what's outside your authority.</li>
</ol>
${quiz([
  ['What are four elements of a customer-friendly attitude?', 'Consideration, active listening, responsiveness and empathy.'],
  ['What is the first step when handling a complaint?', 'Listen calmly without interrupting.'],
])}`,
  },
];

export const ASSESSMENT = [
  {
    id: 'parq', group: 'Screening', title: 'Health screening & PAR-Q',
    summary: 'Purpose of screening, PAR-Q, informed consent, when to refer',
    body: `
<p>Screening identifies clients for whom exercise may carry extra risk, so you can refer them or adapt the programme. It is also part of your duty of care and insurance requirements.</p>
<h3>Stage 1: screening the client</h3>
<ul>
  <li><strong>PAR-Q</strong> (Physical Activity Readiness Questionnaire): short yes/no health questions about heart conditions, chest pain, dizziness, chronic conditions, medication and joint problems. The current version is the PAR-Q+, which has follow-up questions for people who answer "yes".</li>
  <li>Any "yes" answer means the client should seek advice from their GP before starting or significantly increasing activity, unless the follow-up questions clear them.</li>
  <li>Some facilities use a <strong>health commitment statement (HCS)</strong> instead, in which members confirm they take responsibility for seeking advice if needed.</li>
  <li><strong>Informed consent</strong>: the client confirms they understand what the programme and any tests involve, the risks, and that they can stop at any time.</li>
  <li>Re-screen if the client's health changes and at regular reviews (e.g. annually).</li>
</ul>
<h3>Reasons to delay exercise and refer</h3>
<ul>
  <li>Resting blood pressure of 160/100 mmHg or more (or per your organisation's policy).</li>
  <li>Chest pain, unexplained breathlessness, dizziness or fainting.</li>
  <li>Uncontrolled diabetes, recent heart attack or surgery, acute illness or fever.</li>
  <li>Unexplained joint swelling, or pain that hasn't been assessed.</li>
  <li>Pregnancy complications.</li>
</ul>
${callout('pt', 'In this app', `<p>Each client has a PAR-Q and a consent tab. A "Yes" answer flags the client so you can see at a glance who needs medical clearance.</p>`)}
${quiz([
  ['What does PAR-Q stand for?', 'Physical Activity Readiness Questionnaire.'],
  ['What should happen if a client answers "yes" on a PAR-Q?', 'They should seek medical advice before starting or increasing exercise (unless PAR-Q+ follow-up questions clear them).'],
  ['What is informed consent?', 'The client\'s agreement after understanding what is involved, the risks, and their right to stop.'],
])}`,
  },
  {
    id: 'client-info', group: 'Screening', title: 'Gathering client information',
    summary: 'Lifestyle, history, goals, preferences and readiness',
    body: `
<h3>Stage 2: what to find out</h3>
${table(['Area', 'Examples'], [
  ['<strong>Personal details</strong>', 'Age, contact details, emergency contact, GP details'],
  ['<strong>Medical history</strong>', 'Conditions, medication, injuries, surgery, pregnancy, family history of heart disease'],
  ['<strong>Lifestyle</strong>', 'Occupation (sitting or active), sleep, stress, smoking, alcohol, diet, daily activity'],
  ['<strong>Exercise history</strong>', 'Current and past activity, experiences (good and bad), skills'],
  ['<strong>Goals and motivation</strong>', 'What they want and why; stage of change; confidence'],
  ['<strong>Preferences and practicalities</strong>', 'Likes and dislikes, time available, budget, equipment access, barriers'],
  ['<strong>Clothing and footwear</strong>', 'Suitable for the planned activity'],
])}
<p>Use questionnaires, interview (open questions) and observation. Record information accurately and store it securely and confidentially.</p>
${quiz([
  ['Why ask about a client\'s occupation?', 'It shows how active or sedentary their day is and possible postural or repetitive stresses.'],
  ['Name three lifestyle factors to ask about.', 'For example: sleep, stress, smoking, alcohol, diet, occupation.'],
])}`,
  },
  {
    id: 'body-comp', group: 'Measurements & tests', title: 'Body measurements',
    summary: 'BMI, waist circumference, waist-to-hip ratio, body fat',
    body: `
<h3>Body mass index (BMI)</h3>
<p><strong>BMI = weight (kg) ÷ height (m)²</strong>. Example: 80 kg, 1.75 m → 80 ÷ 3.06 = 26.1.</p>
${table(['BMI', 'Classification'], [
  ['Below 18.5', 'Underweight'],
  ['18.5–24.9', 'Healthy weight'],
  ['25–29.9', 'Overweight'],
  ['30–34.9', 'Obese (class I)'],
  ['35–39.9', 'Obese (class II)'],
  ['40 or more', 'Obese (class III)'],
])}
<p>Limitations: doesn't distinguish muscle from fat (muscular people score "overweight"), or show where fat is stored. Lower thresholds are used for some ethnic groups (e.g. South Asian, Chinese, Black African and Caribbean people have higher risk at lower BMIs). Present results sensitively: the labels can upset clients.</p>

<h3>Waist circumference</h3>
<p>Measure midway between the lowest rib and the top of the hip bone, after a normal breath out.</p>
${table(['', 'Increased risk', 'High risk'], [
  ['Men', '94 cm or more', '102 cm or more'],
  ['Women', '80 cm or more', '88 cm or more'],
])}
<p>NICE also recommends a <strong>waist-to-height ratio</strong> below 0.5 (keep your waist to less than half your height).</p>

<h3>Waist-to-hip ratio</h3>
<p>Waist ÷ hip (widest part of the buttocks). Higher risk above about 0.90 for men and 0.85 for women.</p>

<h3>Other measurements</h3>
<ul>
  <li><strong>Circumferences</strong> (chest, arm, hips, thigh): use the same landmark, same side and tape tension each time.</li>
  <li><strong>Body fat estimates</strong>: skinfold callipers, bioelectrical impedance scales (affected by hydration), DEXA scans (accurate, expensive).</li>
  <li>Progress photos (with consent) and how clothes fit.</li>
</ul>
${quiz([
  ['Calculate BMI for 90 kg and 1.80 m.', '90 ÷ 3.24 = 27.8 (overweight).'],
  ['Give two limitations of BMI.', 'Doesn\'t distinguish muscle from fat, doesn\'t show fat distribution (and varies in accuracy across ethnic groups).'],
  ['What waist measurement indicates high risk for women?', '88 cm or more.'],
])}`,
  },
  {
    id: 'bp-hr', group: 'Measurements & tests', title: 'Resting heart rate & blood pressure',
    summary: 'How to measure, classification, factors affecting readings',
    body: `
<h3>Resting heart rate (RHR)</h3>
<ul>
  <li>Measure after at least 5 minutes of quiet sitting or lying (ideally first thing in the morning).</li>
  <li>Use the radial pulse (thumb side of the wrist) with two fingers (not the thumb), count for 30 seconds and double it, or count a full 60 seconds; or use a heart-rate monitor.</li>
  <li>Avoid the carotid pulse, as pressing on it can slow the heart.</li>
</ul>
${table(['Rating (approximate)', 'Men (bpm)', 'Women (bpm)'], [
  ['Excellent / athletic', 'Below 56', 'Below 61'],
  ['Good', '56–65', '61–69'],
  ['Average', '66–73', '70–77'],
  ['Below average / poor', '74 or above', '78 or above'],
])}
<p>Factors raising RHR: stress, caffeine, nicotine, dehydration, recent exercise or a meal, illness, heat, some medicines. Beta blockers lower it.</p>

<h3>Blood pressure</h3>
<ul>
  <li>Use a validated automatic monitor with the correct cuff size on the bare upper arm, at heart level.</li>
  <li>Client seated, back supported, feet flat, legs uncrossed, after 5 minutes' rest without talking. No caffeine, smoking or exercise for 30 minutes beforehand.</li>
  <li>Take two or three readings a minute apart and record the average.</li>
  <li>See ${kb('physiology', 'blood-pressure', 'blood pressure')} for classifications and referral thresholds.</li>
</ul>
${quiz([
  ['How long should a client rest before RHR is measured?', 'At least 5 minutes.'],
  ['Why avoid the carotid pulse?', 'Pressing on it can slow the heart rate.'],
  ['Name three factors that raise resting heart rate.', 'For example: stress, caffeine, smoking, dehydration, illness, recent exercise.'],
])}`,
  },
  {
    id: 'fitness-tests', group: 'Measurements & tests', title: 'Fitness tests',
    summary: 'Rockport walk, press-up, curl-up, sit and reach; test protocol and termination',
    body: `
<h3>Before testing</h3>
<ul>
  <li>Choose tests relevant to the client's goals and suitable for their health and ability.</li>
  <li>Explain the procedure and get informed consent. Standardise conditions so re-tests are fair (same time of day, warm-up, equipment).</li>
  <li>Retest every 4–8 weeks to show progress.</li>
</ul>
${table(['Component', 'Test', 'Protocol summary'], [
  ['Cardiovascular', '<strong>Rockport 1-mile walk test</strong>', 'Walk 1 mile (1.6 km) as fast as possible on a flat course. Record time and heart rate at the finish. VO₂ max is estimated from age, body weight, sex, time and heart rate. Good for beginners and older adults'],
  ['Cardiovascular', '<strong>Step test / cycle ergometer test / multistage fitness (bleep) test</strong>', 'Submaximal step and bike tests use heart-rate response; the bleep test is maximal (fit clients only)'],
  ['Muscular endurance', '<strong>Press-up test</strong>', 'Max consecutive press-ups with good form (full or from the knees for modified version); compare with age and sex norms'],
  ['Muscular endurance', '<strong>Abdominal curl-up test</strong>', 'Number of curl-ups in 1 minute (or to a cadence). Avoid for clients with back problems or osteoporosis'],
  ['Strength', '<strong>Hand-grip dynamometer</strong>, or estimated 1RM from a multi-rep test', 'Suits trained clients with good technique'],
  ['Flexibility', '<strong>Sit and reach test</strong>', 'Sit with legs straight and feet against the box; reach forward slowly and hold. Measures hamstring and lower back flexibility. Avoid for clients with back problems'],
  ['Balance', '<strong>Single-leg stance</strong>', 'Time held on one leg, eyes open or closed'],
])}
${callout('warn', 'Stop a test immediately if the client experiences', '<ul><li>Chest pain or angina-like symptoms.</li><li>Severe breathlessness, wheezing or leg cramps.</li><li>Dizziness, confusion, poor coordination, pallor or clammy skin.</li><li>Nausea.</li><li>A fall in heart rate or blood pressure as intensity increases, or an excessive rise in blood pressure.</li><li>The client asks to stop, or equipment fails.</li></ul>')}
${quiz([
  ['Which test estimates VO₂ max from a 1-mile walk?', 'The Rockport walk test.'],
  ['What does the sit and reach test measure?', 'Hamstring and lower back flexibility.'],
  ['Give three reasons to stop a fitness test.', 'For example: chest pain, dizziness, severe breathlessness, nausea, or the client asks to stop.'],
  ['Why standardise test conditions?', 'So results can be compared fairly at re-test.'],
])}`,
  },
];
