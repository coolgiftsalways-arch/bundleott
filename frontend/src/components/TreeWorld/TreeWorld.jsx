
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
} from "@react-three/drei";

function groupOf(plan) {
  if (plan.category === "OTT, films & TV") return "ott";
  if (String(plan.category || "").startsWith("AI ")) return "ai";

  return "other";
}

const FRUIT_POSITIONS = [
  [-1.5, 3.15, 0.35],
  [-0.65, 3.65, 0.4],
  [0.35, 3.55, 0.45],
  [1.35, 3.05, 0.25],
  [-1.8, 2.45, 0.3],
  [-0.85, 2.7, 0.65],
  [0.2, 2.75, 0.6],
  [1.45, 2.35, 0.3],
  [-1.25, 1.85, 0.25],
  [0.15, 1.95, 0.45],
  [1.05, 1.85, 0.2],
  [0, 3.1, -0.65],
];

function Fruit({
  plan,
  position,
  selected,
  onClick,
  color,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={hovered ? 3 : 1.2}
      rotationIntensity={0.12}
      floatIntensity={hovered ? 0.25 : 0.1}
    >
      <group position={position}>
        <mesh
          castShadow
          onClick={(event) => {
            event.stopPropagation();
            onClick(plan);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial
            color={selected ? "#8dd9ad" : color}
            roughness={0.28}
            metalness={0.04}
            emissive={selected ? "#174e31" : "#000000"}
            emissiveIntensity={selected ? 0.45 : 0}
          />
        </mesh>

        <mesh position={[0, 0.2, 0]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.018, 0.025, 0.13, 8]} />
          <meshStandardMaterial color="#795333" />
        </mesh>

        {hovered && (
          <Html
            position={[0, 0.42, 0]}
            center
            distanceFactor={8}
            style={{ pointerEvents: "none" }}
          >
            <div className="bu-tree-fruit-tooltip">
              <strong>{plan.brand}</strong>
              <span>{plan.tier}</span>
              <small>{selected ? "Already in your bundle" : "Click to pluck"}</small>
            </div>
          </Html>
        )}

        {selected && (
          <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0.5]}>
            <torusGeometry args={[0.1, 0.012, 8, 24]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function TreeCanopy({ color, secondaryColor }) {
  const clusters = [
    [-1.25, 2.8, 0],
    [-0.55, 3.3, 0.1],
    [0.45, 3.25, 0],
    [1.15, 2.8, -0.05],
    [-0.95, 2.2, 0.1],
    [0.05, 2.35, 0.2],
    [0.9, 2.25, 0],
    [0, 3.65, -0.05],
  ];

  return (
    <group>
      {clusters.map((position, index) => (
        <mesh
          key={index}
          position={position}
          scale={
            index === 7
              ? [0.9, 0.85, 0.85]
              : [1, 0.8, 0.85]
          }
          castShadow
        >
          <icosahedronGeometry args={[0.95, 3]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? color : secondaryColor}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function Tree({
  title,
  subtitle,
  plans,
  selectedIds,
  onPluck,
  type,
}) {
  const colors =
    type === "ott"
      ? {
          leaf: "#4e9a67",
          secondary: "#75b77b",
          fruit: "#ef765f",
        }
      : {
          leaf: "#578cbb",
          secondary: "#8db9dc",
          fruit: "#f2bb5f",
        };

  const fruitPlans = plans.slice(0, FRUIT_POSITIONS.length);

  return (
    <group>
      {/* Roots and trunk */}
      <mesh
        position={[0, 0.9, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.48, 2.1, 16]} />
        <meshStandardMaterial color="#79543b" roughness={0.9} />
      </mesh>

      {/* Branches */}
      {[
        [-0.65, 1.9, 0, 0, 0, -0.65],
        [0.65, 2.0, 0, 0, 0, 0.65],
        [-0.45, 2.4, 0, 0, 0, -0.4],
        [0.45, 2.45, 0, 0, 0, 0.4],
      ].map((branch, index) => (
        <mesh
          key={index}
          position={branch.slice(0, 3)}
          rotation={branch.slice(3, 6)}
          castShadow
        >
          <cylinderGeometry args={[0.09, 0.14, 1.3, 10]} />
          <meshStandardMaterial color="#805b3d" roughness={0.9} />
        </mesh>
      ))}

      <TreeCanopy
        color={colors.leaf}
        secondaryColor={colors.secondary}
      />

      {fruitPlans.map((plan, index) => (
        <Fruit
          key={plan.id}
          plan={plan}
          position={FRUIT_POSITIONS[index]}
          selected={selectedIds.includes(String(plan.id))}
          color={colors.fruit}
          onClick={onPluck}
        />
      ))}

      <mesh position={[0, -0.12, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.35, 0.18, 48]} />
        <meshStandardMaterial color="#b9a78d" roughness={1} />
      </mesh>

      <Html position={[0, 4.75, 0]} center>
        <div className={`bu-tree-heading bu-tree-heading-${type}`}>
          <span>{type === "ott" ? "01 / ENTERTAINMENT" : "02 / INTELLIGENCE"}</span>
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </div>
      </Html>
    </group>
  );
}

function TreeScene({
  ottPlans,
  aiPlans,
  selectedIds,
  onPluck,
}) {
  return (
    <>
      <color attach="background" args={["#edf5ed"]} />

      <ambientLight intensity={1.6} />
      <directionalLight
        position={[5, 9, 7]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#b2c5a7"
        intensity={1}
      />

      <Environment preset="park" />

      <group position={[-3.1, -1.1, 0]} scale={0.83}>
        <Tree
          title="OTT Tree"
          subtitle="Entertainment grows here"
          plans={ottPlans}
          selectedIds={selectedIds}
          onPluck={onPluck}
          type="ott"
        />
      </group>

      <group position={[3.1, -1.1, 0]} scale={0.83}>
        <Tree
          title="AI Tree"
          subtitle="Ideas become intelligence"
          plans={aiPlans}
          selectedIds={selectedIds}
          onPluck={onPluck}
          type="ai"
        />
      </group>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.28}
        scale={15}
        blur={2.5}
        far={5}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-0.25}
        maxAzimuthAngle={0.25}
      />
    </>
  );
}

export default function TreeExperience({
  plans = [],
  selectedIds = [],
  onPluck = () => {},
}) {
  const ottPlans = useMemo(
    () => plans.filter((plan) => groupOf(plan) === "ott"),
    [plans]
  );

  const aiPlans = useMemo(
    () => plans.filter((plan) => groupOf(plan) === "ai"),
    [plans]
  );

  const [activeTab, setActiveTab] = useState("ott");

  const visiblePlans = activeTab === "ott" ? ottPlans : aiPlans;

  return (
    <section className="bu-tree-world">
      <div className="bu-tree-intro">
        <span className="bu-eyebrow">A DIFFERENT WAY TO BUILD YOUR BUNDLE</span>
        <h2>
          Pick from the <span>trees of possibilities.</span>
        </h2>
        <p>
          Every fruit represents a subscription. Select one to add it to your
          BundleUpOTT collection.
        </p>
      </div>

      <div className="bu-tree-legend">
        <span><i className="bu-tree-dot ott" /> OTT subscriptions</span>
        <span><i className="bu-tree-dot ai" /> AI subscriptions</span>
        <span><i className="bu-tree-dot selected" /> Selected fruit</span>
      </div>

      <div className="bu-tree-canvas">
        <Suspense
          fallback={
            <div className="bu-tree-loading">
              Growing your subscription trees...
            </div>
          }
        >
          <Canvas
            shadows
            dpr={[1, 1.7]}
            camera={{ position: [0, 4.4, 12], fov: 42 }}
            gl={{ antialias: true, alpha: false }}
          >
            <TreeScene
              ottPlans={ottPlans}
              aiPlans={aiPlans}
              selectedIds={selectedIds}
              onPluck={onPluck}
            />
          </Canvas>
        </Suspense>

        <div className="bu-tree-canvas-caption">
          <span>DRAG TO EXPLORE</span>
          <span>CLICK A FRUIT TO ADD IT</span>
        </div>
      </div>

      <div className="bu-tree-mobile-picker">
        <div className="bu-tree-mobile-tabs">
          <button
            type="button"
            className={activeTab === "ott" ? "active" : ""}
            onClick={() => setActiveTab("ott")}
          >
            OTT Tree ({ottPlans.length})
          </button>

          <button
            type="button"
            className={activeTab === "ai" ? "active" : ""}
            onClick={() => setActiveTab("ai")}
          >
            AI Tree ({aiPlans.length})
          </button>
        </div>

        <div className="bu-tree-mobile-fruits">
          {visiblePlans.map((plan) => {
            const selected = selectedIds.includes(String(plan.id));

            return (
              <button
                key={plan.id}
                type="button"
                className={selected ? "selected" : ""}
                onClick={() => onPluck(plan)}
              >
                <span className="bu-mobile-fruit-icon">✦</span>
                <span>
                  <strong>{plan.brand}</strong>
                  <small>{plan.tier}</small>
                </span>
                <span className="bu-mobile-fruit-action">
                  {selected ? "Added ✓" : "+ Add"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bu-tree-footer">
        <span>
          {selectedIds.length} subscription(s) in your bundle
        </span>
        <span>Choose more below to grow your bundle.</span>
      </div>
    </section>
  );
}
