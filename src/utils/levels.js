export const LEVEL_SEQUENCE = ["A1", "A2", "A2+", "B1", "B1+", "B2", "B2+", "C1", "C1+", "C2"];

const LEGACY_MAP = {
  Discoverer: "A1",
  Pathfinder: "A2",
  Communicator: "B1",
  Connector: "B2",
  Storyteller: "C1",
};

export const normalizeLevel = (value) => {
  if (!value) return "A1";
  const trimmed = String(value).trim();
  if (LEVEL_SEQUENCE.includes(trimmed)) return trimmed;
  const mapped = LEGACY_MAP[trimmed];
  return mapped || "A1";
};

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
