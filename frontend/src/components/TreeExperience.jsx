import React, { useMemo, useState } from "react";
import "./TreeExperience.css";

const TREE_CONFIG = [
  {
    id: "ott",
    title: "OTT & Entertainment",
    subtitle: "Your favourite shows, films and live entertainment",
    theme: "ott",
    emoji: "🍊",
  },
  {
    id: "ai",
    title: "AI & Productivity",
    subtitle: "Your creative, research and productivity companions",
    theme: "ai",
    emoji: "🫐",
  },
  {
    id: "other",
    title: "Other Services",
    subtitle: "Music, design, storage and everything else",
    theme: "other",
    emoji: "🍏",
  },
];

const FRUIT_POSITIONS = [
  { left: "13%", top: "28%", rotate: "-8deg" },
  { left: "31%", top: "17%", rotate: "7deg" },
  { left: "51%", top: "23%", rotate: "-4deg" },
  { left: "70%", top: "17%", rotate: "8deg" },
  { left: "83%", top: "31%", rotate: "-6deg" },
  { left: "22%", top: "48%", rotate: "5deg" },
  { left: "42%", top: "43%", rotate: "-7deg" },
  { left: "63%", top: "48%", rotate: "6deg" },
  { left: "77%", top: "57%", rotate: "-3deg" },
  { left: "8%", top: "57%", rotate: "4deg" },
  { left: "34%", top: "63%", rotate: "-5deg" },
  { left: "56%", top: "65%", rotate: "5deg" },
];

function getTreeType(plan) {
  const category = String(plan?.category || "").trim().toLowerCase();
  const brand = String(plan?.brand || "").trim().toLowerCase();

  if (
    category === "ott, films & tv" ||
    category.includes("ott") ||
    /\b(netflix|prime video|amazon prime|jiohotstar|hotstar|sonyliv|zee5|disney|youtube premium|apple tv)\b/.test(brand)
  ) return "ott";

  if (
    category.startsWith("ai ") ||
    category.includes("artificial intelligence") ||
    /\b(chatgpt|openai|gemini|claude|copilot|perplexity|midjourney)\b/.test(brand)
  ) return "ai";

  return "other";
}

function getDomain(plan) {
  const raw = plan?.domain || plan?.websiteDomain || plan?.website || "";
  if (typeof raw !== "string" || !raw.trim()) return "";
  try {
    const url = /^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return "";
  }
}

function Fruit({ plan, selected, onClick, position, index, theme }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const domain = getDomain(plan);
  const favicon = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  return (
    <button
      type="button"
      className={`bu-fruit bu-fruit-${theme} ${selected ? "is-plucked" : ""}`}
      style={{
        left: position.left,
        top: position.top,
        "--fruit-rotation": position.rotate,
        "--fruit-delay": `${index * 45}ms`,
      }}
      onClick={() => onClick(plan)}
      aria-pressed={selected}
      title={`${selected ? "Remove" : "Pluck"} ${plan.brand} ${plan.tier || ""}`}
    >
      <span className="bu-fruit-string" />
      <span className="bu-fruit-leaf" />
      <span className="bu-fruit-body">
        {favicon && !logoFailed ? (
          <img
            src={favicon}
            alt=""
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <b>{String(plan.brand || "?").slice(0, 2).toUpperCase()}</b>
        )}
        {selected && <span className="bu-fruit-check">✓</span>}
      </span>
      <span className="bu-fruit-name">{plan.brand}</span>
    </button>
  );
}

