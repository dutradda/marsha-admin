// import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Index from './pages/index';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path='/' component={Index}/>
//         <Route path='/import-zip' component={Index}/>
//         <Route path='/edit' component={Index}/>
//       </Switch>
//     </BrowserRouter>
//   );
// }


import React from 'react';
import { Admin } from 'react-admin';
// import { Route, Switch } from 'react-router-dom';
import dataProvider from './lib/dataProvider';
import config from './config';
import MarshaResource from './MarshaResource';

import { MediaList, MediaCreate, MediaMp3Upload } from './medias';

export default () => (
  <Admin dataProvider={dataProvider(config.graphQL)}>
      <MarshaResource
        name="medias"
        list={MediaList}
        create={MediaCreate}
        upload={MediaMp3Upload}
      />
  </Admin>
);

// <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>