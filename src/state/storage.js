import { emptyState } from './progress.js';
import { serialize, validateState } from './imports.js';
export const STORAGE_KEY='aethera:local:v1';
export function loadState(storage,data) {try {const raw=storage.getItem(STORAGE_KEY);return raw?{...validateState(raw,data),exists:true}:{state:emptyState(),warnings:[],exists:false};}catch(error){return {state:emptyState(),warnings:[],exists:false,error:`Local data could not be loaded: ${error.message}`};}}
export function saveState(storage,state,data) {const serialized=serialize(state,data);storage.setItem(STORAGE_KEY,serialized);return state;}
export function visitTopic(state,id,at=new Date().toISOString()) {return {...state,activeTopicId:id,recentTopicIds:[{id,at},...state.recentTopicIds.filter(r=>r.id!==id)].slice(0,10)};}
