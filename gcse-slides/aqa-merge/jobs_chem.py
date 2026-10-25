import json,subprocess,os
SP="/tmp/claude-0/-home-user-Piri-MBBS/89c8b6e3-286f-51a7-8036-c7ffaf8182ac/scratchpad"
H=SP+"/chemH/build_deck_%s_H.js"; A=SP+"/sepC/build_addon_%s.js"
OUT=SP+"/final/GCSE_Chemistry_Higher_FINAL"
os.makedirs(OUT,exist_ok=True)
KICK=[("AQA GCSE COMBINED SCIENCE: TRILOGY  •  HIGHER TIER","AQA GCSE TRILOGY & GCSE CHEMISTRY  •  HIGHER TIER"),("4.4.2.5","5.4.2.5"),("Add-on Exam Question","Chemistry Only — Exam Question"),("Add-on Homework","Chemistry Only — Homework")]
decks=[("511","01_5.1.1_SimpleModelOfTheAtom",[]),
("512","02_5.1.2_ThePeriodicTable",[(32,["513"],"Group 7")]),
("521","03_5.2.1_ChemicalBonds",[]),("522","04_5.2.2_BondingStructureProperties",[]),
("523","05_5.2.3_StructureBondingCarbon",[(23,["524"],"Unfamiliar Contexts")]),
("531","06_5.3.1_ConservationOfMass",[]),
("532","07_5.3.2_AmountOfSubstance",[(33,["533","534_535"],"Limiting")]),
("541","08_5.4.1_ReactivityOfMetals",[]),
("542","09_5.4.2_ReactionsOfAcids",[(30,["5425"],"Strong & Weak")]),
("543","10_5.4.3_Electrolysis",[]),
("551","11_5.5.1_EnergyChangesCells",[(30,["552"],"Working Backwards")]),
("561","12_5.6.1_RateOfReaction",[]),("562","13_5.6.2_ReversibleReactions",[]),
("571","14_5.7.1_OrganicChemistry",[(25,["572","573"],"Cracking")]),
("58","15_5.8_ChemicalAnalysis",[(29,["583"],"Identifying Gases")]),
("59","16_5.9_ChemistryOfTheAtmosphere",[]),
("510","17_5.10_UsingResources",[(36,["5103","5104"],"LCA")])]
for host,name,ins in decks:
  addons=[{"file":A%c} for _,cs,_ in ins for c in cs]
  job={"host":H%host,"addons":addons,"out":OUT+"/"+name+"_Higher.pptx","replace":KICK,
       "inserts":[{"after":a,"files":[A%c for c in cs],"expect":e} for a,cs,e in ins]}
  r=subprocess.run(["node","merge.js",json.dumps(job)],capture_output=True,text=True,env=dict(os.environ,NODE_PATH=SP+"/gcse/node_modules"))
  print(name, [l for l in r.stdout.splitlines() if l.startswith("  ") or "wrote" in l], r.stderr[-600:])
