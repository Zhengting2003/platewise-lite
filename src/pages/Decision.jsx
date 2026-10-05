import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { mockRecommendations } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";


const KEYWORD_MAP = {
  rice: ["rice"],
  chicken: ["chicken"],
  egg: ["egg"],
  eggs: ["egg"],
  vegetable: ["vegetable", "vegetables"],
  vegetables: ["vegetable", "vegetables"],
  broccoli: ["vegetable", "vegetables"],
  milk: ["milk"],
  yogurt: ["yogurt", "milk"],
  tomato: ["tomato"],
  tomatoes: ["tomato"],
  bread: ["bread", "toast"],
  toast: ["bread", "toast"],
  banana: ["banana"],
  bananas: ["banana"],
  apple: ["apple"],
  apples: ["apple"],
  carrot: ["carrot"],
  carrots: ["carrot"],
};

// 根据单个食物匹配推荐
function matchRecommendations(scannedFood) {
  if (!scannedFood) return mockRecommendations;

  const lower = scannedFood.toLowerCase();

  // 找关键词
  let keywords = KEYWORD_MAP[lower];
  if (!keywords) {
    const matchedKey = Object.keys(KEYWORD_MAP).find((key) =>
      lower.includes(key)
    );
    keywords = matchedKey ? KEYWORD_MAP[matchedKey] : [];
  }

  if (keywords.length === 0) return mockRecommendations;

  const matched = mockRecommendations.filter((rec) => {
    const title = rec.title.toLowerCase();
    return keywords.some((kw) => title.includes(kw));
  });

  return matched.length > 0 ? matched : mockRecommendations;
}

export default function Decision() {
  const navigate = useNavigate();
  const location = useLocation();

  const scannedFood = location.state?.food || "Leftover rice";

  const matchedRecipes = useMemo(
    () => matchRecommendations(scannedFood),
    [scannedFood]
  );

  const [showAll, setShowAll] = useState(false);
  const recipes = showAll ? mockRecommendations : matchedRecipes;

  const [index, setIndex] = useState(0);
  const recommendation = recipes[index % recipes.length];

  const isMatched =
    !showAll && matchedRecipes.length < mockRecommendations.length;

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    setIndex(0);
  };

  return (
    <div className="screen">
      <TopBar badge="Eat first" />

      <div className="hero">
        <div className="hero-kicker">
          <span>🌿</span>
          PlateWise recommendation
        </div>

        <h1>Eat this first.</h1>
        <p>Based on what needs attention in your fridge.</p>

        <div className="hero-illustration">🍴</div>
      </div>

      {/* 已扫描食物 */}
      <div
        style={{
          fontSize: 12,
          color: "#718078",
          fontWeight: 700,
          marginBottom: 5,
        }}
      >
        SCANNED ITEM
      </div>

      <div
        style={{
          color: "#1f684d",
          fontSize: 15,
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        {scannedFood}
      </div>

      {/* 状态提示 */}
      <div
        style={{
          fontSize: 12,
          color: isMatched ? "#1f684d" : "#718078",
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        {/* {showAll
          ? "📖 Showing all recipes"
          : isMatched
          ? `✓ Matched ${matchedRecipes.length} recipe${
              matchedRecipes.length > 1 ? "s" : ""
            } based on your item`
          : "Showing all recipes (no exact match found)"} */}
      </div>

      {/* 推荐卡 */}
      <div className="recommend-card">
        <div className="tag">PRIORITY MEAL</div>
        <h2>{recommendation.title}</h2>

        <div className="step-title">Simple steps</div>
        <ol>
          {recommendation.steps.map((step, stepIndex) => (
            <li key={stepIndex}>{step}</li>
          ))}
        </ol>
      </div>

      {/* 主按钮 */}
      <button
        className="btn-primary"
        onClick={() =>
          navigate("/completion", {
            state: { food: scannedFood },
          })
        }
      >
        ✓ Eat this
      </button>

      {/* 在当前列表里换 */}
      <button
        className="btn-secondary"
        onClick={() =>
          setIndex((current) => (current + 1) % recipes.length)
        }
      >
        ↻ Give me another
      </button>

      {/* 切换全部 / 匹配 */}
      {/* {matchedRecipes.length < mockRecommendations.length && (
        <button className="btn-secondary" onClick={toggleShowAll}>
          {showAll ? "🎯 Back to matched recipes" : "📖 Show all recipes"}
        </button>
      )} */}

      {/* <SimulatedTag text="Recommendations use preset prototype data with simple keyword matching." /> */}
    </div>
  );
}