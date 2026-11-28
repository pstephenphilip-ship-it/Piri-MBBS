// Works out a client's alerts, special considerations and exercise warnings
// from their profile and onboarding forms.
import { CONDITION_BY_ID } from './considerations.js';
import { FORMS, parqAnyYes, parqCleared } from './forms.js';
import { ageFrom } from '../ui.js';

/** Condition ids that apply to a client (ticked + automatic). */
export function conditionIds(client) {
  const v = client.forms?.considerations?.values || {};
  const ids = new Set(Object.entries(v).filter(([k]) => k.startsWith('cond_')).flatMap(([, arr]) => arr || []));
  const age = ageFrom(client.dob);
  if (age != null && age < 18) ids.add('young');
  if (age != null && age >= 65) ids.add('older');
  const a = client.forms?.assessment?.values || {};
  if (+a.bpSys >= 140 || +a.bpDia >= 90) ids.add('hypertension');
  return [...ids].filter(id => CONDITION_BY_ID[id]);
}

/**
 * Full screening summary.
 * alerts: [{ level: 'refer'|'caution'|'info', text }]
 * conditions: condition objects
 * avoid / caution: Map(exerciseId → [condition labels])
 */
export function screening(client) {
  const alerts = [];
  const parq = client.forms?.parq?.values;
  if (!parq) alerts.push({ level: 'refer', text: 'PAR-Q not completed: screen before the first session.' });
  else if (parqAnyYes(parq) && !parqCleared(parq)) alerts.push({ level: 'refer', text: 'PAR-Q has a "Yes" answer and medical clearance is not recorded. Obtain clearance before training.' });
  if (!client.forms?.consent) alerts.push({ level: 'caution', text: 'Consent form not signed.' });

  const a = client.forms?.assessment?.values || {};
  const s = +a.bpSys, d = +a.bpDia;
  if (s >= 180 || d >= 110) alerts.push({ level: 'refer', text: `Last blood pressure ${s}/${d}: do not exercise; refer to GP.` });
  else if (s >= 160 || d >= 100) alerts.push({ level: 'refer', text: `Last blood pressure ${s}/${d}: GP clearance needed before training.` });

  const cv = client.forms?.considerations?.values || {};
  if (['Requested'].includes(cv.clearance)) alerts.push({ level: 'refer', text: 'Specialist / medical clearance requested but not yet received.' });
  if (cv.clearance === 'Obtained with restrictions') alerts.push({ level: 'caution', text: 'Cleared with restrictions: check details in Special considerations.' });
  if ((cv['cond_Pregnancy & postnatal'] || []).includes('postnatal') && cv.check === 'Not yet') alerts.push({ level: 'refer', text: 'Postnatal check (6–8 weeks) not yet done: gentle activity only.' });
  if (cv.pelvic && cv.pelvic !== 'None') alerts.push({ level: 'caution', text: 'Pelvic floor symptoms reported: no high impact; follow pelvic health physio advice.' });
  if (+cv.weeks >= 16) alerts.push({ level: 'caution', text: `${cv.weeks} weeks pregnant: avoid lying flat on the back for long.` });

  const conditions = conditionIds(client).map(id => CONDITION_BY_ID[id]);
  for (const c of conditions) if (c.level === 'refer' && !['Obtained', 'Obtained with restrictions'].includes(cv.clearance)) {
    alerts.push({ level: 'caution', text: `${c.label}: ${c.refer || 'specialist or medical guidance recommended.'}` });
  }

  const avoid = new Map(), caution = new Map();
  const add = (m, id, label) => { if (!m.has(id)) m.set(id, []); m.get(id).push(label); };
  for (const c of conditions) {
    c.avoidEx.forEach(id => add(avoid, id, c.label));
    c.cautionEx.forEach(id => add(caution, id, c.label));
  }
  for (const id of avoid.keys()) caution.delete(id); // "avoid" wins

  return { alerts, conditions, avoid, caution };
}

/** Onboarding checklist: which steps are complete. */
export function onboarding(client) {
  return FORMS.map(f => {
    let done = !!client.forms?.[f.id];
    if (f.id === 'goals') done = (client.smartGoals || []).length > 0;
    return { id: f.id, title: f.step, done, savedAt: client.forms?.[f.id]?.savedAt };
  });
}
