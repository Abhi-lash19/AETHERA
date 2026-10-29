import { emptyState, emptyTopic } from './progress.js';
import { validateState } from './imports.js';
export function publicSnapshot(local,data,createdAt=new Date().toISOString()) {
  const {state}=validateState(local,data);
  return {schemaVersion:1,curriculumVersion:data.curriculumVersion,status:'published',createdAt,activeTopicId:state.activeTopicId,topics:Object.fromEntries(Object.entries(state.topics).map(([id,s])=>[id,{completedStudyActivityIds:s.completedStudyActivityIds.filter(a=>data.topics.find(t=>t.id===id).activities.some(x=>x.id===a&&x.required)),understanding:s.understanding,practice:s.practice}]))};
}
export function readSnapshot(value,data) {
  const keys=(obj,allowed)=>{if(!obj||typeof obj!=='object'||Array.isArray(obj)||Object.keys(obj).some(k=>!allowed.includes(k)))throw new Error('Public snapshot contains unexpected fields');};
  if(value.status==='not_published'){keys(value,['schemaVersion','curriculumVersion','status']);if(value.schemaVersion!==1||value.curriculumVersion!==data.curriculumVersion)throw new Error('Unsupported public snapshot');return null;}
  keys(value,['schemaVersion','curriculumVersion','status','createdAt','activeTopicId','topics']);
  if(value.status!=='published'||typeof value.createdAt!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(value.createdAt)||!Number.isFinite(Date.parse(value.createdAt)))throw new Error('Invalid snapshot timestamp');
  if(!value.topics||typeof value.topics!=='object'||Array.isArray(value.topics))throw new Error('Invalid public topics');
  const local={...emptyState(),schemaVersion:value.schemaVersion,curriculumVersion:value.curriculumVersion,activeTopicId:value.activeTopicId,topics:{}};
  for(const [id,s] of Object.entries(value.topics)){keys(s,['completedStudyActivityIds','understanding','practice']);local.topics[id]={...emptyTopic(),...s};}
  const result=validateState(local,data);if(result.warnings.length)throw new Error('Public snapshot contains unknown IDs');
  return result.state;
}
