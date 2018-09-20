import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const AppProvider = (props) => {
  const { children, ...rest } = props;
  return (
    <AppContext.Provider value={rest}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  layout: PropTypes.oneOf([
    'aligned',
    'staggered'
  ]),
  sizing: PropTypes.oneOf([
    'desktop',
    'mobile',
    'tablet'
  ]),
  theme: PropTypes.oneOf([
    'dark',
    'light'
  ])
};

AppProvider.defaultProps = {
  children: null,
  layout: 'staggered',
  sizing: 'desktop',
  theme: 'light'
};

export default AppProvider;
