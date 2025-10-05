import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [currentStory, setCurrentStory] = useState(null);
  const [currentScene, setCurrentScene] = useState(null);
  
  const startNewStory = (story) => {
    setCurrentStory(story);
    setCurrentScene(story);
  };
  
  const updateScene = (scene) => {
    setCurrentScene(scene);
  };
  
  const clearStory = () => {
    setCurrentStory(null);
    setCurrentScene(null);
  };
  
  return (
    <StoryContext.Provider value={{
      currentStory,
      currentScene,
      startNewStory,
      updateScene,
      clearStory
    }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
