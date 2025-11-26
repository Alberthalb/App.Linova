export const defaultSummaryStats = { days: 0, lessons: 0, activities: 0 };

export const mapProgressSnapshot = (snapshot) => {
  if (!snapshot || !snapshot.size) {
    return defaultSummaryStats;
  }
  const uniqueDays = new Set();
  let activitiesCount = 0;
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();
    const timestamp = data?.updatedAt;
    const totalQuestions = Number(data?.totalQuestions) || 0;
    activitiesCount += totalQuestions || 0;
    if (timestamp?.toDate) {
      const dayKey = timestamp.toDate().toISOString().slice(0, 10);
      uniqueDays.add(dayKey);
    }
  });
  return {
    days: uniqueDays.size || 1,
    lessons: snapshot.size,
    activities: activitiesCount || snapshot.size,
  };
};
