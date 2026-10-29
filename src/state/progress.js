export const understandingLevels = ['not_assessed','needs_review','can_explain','can_apply'];
export const practiceLevels = ['not_started','in_progress','completed','skipped_for_now'];
export const label = value => ({not_assessed:'Not assessed',needs_review:'Needs review',can_explain:'Can explain',can_apply:'Can apply',not_started:'Not started',in_progress:'In progress',completed:'Completed',skipped_for_now:'Skipped for now'}[value] || value);
export const emptyTopic = () => ({completedStudyActivityIds:[],understanding:'not_assessed',practice:'not_started',practiceSkipReason:'',notes:'',questions:'',needsReview:false,evidenceUrls:[],updatedAt:null});
export const emptyState = () => ({schemaVersion:1,curriculumVersion:'aethera-core-v1',activeTopicId:null,topics:{},bookmarkedTopicIds:[],bookmarkedResourceIds:[],recentTopicIds:[],unmappedProgress:{}});
export const topicState = (state,id) => ({...emptyTopic(),...state.topics[id]});
export const understood = value => ['can_explain','can_apply'].includes(value);
export const conceptual = (topic,state) => {const s=topicState(state,topic.id);return understood(s.understanding)&&topic.activities.filter(a=>a.required).every(a=>s.completedStudyActivityIds.includes(a.id));};
export const complete = (topic,state) => conceptual(topic,state)&&(!topic.practice.required||topicState(state,topic.id).practice==='completed');
export function status(topic,state) {
  if(complete(topic,state)) return 'Fully complete';
  if(conceptual(topic,state)) return 'Conceptually complete';
  const s=topicState(state,topic.id);
  return s.completedStudyActivityIds.length||s.understanding!=='not_assessed'||s.practice!=='not_started'?'In progress':'Not started';
}
export function progress(topics,state) {
  const study=topics.flatMap(t=>t.activities.filter(a=>a.required).map(a=>topicState(state,t.id).completedStudyActivityIds.includes(a.id)));
  const practical=topics.filter(t=>t.practice.required);
  return [['Study',study.filter(Boolean).length,study.length],['Understanding',topics.filter(t=>understood(topicState(state,t.id).understanding)).length,topics.length],['Practical',practical.filter(t=>topicState(state,t.id).practice==='completed').length,practical.length]].map(([name,done,total])=>({name,done,total,percent:total?Math.round(done/total*100):null}));
}
