export const defaultSummaryStats = { days: 0, lessons: 0, activities: 0 };

export const mapProgressSnapshot = (snapshot) => {
  if (!snapshot || !snapshot.size) {
    return defaultSummaryStats;
  }
  const uniqueDays = new Set();
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();
    const timestamp = data?.updatedAt;
    if (timestamp?.toDate) {
      const dayKey = timestamp.toDate().toISOString().slice(0, 10);
      uniqueDays.add(dayKey);
    }
  });
  return {
    days: uniqueDays.size || 1,
    lessons: snapshot.size,
    activities: snapshot.size,
  };
};
