import { questions, dimensions, fluencyLevels, type TeamProfile, type FluencyLevel } from "./data";

export interface DimensionScore {
  id: string;
  label: string;
  score: number; // 0-4
}

export interface AssessmentResult {
  dimensionScores: DimensionScore[];
  overallScore: number; // 0-4
  fluencyLevel: FluencyLevel;
  profile: TeamProfile;
}

export function calculateResults(
  answers: Record<string, number>,
  profile: TeamProfile
): AssessmentResult {
  const dimensionScores: DimensionScore[] = dimensions.map((dim) => {
    const dimQuestions = questions.filter((q) => q.dimension === dim.id);
    const dimAnswers = dimQuestions
      .map((q) => answers[q.id])
      .filter((v) => v !== undefined);

    const score =
      dimAnswers.length > 0
        ? dimAnswers.reduce((sum, v) => sum + v, 0) / dimAnswers.length
        : 0;

    return {
      id: dim.id,
      label: dim.label,
      score: Math.round(score * 10) / 10,
    };
  });

  const overallScore =
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length;
  const roundedOverall = Math.round(overallScore * 10) / 10;

  // Map overall score to fluency level
  let levelIndex: number;
  if (roundedOverall < 0.5) levelIndex = 0;
  else if (roundedOverall < 1.5) levelIndex = 1;
  else if (roundedOverall < 2.5) levelIndex = 2;
  else if (roundedOverall < 3.5) levelIndex = 3;
  else levelIndex = 4;

  return {
    dimensionScores,
    overallScore: roundedOverall,
    fluencyLevel: fluencyLevels[levelIndex],
    profile,
  };
}
