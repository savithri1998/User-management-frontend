 export const mainMenu=(key)=>{
    switch(key){
        case 'dashboard':
            return{
                name: 'Dashboard',
                url: '/dashboard',
                icon: 'icon-speedometer',
                sno:0
            }
        case 'home':
            return{
                name: "Home",
                url: "/home",
                icon: "fa fa-institution",
                sno:1
            }
        case 'cases':
            return{
                name: "Cases",
                url: '/cases',
                icon: 'fa fa-users',
                children: [],
                sno:2
            }
        case 'management':
            return{
                name:'Management',
                url: "/managment",
                icon: "fa fa-institution",
                children: [],
                sno:3
            }
        case 'extras':
            return{
                name: "Extras",
                url: "/extras",
                icon: "fa fa-institution",
                children: [],
                sno:4
            }
        default :
            return null;
    }
 }

 export const subMenu=(key)=>{
    switch (key){
        case 'addCase':
            return{
                name: "Add Case",
                url: "addcase/new",
                icon: "fa fa-institution"  
            }
        case 'searchCase':
            return{
                name: "Search Case",
                url: "/searchcase",
                icon: "fa fa-institution"
            }
        case 'users':
            return{
                name: 'Users',
                url: '/users',
                icon: 'fa fa-users',
            }
        case 'rolesAndPermissions':
            return{
                name: 'Roles And Permissions',
                url: '/roles',
                icon: 'fa fa-users',
            }
        case 'district':
            return{
                name: "Districts", 
                url: '/districts',
                icon: 'fa fa-map-marker'
            }
        case 'cities':
            return{
                name: 'Cities',
                url: '/cities',
                icon: 'fa fa-map-marker'
            }
        case "caseType":
            return{
                name: "Case Type",
                url: '/casetype',
                icon: "fa fa-lock" 
            }
        case "caseStatus":
            return{
                name: "Case Status",
                url: '/casestatus',
                icon: 'fa fa-lock'
            }
    }
 }



