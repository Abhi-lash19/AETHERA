import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { readSnapshot } from '../src/state/publishing.js';
// A deliberately narrow converter for the authored Section B.1 / D / E / F format.
// Changing the source structure fails validation; it never fills in missing lessons.
const source = (await readFile(new URL('../docs/CURRICULUM.md', import.meta.url), 'utf8')).replaceAll('\r\n','\n');
const ids = text => [...text.matchAll(/`([a-z][a-z0-9-]+)`/g)].map(m=>m[1]);
const links = text => [...text.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)].map(m=>({title:m[1],url:m[2]}));
const phases = [...source.matchAll(/^### Phase (\d): (.+)$/gm)].map(m=>({id:`phase-${m[1]}`,name:m[2],order:+m[1],moduleIds:[]}));
const modules = [...source.matchAll(/^\| (\d) \| `([^`]+)`: \*\*(.+?)\*\* \| (.+?) \| (\d) \|$/gm)].map((m,i)=>({id:m[2],name:m[3],phaseId:`phase-${m[1]}`,order:i+1,topicIds:ids(m[4])}));
for(const p of phases) p.moduleIds=modules.filter(m=>m.phaseId===p.id).map(m=>m.id);
const register = source.split('## F. Resource verification register')[1].split('## G.')[0];
const resources=[];
const topics=[...source.matchAll(/^#### `([^`]+)`: (.+)\n([\s\S]*?)(?=^#### |^### Phase |^## E\.)/gm)].map(m=>{
  const fields={};
  for(const line of m[3].trim().split('\n')) {const f=line.match(/^- \*\*(.+?)\*\* (.+)$/); if(f) fields[f[1].replace(/:$/,'')]=f[2];}
  const required=['Why learn this?','Understand','Prerequisites','Best visual resource','Practical activity','Completion check','Next topic'];
  for(const field of required) assert.ok(fields[field],`${m[1]} missing ${field}`);
  const resourceIds=[];
  for(const [field,kind] of [['Best visual resource','primary'],['Optional supporting resource','supporting']]) {
    if(!fields[field]) continue;
    for(const [i,link] of links(fields[field]).entries()) {
      const row=register.split('\n').find(l=>l.startsWith('| [')&&l.includes(`(${link.url})`));
      assert.ok(row,`Resource absent from register: ${link.url}`);
      const cells=row.split(' | ');
      const id=`${m[1]}:${kind}-${i+1}`; resourceIds.push(id);
      resources.push({id,...link,type:kind,description:fields[field],verification:cells[1].replaceAll('**',''),caveats:cells.slice(2).join(' | ').replace(/ \|$/,''),verificationDate:'2026-10-30'});
    }
  }
  const module=modules.find(mod=>mod.topicIds.includes(m[1])); assert.ok(module);
  return {id:m[1],name:m[2],moduleId:module.id,phaseId:module.phaseId,why:fields['Why learn this?'],outcomes:fields.Understand,prerequisites:ids(fields.Prerequisites),prerequisiteText:fields.Prerequisites,recommendedPrior:fields['Recommended prior learning']||'',primaryResourceId:resourceIds[0],supportingResourceIds:resourceIds.slice(1),activities:[{id:`${m[1]}:study-primary`,label:'Review the primary resource and learning objectives',required:true,type:'study',resourceId:resourceIds[0]}],practice:{id:`${m[1]}:practice`,required:true,instructions:fields['Practical activity']},completionCheck:fields['Completion check'],nextHint:fields['Next topic']};
});
const deepDives=source.split('## E. Optional deep dives')[1].split('## F.')[0].split('\n').filter(l=>l.startsWith('| ')&&!l.startsWith('| Topic')&&!l.startsWith('| ---')).map(l=>{const c=l.split(' | '); return {title:c[0].slice(2),why:c[1].replace(/ \|$/,''),links:links(c[0])};});
const data={schemaVersion:1,curriculumVersion:'aethera-core-v1',phases,modules,topics,resources,deepDives};
assert.equal(phases.length,7); assert.equal(modules.length,14); assert.equal(topics.length,31);
assert.equal(new Set(modules.flatMap(m=>m.topicIds)).size,31); assert.equal(modules.flatMap(m=>m.topicIds).length,31);
const visit=(id,path=[])=>{assert.ok(!path.includes(id),`Prerequisite cycle: ${id}`); const t=topics.find(t=>t.id===id); assert.ok(t,`Unknown prerequisite ${id}`); t.prerequisites.forEach(p=>visit(p,[...path,id]));}; topics.forEach(t=>visit(t.id));
for(const r of resources) assert.equal(new URL(r.url).protocol,'https:');
assert.equal(new Set(topics.flatMap(t=>t.activities.map(a=>a.id))).size,31);
const file=new URL('../src/data/curriculum.json',import.meta.url);
if(process.argv.includes('--write')) {await mkdir(new URL('../src/data/',import.meta.url),{recursive:true});await writeFile(file,JSON.stringify(data,null,2)+'\n');}
else assert.deepEqual(JSON.parse(await readFile(file,'utf8')),data,'Curriculum derivative differs: review source changes, then npm run data:sync');
readSnapshot(JSON.parse(await readFile(new URL('../public/data/published-progress.json',import.meta.url),'utf8')),data);
console.log(`Validated ${phases.length} phases, ${modules.length} modules, ${topics.length} topics, ${resources.length} resource assignments against source.`);
