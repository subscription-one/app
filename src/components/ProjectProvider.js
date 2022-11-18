import React, {createContext, useState} from 'react';

export const ProjectContext = createContext({
  project: 'playground',
  setProject: () => {},
});

export default ({children}) => {
  const [projects, setProject] = useState('playground');

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject: project => {
          setProject(project);
        },
      }}>
      {children}
    </ProjectContext.Provider>
  );
};
