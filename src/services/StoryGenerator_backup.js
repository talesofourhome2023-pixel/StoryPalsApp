// src/services/StoryGenerator.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORY_STRUCTURE = {
  adventure: [
    {
      id: 'start',
      text: (name) =>
        `${name} found a glowing treasure map in the attic! The map shows three mysterious locations. Which path should ${name} take first?`,
      image: require('../../assets/images/adventure_start.png'),
      choices: [
        { id: 'enchanted_forest', text: '🌲 Enter the Enchanted Forest' },
        { id: 'crystal_caves', text: '💎 Explore the Crystal Caves' },
        { id: 'floating_islands', text: '☁️ Visit the Floating Islands' },
      ],
    },
    {
      id: 'enchanted_forest',
      text: (name) =>
        `${name} steps into the magical forest where the trees whisper secrets. Suddenly, a talking fox appears! "I can help you find the treasure," says the fox, "but first, you must help me."`,
      image: require('../../assets/images/enchanted_forest.png'),
      choices: [
        { id: 'help_fox', text: 'Help the talking fox' },
        { id: 'ignore_fox', text: 'Continue alone through the forest' },
        { id: 'ask_riddle', text: 'Ask the fox for a riddle' },
      ],
    },
    {
      id: 'crystal_caves',
      text: (name) =>
        `${name} enters shimmering caves filled with glowing crystals. The crystals hum with magical energy! There are three tunnels ahead, each glowing a different color.`,
      image: require('../../assets/images/crystal_caves.png'),
      choices: [
        { id: 'blue_tunnel', text: '💙 Follow the blue glow' },
        { id: 'golden_tunnel', text: '💛 Follow the golden glow' },
        { id: 'rainbow_tunnel', text: '🌈 Follow the rainbow glow' },
      ],
    },
    {
      id: 'floating_islands',
      text: (name) =>
        `${name} climbs aboard a magical cloud that lifts them to floating islands in the sky! On the first island, they meet a wise dragon who guards an ancient library.`,
      image: require('../../assets/images/floating_islands.png'),
      choices: [
        { id: 'read_books', text: '📚 Read the magical books' },
        { id: 'befriend_dragon', text: '🐉 Try to befriend the dragon' },
        { id: 'explore_more_islands', text: '🏝️ Explore other islands' },
      ],
    },
    {
      id: 'help_fox',
      text: (name) =>
        `${name} helps the fox find its lost magical collar. In return, the fox reveals a secret passage to an underground kingdom filled with friendly gnomes!`,
      image: require('../../assets/images/gnome_kingdom.png'),
      choices: [
        { id: 'gnome_kingdom', text: 'Visit the gnome kingdom' },
        { id: 'return_surface', text: 'Return to the surface with the fox' },
      ],
    },
    {
      id: 'blue_tunnel',
      text: (name) =>
        `${name} follows the blue light and discovers an underground lake with a singing mermaid! She offers to teach ${name} a magical song.`,
      image: require('../../assets/images/crystal_caves.png'),
      choices: [
        { id: 'learn_song', text: 'Learn the magical song' },
        { id: 'explore_lake', text: 'Explore the magical lake' },
      ],
    },
    {
      id: 'befriend_dragon',
      text: (name) =>
        `The dragon is delighted to have a friend! It gives ${name} a magical feather that allows them to fly to any island in the sky.`,
      image: require('../../assets/images/floating_islands.png'),
      choices: [
        { id: 'treasure_island', text: 'Fly to Treasure Island' },
        { id: 'cloud_castle', text: 'Visit the Cloud Castle' },
      ],
    },
    {
      id: 'treasure_island',
      text: (name) =>
        `${name} finds the legendary treasure chest! Inside are magical seeds that can grow into anything they imagine. The adventure is complete!`,
      image: require('../../assets/images/treasure_island.png'),
      choices: [{ id: 'ending', text: '🌟 The End - What an adventure!' }],
    },
  ],

  friendship: [
    {
      id: 'start',
      text: (name) =>
        `${name} just moved to a new neighborhood and feels a little lonely. Looking out the window, they see other kids playing in the park. How should ${name} make new friends?`,
      image: require('../../assets/images/friendship_start.png'),
      choices: [
        { id: 'join_playground', text: '🏃‍♂️ Go to the playground' },
        { id: 'bring_snacks', text: '🍪 Bring homemade cookies to share' },
        { id: 'organize_game', text: '⚽ Organize a fun game' },
      ],
    },
    {
      id: 'join_playground',
      text: (name) =>
        `At the playground, ${name} sees a shy child sitting alone on a swing while others play tag. What should ${name} do?`,
      image: require('../../assets/images/playground_invitation.png'),
      choices: [
        { id: 'invite_shy_child', text: 'Invite the shy child to play' },
        { id: 'join_tag_game', text: 'Join the tag game' },
        { id: 'suggest_new_activity', text: 'Suggest a group activity' },
      ],
    },
    {
      id: 'bring_snacks',
      text: (name) =>
        `${name} brings delicious cookies to the park! The other children are excited to try them. One child mentions they're allergic to nuts. How does ${name} handle this?`,
      image: require('../../assets/images/cookie_sharing.png'),
      choices: [
        { id: 'make_new_batch', text: 'Offer to make nut-free cookies next time' },
        { id: 'share_other_snacks', text: 'Find other snacks they can share' },
        { id: 'include_everyone', text: 'Make sure everyone feels included' },
      ],
    },
    {
      id: 'invite_shy_child',
      text: (name) =>
        `The shy child, named Sam, is so happy to be included! Sam knows lots of fun games and becomes ${name}'s first new friend. Together they invite others to join.`,
      image: require('../../assets/images/kindness_club.png'),
      choices: [
        { id: 'friendship_club', text: 'Start a friendship club' },
        { id: 'plan_playdate', text: 'Plan a playdate for tomorrow' },
      ],
    },
    {
      id: 'friendship_club',
      text: () => `💝 The End – Friendship wins!`,
      image: require('../../assets/images/kindness_club.png'),
      choices: [{ id: 'ending', text: 'The End' }],
    },
  ],

  bedtime: [
    {
      id: 'start',
      text: (name) =>
        `${name} is getting ready for bed when they notice their bedroom looks different tonight. The moonlight is making everything glow softly, and there's a gentle, magical feeling in the air.`,
      image: require('../../assets/images/bedtime_start.png'),
      choices: [
        { id: 'follow_moonbeam', text: '🌙 Follow a moonbeam to the window' },
        { id: 'check_under_bed', text: '🛏️ Look under the bed curiously' },
        { id: 'hug_teddy', text: '🧸 Hug favorite teddy bear tight' },
      ],
    },
    {
      id: 'follow_moonbeam',
      text: (name) =>
        `${name} follows the moonbeam and sees it leads to a beautiful garden outside their window. The garden is full of sleepy flowers that glow gently in the moonlight.`,
      image: require('../../assets/images/dream_garden.png'),
      choices: [
        { id: 'visit_dream_garden', text: 'Visit the dream garden' },
        { id: 'wave_to_moon', text: 'Wave hello to the moon' },
        { id: 'make_wish', text: 'Make a sleepy wish' },
      ],
    },
    {
      id: 'visit_dream_garden',
      text: (name) =>
        `In the dream garden, ${name} meets sleepy woodland creatures preparing for bed. A gentle owl reads bedtime stories to young rabbits under a starry sky.`,
      image: require('../../assets/images/owl_storytime.png'),
      choices: [
        { id: 'listen_story', text: "Listen to the owl's story" },
        { id: 'help_animals', text: 'Help animals get cozy for bed' },
      ],
    },
    {
      id: 'listen_story',
      text: () => `😴 Drift off to peaceful sleep`,
      image: require('../../assets/images/peaceful_sleep.png'),
      choices: [{ id: 'ending', text: 'The End' }],
    },
  ],

  helping: [
    {
      id: 'start',
      text: (name) =>
        `${name} wakes up on Saturday morning and sees that Mom looks tired from working all week. Dad is trying to fix something in the garage, and little sister is struggling with her art project. How can ${name} help?`,
      image: require('../../assets/images/helping_start.png'),
      choices: [
        { id: 'help_mom', text: '👩 Help Mom with breakfast' },
        { id: 'help_dad', text: '👨 Assist Dad in the garage' },
        { id: 'help_sister', text: '👧 Help sister with art project' },
      ],
    },
    {
      id: 'help_dad',
      text: (name) =>
        `${name} helps Dad organize tools and hold things steady. Dad teaches ${name} how to fix things and they work as a great team! They even fix the neighbor's squeaky gate together.`,
      image: require('../../assets/images/garage_repair.png'),
      choices: [
        { id: 'learn_more_repairs', text: 'Learn more repairs' },
        { id: 'help_community', text: 'Offer to help the whole community' },
      ],
    },
    {
      id: 'help_community',
      text: () =>
        `🤝 The End – Helping makes everyone happy!`,
      image: require('../../assets/images/community_helper_squad.png'),
      choices: [{ id: 'ending', text: 'The End' }],
    },
  ],
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
    const scene =
      themeData.find((s) => s.id === this.story.currentSceneId) ||
      themeData[themeData.length - 1];
    return {
      ...scene,
      text:
        typeof scene.text === 'function'
          ? scene.text(this.story.character.name)
          : scene.text,
      choices: scene.choices,
      image: scene.image,
    };
  }

  async choose(choiceId) {
    this.story.currentSceneId = choiceId;
    this.story.path.push(choiceId);
    this.story.choicesMade.push({
      from: this.story.path[this.story.path.length - 2],
      to: choiceId,
      timestamp: new Date().toISOString(),
    });
    await this.saveStory();
    return this.getCurrentScene();
  }

  async saveStory() {
    try {
      const saved = await this.getSavedStories();
      saved.unshift(this.story);
      await AsyncStorage.setItem('savedStories', JSON.stringify(saved.slice(0, 10)));
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

  getStoryStats() {
    if (!this.story) return null;
    return {
      character: this.story.character.name,
      theme: this.story.theme.name,
      choicesCount: this.story.choicesMade.length,
      path: this.story.path,
    };
  }
}

export default new StoryGenerator();
