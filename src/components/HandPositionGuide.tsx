interface HandPositionGuideProps {
  activeKey?: string;
  activeFinger?: string;
}

const fingerColors: Record<string, string> = {
  leftPinky: "hsl(var(--destructive))",
  leftRing: "hsl(var(--secondary))", 
  leftMiddle: "hsl(var(--primary))",
  leftIndex: "hsl(var(--accent))",
  rightIndex: "hsl(var(--accent))",
  rightMiddle: "hsl(var(--primary))",
  rightRing: "hsl(var(--secondary))",
  rightPinky: "hsl(var(--destructive))",
  thumbs: "hsl(var(--muted-foreground))",
};

const fingerLabels: Record<string, string> = {
  leftPinky: "Left Pinky",
  leftRing: "Left Ring",
  leftMiddle: "Left Middle",
  leftIndex: "Left Index",
  rightIndex: "Right Index",
  rightMiddle: "Right Middle",
  rightRing: "Right Ring",
  rightPinky: "Right Pinky",
};

const HandPositionGuide = ({ activeKey, activeFinger }: HandPositionGuideProps) => {
  const isActive = (finger: string) => activeFinger === finger;

  const renderHand = (side: "left" | "right") => {
    const fingers = side === "left" 
      ? ["leftPinky", "leftRing", "leftMiddle", "leftIndex"]
      : ["rightIndex", "rightMiddle", "rightRing", "rightPinky"];
    
    const homeKeys = side === "left" 
      ? ["A", "S", "D", "F"]
      : ["J", "K", "L", ";"];

    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {side === "left" ? "Left Hand" : "Right Hand"}
        </p>
        <svg viewBox="0 0 200 260" className="w-36 h-48 md:w-44 md:h-56">
          {/* Palm */}
          <ellipse 
            cx="100" cy="190" rx="75" ry="55" 
            fill="none" stroke="hsl(var(--border))" strokeWidth="2" 
            className="transition-colors"
          />
          
          {/* Wrist */}
          <rect x="55" y="230" width="90" height="25" rx="10" 
            fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
          
          {/* Fingers */}
          {fingers.map((finger, i) => {
            const active = isActive(finger);
            const positions = side === "left" 
              ? [
                  { x: 38, tipY: 65, baseY: 145 },   // pinky
                  { x: 65, tipY: 30, baseY: 140 },   // ring
                  { x: 92, tipY: 15, baseY: 138 },   // middle
                  { x: 120, tipY: 40, baseY: 142 },  // index
                ]
              : [
                  { x: 80, tipY: 40, baseY: 142 },   // index
                  { x: 108, tipY: 15, baseY: 138 },  // middle
                  { x: 135, tipY: 30, baseY: 140 },  // ring
                  { x: 162, tipY: 65, baseY: 145 },  // pinky
                ];
            
            const pos = positions[i];
            const color = active ? fingerColors[finger] : "hsl(var(--muted))";
            const strokeColor = active ? fingerColors[finger] : "hsl(var(--border))";
            
            return (
              <g key={finger}>
                {/* Finger body */}
                <rect 
                  x={pos.x - 12} y={pos.tipY} 
                  width="24" height={pos.baseY - pos.tipY} 
                  rx="12"
                  fill={color} 
                  stroke={strokeColor} 
                  strokeWidth={active ? 2.5 : 1.5}
                  opacity={active ? 1 : 0.4}
                  className="transition-all duration-300"
                />
                {/* Fingertip circle */}
                <circle 
                  cx={pos.x} cy={pos.tipY + 12} r="10"
                  fill={active ? fingerColors[finger] : "hsl(var(--muted))"}
                  opacity={active ? 0.8 : 0.2}
                  className="transition-all duration-300"
                />
                {/* Key label */}
                <text 
                  x={pos.x} y={pos.tipY + 16}
                  textAnchor="middle" 
                  fontSize="10" 
                  fontWeight="bold"
                  fill={active ? "white" : "hsl(var(--muted-foreground))"}
                  className="transition-colors"
                >
                  {homeKeys[i]}
                </text>
              </g>
            );
          })}
          
          {/* Thumb */}
          <ellipse 
            cx={side === "left" ? 145 : 55} cy="185" 
            rx="20" ry="30" 
            fill={isActive("thumbs") ? fingerColors.thumbs : "hsl(var(--muted))"}
            stroke="hsl(var(--border))" strokeWidth="1.5"
            opacity={0.4}
            transform={`rotate(${side === "left" ? 25 : -25}, ${side === "left" ? 145 : 55}, 185)`}
          />
          <text 
            x={side === "left" ? 145 : 55} y="190" 
            textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))"
          >
            Space
          </text>
        </svg>
        
        {/* Active finger label */}
        <div className="flex gap-1 flex-wrap justify-center">
          {fingers.map((finger, i) => (
            <span 
              key={finger}
              className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all ${
                isActive(finger) 
                  ? 'bg-primary text-primary-foreground font-bold scale-110' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {homeKeys[i]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 md:gap-10 justify-center">
        {renderHand("left")}
        {renderHand("right")}
      </div>
      {activeFinger && (
        <p className="text-sm font-medium text-primary animate-pulse">
          Use your <strong>{fingerLabels[activeFinger] || activeFinger}</strong>
        </p>
      )}
    </div>
  );
};

export default HandPositionGuide;
