import { useMemo } from "react"
import { motion } from "framer-motion"
import { INDIA_PATH_D, MAP_VIEWBOX } from "../../utils/indiaMapPath"
import { CITY_COORDINATES } from "../../utils/cityCoordinates"

const normalizeString = (str) => {
  if (!str) return ""
  return str.toLowerCase().replace(/\s+/g, "")
}

export default function IndiaMap({ popularCities, selectedCity, onCitySelect }) {
  const normalizedCoordinates = useMemo(() => {
    const map = {}
    Object.keys(CITY_COORDINATES).forEach(key => {
      map[normalizeString(key)] = { ...CITY_COORDINATES[key], originalKey: key }
    })
    return map
  }, [])

  const { pinnedCities, unpinnedCities } = useMemo(() => {
    if (!popularCities || popularCities.length === 0) {
      return { pinnedCities: [], unpinnedCities: [] }
    }
    const pinned = []
    const unpinned = []
    popularCities.forEach(cityObj => {
      const coord = normalizedCoordinates[normalizeString(cityObj.city)]
      if (coord) pinned.push({ ...cityObj, coord })
      else unpinned.push(cityObj)
    })
    return { pinnedCities: pinned, unpinnedCities: unpinned }
  }, [popularCities, normalizedCoordinates])

  const maxCount = useMemo(() => {
    if (pinnedCities.length === 0) return 1
    const max = Math.max(...pinnedCities.map(c => c.flatCount || c.count || 1))
    return max > 0 ? max : 1
  }, [pinnedCities])

  return (
    <div className="w-full h-full flex flex-col relative bg-surface/30 rounded-3xl border border-glass-border p-4 md:p-6 shadow-inner">
      <div className="flex-1 relative min-h-0 w-full flex items-center justify-center">
       
        <div 
          className="relative max-w-full max-h-full"
          style={{ 
            aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}`,
            height: '100%',
            width: 'auto',
            maxWidth: '100%'
          }}
        >
          <svg 
            viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`} 
            className="w-full h-full absolute inset-0"
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.25))" }}
          >
          
            <path 
              d={INDIA_PATH_D} 
              fill="rgba(255,255,255,0.07)" 
              stroke="var(--on-surface-variant, #64748b)" 
              strokeWidth="0.6" 
              strokeOpacity="0.6"
            />
          </svg>

          {pinnedCities.map((item) => {
            const isSelected = selectedCity === item.city
            const leftPct = (item.coord.x / MAP_VIEWBOX.width) * 100
            const topPct = (item.coord.y / MAP_VIEWBOX.height) * 100
           
            const flatVal = item.flatCount || item.count || 0
            const visualSize = 8

            return (
              <div 
                key={item.city}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
                style={{ 
                  left: `${leftPct}%`, 
                  top: `${topPct}%`,
                  width: `${visualSize}px`,
                  height: `${visualSize}px`,
                  zIndex: isSelected ? 10 : 1
                }}
                onClick={() => onCitySelect(item.city)}
                title={`${item.city} (${item.count} stays)`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                  
                    backgroundColor: isSelected
                      ? "var(--primary, #00f5ff)"
                      : "var(--on-surface-variant, #cbd5e1)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-full shadow-lg relative flex items-center justify-center text-on-primary font-bold text-[8px]"
                  style={{ width: visualSize, height: visualSize }}
                >
                  {visualSize > 18 && <span>{flatVal}</span>}
                  {isSelected && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-1 bg-surface border border-glass-border px-2 py-1 rounded text-[10px] font-bold text-on-background whitespace-nowrap shadow-xl pointer-events-none"
                  >
                    {item.city}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {unpinnedCities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-glass-border/50 text-center">
          <p className="text-[10px] text-on-surface-variant/70 font-body uppercase tracking-wider mb-1">
            Also available in:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {unpinnedCities.map((item) => (
              <button
                key={item.city}
                onClick={() => onCitySelect(item.city)}
                className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                  selectedCity === item.city 
                    ? "bg-primary/20 text-primary border border-primary/30" 
                    : "text-on-surface hover:text-primary hover:bg-surface border border-transparent"
                }`}
              >
                {item.city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}