export const LEVEL_SEQUENCE = ["Discoverer", "Pathfinder", "Communicator", "Connector", "Storyteller"];

export const getNextLevel = (level) => {
  const index = LEVEL_SEQUENCE.indexOf(level);
  if (index === -1 || index >= LEVEL_SEQUENCE.length - 1) return null;
  return LEVEL_SEQUENCE[index + 1];
};

export const canAccessLevel = (currentLevel, targetLevel) => {
  if (!targetLevel) return true;
  if (!currentLevel) return true;
  const currentIndex = LEVEL_SEQUENCE.indexOf(currentLevel);
  const targetIndex = LEVEL_SEQUENCE.indexOf(targetLevel);
  if (currentIndex === -1 || targetIndex === -1) return true;
  return targetIndex <= currentIndex;
};
