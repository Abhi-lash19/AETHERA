import { conceptual, topicState, understood } from './progress.js';
export const missingPrerequisites = (topic,data,state) => topic.prerequisites.map(id=>data.topics.find(t=>t.id===id)).filter(t=>!conceptual(t,state));
export function nextActivity(topic,state) {
  const s=topicState(state,topic.id);
  if(topic.activities.some(a=>a.required&&!s.completedStudyActivityIds.includes(a.id))) return {section:'study',action:'Explore the primary resource',reason:'Review the visual guide and learning objectives, then record your study.'};
  if(!understood(s.understanding)) return {section:'understanding',action:'Check your understanding',reason:'Use the completion prompt to assess what you can explain.'};
  if(topic.practice.required&&!['completed','skipped_for_now'].includes(s.practice)) return {section:'practice',action:'Try the practical activity',reason:'Your conceptual work is complete. Put it into practice.'};
  return null;
}
export function recommend(data,state,{ignoreActive=false}={}) {
  const active=data.topics.find(t=>t.id===state.activeTopicId);
  if(active&&!ignoreActive) {const pending=nextActivity(active,state);if(pending)return {topic:active,...pending};}
  const next=data.topics.find(t=>!conceptual(t,state)&&missingPrerequisites(t,data,state).length===0);
  if(next)return {topic:next,...nextActivity(next,state),reason:next.prerequisites.length?'The essential prerequisites are conceptually complete. This is the next topic in curriculum order.':'Start here: no earlier curriculum topics are required.'};
  const practical=data.topics.find(t=>t.practice.required&&topicState(state,t.id).practice!=='completed');
  if(practical)return {topic:practical,section:'practice',action:'Revisit outstanding practice',reason:'All core concepts are complete; this exercise remains outstanding.'};
  const review=data.topics.find(t=>topicState(state,t.id).needsReview);
  if(review)return {topic:review,section:'understanding',action:'Revisit a review flag',reason:'You marked this topic for another look.'};
  return {topic:null,section:'',action:'Explore optional deep dives',reason:'All core concepts and practicals are complete. Choose a deeper topic that serves your next project.'};
}
