import { configure } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

// automatically import all files ending in *.stories.jsx
const req = require.context('../stories', true, /.stories.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);

// limit the number of items logged into the actions panel
configureActions({
  depth: 50,
  limit: 10
});
