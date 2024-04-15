export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: "User",
      url: "/user",
      icon: "fa fa-institution",
    },
    {
      name: "Add New User",
      url: "/user/createuser/new",
      icon: "fa fa-institution",
    },
    {
      name: "Search User",
      url: "/searchuser",
      icon: "fa fa-institution",
    },
    {
      name: "Deleted Users",
      url: "/deleteuser",
      icon: "fa fa-institution",
    },
   
   
    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/login',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Register',
    //       url: '/register',
    //       icon: 'icon-star',
    //     },
    //   ],
    // },
  ]
};
