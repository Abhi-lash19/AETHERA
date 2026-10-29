import { emptyState, emptyTopic, understandingLevels, practiceLevels } from './progress.js';
export const MAX_BYTES=2_000_000;
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const assert=(ok,message)=>{if(!ok)throw new Error(message);};
const text=(v,name,max=20000)=>{assert(typeof v==='string'&&v.length<=max,`Invalid ${name}`);return v;};
const list=(v,name,max=500)=>{assert(Array.isArray(v)&&v.length<=max,`Invalid ${name}`);return v;};
const date=(v)=>v===null||(typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(v)&&Number.isFinite(Date.parse(v)));
export function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
function safeTree(value,depth=0){assert(depth<15,'Backup nesting too deep');if(object(value)){for(const [k,v] of Object.entries(value)){assert(!['__proto__','constructor','prototype'].includes(k),'Unsafe object key');safeTree(v,depth+1);}}else if(Array.isArray(value))value.forEach(v=>safeTree(v,depth+1));}
export function validateState(input,data) {
  const raw=typeof input==='string'?input:JSON.stringify(input);
  assert(raw.length<=MAX_BYTES,'Backup exceeds 2 MB limit');
  const v=JSON.parse(raw);safeTree(v);
  assert(object(v)&&v.schemaVersion===1,'Unsupported backup schema version');
  assert(v.curriculumVersion===data.curriculumVersion,'Unsupported curriculum version');
  assert(object(v.topics),'Invalid topics');
  const state=emptyState(),warnings=[];
  assert(v.activeTopicId===null||typeof v.activeTopicId==='string','Invalid active topic');
  assert(object(v.unmappedProgress),'Invalid unmapped progress');state.unmappedProgress=structuredClone(v.unmappedProgress);
  if(v.activeTopicId!==null&&!data.topics.some(t=>t.id===v.activeTopicId)){state.unmappedProgress.activeTopicId=v.activeTopicId;warnings.push(`Unknown active topic: ${v.activeTopicId}`);}else state.activeTopicId=v.activeTopicId;
  assert(Object.keys(v.topics).length<=500,'Too many topic entries');
  for(const [id,value] of Object.entries(v.topics)) {
    text(id,'topic ID',160); assert(object(value),'Invalid topic state');
    const s=emptyTopic();
    assert(understandingLevels.includes(value.understanding),'Invalid understanding level');s.understanding=value.understanding;
    assert(practiceLevels.includes(value.practice),'Invalid practical status');s.practice=value.practice;
    for(const field of ['notes','questions','practiceSkipReason'])s[field]=text(value[field],field);
    assert(typeof value.needsReview==='boolean','Invalid review flag');s.needsReview=value.needsReview;
    assert(date(value.updatedAt),'Invalid update timestamp');s.updatedAt=value.updatedAt;
    s.evidenceUrls=list(value.evidenceUrls,'evidence URLs',20).map(url=>{text(url,'URL',2048);assert(safeUrl(url),'Evidence links must be HTTPS without credentials');return url;});
    s.completedStudyActivityIds=[...new Set(list(value.completedStudyActivityIds,'study activities').map(id=>text(id,'activity ID',160)))];
    const topic=data.topics.find(t=>t.id===id);
    if(!topic){state.unmappedProgress.topics??={};state.unmappedProgress.topics[id]=s;warnings.push(`Unknown topic: ${id}`);continue;}
    const unknown=s.completedStudyActivityIds.filter(id=>!topic.activities.some(a=>a.id===id));
    if(unknown.length){state.unmappedProgress.activities??={};state.unmappedProgress.activities[id]=[...new Set([...(state.unmappedProgress.activities[id]||[]),...unknown])];warnings.push(`Unknown activities in ${id}: ${unknown.join(', ')}`);}
    s.completedStudyActivityIds=s.completedStudyActivityIds.filter(id=>topic.activities.some(a=>a.id===id));state.topics[id]=s;
  }
  for(const [key,known] of [['bookmarkedTopicIds',data.topics],['bookmarkedResourceIds',data.resources]]) {
    const all=[...new Set(list(v[key],key).map(id=>text(id,key,160)))];state[key]=all.filter(id=>known.some(x=>x.id===id));
    const unknown=all.filter(id=>!state[key].includes(id));if(unknown.length){state.unmappedProgress[key]=[...new Set([...(state.unmappedProgress[key]||[]),...unknown])];warnings.push(`Unknown ${key}: ${unknown.join(', ')}`);}
  }
  const recents=list(v.recentTopicIds,'recent topics',10),seen=new Set();
  for(const r of recents){assert(object(r)&&typeof r.id==='string'&&date(r.at)&&r.at!==null,'Invalid recent topic');assert(!seen.has(r.id),'Duplicate recent topic');seen.add(r.id);if(data.topics.some(t=>t.id===r.id))state.recentTopicIds.push({id:r.id,at:r.at});else {state.unmappedProgress.recentTopicIds??=[];state.unmappedProgress.recentTopicIds.push(r);warnings.push(`Unknown recent topic: ${r.id}`);}}
  return {state,warnings};
}
export const serialize = (state,data) => JSON.stringify(validateState(state,data).state,null,2);
