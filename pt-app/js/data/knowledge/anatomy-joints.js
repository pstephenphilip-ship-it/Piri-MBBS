// Anatomy — joints (classification, synovial joints, movements, major joints).
import { table, callout, quiz, ex, kb } from './_helpers.js';

export const JOINTS = [
  {
    id: 'joint-classification', group: 'Joints', title: 'Classification of joints',
    summary: 'Fibrous, cartilaginous, synovial; how much they move',
    body: `
<p>A joint (articulation) is where two or more bones meet. Joints are classified in two ways: by what holds them together (<strong>structure</strong>) and by how much they move (<strong>function</strong>). The two systems line up closely.</p>

${table(['Structural type', 'What joins the bones', 'Functional type', 'Sub-types and examples'], [
  ['<strong>Fibrous</strong>', 'Dense fibrous connective tissue; no joint cavity', 'Mostly <strong>synarthrosis</strong> (immovable)', '<strong>Sutures</strong>: between skull bones.<br><strong>Syndesmoses</strong>: bones joined by a ligament or membrane, allowing slight movement, e.g. the distal tibiofibular joint and the interosseous membrane between radius and ulna.<br><strong>Gomphoses</strong>: teeth in their sockets.'],
  ['<strong>Cartilaginous</strong>', 'Cartilage; no joint cavity', '<strong>Amphiarthrosis</strong> (slightly movable) or immovable', '<strong>Synchondroses</strong> (hyaline cartilage): epiphyseal growth plates, the first rib to the sternum.<br><strong>Symphyses</strong> (fibrocartilage): intervertebral discs, pubic symphysis.'],
  ['<strong>Synovial</strong>', 'A fluid-filled joint cavity enclosed by a capsule', '<strong>Diarthrosis</strong> (freely movable)', 'Most joints of the limbs: shoulder, elbow, hip, knee, ankle, plus the facet joints of the spine. See the six types.'],
])}

${callout('key', 'The trade-off', '<p>The more a joint can move, the less inherently stable it is. Immovable sutures protect the brain; the very mobile shoulder dislocates more than any other major joint. Synovial joints rely on ligaments and muscles for much of their stability, which is why strength training protects joints.</p>')}

${callout('pt', 'Trainer application', `<ul>
<li>The pubic symphysis and sacroiliac joints loosen in pregnancy (the hormone relaxin and others increase ligament laxity), which can cause pelvic girdle pain. Avoid wide-stance and single-leg movements that provoke it, and refer to a women's health physio if needed.</li>
<li>A high ankle sprain injures the <strong>syndesmosis</strong> between tibia and fibula. It takes longer to recover than a common lateral ankle sprain.</li>
</ul>`)}

${quiz([
  ['What are the three structural classes of joint?', 'Fibrous, cartilaginous and synovial.'],
  ['What is the functional name for a freely movable joint?', 'Diarthrosis.'],
  ['What type of joint is an intervertebral disc?', 'A cartilaginous joint (symphysis, made of fibrocartilage). It is slightly movable (amphiarthrosis).'],
  ['Give an example of a syndesmosis.', 'The distal tibiofibular joint, or the radius and ulna joined by the interosseous membrane.'],
])}`,
  },
  {
    id: 'synovial-structure', group: 'Joints', title: 'Structure of a synovial joint',
    summary: 'Capsule, membrane, fluid, cartilage, ligaments, bursae, menisci',
    body: `
<p>Synovial joints are the body's movable joints and the ones trainers work with most. They all share the same basic features.</p>

<h3>Common features</h3>
${table(['Structure', 'Description', 'Function'], [
  ['<strong>Articular cartilage</strong>', 'A layer of smooth hyaline cartilage covering the bone ends', 'Reduces friction and spreads and absorbs load'],
  ['<strong>Joint (fibrous) capsule</strong>', 'A sleeve of tough connective tissue enclosing the joint, continuous with the periosteum', 'Holds the bones together and gives stability. It contains nerve endings that sense joint position (proprioception)'],
  ['<strong>Synovial membrane</strong>', 'A thin lining on the inside of the capsule (not over the cartilage)', 'Secretes synovial fluid'],
  ['<strong>Synovial fluid</strong>', 'A small amount of slippery fluid, similar in consistency to egg white', 'Lubricates the joint, nourishes the cartilage and removes waste, and helps absorb shock'],
  ['<strong>Joint cavity</strong>', 'The narrow space between the bones', 'Contains the synovial fluid and allows free movement'],
  ['<strong>Ligaments</strong>', 'Bands of dense connective tissue joining bone to bone, inside or outside the capsule', 'Stabilise the joint and stop excessive or unwanted movement'],
])}

<h3>Accessory structures (in some joints)</h3>
<ul>
  <li><strong>Menisci and articular discs</strong>: pads of fibrocartilage that improve the fit between bones and absorb shock, e.g. the medial and lateral menisci of the knee, the disc in the temporomandibular joint.</li>
  <li><strong>Labrum</strong>: a ring of fibrocartilage deepening a socket, e.g. the glenoid labrum (shoulder) and acetabular labrum (hip).</li>
  <li><strong>Bursae</strong>: small fluid-filled sacs between bone and tendon, muscle or skin that reduce friction, e.g. subacromial bursa (shoulder), prepatellar bursa (knee). Inflamed bursae cause bursitis.</li>
  <li><strong>Tendon sheaths</strong>: tube-shaped bursae wrapped around long tendons, e.g. in the wrist and hand.</li>
  <li><strong>Fat pads</strong>: cushion and fill spaces, e.g. the infrapatellar fat pad below the kneecap.</li>
</ul>

<h3>Why movement keeps joints healthy</h3>
<p>Articular cartilage has <strong>no blood supply</strong>. It is fed by synovial fluid squeezed in and out as the joint is loaded and unloaded, like a sponge. Regular movement and loading keep cartilage healthy; immobilisation causes it to thin and weaken. Cartilage also has no nerves, so early wear can go unnoticed.</p>
<p>Because of this limited blood supply, cartilage and fibrocartilage (such as the inner part of a meniscus) heal slowly or poorly after injury.</p>

<h3>Effect of a warm-up on joints</h3>
<ul>
  <li>Movement stimulates the synovial membrane to release more fluid.</li>
  <li>As the joint warms, synovial fluid becomes less viscous (runnier), so movement becomes easier.</li>
  <li>Cartilage absorbs fluid and thickens slightly, improving shock absorption.</li>
  <li>Range of motion increases as muscles and connective tissues warm up.</li>
</ul>
${callout('pt', 'Trainer application', `<p>Start sessions with movements that take major joints gradually through their range (e.g. bodyweight squats, hip hinges, arm circles, ${ex('goblet-squat', 'goblet squats')} with light load) before heavy or fast work. Joint stiffness that eases with movement is common, especially in older clients and those with osteoarthritis.</p>`)}

${quiz([
  ['What type of cartilage covers the bone ends in a synovial joint?', 'Hyaline (articular) cartilage.'],
  ['Name three functions of synovial fluid.', 'Lubrication, nourishing the articular cartilage (and removing waste), and shock absorption.'],
  ['Why does articular cartilage heal poorly?', 'It has no blood supply.'],
  ['What is a bursa?', 'A small fluid-filled sac that reduces friction between a tendon, muscle or skin and a bone.'],
  ['How does a warm-up affect synovial fluid?', 'More is produced and it becomes less viscous, so the joint moves more freely.'],
])}`,
  },
  {
    id: 'synovial-types', group: 'Joints', title: 'The six types of synovial joint',
    summary: 'Hinge, pivot, ball & socket, condyloid, saddle, gliding',
    body: `
<p>Synovial joints are grouped by the shape of their joint surfaces, which determines the movements they allow. The number of planes a joint moves in is described as uniaxial (one), biaxial (two) or multiaxial (three).</p>

${table(['Type', 'Shape', 'Axes', 'Movements', 'Examples'], [
  ['<strong>Hinge</strong>', 'A convex surface fits into a concave one, like a door hinge', 'Uniaxial', 'Flexion and extension', 'Elbow (humeroulnar), knee (a modified hinge), ankle (talocrural), interphalangeal joints of fingers and toes'],
  ['<strong>Pivot</strong>', 'A rounded or pointed bone rotates within a ring of bone and ligament', 'Uniaxial', 'Rotation', 'Atlanto-axial joint (C1 on C2, "no" head movement), proximal radioulnar joint (pronation and supination)'],
  ['<strong>Condyloid (ellipsoid)</strong>', 'An oval convex surface fits an oval concave socket', 'Biaxial', 'Flexion, extension, abduction, adduction, circumduction (no true rotation)', 'Wrist (radiocarpal), knuckles (metacarpophalangeal joints of the fingers), atlanto-occipital joint'],
  ['<strong>Saddle</strong>', 'Each surface is concave in one direction and convex in the other, like a rider in a saddle', 'Biaxial (with some rotation)', 'Flexion, extension, abduction, adduction, circumduction, opposition', 'Carpometacarpal joint of the thumb; the sternoclavicular joint is often classed as saddle'],
  ['<strong>Ball and socket</strong>', 'A rounded head fits into a cup-shaped socket', 'Multiaxial', 'Flexion, extension, abduction, adduction, medial and lateral rotation, circumduction', 'Shoulder (glenohumeral), hip'],
  ['<strong>Gliding (plane)</strong>', 'Flat or slightly curved surfaces slide over each other', 'Non-axial (sliding)', 'Small gliding movements', 'Between carpals and tarsals, acromioclavicular joint, facet joints of the spine, sacroiliac joint'],
])}

<h3>Shoulder vs hip: the mobility–stability trade-off</h3>
${table(['', 'Shoulder (glenohumeral)', 'Hip'], [
  ['Socket', 'Glenoid fossa: very shallow; covers only about a quarter to a third of the humeral head', 'Acetabulum: deep; holds most of the femoral head'],
  ['Main stability from', 'Muscles (especially the rotator cuff) and the labrum', 'Bone shape and very strong ligaments'],
  ['Mobility', 'The most mobile joint in the body', 'Large range but less than the shoulder'],
  ['Dislocation', 'Common (usually forwards/anterior)', 'Rare; needs major force (e.g. a car crash) unless there is a hip replacement or a developmental condition'],
])}

${callout('key', 'Memory aid', '<p>Make the shapes with your own body: bend your elbow (hinge), shake your head "no" (pivot), wave your wrist in a circle (condyloid), touch thumb to little finger (saddle), swing your arm in a full circle (ball and socket).</p>')}

${callout('pt', 'Trainer application', `<ul>
<li>Know which movements each joint allows so you can spot compensation. For example, the knee does not twist much: if a client's knee collapses inward in a squat, the movement is usually coming from the hip and foot.</li>
<li>The knee is a "modified hinge": with the knee bent it can rotate a little. Twisting on a bent, loaded knee (cutting, landing badly) is a common mechanism for ligament and meniscus injury.</li>
<li>For ball and socket joints, train all their planes: e.g. for the hip, add lateral lunges, rotational work and abduction exercises alongside squats and hinges.</li>
</ul>`)}

${quiz([
  ['Which type of joint is the elbow (between humerus and ulna)?', 'A hinge joint.'],
  ['Which joint type allows the most movement? Give two examples.', 'Ball and socket: the shoulder and the hip.'],
  ['What makes the thumb\'s carpometacarpal joint special?', 'It is a saddle joint, allowing opposition: the thumb can touch each fingertip.'],
  ['Which joint type are the facet joints of the spine?', 'Gliding (plane) synovial joints.'],
  ['Why is the hip more stable than the shoulder?', 'It has a deep socket (acetabulum) that holds most of the femoral head, plus very strong ligaments. The shoulder has a shallow socket and relies on muscles.'],
  ['What movements does a condyloid joint allow?', 'Flexion, extension, abduction, adduction and circumduction, but not rotation.'],
])}`,
  },
  {
    id: 'joint-movements', group: 'Joints', title: 'Joint movements',
    summary: 'Every movement term with its plane and an exercise example',
    body: `
<p>Movement terms describe what happens at a joint, starting from the anatomical position. Each happens in a particular plane (see ${kb('anatomy', 'planes-axes', 'planes and axes')}).</p>

<h3>Sagittal plane</h3>
${table(['Movement', 'Definition', 'Example'], [
  ['<strong>Flexion</strong>', 'Decreasing the angle between two bones (bending)', 'Elbow during a biceps curl; hip and knee going down in a squat'],
  ['<strong>Extension</strong>', 'Increasing the angle (straightening), returning to anatomical position', 'Knee and hip standing up from a squat'],
  ['<strong>Hyperextension</strong>', 'Extension beyond the anatomical position', 'Lumbar spine in a back-bend; some people\'s elbows or knees go past straight'],
  ['<strong>Dorsiflexion</strong>', 'Bringing the top of the foot towards the shin', 'Ankle as the knee travels forward in a squat or lunge'],
  ['<strong>Plantarflexion</strong>', 'Pointing the foot and toes down', 'Calf raise; pushing off in running'],
  ['<strong>Anterior / posterior pelvic tilt</strong>', 'Top of the pelvis tips forward / backward', 'Posterior tilt at the top of a hip thrust'],
])}

<h3>Frontal plane</h3>
${table(['Movement', 'Definition', 'Example'], [
  ['<strong>Abduction</strong>', 'Moving away from the midline', 'Shoulder in a lateral raise; hip in a side-lying leg raise'],
  ['<strong>Adduction</strong>', 'Moving towards the midline', 'Shoulder in a lat pulldown (wide grip); hip in the adductor machine'],
  ['<strong>Lateral flexion</strong>', 'Bending the trunk or neck sideways', 'Side bend; resisted in a suitcase carry'],
  ['<strong>Elevation / depression</strong>', 'Moving the scapula up / down', 'Shrug (elevation); "shoulders down" in a dip or pull-up (depression)'],
  ['<strong>Inversion / eversion</strong>', 'Turning the sole of the foot inward / outward (subtalar joint)', 'Inversion is how most ankle sprains happen'],
  ['<strong>Radial / ulnar deviation</strong>', 'Bending the wrist towards the thumb / little finger side', 'Hammer-grip movements'],
  ['<strong>Upward / downward rotation</strong> (scapula)', 'The glenoid turns to face up / down', 'Upward rotation during overhead press; downward rotation returning from it'],
])}

<h3>Transverse plane</h3>
${table(['Movement', 'Definition', 'Example'], [
  ['<strong>Medial (internal) rotation</strong>', 'Rotating towards the midline', 'Shoulder in a cable internal rotation'],
  ['<strong>Lateral (external) rotation</strong>', 'Rotating away from the midline', 'Shoulder in a band external rotation; hip in a clamshell'],
  ['<strong>Horizontal abduction / adduction</strong> (also called horizontal extension / flexion)', 'Moving the arm away from / towards the midline with the arm at shoulder height', 'Reverse fly (abduction); chest fly or bench press (adduction)'],
  ['<strong>Pronation / supination</strong>', 'Rotating the forearm so the palm faces down / up', 'Supination finishes a dumbbell curl'],
  ['<strong>Spinal rotation</strong>', 'Twisting the trunk or neck', 'Woodchop, thoracic rotation drills'],
  ['<strong>Protraction / retraction</strong>', 'Scapula moves forward around the rib cage / back towards the spine', 'Push-up plus (protraction); squeezing shoulder blades in a row (retraction)'],
])}

<h3>Multiplanar and special movements</h3>
<ul>
  <li><strong>Circumduction</strong>: a circular movement combining flexion, abduction, extension and adduction, e.g. arm circles. Possible at ball and socket, condyloid and saddle joints.</li>
  <li><strong>Opposition</strong>: touching the thumb to the fingertips (thumb carpometacarpal joint).</li>
  <li><strong>Pronation and supination of the foot</strong>: in gait, these are combined movements. Pronation (mainly eversion, dorsiflexion and abduction) lets the foot absorb shock; supination (inversion, plantarflexion and adduction) stiffens it for push-off. Note this differs from forearm pronation and supination.</li>
</ul>

<h3>Analysing an exercise</h3>
<p>To analyse any exercise, list the joints that move, the movement at each and the plane. For example, the <strong>upward phase of a ${ex('back-squat', 'squat')}</strong>:</p>
${table(['Joint', 'Movement', 'Plane', 'Main muscles (contracting concentrically)'], [
  ['Hip', 'Extension', 'Sagittal', 'Gluteus maximus, hamstrings, adductor magnus'],
  ['Knee', 'Extension', 'Sagittal', 'Quadriceps'],
  ['Ankle', 'Plantarflexion', 'Sagittal', 'Gastrocnemius, soleus'],
])}

${quiz([
  ['Which movement happens at the shoulder in a lateral raise, and in which plane?', 'Abduction, in the frontal plane.'],
  ['What is the difference between dorsiflexion and plantarflexion?', 'Dorsiflexion brings the top of the foot towards the shin; plantarflexion points the foot down.'],
  ['What movement of the scapula happens when you squeeze your shoulder blades together in a row?', 'Retraction.'],
  ['Which movement turns the palm to face up?', 'Supination.'],
  ['Analyse the elbow in the lowering phase of a push-up.', 'Flexion in the sagittal plane, controlled by the triceps working eccentrically.'],
  ['Which ankle movement causes most ankle sprains?', 'Inversion (usually combined with plantarflexion).'],
])}`,
  },
  {
    id: 'shoulder-complex', group: 'Major joints', title: 'The shoulder complex',
    summary: 'Four joints, rotator cuff, scapulohumeral rhythm, common problems',
    body: `
<p>The "shoulder" is really four joints working together so the arm can reach in almost any direction.</p>
${table(['Joint', 'Bones', 'Type', 'Notes'], [
  ['<strong>Glenohumeral (GH)</strong>', 'Humeral head and glenoid fossa of scapula', 'Ball and socket', 'The main shoulder joint; very mobile, inherently unstable'],
  ['<strong>Acromioclavicular (AC)</strong>', 'Acromion and lateral end of clavicle', 'Gliding', 'Often injured by falling onto the point of the shoulder ("separated shoulder")'],
  ['<strong>Sternoclavicular (SC)</strong>', 'Medial end of clavicle and manubrium of sternum', 'Saddle', 'The only bony link between the arm and the trunk'],
  ['<strong>Scapulothoracic</strong>', 'Scapula and rib cage', 'Not a true joint (no capsule); a functional joint', 'The scapula glides over the ribs on muscle'],
])}

<h3>Stability of the glenohumeral joint</h3>
<ul>
  <li><strong>Glenoid labrum</strong>: a fibrocartilage rim that deepens the shallow socket. Tears (e.g. SLAP lesions) can follow falls or repeated throwing.</li>
  <li><strong>Capsule and ligaments</strong>: relatively loose to allow movement; the glenohumeral ligaments reinforce the front.</li>
  <li><strong>Rotator cuff</strong>: four muscles that hold the humeral head centred in the socket. Remember <strong>SITS</strong>:
    ${table(['Muscle', 'Main action', 'Attaches to'], [
      ['<strong>S</strong>upraspinatus', 'Starts abduction; stabilises', 'Greater tubercle'],
      ['<strong>I</strong>nfraspinatus', 'Lateral rotation', 'Greater tubercle'],
      ['<strong>T</strong>eres minor', 'Lateral rotation', 'Greater tubercle'],
      ['<strong>S</strong>ubscapularis', 'Medial rotation', 'Lesser tubercle'],
    ])}
  </li>
</ul>

<h3>Movements and typical range of motion</h3>
${table(['Movement', 'Approximate normal range'], [
  ['Flexion', '0–180°'],
  ['Extension', '0–50/60°'],
  ['Abduction', '0–180°'],
  ['Medial (internal) rotation', '0–70°'],
  ['Lateral (external) rotation', '0–90°'],
  ['Horizontal adduction', '0–130/135°'],
])}
<p>Ranges vary between individuals; compare left and right sides and look at the quality of movement as well as the numbers.</p>

<h3>Scapulohumeral rhythm</h3>
<p>Raising the arm overhead needs the scapula to move as well. After the first 30° or so, for every 3° of elevation roughly 2° comes from the glenohumeral joint and 1° from the scapula rotating upwards (a 2:1 ratio). Full overhead reach needs about 60° of scapular upward rotation, mainly from <strong>serratus anterior</strong> and the <strong>upper and lower trapezius</strong> working together. The thoracic spine also needs to extend.</p>

<h3>Scapular movements</h3>
<p>Elevation, depression, protraction, retraction, upward rotation and downward rotation (plus small tilting movements). "Winging" of the inferior angle or medial border during push-ups or lowering the arm can suggest weak or poorly controlled serratus anterior.</p>

<h3>Common shoulder problems</h3>
${table(['Problem', 'What it is', 'Training notes'], [
  ['<strong>Subacromial pain / rotator cuff tendinopathy</strong>', 'Pain on the side of the shoulder, often between about 60° and 120° of raising the arm (the "painful arc")', 'Very common. Usually responds well to progressive loading of the rotator cuff and scapular muscles. Avoid pain-provoking positions short-term rather than all overhead work forever'],
  ['<strong>Anterior dislocation / instability</strong>', 'Humeral head slips forward out of the socket, usually with the arm abducted and externally rotated', 'After medical clearance, be cautious with positions like behind-the-neck press and deep dips; build cuff and scapular strength'],
  ['<strong>Frozen shoulder (adhesive capsulitis)</strong>', 'Painful stiffening of the capsule, especially loss of external rotation. More common aged 40–60 and with diabetes', 'Needs medical/physio management; work within tolerance'],
  ['<strong>AC joint injury</strong>', 'Sprain or separation after a fall onto the shoulder', 'Bench press, dips and horizontal adduction may aggravate it'],
])}

${callout('pt', 'Trainer application', `<ul>
<li>Balance pushing with pulling. Many programmes have far more pressing than rowing; aim for at least as many pulling sets (${ex('row-db', 'rows')}, ${ex('lat-pulldown', 'pulldowns')}, face pulls) as pushing.</li>
<li>Strengthen the rotator cuff with external rotation work (bands, cables, side-lying dumbbell).</li>
<li>Before loading overhead (${ex('ohp', 'overhead press')}), check the client can raise both arms fully overhead without arching the lower back.</li>
<li>Let the shoulder blades move naturally in pushing and pulling rather than pinning them back throughout.</li>
</ul>`)}

${quiz([
  ['Name the four joints of the shoulder complex.', 'Glenohumeral, acromioclavicular, sternoclavicular and scapulothoracic.'],
  ['What does SITS stand for?', 'Supraspinatus, infraspinatus, teres minor, subscapularis: the rotator cuff muscles.'],
  ['Which rotator cuff muscle medially rotates the humerus?', 'Subscapularis.'],
  ['What is scapulohumeral rhythm?', 'The coordinated movement of the scapula and humerus when raising the arm, roughly 2° of glenohumeral movement for every 1° of scapular upward rotation.'],
  ['Which muscle\'s weakness can cause scapular winging?', 'Serratus anterior.'],
  ['In which direction does the shoulder most commonly dislocate?', 'Anteriorly (forwards).'],
])}`,
  },
  {
    id: 'elbow-wrist', group: 'Major joints', title: 'Elbow, wrist & hand',
    summary: 'Hinge and pivot at the elbow, wrist movements, common overuse issues',
    body: `
<h3>The elbow complex</h3>
${table(['Joint', 'Bones', 'Type', 'Movement'], [
  ['<strong>Humeroulnar</strong>', 'Trochlea of humerus and ulna', 'Hinge', 'Flexion and extension'],
  ['<strong>Humeroradial</strong>', 'Capitulum of humerus and head of radius', 'Hinge / pivot', 'Flexion and extension; allows the radius to spin'],
  ['<strong>Proximal radioulnar</strong>', 'Head of radius and ulna, held by the annular ligament', 'Pivot', 'Pronation and supination (with the distal radioulnar joint at the wrist)'],
])}
<p>Typical range: flexion 0–145/150°, pronation and supination about 80–90° each. Some people (more often women) can hyperextend the elbow by a few degrees.</p>
<p>Stability comes from the close fit of the humeroulnar joint and the <strong>ulnar (medial) collateral ligament</strong> and <strong>radial (lateral) collateral ligament</strong>. The ulnar collateral ligament is stressed by throwing (valgus force).</p>

<h3>Carrying angle</h3>
<p>With the arm straight and palm forward, the forearm angles slightly away from the body (roughly 5–15°, usually more in women). This is normal.</p>

<h3>Muscles acting at the elbow</h3>
<ul>
  <li><strong>Flexors</strong>: biceps brachii (also the main supinator), brachialis (the purest elbow flexor), brachioradialis (strongest with a neutral, hammer grip).</li>
  <li><strong>Extensors</strong>: triceps brachii, anconeus.</li>
</ul>

<h3>The wrist and hand</h3>
<ul>
  <li><strong>Radiocarpal joint</strong> (radius with scaphoid and lunate): condyloid. Flexion (about 0–80°), extension (about 0–70°), radial deviation (about 20°), ulnar deviation (about 30°).</li>
  <li><strong>Intercarpal joints</strong>: gliding joints that add to wrist movement.</li>
  <li><strong>Thumb carpometacarpal</strong>: saddle joint allowing opposition.</li>
  <li><strong>Metacarpophalangeal (knuckles)</strong>: condyloid. <strong>Interphalangeal</strong>: hinge.</li>
  <li><strong>Carpal tunnel</strong>: a passage on the palm side of the wrist formed by the carpal bones and a ligament (flexor retinaculum). The median nerve and finger flexor tendons run through it. Compression causes carpal tunnel syndrome: tingling in the thumb, index and middle fingers, often worse at night.</li>
</ul>

<h3>Common problems</h3>
${table(['Problem', 'Where', 'Common causes'], [
  ['<strong>Lateral elbow tendinopathy</strong> ("tennis elbow")', 'Outside of the elbow (common extensor origin on the lateral epicondyle)', 'Repetitive gripping and wrist extension: racket sports, computer work, heavy gripping'],
  ['<strong>Medial elbow tendinopathy</strong> ("golfer\'s elbow")', 'Inside of the elbow (common flexor origin on the medial epicondyle)', 'Repetitive gripping and wrist flexion; sudden increases in pulling volume'],
  ['<strong>Distal radius fracture</strong>', 'Wrist', 'Falling on an outstretched hand, especially in older adults with low bone density'],
  ['<strong>Wrist pain in weight-bearing</strong>', 'Back of the wrist', 'Push-ups, planks, front-rack positions with limited wrist extension'],
])}

${callout('pt', 'Trainer application', `<ul>
<li>Vary grips (pronated, supinated, neutral) on pulling exercises to spread load across the elbow flexors and reduce overuse.</li>
<li>For grip strength, which is linked with healthy ageing and overall health, include ${ex('farmer-carry', 'carries')}, dead hangs and heavy holds.</li>
<li>If a client has elbow tendinopathy, reduce gripping volume temporarily rather than stopping training, use straps where useful, and refer if it isn't settling.</li>
<li>Persistent tingling or numbness in the hand should be referred to a GP.</li>
</ul>`)}

${quiz([
  ['Which joint allows pronation and supination at the elbow?', 'The proximal radioulnar joint (a pivot joint), working with the distal radioulnar joint.'],
  ['Which muscle is the main supinator of the forearm?', 'Biceps brachii (supinator also contributes).'],
  ['Where does "tennis elbow" hurt and what tendon origin is involved?', 'The outside of the elbow: the common extensor origin on the lateral epicondyle.'],
  ['What passes through the carpal tunnel?', 'The median nerve and the flexor tendons of the fingers and thumb.'],
  ['Which grip best targets brachioradialis?', 'A neutral (hammer) grip.'],
])}`,
  },
  {
    id: 'hip-joint', group: 'Major joints', title: 'The hip joint & pelvis',
    summary: 'Ball and socket, ligaments, range of motion, hip shape differences',
    body: `
<p>The hip is a ball and socket joint between the head of the femur and the acetabulum of the pelvis. It is built for weight-bearing and stability while still allowing a large range of movement.</p>

<h3>Stability</h3>
<ul>
  <li><strong>Deep socket</strong>: the acetabulum, deepened further by the <strong>acetabular labrum</strong>, holds most of the femoral head.</li>
  <li><strong>Strong capsule and ligaments</strong>:
    <ul>
      <li><strong>Iliofemoral ligament</strong> (Y-ligament): at the front; the strongest ligament in the body. It limits hip extension, which is why we can stand upright with little muscle effort, "hanging" on it.</li>
      <li><strong>Pubofemoral ligament</strong>: limits abduction and extension.</li>
      <li><strong>Ischiofemoral ligament</strong>: at the back; limits medial rotation.</li>
      <li><strong>Ligament of the head of the femur</strong> (ligamentum teres): carries a small artery, important in childhood.</li>
    </ul>
  </li>
  <li><strong>Muscles</strong>: the gluteals and the deep lateral rotators keep the femoral head centred and control the pelvis in single-leg stance.</li>
</ul>

<h3>Movements and range of motion</h3>
${table(['Movement', 'Approximate range', 'Main muscles'], [
  ['Flexion', '0–120° (knee bent); less with the knee straight because the hamstrings limit it', 'Iliopsoas, rectus femoris, sartorius, tensor fasciae latae'],
  ['Extension', '0–10/30°', 'Gluteus maximus, hamstrings, adductor magnus (posterior part)'],
  ['Abduction', '0–45°', 'Gluteus medius, gluteus minimus, tensor fasciae latae'],
  ['Adduction', '0–30°', 'Adductor longus, brevis and magnus, gracilis, pectineus'],
  ['Medial rotation', '0–35/45°', 'Gluteus medius and minimus (front fibres), tensor fasciae latae'],
  ['Lateral rotation', '0–45°', 'Gluteus maximus, piriformis and the deep lateral rotators'],
])}

<h3>Hip shape varies</h3>
<p>The depth and angle of the socket and the angle of the femoral neck differ between people. This partly explains why some people squat deep comfortably with a narrow stance while others need a wider stance with toes turned out. These are differences in bony structure, not flexibility, so they can't be stretched away.</p>

<h3>Single-leg stance and the gluteus medius</h3>
<p>When standing on one leg, the gluteus medius of the standing leg stops the opposite side of the pelvis from dropping. If it is weak, the pelvis drops on the opposite side (a <strong>Trendelenburg sign</strong>) or the person leans the trunk over the standing leg.</p>

<h3>Common hip problems</h3>
${table(['Problem', 'Description', 'Training notes'], [
  ['<strong>Hip osteoarthritis</strong>', 'Gradual wear and change of the joint; stiffness, groin pain, reduced rotation', 'Exercise and strength training are first-line treatment; work in comfortable ranges'],
  ['<strong>Femoroacetabular impingement (FAI)</strong>', 'Extra bone on the femoral neck or acetabular rim causes pinching in deep flexion and rotation; groin pain', 'Adjust squat depth and stance width; refer if persistent'],
  ['<strong>Greater trochanteric pain syndrome</strong>', 'Pain on the outside of the hip from gluteal tendinopathy (often previously called bursitis). Common in women over 40', 'Avoid prolonged hip adduction (crossing legs, hanging on one hip); progressive gluteal loading'],
  ['<strong>Hip fracture</strong>', 'Usually the femoral neck, after a fall in older adults with osteoporosis', 'Strength and balance training reduces falls risk'],
  ['<strong>Labral tear</strong>', 'Tear of the acetabular labrum; catching, clicking and groin pain', 'Refer for assessment'],
])}

${callout('pt', 'Trainer application', `<ul>
<li>Let clients find their own comfortable squat stance and depth rather than forcing one "correct" position.</li>
<li>Strengthen the hip in all planes: hinges (${ex('rdl', 'RDL')}), squats, ${ex('reverse-lunge', 'lunges')}, lateral lunges, side planks and abduction work.</li>
<li>Single-leg exercises reveal pelvic control. Watch for the pelvis dropping or the knee collapsing inward.</li>
<li>For older adults, strength and balance work for the hips is one of the most effective ways to prevent falls and fractures.</li>
</ul>`)}

${quiz([
  ['What is the strongest ligament in the body, and what movement does it limit?', 'The iliofemoral (Y) ligament. It limits hip extension.'],
  ['Which muscle stops the opposite side of the pelvis dropping when standing on one leg?', 'Gluteus medius (of the standing leg).'],
  ['Why is hip flexion range lower with the knee straight?', 'The hamstrings cross both the hip and the knee and become tight when stretched over both, limiting hip flexion.'],
  ['A client cannot squat deep with a narrow stance despite good flexibility. Why might this be?', 'Hip bone structure (socket depth and angle, femoral neck angle) varies. A wider stance and turning the toes out may suit them better.'],
  ['Name the main hip extensors.', 'Gluteus maximus, the hamstrings and the posterior part of adductor magnus.'],
])}`,
  },
  {
    id: 'knee-joint', group: 'Major joints', title: 'The knee joint',
    summary: 'Tibiofemoral and patellofemoral joints, ligaments, menisci, injuries',
    body: `
<p>The knee is the largest joint in the body. It has two parts sharing one capsule:</p>
<ul>
  <li><strong>Tibiofemoral joint</strong>: femoral condyles on the tibial plateau. A <strong>modified hinge</strong>: mainly flexion and extension, with a little rotation when the knee is bent.</li>
  <li><strong>Patellofemoral joint</strong>: the patella gliding in the trochlear groove of the femur.</li>
</ul>
<p>Typical range: flexion 0–135/140° (more passively, limited by the calf and thigh meeting), extension 0° (some people hyperextend 5–10°).</p>

<h3>Ligaments</h3>
${table(['Ligament', 'Location', 'Main job', 'Typical injury'], [
  ['<strong>Anterior cruciate (ACL)</strong>', 'Inside the joint, from the front of the tibia to the back of the femur', 'Stops the tibia sliding forward on the femur; controls rotation', 'Non-contact: landing, cutting or pivoting with the knee collapsing inwards. Often a "pop" and rapid swelling'],
  ['<strong>Posterior cruciate (PCL)</strong>', 'Inside the joint, behind the ACL', 'Stops the tibia sliding backward', 'Direct blow to the front of the shin with the knee bent (e.g. dashboard injury, falling on a bent knee)'],
  ['<strong>Medial collateral (MCL)</strong>', 'Inside (medial) edge of the knee', 'Resists valgus (knee pushed inward) force', 'Blow to the outside of the knee'],
  ['<strong>Lateral collateral (LCL)</strong>', 'Outside (lateral) edge, femur to fibula', 'Resists varus (knee pushed outward) force', 'Blow to the inside of the knee (less common)'],
])}
${callout('key', 'Memory aid', '<p>The <strong>cruciate</strong> ligaments cross (like a crucifix) inside the joint. The <strong>A</strong>CL stops the tibia moving <strong>a</strong>nteriorly.</p>')}

<h3>Menisci</h3>
<p>Two C-shaped pads of fibrocartilage on the tibial plateau. They deepen the joint surface, spread load (carrying a large share of the load through the knee), absorb shock and improve stability.</p>
<ul>
  <li><strong>Medial meniscus</strong>: more C-shaped and attached to the MCL, so it is less mobile and more often torn.</li>
  <li><strong>Lateral meniscus</strong>: more circular and mobile.</li>
  <li>Only the outer edge has a good blood supply ("red zone"), so tears in the inner part heal poorly. Degenerative meniscal tears are very common after 40 and often cause no symptoms.</li>
  <li>Typical injury: twisting on a bent, weight-bearing knee. Symptoms include joint-line pain, swelling over hours, catching or locking.</li>
</ul>
<p>The "unhappy triad" is a combined injury to the ACL, MCL and medial meniscus.</p>

<h3>The screw-home mechanism</h3>
<p>In the last part of knee extension, the tibia rotates slightly outward on the femur, locking the knee for stable standing. To bend from fully straight, <strong>popliteus</strong> unlocks it by rotating it back.</p>

<h3>Muscles acting at the knee</h3>
<ul>
  <li><strong>Extensors</strong>: quadriceps: rectus femoris (also flexes the hip), vastus lateralis, vastus medialis, vastus intermedius.</li>
  <li><strong>Flexors</strong>: hamstrings (biceps femoris, semitendinosus, semimembranosus), gastrocnemius, popliteus, plus gracilis and sartorius.</li>
</ul>

<h3>Common knee problems</h3>
${table(['Problem', 'Features', 'Training notes'], [
  ['<strong>Patellofemoral pain</strong>', 'Pain around or behind the kneecap with squatting, stairs, running, or prolonged sitting', 'Very common. Usually improves with hip and quadriceps strengthening and adjusting load (depth, volume) temporarily'],
  ['<strong>Patellar tendinopathy</strong> ("jumper\'s knee")', 'Pain just below the kneecap with jumping and loading', 'Progressive tendon loading (isometrics, then heavy slow resistance, then plyometrics)'],
  ['<strong>Knee osteoarthritis</strong>', 'Stiffness, pain on loading, sometimes swelling; very common with age', 'Strengthening exercise is a core treatment. Strong quadriceps reduce symptoms'],
  ['<strong>Osgood-Schlatter</strong>', 'Pain and a bump at the tibial tuberosity in growing adolescents', 'Manage load; usually settles when growth finishes'],
  ['<strong>Ligament / meniscus injuries</strong>', 'See above', 'Need medical assessment; work with the physio\'s rehab plan'],
])}
${callout('pt', 'Trainer application', `<ul>
<li>Knees travelling forward past the toes in a squat or lunge is normal and safe for most people. Restricting it shifts load to the hips and lower back.</li>
<li>Watch for <strong>dynamic knee valgus</strong> (knee collapsing inward) in squats, lunges and especially landing. Train hip strength and landing mechanics. Injury-prevention programmes that include strength, balance and landing training reduce ACL injuries, particularly in female athletes.</li>
<li>Deep squatting is not harmful to healthy knees when built up gradually.</li>
<li>Refer any knee that has swollen quickly after injury, locks, gives way, or won't fully straighten.</li>
</ul>`)}

${quiz([
  ['What are the two joints that make up the knee?', 'The tibiofemoral and patellofemoral joints.'],
  ['What is the main job of the ACL?', 'Stopping the tibia from sliding forward on the femur (and controlling rotation).'],
  ['Why is the medial meniscus injured more often than the lateral?', 'It is attached to the MCL, so it is less mobile.'],
  ['What is the screw-home mechanism?', 'The slight outward rotation of the tibia on the femur at the end of extension that locks the knee. Popliteus unlocks it.'],
  ['Which quadriceps muscle also flexes the hip?', 'Rectus femoris.'],
  ['Is it dangerous for the knees to go past the toes in a squat?', 'Not for most people. It is a normal part of squatting and spreads load between the knees and hips.'],
])}`,
  },
  {
    id: 'ankle-foot', group: 'Major joints', title: 'The ankle & foot',
    summary: 'Talocrural and subtalar joints, ligaments, sprains, dorsiflexion',
    body: `
<h3>The joints</h3>
${table(['Joint', 'Bones', 'Type', 'Movements'], [
  ['<strong>Talocrural (ankle joint)</strong>', 'Tibia and fibula form a "mortise" that holds the talus', 'Hinge', 'Dorsiflexion (about 0–20°) and plantarflexion (about 0–50°)'],
  ['<strong>Subtalar</strong>', 'Talus and calcaneus', 'Gliding (functionally a pivot-like joint)', 'Inversion and eversion'],
  ['<strong>Midtarsal (transverse tarsal)</strong>', 'Talus-navicular and calcaneus-cuboid', 'Gliding', 'Adds to inversion/eversion; lets the foot adapt to uneven ground'],
  ['<strong>Distal tibiofibular</strong>', 'Tibia and fibula', 'Syndesmosis (fibrous)', 'Very slight; holds the mortise together'],
  ['<strong>Metatarsophalangeal and interphalangeal</strong>', 'Metatarsals and toes', 'Condyloid / hinge', 'Toe flexion and extension; big-toe extension is needed for walking and running push-off'],
])}
<p>The talus is wider at the front, so the ankle is most stable in dorsiflexion (the wide part wedges into the mortise) and least stable in plantarflexion. This is why sprains usually happen with the foot pointed.</p>

<h3>Ligaments</h3>
<ul>
  <li><strong>Lateral ligaments</strong> (outside): anterior talofibular (ATFL), calcaneofibular (CFL) and posterior talofibular (PTFL). They are relatively weak; the <strong>ATFL</strong> is the most commonly injured ligament in the ankle.</li>
  <li><strong>Deltoid ligament</strong> (inside, medial): a strong fan of fibres. Injuries are less common and often come with a fracture.</li>
</ul>

<h3>Ankle sprains</h3>
<p>Most ankle sprains are <strong>lateral</strong>, caused by inversion with plantarflexion (rolling over the outside of the foot). They are one of the most common sports injuries, and recurrence is common, largely because of reduced proprioception and strength afterwards. Balance and strength training reduces the risk of further sprains.</p>
${callout('warn', 'When to refer', '<p>Inability to put weight on the foot for four steps, or bony tenderness at the back edge or tip of either malleolus or at the base of the 5th metatarsal or the navicular, suggests a possible fracture (based on the Ottawa ankle rules). Refer for X-ray.</p>')}

<h3>Muscles acting at the ankle</h3>
<ul>
  <li><strong>Plantarflexors</strong>: gastrocnemius (crosses the knee too, so is strongest with the knee straight), soleus (strongest with the knee bent), tibialis posterior, the peroneals (fibularis longus and brevis).</li>
  <li><strong>Dorsiflexors</strong>: tibialis anterior, extensor digitorum longus, extensor hallucis longus.</li>
  <li><strong>Invertors</strong>: tibialis anterior and tibialis posterior. <strong>Evertors</strong>: fibularis longus and brevis.</li>
  <li>The <strong>Achilles tendon</strong> (gastrocnemius and soleus combined) attaches to the calcaneus. It is the thickest and strongest tendon in the body.</li>
</ul>

<h3>Dorsiflexion and squatting</h3>
<p>A full squat needs a good amount of ankle dorsiflexion so the knees can travel forward. With limited dorsiflexion, clients tend to lift their heels, lean forward excessively, or turn the feet out. A quick check is the <strong>knee-to-wall test</strong>: in a lunge position, measure how far the toes can be from the wall while the knee still touches it with the heel down. Around 10 cm or more is generally considered adequate; compare sides.</p>

${callout('pt', 'Trainer application', `<ul>
<li>Include calf work with both straight knees (gastrocnemius) and bent knees (soleus). Strong calves are important for running and for older adults' walking and balance.</li>
<li>Use balance work (single-leg stance, then on unstable ground or with eyes closed) after an ankle sprain once cleared, and as prevention.</li>
<li>For limited ankle dorsiflexion in squats, try raising the heels on small plates or using lifting shoes while you work on mobility, or use a ${ex('goblet-squat', 'goblet squat')} with a counterbalance.</li>
<li>Achilles pain that is worse in the morning and when starting activity suggests tendinopathy; progressive calf loading usually helps.</li>
</ul>`)}

${quiz([
  ['What type of joint is the talocrural joint and what movements does it allow?', 'A hinge joint allowing dorsiflexion and plantarflexion.'],
  ['Where do inversion and eversion mainly happen?', 'At the subtalar joint (with the midtarsal joints).'],
  ['Which ligament is most often injured in an ankle sprain?', 'The anterior talofibular ligament (ATFL).'],
  ['Why is the ankle less stable when the foot is pointed?', 'The talus is narrower at the back, so in plantarflexion it fits more loosely in the mortise.'],
  ['Which calf muscle is best trained with the knee bent?', 'Soleus. With the knee bent, gastrocnemius is slack and can\'t produce as much force.'],
  ['How might limited dorsiflexion show up in a squat?', 'Heels lifting, excessive forward lean of the trunk, or feet turning out.'],
])}`,
  },
];
