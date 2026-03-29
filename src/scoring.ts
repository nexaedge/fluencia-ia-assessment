import { dimensions, fluencyLevels, type TeamProfile, type FluencyLevel } from "./data";

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
  const dimensionScores: DimensionScore[] = dimensions.map((dim) => ({
    id: dim.id,
    label: dim.label,
    score: answers[dim.id] ?? 0,
  }));

  const overallScore =
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length;
  const roundedOverall = Math.round(overallScore * 10) / 10;

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
