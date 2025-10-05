// src/services/StoryGenerator.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// --- ADVENTURE THEME - COMPLETE -----------------------------------------------------------------

const EXPANDED_ADVENTURE_STORY = [
  {
    id: 'start',
    text: (name) =>
      `${name} found a glowing treasure map hidden in grandma's attic! The ancient map shows three mysterious paths leading to a legendary treasure. Which path calls to ${name}?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/adventure_start_owl.png'),
        bear: require('../../assets/images/adventure_start_bear.png'),
        rabbit: require('../../assets/images/adventure_start_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'forest_path', text: '🌲 Take the Forest Path' },
      { id: 'mountain_path', text: '⛰️ Choose the Mountain Path' },
      { id: 'river_path', text: '🏞️ Follow the River Path' },
    ],
  },

  // ----------- Forest Branch -----------
  {
    id: 'forest_path',
    text: (name) =>
      `${name} steps into the enchanted forest where ancient trees whisper secrets. Suddenly, ${name} hears a cry for help echoing through the woods!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/forest_path_owl.png'),
        bear: require('../../assets/images/forest_path_bear.png'),
        rabbit: require('../../assets/images/forest_path_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'help_creature', text: '🆘 Follow the cry for help' },
      { id: 'explore_mushrooms', text: '🍄 Investigate glowing mushrooms' },
      { id: 'climb_tree', text: '🌳 Climb the tallest tree' },
    ],
  },

  // Help Creature Branch (existing)
  {
    id: 'help_creature',
    text: (name) =>
      `${name} finds a small fairy trapped under a fallen branch! "Thank you," says the fairy. "The Shadow Fox stole the Crystal of Light. Can you help me retrieve it?"`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/help_creature_owl.png'),
        bear: require('../../assets/images/help_creature_bear.png'),
        rabbit: require('../../assets/images/help_creature_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'accept_quest', text: '⚔️ "I will help you!"' },
      { id: 'ask_more', text: '❓ "Tell me about the Shadow Fox"' },
      { id: 'suggest_team', text: '🤝 "We can work together"' },
    ],
  },
  {
    id: 'accept_quest',
    text: (name) =>
      `Luna the fairy smiles. "Take this magic compass or a starlight shield for protection." Which does ${name} choose?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/accept_quest_owl.png'),
        bear: require('../../assets/images/accept_quest_bear.png'),
        rabbit: require('../../assets/images/accept_quest_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'choose_compass', text: '🧭 Take the compass' },
      { id: 'choose_shield', text: '✨ Take the shield' },
      { id: 'ask_both', text: '🎁 "Can I have both?"' },
    ],
  },
  {
    id: 'choose_compass',
    text: (name) =>
      `${name} follows the compass into a dark cave guarded by two stone statues that come to life! They demand a riddle be solved to pass.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/choose_compass_owl.png'),
        bear: require('../../assets/images/choose_compass_bear.png'),
        rabbit: require('../../assets/images/choose_compass_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'solve_riddle', text: '🧠 "I am ready!"' },
      { id: 'try_sneak', text: '🤫 Try to sneak past' },
      { id: 'befriend_statues', text: '😊 "Can we be friends?"' },
    ],
  },
  {
    id: 'solve_riddle',
    text: (name) =>
      `The statues nod in approval. "${name}, you are wise and brave!" Ahead lies the Shadow Fox. Listen for the true Crystal's song to find it.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/solve_riddle_owl.png'),
        bear: require('../../assets/images/solve_riddle_bear.png'),
        rabbit: require('../../assets/images/solve_riddle_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'final_confrontation', text: '⚡ Face the Shadow Fox' }],
  },
  {
    id: 'final_confrontation',
    text: (name) =>
      `${name} meets the Shadow Fox with kindness. The Fox returns the Crystal of Light, and the forest glows brighter than ever!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/final_confrontation_owl.png'),
        bear: require('../../assets/images/final_confrontation_bear.png'),
        rabbit: require('../../assets/images/final_confrontation_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Ask More Branch
  {
    id: 'ask_more',
    text: (name) =>
      `Luna explains: "The Shadow Fox wasn't always evil. He's lonely and took the crystal to get attention. Maybe ${name} can help him find friendship instead of fear."`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/ask_more_owl.png'),
        bear: require('../../assets/images/ask_more_bear.png'),
        rabbit: require('../../assets/images/ask_more_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'approach_with_kindness', text: '💝 Approach with kindness' }],
  },
  {
    id: 'approach_with_kindness',
    text: (name) =>
      `${name} finds the Shadow Fox and offers friendship. "I understand being lonely," says ${name}. The Fox's heart melts, he returns the crystal, and they become the best of friends!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/approach_with_kindness_owl.png'),
        bear: require('../../assets/images/approach_with_kindness_bear.png'),
        rabbit: require('../../assets/images/approach_with_kindness_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Suggest Team Branch
  {
    id: 'suggest_team',
    text: (name) =>
      `"Great idea!" says Luna. Together, ${name} and Luna create a plan. They'll work as a team to outsmart the Shadow Fox and restore light to the forest.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/suggest_team_owl.png'),
        bear: require('../../assets/images/suggest_team_bear.png'),
        rabbit: require('../../assets/images/suggest_team_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'teamwork_victory', text: '🤝 Work together' }],
  },
  {
    id: 'teamwork_victory',
    text: (name) =>
      `${name} and Luna combine their strengths! Luna creates a diversion while ${name} retrieves the crystal. Their teamwork saves the day and the forest celebrates!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/teamwork_victory_owl.png'),
        bear: require('../../assets/images/teamwork_victory_bear.png'),
        rabbit: require('../../assets/images/teamwork_victory_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Choose Shield Branch
  {
    id: 'choose_shield',
    text: (name) =>
      `${name} takes the starlight shield. It glows with protective magic! The shield leads ${name} safely through the dark forest to the Shadow Fox's lair.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/choose_shield_owl.png'),
        bear: require('../../assets/images/choose_shield_bear.png'),
        rabbit: require('../../assets/images/choose_shield_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'shield_protection', text: '✨ Use shield\'s power' }],
  },
  {
    id: 'shield_protection',
    text: (name) =>
      `The starlight shield protects ${name} from the Shadow Fox's magic! Its pure light reminds the Fox of happier times. He returns the crystal and asks to be friends.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/shield_protection_owl.png'),
        bear: require('../../assets/images/shield_protection_bear.png'),
        rabbit: require('../../assets/images/shield_protection_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Ask Both Branch
  {
    id: 'ask_both',
    text: (name) =>
      `Luna smiles. "Your heart is brave enough for both!" She gives ${name} the compass AND the shield. With double protection, ${name} feels ready for anything!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/ask_both_owl.png'),
        bear: require('../../assets/images/ask_both_bear.png'),
        rabbit: require('../../assets/images/ask_both_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'double_power', text: '⚡ Use both magical items' }],
  },
  {
    id: 'double_power',
    text: (name) =>
      `With compass and shield combined, ${name} easily finds and befriends the Shadow Fox! The double magic shows the Fox that kindness is the greatest power of all.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/double_power_owl.png'),
        bear: require('../../assets/images/double_power_bear.png'),
        rabbit: require('../../assets/images/double_power_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Try Sneak Branch
  {
    id: 'try_sneak',
    text: (name) =>
      `${name} tries to sneak past the statues, but they wake up! "Clever, but not clever enough," they chuckle. "We admire your courage. Pass, brave one!"`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/try_sneak_owl.png'),
        bear: require('../../assets/images/try_sneak_bear.png'),
        rabbit: require('../../assets/images/try_sneak_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'sneaky_success', text: '🎭 Continue the adventure' }],
  },
  {
    id: 'sneaky_success',
    text: (name) =>
      `The impressed statues let ${name} pass! ${name} finds the Shadow Fox and surprises him with unexpected friendship. Sometimes the sneaky approach leads to the sweetest victories!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/sneaky_success_owl.png'),
        bear: require('../../assets/images/sneaky_success_bear.png'),
        rabbit: require('../../assets/images/sneaky_success_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Befriend Statues Branch
  {
    id: 'befriend_statues',
    text: (name) =>
      `The stone statues are delighted! "No one has ever wanted to be our friend!" they exclaim. They eagerly tell ${name} the best way to help the Shadow Fox.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/befriend_statues_owl.png'),
        bear: require('../../assets/images/befriend_statues_bear.png'),
        rabbit: require('../../assets/images/befriend_statues_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'statue_friends', text: '🗿 Learn from new friends' }],
  },
  {
    id: 'statue_friends',
    text: (name) =>
      `With the statues' advice, ${name} easily befriends the Shadow Fox! Now all four are best friends, and the forest is filled with laughter and light.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/statue_friends_owl.png'),
        bear: require('../../assets/images/statue_friends_bear.png'),
        rabbit: require('../../assets/images/statue_friends_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Explore Mushrooms Branch
  {
    id: 'explore_mushrooms',
    text: (name) =>
      `${name} discovers the glowing mushrooms are magical! They whisper ancient forest secrets and reveal a hidden path that leads directly to the Shadow Fox's heart.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/explore_mushrooms_owl.png'),
        bear: require('../../assets/images/explore_mushrooms_bear.png'),
        rabbit: require('../../assets/images/explore_mushrooms_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'mushroom_wisdom', text: '🍄 Follow the secret path' }],
  },
  {
    id: 'mushroom_wisdom',
    text: (name) =>
      `The mushrooms' wisdom guides ${name} to understand the Shadow Fox's loneliness. With this knowledge, ${name} offers true friendship, and the Fox gladly returns the crystal!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/mushroom_wisdom_owl.png'),
        bear: require('../../assets/images/mushroom_wisdom_bear.png'),
        rabbit: require('../../assets/images/mushroom_wisdom_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // NEW: Climb Tree Branch
  {
    id: 'climb_tree',
    text: (name) =>
      `${name} climbs the tallest tree and sees the whole forest! From up high, ${name} spots the Shadow Fox and realizes he's not scary at all—just very, very lonely.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/climb_tree_owl.png'),
        bear: require('../../assets/images/climb_tree_bear.png'),
        rabbit: require('../../assets/images/climb_tree_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'tree_perspective', text: '🌳 Climb down to help' }],
  },
  {
    id: 'tree_perspective',
    text: (name) =>
      `With new understanding, ${name} approaches the Shadow Fox with compassion. "Want to be friends?" asks ${name}. The Fox is so happy, he returns the crystal immediately!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/tree_perspective_owl.png'),
        bear: require('../../assets/images/tree_perspective_bear.png'),
        rabbit: require('../../assets/images/tree_perspective_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // ----------- Mountain Branch (existing, complete) -----------
  {
    id: 'mountain_path',
    text: (name) =>
      `${name} gazes up at the tall, misty mountain. With courage, ${name} begins the steep climb, wind whistling past ancient pines.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/mountain_path_owl.png'),
        bear: require('../../assets/images/mountain_path_bear.png'),
        rabbit: require('../../assets/images/mountain_path_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'mountain_challenge', text: '🧗 Climb higher!' }],
  },
  {
    id: 'mountain_challenge',
    text: (name) =>
      `${name} finds a wise mountain guardian who offers a riddle. Can ${name} solve it to reach the summit?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/mountain_challenge_owl.png'),
        bear: require('../../assets/images/mountain_challenge_bear.png'),
        rabbit: require('../../assets/images/mountain_challenge_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'mountain_resolution', text: '💡 Solve the riddle' }],
  },
  {
    id: 'mountain_resolution',
    text: (name) =>
      `Amazing! With clever thinking, ${name} solves the mountain riddle. The guardian gives ${name} a magical treasure. The view from the mountaintop is breathtaking!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/mountain_resolution_owl.png'),
        bear: require('../../assets/images/mountain_resolution_bear.png'),
        rabbit: require('../../assets/images/mountain_resolution_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },

  // ----------- River Branch (existing, complete) -----------
  {
    id: 'river_path',
    text: (name) =>
      `${name} follows a sparkling, winding river. Crystal clear water reflects the sun. A gentle current carries ${name} toward an adventure!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/river_path_owl.png'),
        bear: require('../../assets/images/river_path_bear.png'),
        rabbit: require('../../assets/images/river_path_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'river_obstacle', text: '🚣 Journey downstream' }],
  },
  {
    id: 'river_obstacle',
    text: (name) =>
      `${name} comes upon an obstacle: someone needs help to cross the river. Will ${name} lend a hand?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/river_obstacle_owl.png'),
        bear: require('../../assets/images/river_obstacle_bear.png'),
        rabbit: require('../../assets/images/river_obstacle_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'river_resolution', text: '🤝 Help and work together' }],
  },
  {
    id: 'river_resolution',
    text: (name) =>
      `Success! With teamwork and heart, ${name} helps new friends, and they celebrate together on the riverbank under a rainbow.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/river_resolution_owl.png'),
        bear: require('../../assets/images/river_resolution_bear.png'),
        rabbit: require('../../assets/images/river_resolution_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '🌟 The End' }],
  },
];

// --- FRIENDSHIP THEME - COMPLETE -----------------------------------------------------------------

const EXPANDED_FRIENDSHIP_STORY = [
  {
    id: 'start',
    text: (name) =>
      `${name} just moved to a new neighborhood and feels nervous about making friends. Looking out the bedroom window, ${name} sees kids playing happily in the park across the street. How should ${name} approach them?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/friendship_start_owl.png'),
        bear: require('../../assets/images/friendship_start_bear.png'),
        rabbit: require('../../assets/images/friendship_start_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'bring_game', text: '🎲 Bring a fun game to share' },
      { id: 'offer_snacks', text: '🍪 Bring homemade cookies' },
      { id: 'join_quietly', text: '😊 Walk over and say hello' },
    ],
  },

  // Bring Game Branch (existing, complete)
  {
    id: 'bring_game',
    text: (name) =>
      `${name} brings a colorful board game to the park. The other kids look curious and excited! "Can we play too?" asks a friendly girl named Emma. But ${name} notices one shy boy sitting alone on a bench, watching from far away.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/bring_game_owl.png'),
        bear: require('../../assets/images/bring_game_bear.png'),
        rabbit: require('../../assets/images/bring_game_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'invite_shy_boy', text: '🤗 Invite the shy boy to join' },
      { id: 'start_with_group', text: '👥 Start playing with the group first' },
      { id: 'make_teams', text: '⚽ Suggest making teams so everyone can play' },
    ],
  },
  {
    id: 'invite_shy_boy',
    text: (name) =>
      `${name} walks over to the shy boy. "Hi, I'm ${name}. Want to play this game with us?" The boy, named Alex, smiles shyly. "I'd like that, but I'm not very good at games." ${name} has a chance to make Alex feel welcome.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/invite_shy_boy_owl.png'),
        bear: require('../../assets/images/invite_shy_boy_bear.png'),
        rabbit: require('../../assets/images/invite_shy_boy_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'encourage_alex', text: '💪 "That\'s okay! We can learn together!"' },
      { id: 'suggest_teaching', text: '📚 "I can teach you! It\'s really fun!"' },
      { id: 'change_activity', text: '🎨 "Let\'s do something we all enjoy!"' },
    ],
  },
  {
    id: 'encourage_alex',
    text: (name) =>
      `Alex's face lights up! Soon everyone is laughing and having fun together. But then Emma accidentally knocks over Alex's juice box, spilling it everywhere. Alex looks upset, and Emma feels terrible. How can ${name} help fix this situation?`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/encourage_alex_owl.png'),
        bear: require('../../assets/images/encourage_alex_bear.png'),
        rabbit: require('../../assets/images/encourage_alex_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'mediate_conflict', text: '🤝 Help them talk it out' },
      { id: 'share_drink', text: '🥤 Share your own drink with Alex' },
      { id: 'clean_together', text: '🧽 Suggest everyone helps clean up' },
    ],
  },
  {
    id: 'mediate_conflict',
    text: (name) =>
      `${name} brings Emma and Alex together. "Emma didn't mean to spill it, and Alex, accidents happen to everyone." Emma apologizes sincerely, and Alex forgives her. Now the whole group feels closer than before! They decide to plan something special together.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/mediate_conflict_owl.png'),
        bear: require('../../assets/images/mediate_conflict_bear.png'),
        rabbit: require('../../assets/images/mediate_conflict_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [
      { id: 'plan_friendship_club', text: '🏠 Start a neighborhood friendship club' },
      { id: 'organize_playdate', text: '🎪 Plan a fun playdate for tomorrow' },
      { id: 'create_art_project', text: '🎨 Make a friendship art project together' },
    ],
  },
  {
    id: 'plan_friendship_club',
    text: (name) =>
      `${name} suggests creating the "Kindness Club" where they meet every week to play, help neighbors, and include anyone who feels left out. Alex offers his backyard for meetings, Emma brings art supplies, and everyone is excited to invite more kids!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/plan_friendship_club_owl.png'),
        bear: require('../../assets/images/plan_friendship_club_bear.png'),
        rabbit: require('../../assets/images/plan_friendship_club_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'friendship_celebration', text: '🎉 Celebrate new friendships!' }],
  },
  {
    id: 'friendship_celebration',
    text: (name) =>
      `A week later, the Kindness Club has grown to twelve kids! They help elderly neighbors, include new students at school, and have the most fun any of them have ever had. ${name} realizes that the best way to make friends is to be a good friend to others. What a wonderful adventure in friendship!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/friendship_celebration_owl.png'),
        bear: require('../../assets/images/friendship_celebration_bear.png'),
        rabbit: require('../../assets/images/friendship_celebration_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Friendship is the greatest treasure!' }],
  },

  // NEW: Suggest Teaching Branch
  {
    id: 'suggest_teaching',
    text: (name) =>
      `${name} patiently teaches Alex the game rules. "You're a great teacher!" says Alex. Soon Alex is winning rounds and helping teach other new kids who join them!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/suggest_teaching_owl.png'),
        bear: require('../../assets/images/suggest_teaching_bear.png'),
        rabbit: require('../../assets/images/suggest_teaching_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'teaching_success', text: '📚 Enjoy teaching others' }],
  },
  {
    id: 'teaching_success',
    text: (name) =>
      `${name} discovers the joy of teaching! Soon the park is full of kids learning games from each other. ${name} started a wonderful tradition of sharing knowledge and kindness.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/teaching_success_owl.png'),
        bear: require('../../assets/images/teaching_success_bear.png'),
        rabbit: require('../../assets/images/teaching_success_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Teaching is caring!' }],
  },

  // NEW: Change Activity Branch
  {
    id: 'change_activity',
    text: (name) =>
      `"What does everyone enjoy?" asks ${name}. They discover they all love drawing! ${name} suggests making friendship pictures together in the sandbox.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/change_activity_owl.png'),
        bear: require('../../assets/images/change_activity_bear.png'),
        rabbit: require('../../assets/images/change_activity_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'creative_friendship', text: '🎨 Create together' }],
  },
  {
    id: 'creative_friendship',
    text: (name) =>
      `Everyone creates beautiful friendship art together! Alex draws amazing animals, Emma makes colorful flowers, and ${name} brings it all together. Their artwork shows how different talents make friendship beautiful.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/creative_friendship_owl.png'),
        bear: require('../../assets/images/creative_friendship_bear.png'),
        rabbit: require('../../assets/images/creative_friendship_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Creativity brings us together!' }],
  },

  // NEW: Share Drink Branch
  {
    id: 'share_drink',
    text: (name) =>
      `${name} immediately shares their juice with Alex. "Thank you," says Alex gratefully. Emma is touched by ${name}'s kindness and apologizes sincerely.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/share_drink_owl.png'),
        bear: require('../../assets/images/share_drink_bear.png'),
        rabbit: require('../../assets/images/share_drink_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'sharing_circle', text: '🥤 Start a sharing circle' }],
  },
  {
    id: 'sharing_circle',
    text: (name) =>
      `Inspired by ${name}'s generosity, all the kids start sharing their snacks and drinks! They create a wonderful friendship picnic where everyone takes care of everyone else.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/sharing_circle_owl.png'),
        bear: require('../../assets/images/sharing_circle_bear.png'),
        rabbit: require('../../assets/images/sharing_circle_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Sharing is caring!' }],
  },

  // NEW: Clean Together Branch
  {
    id: 'clean_together',
    text: (name) =>
      `"Let's all help clean up!" suggests ${name}. Everyone pitches in, and the mess becomes a team effort. Alex and Emma work together, and their conflict turns into cooperation.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/clean_together_owl.png'),
        bear: require('../../assets/images/clean_together_bear.png'),
        rabbit: require('../../assets/images/clean_together_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'teamwork_friendship', text: '🧽 Celebrate teamwork' }],
  },
  {
    id: 'teamwork_friendship',
    text: (name) =>
      `The cleanup becomes so fun that more kids join in! ${name} turns a small accident into a big friendship party. Now the whole park is clean and full of new friends!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/teamwork_friendship_owl.png'),
        bear: require('../../assets/images/teamwork_friendship_bear.png'),
        rabbit: require('../../assets/images/teamwork_friendship_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Teamwork makes friendship work!' }],
  },

  // NEW: Organize Playdate Branch
  {
    id: 'organize_playdate',
    text: (name) =>
      `"Let's meet tomorrow for more fun!" suggests ${name}. Everyone excitedly plans a playdate at the local playground with games, snacks, and new activities to try together.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/organize_playdate_owl.png'),
        bear: require('../../assets/images/organize_playdate_bear.png'),
        rabbit: require('../../assets/images/organize_playdate_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'playdate_success', text: '🎪 Enjoy the playdate' }],
  },
  {
    id: 'playdate_success',
    text: (name) =>
      `The playdate is amazing! Even more kids join in, and ${name} becomes known as the best party planner in the neighborhood. Friendship playdates become a weekly tradition!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/playdate_success_owl.png'),
        bear: require('../../assets/images/playdate_success_bear.png'),
        rabbit: require('../../assets/images/playdate_success_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Friends love to play together!' }],
  },

  // NEW: Create Art Project Branch
  {
    id: 'create_art_project',
    text: (name) =>
      `"Let's make a friendship mural!" suggests ${name}. Everyone contributes their own special drawing to create one beautiful artwork that represents their new friendship.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/create_art_project_owl.png'),
        bear: require('../../assets/images/create_art_project_bear.png'),
        rabbit: require('../../assets/images/create_art_project_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'art_celebration', text: '🎨 Display the friendship mural' }],
  },
  {
    id: 'art_celebration',
    text: (name) =>
      `The friendship mural is displayed in the community center! Everyone in the neighborhood admires their beautiful art. ${name} and friends become local celebrities for their creativity and kindness.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/art_celebration_owl.png'),
        bear: require('../../assets/images/art_celebration_bear.png'),
        rabbit: require('../../assets/images/art_celebration_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Art brings hearts together!' }],
  },

  // NEW: Start with Group Branch
  {
    id: 'start_with_group',
    text: (name) =>
      `${name} starts playing with the excited group first. The game is so fun that the shy boy, Alex, slowly moves closer to watch. Eventually, he asks if he can join too!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/start_with_group_owl.png'),
        bear: require('../../assets/images/start_with_group_bear.png'),
        rabbit: require('../../assets/images/start_with_group_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'inclusive_gaming', text: '🎮 Include everyone naturally' }],
  },
  {
    id: 'inclusive_gaming',
    text: (name) =>
      `Alex joins the game and discovers he's actually really good at it! The group cheers for him, and he gains confidence. ${name} learns that sometimes shy kids just need to see the fun before joining in.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/inclusive_gaming_owl.png'),
        bear: require('../../assets/images/inclusive_gaming_bear.png'),
        rabbit: require('../../assets/images/inclusive_gaming_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Everyone has hidden talents!' }],
  },

  // NEW: Make Teams Branch
  {
    id: 'make_teams',
    text: (name) =>
      `"Let's make teams so everyone can play!" suggests ${name}. They create mixed teams that include both confident and shy kids, making sure everyone feels important.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/make_teams_owl.png'),
        bear: require('../../assets/images/make_teams_bear.png'),
        rabbit: require('../../assets/images/make_teams_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'team_spirit', text: '⚽ Build team spirit' }],
  },
  {
    id: 'team_spirit',
    text: (name) =>
      `The team approach works perfectly! Alex becomes a team captain and discovers his leadership skills. ${name} creates an inclusive environment where everyone shines in their own way.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/team_spirit_owl.png'),
        bear: require('../../assets/images/team_spirit_bear.png'),
        rabbit: require('../../assets/images/team_spirit_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Great teams include everyone!' }],
  },

  // NEW: Offer Snacks Branch
  {
    id: 'offer_snacks',
    text: (name) =>
      `${name} brings delicious homemade cookies to share! The wonderful smell attracts kids from all around the park. "These are amazing!" everyone exclaims.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/offer_snacks_owl.png'),
        bear: require('../../assets/images/offer_snacks_bear.png'),
        rabbit: require('../../assets/images/offer_snacks_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'cookie_friendship', text: '🍪 Share cookies with everyone' }],
  },
  {
    id: 'cookie_friendship',
    text: (name) =>
      `The cookies create instant friendships! Kids share stories about their favorite treats, and ${name} organizes a weekly "Snack and Story" time in the park. Food really does bring people together!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/cookie_friendship_owl.png'),
        bear: require('../../assets/images/cookie_friendship_bear.png'),
        rabbit: require('../../assets/images/cookie_friendship_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - Sharing treats creates sweet friendships!' }],
  },

  // NEW: Join Quietly Branch
  {
    id: 'join_quietly',
    text: (name) =>
      `${name} walks over and simply says "Hi, I'm ${name}. Can I play too?" The kids welcome ${name} warmly. Sometimes the simple approach is the best approach!`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/join_quietly_owl.png'),
        bear: require('../../assets/images/join_quietly_bear.png'),
        rabbit: require('../../assets/images/join_quietly_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'natural_friendship', text: '😊 Let friendship grow naturally' }],
  },
  {
    id: 'natural_friendship',
    text: (name) =>
      `${name} discovers that being genuine and friendly is all it takes! The kids become great friends naturally, playing together every day and always welcoming new kids to join their group.`,
    getImage: (character) => {
      const imageMap = {
        owl: require('../../assets/images/natural_friendship_owl.png'),
        bear: require('../../assets/images/natural_friendship_bear.png'),
        rabbit: require('../../assets/images/natural_friendship_rabbit.png'),
      };
      return imageMap[character.id] || imageMap.owl;
    },
    choices: [{ id: 'ending', text: '💝 The End - True friendship grows from the heart!' }],
  },
];

// --- LOGIC --------------------------------------------------------------------------

const STORY_STRUCTURE = {
  adventure: EXPANDED_ADVENTURE_STORY,
  friendship: EXPANDED_FRIENDSHIP_STORY,
};

class StoryGenerator {
  constructor() {
    this.story = null;
  }

  async generateStory(character, theme) {
    this.story = {
      character,
      theme,
      currentSceneId: 'start',
      path: ['start'],
      choicesMade: [],
    };
    return this.getCurrentScene();
  }

  getCurrentScene() {
    const themeData =
      STORY_STRUCTURE[this.story.theme.id] || STORY_STRUCTURE.adventure;
    const scene = themeData.find(
      (s) => s.id === this.story.currentSceneId
    );
    if (!scene) {
      return {
        id: 'fallback_ending',
        text: `${this.story.character.name} had an amazing adventure!`,
        choices: [{ id: 'ending', text: '🌟 The End' }],
        image: themeData[themeData.length - 1].getImage(this.story.character),
      };
    }
    return {
      ...scene,
      text:
        typeof scene.text === 'function'
          ? scene.text(this.story.character.name)
          : scene.text,
      image: scene.getImage
        ? scene.getImage(this.story.character)
        : scene.image,
      choices: scene.choices,
    };
  }

  async choose(choiceId) {
    this.story.currentSceneId = choiceId;
    this.story.path.push(choiceId);
    await this.saveStory();
    return this.getCurrentScene();
  }

  async saveStory() {
    try {
      const saved = await this.getSavedStories();
      saved.unshift(this.story);
      await AsyncStorage.setItem(
        'savedStories',
        JSON.stringify(saved.slice(0, 10))
      );
    } catch (e) {
      console.warn('Save failed', e);
    }
  }

  async getSavedStories() {
    try {
      const json = await AsyncStorage.getItem('savedStories');
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }
}

export default new StoryGenerator();
