import { exact } from 'prop-types';
import React from 'react';
const User = React.lazy(()=>import('./components/Home/User'));
const CreateNewUser = React.lazy(()=>import('./components/Home/CreateNewUser'));
const SearchUser = React.lazy(()=>import('./components/Home/SearchUser'));
const DeletedUsers = React.lazy(()=>import('./components/Home/DeletedUsers'));

const routes = [
  { path: '/user', exact: true, name:'User', component: User },
  { path: '/user/createuser/:id',exact:true, name:'Create New User',component:CreateNewUser},
  { path: '/searchuser',exact:true, name:'Search User',component:SearchUser},
  { path: '/deleteuser',exact:true, name:'Deleted Users',component:DeletedUsers},

];
export default routes;
