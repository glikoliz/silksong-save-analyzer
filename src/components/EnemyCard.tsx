import React from 'react'
import EnemyIcon from './EnemyIcon'

interface EnemyCardProps {
  enemyName: string
  displayName: string
  kills: number
  target: number
  isCompleted: boolean
  isOptional?: boolean
  link?: string
}

const EnemyCard: React.FC<EnemyCardProps> = ({
  enemyName,
  displayName,
  kills,
  target,
  isCompleted,
  isOptional = false,
  link
}) => {
  const hasLink = Boolean(link && link.length > 0 && link !== '#')
  
  return (
    <div className={`enemy-card ${isCompleted ? 'completed' : ''} ${isOptional ? 'optional' : ''}`}>
      <div className="enemy-card-icon">
        <EnemyIcon enemyName={enemyName} size={64} />
        {isOptional && (
          <div className="optional-badge">Optional</div>
        )}
      </div>
      
      <div className="enemy-card-info">
        <div className="enemy-name" title={displayName}>
          {displayName}
        </div>
        
        <div className="enemy-progress">
          <div className={`progress-text ${isCompleted ? 'completed' : kills > 0 ? 'partial' : 'none'}`}>
            {kills}/{target}
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min((kills / target) * 100, 100)}%`,
                backgroundColor: isCompleted ? '#2ecc71' : kills > 0 ? '#f39c12' : '#e74c3c'
              }}
            />
          </div>
        </div>
        
        {hasLink && (
          <a 
            className="enemy-link" 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            title="Open on wiki"
          >
            🗺️
          </a>
        )}
      </div>
    </div>
  )
}

export default EnemyCard