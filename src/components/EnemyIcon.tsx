import React, { useState, useEffect } from 'react'

interface EnemyIconProps {
  enemyName: string
  size?: number
  className?: string
}

const EnemyIcon: React.FC<EnemyIconProps> = ({ 
  enemyName, 
  size = 86, 
  className = '' 
}) => {
  const [currentSrc, setCurrentSrc] = useState(0)
  

  useEffect(() => {
    setCurrentSrc(0)
  }, [enemyName])
  

  const specialCases: Record<string, string> = {
    'Abyss Mass': 'Abyss_Mass',
    'Centipede Trap': 'Centipede_Trap', 
    'Lifeblood Fly': 'Lifeblood_Fly',
    'Pilgrim StaffWielder': 'Pilgrim StaffWeilder',
    'Void Tendrils': 'Abyss_Tendrils',
  }
  
  const possibleNames = [
    enemyName,
    specialCases[enemyName],
    enemyName.replace(/\s+/g, '_'),
    enemyName.replace(/_/g, ' '),
  ].filter((name, index, arr) => name && arr.indexOf(name) === index)
  
  const handleError = () => {
    if (currentSrc < possibleNames.length - 1) {
      setCurrentSrc(currentSrc + 1)
    }
  }
  
  if (currentSrc >= possibleNames.length) {

    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#666',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        title={`Image not found: ${enemyName}`}
      >
        ?
      </div>
    )
  }
  
  const currentFileName = possibleNames[currentSrc]
  

  return (
    <img 
      src={`./extracted_webp/${encodeURIComponent(currentFileName)}.webp`}
      alt={enemyName}
      width={size}
      height={size}
      loading="lazy"
      className={`enemy-icon ${className}`}
      title={enemyName}
      style={{ 
        objectFit: 'contain',
        borderRadius: '4px'
      }}
      onError={handleError}
    />
  )
}

export default EnemyIcon