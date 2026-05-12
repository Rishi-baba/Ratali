

mandatory daily task ( change daily care to this and write the cost of each infront of it,  bath and nap can be done once per day and mark tick infront of them for feeding use the below shop only  ) 
-feed panda (80% health)
-bath panda (10%) cost - 10 bamboo
-nap time (10%) cost - 10 bamboo

feed you panda
- differnt food will have different health according to cost (1 bamboo = 1 health)
- what all can i feed panda 

chill activity
- add watch yt shorts 10 min - (50 bamboo)
- talk to rj (free)
- buy maggie (200 bamboo)
- buy momos (200 bamboo)
- buy pizza (500 bamboo)

Now functionality 
- change hero panda image or video according to what he is eating or what task he is doing
- max pand heath 100
- show bamboo count 
- bamboo count should only increase by completing task 
- completing all daily task reward = 20 bamboo (added automatically after completing all task)
- if panda heath (0) panda dead

Bamboo 
- bamboo allocated only by today task 
- bamboo per task is 100/total task of the day 





| Food          | Cost | Health |
| ------------- | ---- | ------ |
| Bamboo Stick  | 10   | +10    |
| Apple         | 20   | +20    |
| Peach         | 30   | +30    |
| Carrot        | 15   | +15    |
| Honey Bowl    | 50   | +50    |
| Sushi Roll    | 80   | +80    |
| Golden Bamboo | 100  | +100   |

IMPORTANT Missing Feature
Panda Sleep Reset

At midnight:
reset:

bath
nap
daily care completion
max health = 100

note 
let there be 10 task and user has done 5 of them and clamed bamboo and after that he add more task then divide the remaning bamboo accordingly 


images are in hero in asset folder

note 
let there be 10 task and user has done 5 of them and clamed bamboo and after that he add more task then divide the remaning bamboo accordingly 




Update the Panda Zone page and implement the complete PANDA HEALTH DECAY SYSTEM while preserving the exact current fantasy bamboo UI and layout.

IMPORTANT:

* Do NOT redesign the page
* Keep all current visuals, cards, panda layout, colors, and decorations exactly same
* Only add functionality and dynamic state updates

=====================================
PANDA HEALTH DECAY SYSTEM
=========================

Implement a real-time panda health decay system.

RULE:

* Panda health max = 100
* Panda health min = 0
* If user does absolutely nothing,
  panda health should gradually reach 0 in exactly 24 hours

Health should decay:

* smoothly over time
* dynamically using timestamps
* not using fake visual-only progress

Use:

* lastHealthUpdate timestamp
* dynamic recalculation
* automatic syncing on refresh/reload

=====================================
HEALTH STATE SYSTEM
===================

Dynamically change panda state/image according to health.

HEALTH STATES:

* check the image name and change the image according to health range mention in image

IMPORTANT:
Health-state image is the DEFAULT panda image.

=====================================
TEMPORARY ACTION IMAGE SYSTEM
=============================

When user performs an action:

* temporarily override health image
* show action image for 30 seconds
* after 30 seconds automatically return to health-state image

SUPPORTED TEMP ACTIONS:

* feeding bamboo
* eating pizza
* eating watermelon
* bath
* nap/sleep

Use existing images from hero/assets folder.

=====================================
PANDA DEATH SYSTEM
==================

If health reaches 0:

* pandaDead = true
* show dead panda image
* disable:

  * feeding
  * bath
  * nap
  * chill activities

Show:

* revive button
* warning text

REVIVE LOGIC:

* cost = 500 bamboo
* if enough bamboo:

  * bamboo -= 500
  * health = 50
  * pandaDead = false
  * panda image returns to healthy state

If insufficient bamboo:
show:
“Not enough bamboo 🐼”

=====================================
HEALTH BAR
==========

Update health bar dynamically:

* smooth animated transitions
* real percentage updates
* instant UI sync

Display:

* current health %
* health status text

Examples:

* Healthy
* Fine
* Weak
* Critical
* Dead

=====================================
IMPORTANT RULES
===============

* health cannot exceed 100
* health cannot go below 0
* all calculations should persist correctly after refresh
* health decay must continue even if app closed

=====================================
ANIMATIONS
==========

Add:

* smooth image transitions
* health bar animation
* soft glow effects
* gentle warning pulse at low health

=====================================
DO NOT
======

* redesign page
* change fantasy styling
* remove existing components
* flatten cozy UI

=====================================
GOAL
====

The panda should feel like a living virtual pet whose health continuously changes over time and whose image dynamically reacts to both health condition and temporary user actions while maintaining the cozy fantasy atmosphere.



I have fully implemented the Panda Health Decay System, dynamic bamboo rewards, and all the associated interactive features exactly as requested. Here is what has been accomplished:

1. 🐼 Panda Health Decay System
Real-time Continuous Decay: Panda health now smoothly decays from 100 to 0 over 24 hours. This calculation relies on lastHealthUpdate timestamps in the backend, meaning it persists safely and continues decaying even if the app is completely closed.
Midnight Sleep Reset: Every night at midnight, the backend automatically triggers a reset. The panda gets a fresh start: health = 100, bathDoneToday = false, napDoneToday = false, and claimedBambooToday = 0.
Panda Death & Revive: If the panda’s health hits 0, it officially dies (pandaDead = true). All feeding, chill activities, and daily care interactions are disabled. A "Revive" button beautifully appears on the screen, costing 500 Bamboo to revive the panda back to 50% health.
2. 🎴 Dynamic State & Action Image System
Health States: PandaZone dynamically monitors health and maps the hero image to the correct state from the assets folder (health_90to50%, health_50%, health_40_to_30%, health_20%, health_10%, or dead).
Temporary Action Overrides: When you interact with the panda (feeding bamboo, buying pizza, bath, nap), the hero image temporarily transforms into the specific action image (e.g., pizzaEat.png, sleeping.png, bath.png) for 30 seconds before seamlessly reverting to its regular health state.
Animated Health Bar: The health bar inside PandaHero is now fully dynamic, utilizing smooth width transitions and color shifts (turns red & pulses when Critical below 20%). The status text changes live (Healthy, Fine, Weak, Critical, Dead).
3. 🎋 Dynamic Bamboo Reward Pool & Tasks
Dynamic Task Math: Bamboo allocation has been completely rewritten. Tasks explicitly marked for "today" share a daily reward pool of exactly 100 Bamboo.
Fractional Distribution: When a task is completed, the backend actively looks at the remaining pool and divides it equally among the remaining pending tasks for the day. This guarantees that adding/completing tasks dynamically never exceeds the 100 limit.
Completion Bonus: Checking off all today tasks grants an automatic +20 Bamboo bonus along with the streak increment.
4. 🛒 Daily Care & Chill Activities Shop Updates
Updated Menus: Both DailyCareCard and ChillActivities have been updated with your specific items, bamboo costs, and health boosts.
Feed Shop Synced: The FeedSection correctly maps your new food items (Bamboo Stick, Apple, Peach, Carrot, Honey Bowl, Sushi Roll, Golden Bamboo) to their respective costs and health benefits.
API Interconnectivity: Every interaction smoothly hits a new /users/action backend endpoint that accurately deduces bamboo, adds health, records the timestamp, and instantly updates your local state without any page reloading!