function TreeArtwork({ theme }) {
  return (
    <svg className="bu-tree-art" viewBox="0 0 520 430" role="img" aria-label="Illustration of a leafy fruit tree">
      <defs>
        <linearGradient id={`trunk-${theme}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#9b633c" />
          <stop offset=".5" stopColor="#70452f" />
          <stop offset="1" stopColor="#422c27" />
        </linearGradient>
        <linearGradient id={`leaf-${theme}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={theme === "ott" ? "#a9df61" : theme === "ai" ? "#9bc8ff" : "#b9e77b"} />
          <stop offset="1" stopColor={theme === "ott" ? "#348b45" : theme === "ai" ? "#536ec7" : "#398d55"} />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="395" rx="178" ry="22" fill="rgba(42,82,49,.13)" />
      <path d="M245 390 C258 337 247 296 255 253 C262 213 247 174 230 142 C252 167 273 188 280 221 C292 185 322 160 354 146 C322 179 296 219 290 260 C286 304 297 345 315 390 Z" fill={`url(#trunk-${theme})`} />
      <path d="M259 315 C213 280 169 255 118 249 C172 253 218 262 263 291" fill="none" stroke="#795034" strokeWidth="18" strokeLinecap="round" />
      <path d="M282 286 C331 249 378 235 423 231 C375 244 331 268 284 309" fill="none" stroke="#795034" strokeWidth="16" strokeLinecap="round" />
      <path d="M263 355 C218 350 181 365 151 388 M292 354 C331 348 365 364 392 388" fill="none" stroke="#795034" strokeWidth="12" strokeLinecap="round" />

      {[
        [100, 155, 82], [160, 104, 95], [247, 83, 110], [350, 103, 96],
        [421, 163, 76], [119, 224, 78], [205, 194, 105], [316, 190, 104],
        [398, 231, 72], [255, 247, 90], [166, 255, 68], [352, 267, 70],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={`url(#leaf-${theme})`}
          opacity={i % 3 === 0 ? ".84" : ".94"}
        />
      ))}
      <g fill="rgba(255,255,255,.22)">
        <circle cx="145" cy="110" r="8" />
        <circle cx="230" cy="70" r="7" />
        <circle cx="367" cy="115" r="9" />
        <circle cx="412" cy="205" r="6" />
        <circle cx="177" cy="228" r="6" />
      </g>
      <path d="M75 391 Q260 365 445 391" fill="none" stroke="#6eaa59" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function SubscriptionTree({ config, plans, selectedIds, onPluck }) {
  const visiblePlans = plans.slice(0, FRUIT_POSITIONS.length);
  const selectedCount = plans.filter((plan) => selectedIds.includes(String(plan.id))).length;

  return (
    <article className={`bu-tree-card bu-tree-card-${config.theme}`}>
      <div className="bu-tree-card-top">
        <span className="bu-tree-kicker">{config.emoji} THE {config.id.toUpperCase()} TREE</span>
        <span className="bu-tree-count">{plans.length} subscriptions</span>
      </div>

      <div className="bu-tree-title-wrap">
        <h3>{config.title}</h3>
        <p>{config.subtitle}</p>
      </div>

      <div className="bu-tree-stage">
        <TreeArtwork theme={config.theme} />
        <div className="bu-tree-fruits">
          {visiblePlans.map((plan, index) => (
            <Fruit
              key={plan.id}
              plan={plan}
              selected={selectedIds.includes(String(plan.id))}
              onClick={onPluck}
              position={FRUIT_POSITIONS[index]}
              index={index}
              theme={config.theme}
            />
          ))}
        </div>
        {plans.length > FRUIT_POSITIONS.length && (
          <span className="bu-tree-more-fruit">
            +{plans.length - FRUIT_POSITIONS.length} more fruits below
          </span>
        )}
      </div>

      <div className="bu-tree-card-bottom">
        <span><strong>{selectedCount}</strong> plucked</span>
        <button type="button" onClick={() => onPluck(visiblePlans.find((p) => !selectedIds.includes(String(p.id))) || visiblePlans[0])} disabled={!visiblePlans.length || visiblePlans.every((p) => selectedIds.includes(String(p.id)))}>
          Pick a fruit <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

export default function TreeExperience({ plans = [], selectedIds = [], onPluck }) {
  const grouped = useMemo(() => {
    const result = { ott: [], ai: [], other: [] };
    plans.forEach((plan) => result[getTreeType(plan)].push(plan));
    return result;
  }, [plans]);

  return (
    <section className="bu-tree-world" aria-labelledby="bu-tree-world-title">
      <div className="bu-tree-shell">
        <header className="bu-tree-intro">
          <span className="bu-tree-eyebrow">PICK YOUR DIGITAL WORLD</span>
          <h2 id="bu-tree-world-title">Your subscriptions grow <span>on our trees.</span></h2>
          <p>Choose a fruit to add that subscription to your bundle. Every fruit represents a plan from the catalogue.</p>
        </header>

        <div className="bu-tree-grid">
          {TREE_CONFIG.map((config) => (
            <SubscriptionTree
              key={config.id}
              config={config}
              plans={grouped[config.id]}
              selectedIds={selectedIds}
              onPluck={onPluck}
            />
          ))}
        </div>

        <div className="bu-tree-instruction">
          <span className="bu-tree-instruction-icon">✦</span>
          <span><strong>Pluck a fruit.</strong> It will be added to Your Bundle below, where you can choose 1, 3, 6 or 12 months.</span>
        </div>
      </div>
    </section>
  );
}
