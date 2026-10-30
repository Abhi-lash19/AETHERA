export function welcome() {
  return `<section class="welcome-card" aria-labelledby="welcome-title">
    <div class="between"><span class="eyebrow">WELCOME TO AETHERA</span><button class="text-button" data-action="dismiss-welcome" aria-label="Dismiss introduction">Dismiss</button></div>
    <h2 id="welcome-title">A little curiosity. A clearer understanding.</h2>
    <p>Your visual guide to AI engineering, one concept at a time. No deadlines. No account.</p>
    <ol class="welcome-steps"><li><span>01</span><strong>Explore</strong><p>Follow the map to visual guides and exercises.</p></li><li><span>02</span><strong>Understand</strong><p>Try a concept and explain it in your own words.</p></li><li><span>03</span><strong>Track</strong><p>Enable local editing to record your learning.</p></li></ol>
    <div class="actions"><button class="button primary" data-action="start-learning">Start Learning</button><button class="button" data-action="help">How Aethera Works</button></div>
  </section>`;
}

export function helpContent() {
  return `<div class="help-content"><p>Aethera organizes learning; exercises happen in linked resources or your own tools.</p>
    <h3>Explore → Understand → Track</h3><ol><li>Open <strong>Roadmap</strong>. Expand a phase, then a module, and choose a topic. Prerequisites are helpful suggestions, not locks.</li><li>Review the primary resource, try the exercise, and use the understanding check to explain what you learned.</li><li>Select <strong>Enable Progress Tracking</strong> on Home and confirm <strong>Enable editing</strong> to save in this browser. Exploring is free and needs no account.</li></ol>
    <h3>Three separate learning signals</h3><p><strong>Study</strong> records checked activities. <strong>Understanding</strong> is your own assessment. <strong>Practical</strong> records exercises you actually complete. Opening a topic or link does not complete it. Skipped exercises remain outstanding.</p>
    <h3>Your workspace</h3><p>Use <strong>Saved</strong> for bookmarks and topic notes for reflections, questions and evidence. <strong>Progress</strong> contains breakdowns, recent activity and backup controls. Choose System, Dark or Light in <strong>Theme</strong>.</p>
    <h3>Local means this browser</h3><p>Notes and bookmarks stay local. Export a <strong>private backup</strong> before clearing browser data. Import previews a replacement, not a merge. Public snapshots exclude private notes and must be downloaded, committed and deployed separately before your phone can see them. There is no automatic sync.</p>
    <a href="https://github.com/Abhi-lash19/AETHERA/blob/main/docs/USER_GUIDE.md" target="_blank" rel="noopener noreferrer">Read the full user guide ↗</a></div>`;
}
