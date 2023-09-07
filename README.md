DnD Spellbook: Prepare Your Spells!

The site displays a list of spells on the left hand side of the page, as well as a form to select a single spell. Either click on a spell or enter a spell name in the search form (case-sensitive) to populate a Featured Spell section in the center of the page. The Spell List also has an easter egg keydown event that allows the user to press '1' to collapse or expand the Spell List.

The Featured Spell section utilizes a separate fetch to draw detailed spell information from a sub URL nested in each spell's object. From the Featured Spell section a user can read details about each spell, add and save the given spell to a 'Spell Library' (which posts that spell to a local db.json server), or delete the given spell from the same local server.

The Spell Library occupies the right side of the page and displays the list of spells the user has added from the Featured Spell section. This list persists. Users can click select spells here to populate the Featured Spell section.

This was a passion project to express our general and expansive love for the DnD universe. To call this a labor of love would be a massive understatement. As an aside, we also satisfied the core requirements of our Phase 1 Group Project and added some additional stretch goals, which gave us opportunity to practice pertinent skills required in Phase 2.

Operating Information:
Start a local server. Type 'json-server --watch db.json' into your terminal and open a new tab for further terminal commands while server is running. Type 'Ctrl-C' in the server terminal tab to stop the server running.

This program utilizes DND 5e API's (https://www.dnd5eapi.co) data to allow users to create a personal spellbook which they can reference during sessions. Specifically, we draw a list of spells from 'https://www.dnd5eapi.co/api/spells'

Future Feature Goals:
Remove case-sensitivity from the search form.
Add ambient tavern music (TBD whether solely instrumental or augmented with vocals from a bard).
Add a mouseover event for the Spell Library to display spell summary details prior to click.
Add a browser caching capability to bypass use of a local server.

