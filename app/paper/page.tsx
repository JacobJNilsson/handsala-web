'use client';

import { useState, useEffect, useCallback } from 'react';

// Seeded Random Number Generator
class SeededRandom {
  constructor(seed: number) {
    this.seed = seed;
  }

  private seed: number;

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

// Configuration interface
interface OrganicShapeConfig {
  seed?: number;
  complexity?: number;
  roughness?: number;
  roundness?: number;
  asymmetry?: number;
  baseRadius?: number;
  style?: 'organic' | 'torn' | 'flowing' | 'angular';
  contentMargin?: number; // Minimum safe area for content (0-1)
  maxClip?: number; // Maximum amount that can be clipped (0-1)
}

// Parametric Organic Shape Generator
function generateOrganicClipPath({
  seed = 12345,
  complexity = 12,
  roughness = 0.3,
  roundness = 0.7,
  asymmetry = 0.2,
  baseRadius = 0.4,
  style = 'organic',
  contentMargin = 0.15, // Safe area for content
  maxClip = 0.3 // Maximum clipping amount
}: OrganicShapeConfig = {}): string {

  const rng = new SeededRandom(seed);
  const points: { x: number; y: number }[] = [];

  // Style-specific parameters
  const styleConfig = {
    organic: {
      radiusVariation: 0.3,
      angleVariation: 0.1,
      smoothing: 0.8
    },
    torn: {
      radiusVariation: 0.5,
      angleVariation: 0.2,
      smoothing: 0.3
    },
    flowing: {
      radiusVariation: 0.2,
      angleVariation: 0.05,
      smoothing: 0.9
    },
    angular: {
      radiusVariation: 0.4,
      angleVariation: 0.3,
      smoothing: 0.1
    }
  };

  const config = styleConfig[style] || styleConfig.organic;

              // Calculate boundaries
  const contentMarginPct = contentMargin * 100;
  const safeAreaStart = contentMarginPct;
  const safeAreaEnd = 100 - contentMarginPct;

  // Base shape size - should be reasonable by default
  const baseShapeRadius = 40; // Base radius in percentage

  // Generate base control points
  for (let i = 0; i < complexity; i++) {
    const baseAngle = (i / complexity) * Math.PI * 2;
    const angleOffset = rng.range(-config.angleVariation, config.angleVariation) * roughness;
    const angle = baseAngle + angleOffset;

    // Create asymmetric radius variations
    const asymmetryFactor = 1 + Math.sin(angle * 2) * asymmetry * rng.range(0.5, 1.5);
    const radiusVariation = rng.range(1 - config.radiusVariation, 1 + config.radiusVariation);

    // Calculate base radius with variations
    const variationRadius = baseShapeRadius * baseRadius * radiusVariation * asymmetryFactor;

    // Apply maxClip scaling - this controls how much the shape can extend
    const finalRadius = variationRadius * (0.5 + maxClip * 0.5); // Scale from 50% to 100% based on maxClip

    // Convert to percentage coordinates
    const x = 50 + Math.cos(angle) * finalRadius;
    const y = 50 + Math.sin(angle) * finalRadius;

    // Only constrain if the point would go into the content safe area
    let finalX = x;
    let finalY = y;

    // If content margin is active, don't let the shape cut into the safe area
    if (contentMargin > 0) {
      if (x < safeAreaStart) {
        finalX = safeAreaStart;
      } else if (x > safeAreaEnd) {
        finalX = safeAreaEnd;
      }

      if (y < safeAreaStart) {
        finalY = safeAreaStart;
      } else if (y > safeAreaEnd) {
        finalY = safeAreaEnd;
      }
    }

    // Ensure we stay within the container bounds
    finalX = Math.max(5, Math.min(95, finalX));
    finalY = Math.max(5, Math.min(95, finalY));

    points.push({ x: finalX, y: finalY });
  }

  // Apply smoothing for more organic curves
  if (config.smoothing > 0) {
    for (let i = 0; i < points.length; i++) {
      const prev = points[(i - 1 + points.length) % points.length];
      const curr = points[i];
      const next = points[(i + 1) % points.length];

      const smoothFactor = config.smoothing * roundness;
      curr.x = curr.x * (1 - smoothFactor) + (prev.x + next.x) * smoothFactor * 0.5;
      curr.y = curr.y * (1 - smoothFactor) + (prev.y + next.y) * smoothFactor * 0.5;
    }
  }

  // Generate clip-path polygon
  const pathPoints = points.map(p => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`);
  return `polygon(${pathPoints.join(', ')})`;
}

// Preset configurations
const ORGANIC_PRESETS = {
  gentle: {
    complexity: 10,
    roughness: 0.2,
    roundness: 0.8,
    asymmetry: 0.1,
    baseRadius: 0.8,
    style: 'flowing' as const,
    contentMargin: 0.20,
    maxClip: 0.7
  },
  torn: {
    complexity: 16,
    roughness: 0.6,
    roundness: 0.3,
    asymmetry: 0.3,
    baseRadius: 0.9,
    style: 'torn' as const,
    contentMargin: 0.25,
    maxClip: 0.8
  },
  blob: {
    complexity: 8,
    roughness: 0.4,
    roundness: 0.9,
    asymmetry: 0.2,
    baseRadius: 0.7,
    style: 'organic' as const,
    contentMargin: 0.15,
    maxClip: 0.6
  },
  angular: {
    complexity: 12,
    roughness: 0.5,
    roundness: 0.1,
    asymmetry: 0.4,
    baseRadius: 0.8,
    style: 'angular' as const,
    contentMargin: 0.22,
    maxClip: 0.7
  }
};

// React Hook for Organic Shapes
function useOrganicShape(config: OrganicShapeConfig = {}) {
  const [clipPath, setClipPath] = useState('');
  const [currentSeed, setCurrentSeed] = useState(config.seed || 12345);

  const generateShape = useCallback((newConfig: OrganicShapeConfig = {}) => {
    const mergedConfig = { ...config, ...newConfig, seed: currentSeed };
    console.log('Generating shape with config:', mergedConfig);
    const path = generateOrganicClipPath(mergedConfig);
    setClipPath(path);
    return path;
  }, [config.contentMargin, config.maxClip, config.complexity, config.roughness, config.roundness, config.asymmetry, config.baseRadius, config.style, currentSeed]);

  const regenerate = useCallback((newSeed?: number) => {
    const seed = newSeed || Math.floor(Math.random() * 1000000);
    setCurrentSeed(seed);
    return generateShape({ seed });
  }, [generateShape]);

  // Regenerate when config changes
  useEffect(() => {
    generateShape();
  }, [config.contentMargin, config.maxClip, config.complexity, config.roughness, config.roundness, config.asymmetry, config.baseRadius, config.style, currentSeed]);

  return { clipPath, regenerate, currentSeed };
}

// Organic Card Component
const OrganicCard = ({
  children,
  preset = 'gentle',
  seed,
  customConfig = {},
  className = '',
  style = {}
}: {
  children: React.ReactNode;
  preset?: keyof typeof ORGANIC_PRESETS;
  seed?: number;
  customConfig?: OrganicShapeConfig;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const config = {
    ...ORGANIC_PRESETS[preset],
    ...customConfig,
    ...(seed && { seed })
  };

  const { clipPath } = useOrganicShape(config);

  return (
    <div
      className={`organic-card ${className}`}
      style={{
        clipPath,
        background: '#e8d5c0',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Organic Button Component
const OrganicButton = ({
  children,
  preset = 'gentle',
  seed,
  customConfig = {},
  onClick,
  className = '',
  style = {}
}: {
  children: React.ReactNode;
  preset?: keyof typeof ORGANIC_PRESETS;
  seed?: number;
  customConfig?: OrganicShapeConfig;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const config = {
    ...ORGANIC_PRESETS[preset],
    ...customConfig,
    ...(seed && { seed })
  };

  const { clipPath } = useOrganicShape(config);

  return (
    <button
      onClick={onClick}
      className={`organic-button ${className}`}
      style={{
        clipPath,
        background: 'linear-gradient(135deg, #e8d5c0 0%, #dcc7a8 100%)',
        border: 'none',
        padding: '1rem 2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#2d3748',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
    >
      {children}
    </button>
  );
};

export default function PaperPage() {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof ORGANIC_PRESETS>('gentle');
  const [cardSeed, setCardSeed] = useState(12345);
  const [buttonSeed, setButtonSeed] = useState(54321);
  const [contentMargin, setContentMargin] = useState(0.20);
  const [maxClip, setMaxClip] = useState(0.7);
  const [showDebugGrid, setShowDebugGrid] = useState(true);

  const regenerateShapes = () => {
    setCardSeed(Math.floor(Math.random() * 1000000));
    setButtonSeed(Math.floor(Math.random() * 1000000));
  };

  const currentPreset = ORGANIC_PRESETS[selectedPreset];
  const customConfig = {
    ...currentPreset,
    contentMargin,
    maxClip
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Paper Shape Generator
          </h1>
          <p className="text-teal-100 text-lg">
            Testing organic, hand-torn paper shapes for cards and buttons
          </p>
        </div>

                {/* Controls */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex gap-4">
                        <select
              value={selectedPreset}
              onChange={(e) => {
                const newPreset = e.target.value as keyof typeof ORGANIC_PRESETS;
                setSelectedPreset(newPreset);
                setContentMargin(ORGANIC_PRESETS[newPreset].contentMargin);
                setMaxClip(ORGANIC_PRESETS[newPreset].maxClip);
              }}
              className="px-4 py-2 rounded-lg border border-teal-600 bg-teal-50"
            >
              <option value="gentle">Gentle</option>
              <option value="blob">Blob</option>
              <option value="torn">Torn</option>
              <option value="angular">Angular</option>
            </select>

            <button
              onClick={regenerateShapes}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Regenerate Shapes
            </button>
          </div>

          <div className="flex gap-6 text-white">
                        <div className="flex flex-col items-center gap-2">
              <label className="text-sm">Content Margin: {contentMargin.toFixed(2)}</label>
              <input
                type="range"
                min="0.05"
                max="0.35"
                step="0.01"
                value={contentMargin}
                onChange={(e) => setContentMargin(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="text-sm">Max Clip: {maxClip.toFixed(2)}</label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={maxClip}
                onChange={(e) => setMaxClip(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="text-sm">Debug Grid</label>
              <input
                type="checkbox"
                checked={showDebugGrid}
                onChange={(e) => setShowDebugGrid(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Card Example */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Organic Card</h2>
                                    <OrganicCard
              key={`card-${cardSeed}-${contentMargin}-${maxClip}`}
              preset={selectedPreset}
              seed={cardSeed}
              customConfig={customConfig}
              style={{
                maxWidth: '400px',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <h3 className="text-2xl font-bold text-teal-800 mb-4">
                Welcome to Handsala
              </h3>
              <p className="text-teal-700 leading-relaxed text-center">
                This is an example card with organic, hand-torn paper styling.
                The shape is generated using parametric algorithms that create
                natural, imperfect edges.
              </p>
              <div className="mt-6 text-sm text-teal-600">
                Seed: {cardSeed} | Preset: {selectedPreset}
              </div>

              {showDebugGrid && (
                <div
                  className="absolute inset-0 border-2 border-red-500 border-dashed pointer-events-none"
                  style={{
                    margin: `${contentMargin * 100}%`,
                    zIndex: 10
                  }}
                >
                  <div className="absolute -top-6 left-0 text-xs text-red-500 bg-white px-1 rounded">
                    Content Safe Area
                  </div>
                </div>
              )}
            </OrganicCard>
          </div>

          {/* Button Example */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Organic Button</h2>
                                                <div className="relative inline-block">
              <OrganicButton
                key={`button-${buttonSeed}-${contentMargin}-${maxClip}`}
                preset={selectedPreset}
                seed={buttonSeed}
                customConfig={customConfig}
                onClick={() => alert('Organic button clicked!')}
                style={{
                  fontSize: '1.2rem',
                  padding: '1.5rem 3rem'
                }}
              >
                Click Me!
              </OrganicButton>

              {showDebugGrid && (
                <div
                  className="absolute inset-0 border-2 border-red-500 border-dashed pointer-events-none"
                  style={{
                    margin: `${contentMargin * 100}%`,
                    zIndex: 10
                  }}
                >
                  <div className="absolute -top-6 left-0 text-xs text-red-500 bg-white px-1 rounded">
                    Content Safe Area
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 text-sm text-teal-200">
              Seed: {buttonSeed} | Preset: {selectedPreset}
            </div>
          </div>

          {/* Multiple Examples */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Multiple Variations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.keys(ORGANIC_PRESETS).map((preset, index) => (
                <OrganicCard
                  key={preset}
                  preset={preset as keyof typeof ORGANIC_PRESETS}
                  seed={12345 + index * 100}
                  style={{
                    width: '200px',
                    height: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <h4 className="text-lg font-semibold text-teal-800 mb-2">
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </h4>
                  <p className="text-sm text-teal-700 text-center">
                    Example {preset} style
                  </p>
                </OrganicCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
