// src/services/StoryGenerator.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// --- ADVENTURE THEME -----------------------------------------------------------------

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
      `The statues nod in approval. "${name}, you are wise and brave!" Ahead lies the Shadow Fox. Listen for the true Crystal’s song to find it.`,
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

  // ----------- Mountain Branch -----------
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

  // ----------- River Branch -----------
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

// --- FRIENDSHIP THEME -----------------------------------------------------------------

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
