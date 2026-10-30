# Aethera User Guide

Aethera helps you follow an AI engineering learning path. You can explore topics, use learning resources, try exercises, and record what you understand.

## Start and enable editing

Aethera starts in **read-only** mode. You can explore the learning path right away. To record your own progress:

1. Open **Progress**.
2. Select **Enable editing on this browser**.
3. Read the message and select **Enable editing** in the window that opens.
4. If a published snapshot exists and you have no local progress, you may choose **Start from the published snapshot**. Otherwise, you can begin with an empty tracker.

Editing saves a copy in this browser. It does not sign you in or change the public website. Other visitors can edit their own browser copies too.

## Find your way around

- **Home** shows your current topic, your progress, and a suggested next activity. Select **Continue learning** to open the suggestion.
- **Roadmap** shows the learning path. Select a phase, then a module, then a topic. You can use **Search curriculum**, **Phase**, and **Learning state** to find topics. Select **Clear** to remove filters. **Show hierarchical list** changes the map to a list.
- **Saved** shows your bookmarked topics and resources. Use **Search saved items** to find one.
- **Progress** shows your progress by phase and module, recent activity, items to revisit, backups, and publishing instructions.

On a topic, select **Back** to return. You can open a topic even if its suggested earlier topics are not complete.

## Learn a topic

1. Read why the topic matters and the items under **Before you begin**. Links there lead to earlier topics that may help.
2. Under **Build your mental model**, read the learning objectives and open the primary resource. It opens an external website.
3. After reviewing the resource and objectives, check **Review the primary resource and learning objectives**. Opening the link alone does not check it.
4. Read **Make it tangible** and try the practical activity using the resource or your own tools.
5. Read **Check your understanding** and choose your self-assessment.

Some topics have **Optional supporting resources**. Open that section if you want to learn more. Resource pages may work differently on different devices.

## Track progress

Aethera shows three separate measures:

- **Study** counts checked required study activities.
- **Understanding** counts topics you mark **Can explain** or **Can apply**.
- **Practical** counts exercises you mark **Completed**.

You can change your choices later. A topic is **Conceptually complete** when its required study is checked and its understanding is **Can explain** or **Can apply**. It is **Fully complete** when its required practical activity is also completed.

### Choose an understanding level

On the topic, use **Self-assessed understanding**:

- **Not assessed**: you have not checked your understanding yet.
- **Needs review**: you want to revisit the concept.
- **Can explain**: you can explain it and answer the check.
- **Can apply**: you can use it in an example or decision.

These are your own assessments, not certificates or automatic test results.

### Record or skip an exercise

Under **Practical status**, choose **Not started**, **In progress**, **Completed**, or **Skipped for now**. Choose **Completed** only when you have actually done the stated exercise.

If you cannot do an exercise now, choose **Skipped for now**. You may add an optional private skip reason. The exercise stays outstanding, but you can continue learning. For the guided adaptation topic, a written plan does not count as an actual training run.

## Save topics, resources, and notes

With editing enabled:

1. Open a topic and select **Save topic** to bookmark it. Select **Saved** on that button to remove the bookmark.
2. On a resource card, select **Save resource**. Select **Saved resource** to remove it.
3. Find your bookmarks under **Saved**.
4. In the topic, open **Your private learning notes**. Add **Notes & reflections**, **Open questions**, or select **Flag this topic for review**.
5. Add optional **Evidence links**, one HTTPS link per line. These can point to your own work; they are not checked as proof.

Your notes, questions, bookmarks, review flags, evidence links, and skip reasons stay in the local browser copy. They are not included in a public snapshot.

## Change the theme

Use the **Theme** menu to choose **System**, **Dark**, or **Light**. System follows your device setting. Your choice is saved in this browser when browser storage is available.

## Save and restore a private backup

Your local progress can be lost if you clear browser data or change browsers. Keep a backup in a private place.

1. Enable editing, then open **Progress**.
2. Select **Export private backup** and save the downloaded file somewhere safe. It contains private notes and other local details.
3. To restore a backup, select **Import backup** and choose your file.
4. Read the preview. Importing **replaces** the current local progress, including notes. Use **Export current backup** first if you need a copy.
5. Select **Replace local progress** to continue, or **Cancel** to keep the current data.

An invalid backup is rejected. If a backup contains old or unknown IDs, Aethera reports them and keeps them in recoverable backup data without counting them as current progress.

## Publish progress for your phone

Aethera does not automatically sync between devices. Your laptop edits are stored in its browser; your phone in read-only mode sees the last snapshot that was published and deployed. Anyone with the site link can see that public snapshot.

1. On your laptop, enable editing and update your progress.
2. Open **Progress** and select **Export public snapshot**.
3. Review the preview, then select **Download public snapshot**. The download alone does not publish anything.
4. In your local copy of the repository, replace `public/data/published-progress.json` with the downloaded file.
5. Inspect the change, commit the file, and push it to `main` using Git or GitHub Desktop.
6. Wait for the GitHub Pages workflow to finish successfully. Then open or refresh the site on your phone in read-only mode.

The snapshot includes the current topic and study, understanding, and practical statuses. It does not include your notes, questions, evidence, bookmarks, review flags, recent activity, or skip reasons. Publishing requires repository access; the website itself cannot push to GitHub.

If no snapshot has been published, the site says **No progress published yet**. If you see **Not saved**, check your browser storage and keep a backup. Existing local edits are not automatically replaced when a new snapshot is published.
