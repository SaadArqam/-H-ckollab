import React from 'react';

const SkillList = ({ skills, limit, showCount = false, size = 'sm', variant = 'default' }) => {
  if (!skills || skills.length === 0) {
    return <p className="text-secondary-500 text-sm italic">No skills listed.</p>;
  }

  const displayedSkills = limit ? skills.slice(0, limit) : skills;
  const remainingCount = limit && skills.length > limit ? skills.length - limit : 0;

  const sizeClasses = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const variantClasses = {
    default: 'bg-primary-100 text-primary-800 border border-primary-200 hover:bg-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200 hover:bg-secondary-200',
    accent: 'bg-accent-100 text-accent-800 border border-accent-200 hover:bg-accent-200',
    success: 'bg-success-100 text-success-800 border border-success-200 hover:bg-success-200',
    gradient: 'bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 border border-primary-200 hover:from-primary-200 hover:to-accent-200'
  };

  // Skill icons mapping (you can expand this)
  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase();
    const icons = {
      'react': '⚛️',
      'javascript': '🟨',
      'typescript': '🔷',
      'node.js': '🟢',
      'nodejs': '🟢',
      'python': '🐍',
      'java': '☕',
      'go': '🐹',
      'rust': '🦀',
      'docker': '🐳',
      'kubernetes': '☸️',
      'aws': '☁️',
      'azure': '🔵',
      'gcp': '🟡',
      'mongodb': '🍃',
      'postgresql': '🐘',
      'mysql': '🐬',
      'redis': '🔴',
      'graphql': '💜',
      'next.js': '▲',
      'vue': '💚',
      'angular': '🔴',
      'tailwindcss': '🎨',
      'figma': '🎨',
      'git': '📚'
    };
    
    return icons[skillLower] || '🔧';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displayedSkills.map((skill, index) => (
        <span
          key={skill}
          className={`
            group inline-flex items-center rounded-xl font-medium transition-all duration-200 
            hover:scale-105 hover:shadow-soft cursor-default
            ${sizeClasses[size]} ${variantClasses[variant]}
            animate-fade-in-up
          `}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className="mr-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {getSkillIcon(skill)}
          </span>
          {skill}
        </span>
      ))}
      {showCount && remainingCount > 0 && (
        <span
          className={`
            inline-flex items-center rounded-xl font-medium bg-secondary-100 
            text-secondary-600 border border-secondary-200 hover:bg-secondary-200 
            transition-all duration-200 hover:scale-105 cursor-default
            ${sizeClasses[size]}
          `}
        >
          <span className="mr-1">⋯</span>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default SkillList;
